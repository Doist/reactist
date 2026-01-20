# React Compiler

[React Compiler](https://react.dev/learn/react-compiler) is an official compiler from the React team that automatically optimizes components and hooks. It analyzes your code and inserts `useMemo`, `useCallback`, and `React.memo` equivalents where beneficial, eliminating the need for manual optimization.

We are incrementally adopting the compiler across all of our React codebases, where it is enabled but not all code may be compliant yet. As there are real performance risks if compiler violations are re-introduced, especially in cases where manual optimizations have been removed, we've put safeguards in place to prevent them from happening.

## Violation tracking

We use [`@doist/react-compiler-tracker`](https://github.com/Doist/react-compiler-tracker) to track modules that the compiler cannot optimize.

Violations are recorded in a [`.react-compiler.rec.json`](https://github.com/Doist/todoist-web/blob/main/.react-compiler.rec.json), where each entry tracks the number of violations in that file:

```json
{
    "recordVersion": 1,
    "react-compiler-version": "1.0.0",
    "files": {
        "src/path/to/file.tsx": {
            "CompileError": 3
        }
    }
}
```

We leverage [lint-staged](https://github.com/lint-staged/lint-staged) to automatically update the records file on commit. If the numbers of errors are increased, the commit is blocked until the errors either go back to their previous levels, or if the records file is explicitly re-created. The same check is also run on CI.

## Identifying and fixing violations

When modifying a file with violations, consider fixing them so we can take advantage of the compiler's optimizations.

A quick way to identify them is to install the [React Compiler Marker VSCode extension](https://marketplace.visualstudio.com/items?itemName=blazejkustra.react-compiler-marker), which highlights your components and hooks with ✨ or 🚫 emojis in real time.

Once fixed, the file's entry will be removed from `.react-compiler.rec.json`.

## Common errors

### Ref access during render

> Reason: Cannot access refs during render
>
> React refs are values that are not needed for rendering. Refs should only be accessed outside of render, such as in event handlers or effects. Accessing a ref value (the current property) during render can cause your component not to update as expected (<https://react.dev/reference/react/useRef>)

Assigning to refs during render is a violation as it's a side effect. The fix depends on how the ref was being used, but an example is that if we were using it to prevent a state value from being used to re-create callbacks, consider using `useEvent` instead.

**Before:**

```typescript
const tasksBySectionIdRef = useRef(tasksBySectionId)
const splitGroupsRef = useRef(splitGroups)

// Assigning during render - violation
tasksBySectionIdRef.current = tasksBySectionId
splitGroupsRef.current = splitGroups

const handleTaskEditClick = useCallback(
    (task: Task) => {
        const group = splitGroupsRef.current
            ? Object.entries(tasksBySectionIdRef.current).find(...)
            : null
        onEditItem(group?.[0] ?? task.section_id, task.id)
    },
    [onEditItem],
)
```

**After:**

```typescript
import { useEvent } from 'react-use-event-hook'

const handleTaskEditClick = useEvent((task: Task) => {
    const group = splitGroups
        ? Object.entries(tasksBySectionId).find(...)
        : null
    onEditItem(group?.[0] ?? task.section_id, task.id)
})
```

### Mismatched `useMemo` dependencies

> Reason: Existing memoization could not be preserved
>
> React Compiler has skipped optimizing this component because the existing manual memoization could not be preserved. The inferred dependencies did not match the manually specified dependencies, which could cause the value to change more or less frequently than expected. The inferred dependency was \[...\], but the source dependencies were \[...\]. Inferred less specific property than source

Typically, this is caused by the use of the optional chaining operator, as the compiler infers the parent object as the actual dependency. Our options here are to either extract the optional-chained property into a variable, or use the parent object as a dependency. We can also consider removing the manual memoization.

**Before:**

```typescript
const splitGroups = useProjectGrouping({ projectId })

const tasksBySectionId = useMemo(() => {
    if (splitGroups?.uncompleted) {
        return splitGroups.uncompleted.reduce(...)
    }
    // ...
}, [sortFn, splitGroups?.uncompleted]) // Optional chaining in deps
```

**After:**

```typescript
const splitGroups = useProjectGrouping({ projectId })
const uncompletedGroups = splitGroups?.uncompleted

const tasksBySectionId = useMemo(() => {
    if (uncompletedGroups) {
        return uncompletedGroups.reduce(...)
    }
    // ...
}, [sortFn, uncompletedGroups]) // Extracted variable in deps
```

### Mutating props

> Reason: Support destructuring of context variables

React Compiler requires props to be treated as immutable, so they can't be reassigned or mutated.

**Before:**

```typescript
function ProjectBoardView({ showCompleted }) {
    const isViewOnly = useSelectIsViewOnlyPublicProject(projectId)
    if (isViewOnly) {
        showCompleted = true // Violation: reassigning prop
    }
}
```

**After:**

```typescript
function ProjectBoardView({ showCompleted: showCompletedProp }) {
    const isViewOnly = useSelectIsViewOnlyPublicProject(projectId)
    const showCompleted = isViewOnly || showCompletedProp
}
```

### Default parameters for props

> Reason: (BuildHIR::node.lowerReorderableExpression) Expression type `MemberExpression` cannot be safely reordered
>
> Reason: (BuildHIR::node.lowerReorderableExpression) Expression type `OptionalMemberExpression` cannot be safely reordered

The compiler can't safely reorder default parameter values that reference other parameters. This applies to both regular member access (`task.id`) and optional chaining (`task?.id`), since both depend on a sibling parameter being evaluated first.

**Before:**

```typescript
function DndTaskWrapper({
    task,
    stableTaskId = task.id, // Violation: references sibling parameter
}: Props) {
    // ...
}
```

**After:**

```typescript
function DndTaskWrapper({ task, stableTaskId: stableTaskIdProp }: Props) {
    const stableTaskId = stableTaskIdProp ?? task?.id
    // ...
}
```

### Computed property keys

> Reason: (BuildHIR::lowerExpression) Expected Identifier, got `LogicalExpression` key in ObjectExpression
>
> Reason: (BuildHIR::lowerExpression) Expected Identifier, got `BinaryExpression` key in ObjectExpression

The compiler expects simple identifiers as property keys. If computation is required, first extract them into a variable.

**Before:**

```typescript
return {
    ...all,
    [key ?? DEFAULT_SECTION_ID]: tasks,
}
```

**After:**

```typescript
const groupKey = key ?? DEFAULT_SECTION_ID
return {
    ...all,
    [groupKey]: tasks,
}
```

### Loop variable reassignment

> Reason: Destructure should never be Reassign as it would be an Object/ArrayPattern

Declaring a variable before a loop and reassigning it inside is a violation, as the compiler cannot safely track mutable variables.

**Before:**

```typescript
const hasCompletedTasks = useMemo(() => {
    let ancestorType: AncestorType
    for (ancestorType in transformedState) {
        const ancestors = transformedState[ancestorType]
        // ...
    }
}, [transformedState])
```

**After:**

```typescript
const hasCompletedTasks = useMemo(() => {
    for (const ancestorType in transformedState) {
        const ancestors = transformedState[ancestorType as AncestorType]
        // ...
    }
}, [transformedState])
```

## Verifying fixes (for LLMs)

When fixing violations programmatically, use one of these methods to verify the fix was successful:

**1. CLI Tool (recommended)**

Run the tracker to check if a file has violations:

```bash
npx @doist/react-compiler-tracker --check-files src/path/to/file.tsx
```

A successful check produces no output. If violations remain, the tool reports the error count.

**2. Babel with Inline Logger**

Run a Node script that uses Babel's API with a custom logger to see exact errors:

```bash
node -e "
require('@babel/core').transformFileSync('src/path/to/file.tsx', {
  presets: ['@babel/preset-typescript', ['@babel/preset-react', { runtime: 'automatic' }]],
  plugins: [['babel-plugin-react-compiler', {
    logger: {
      logEvent(filename, event) {
        if (event.kind === 'CompileError') {
          console.error('[CompileError]', filename);
          console.error('Reason:', event.detail?.reason);
          const loc = event.detail?.primaryLocation?.();
          if (loc?.start) console.error('Location: Line', loc.start.line);
        }
      }
    }
  }]]
});
"
```

This outputs the exact reason and location for each violation, regardless of repo-specific logging configuration.

**3. Transpiled Code Inspection**

Successfully optimized code will include `react-compiler-runtime` imports and compiler-generated memoization:

```typescript
// Source
function TaskList({ tasks }) {
    const sorted = tasks.toSorted((a, b) => a.order - b.order)
    return <List items={sorted} />
}

// Transpiled (successfully optimized)
import { c as _c } from "react-compiler-runtime";
function TaskList({ tasks }) {
    const $ = _c(2);
    let sorted;
    if ($[0] !== tasks) {
        sorted = tasks.toSorted((a, b) => a.order - b.order);
        $[0] = tasks;
        $[1] = sorted;
    } else {
        sorted = $[1];
    }
    return <List items={sorted} />;
}
```

Key indicators of successful optimization:

- `import { c as _c } from "react-compiler-runtime"` at the top
- `const $ = _c(N)` where N is the number of memo slots
- Conditional blocks checking `$[n] !== value` for cache invalidation

If the transpiled output lacks these patterns and looks unchanged from the source, the component was not optimized due to a violation.
