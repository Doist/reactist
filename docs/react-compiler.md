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

#### Alternative: useState lazy initialization

For values that need to be computed once (like store instances or initial values), use `useState` with a lazy initializer instead of the ref pattern.

**Before (store creation):**

```typescript
const storeRef = useRef<TaskHierarchyStore>()
if (!storeRef.current) {
    storeRef.current = store ?? createTaskHierarchyStore()
}
```

**After (store creation):**

```typescript
const [storeInstance] = useState<TaskHierarchyStore>(() => store ?? createTaskHierarchyStore())
```

**Note:** The lazy initializer captures the initial prop value. If `store` is initially undefined but becomes defined later, `storeInstance` will remain the created store. This matches the original ref behavior and is typically intentional.

**Before (one-time value computation):**

```typescript
const placeholder = useMemo(
    () => getPlaceholder(completedTaskCount),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
)
```

**After (one-time value computation):**

```typescript
const [placeholder] = useState(() => getPlaceholder(completedTaskCount))
```

#### Storing refs in state

Storing refs in state and comparing `.current` values during render is also a violation of this rule. Instead, use a string or enum identifier to track which element is selected.

**Before:**

```typescript
const [selectedInputRef, setSelectedInputRef] = useState(() =>
    initialFocus === 'description' ? richTextDescriptionRef : richTextContentInputRef,
)

// During render:
const isTitleInputFocused = selectedInputRef.current === richTextContentInputRef.current
```

**After:**

```typescript
type SelectedInputType = 'content' | 'description'

const [selectedInput, setSelectedInput] = useState<SelectedInputType>(() =>
    initialFocus === 'description' ? 'description' : 'content',
)

// During render:
const isTitleInputFocused = selectedInput === 'content'
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

The same violation applies to other expression types in default parameters:

#### ArrowFunctionExpression

> Reason: (BuildHIR::node.lowerReorderableExpression) Expression type `ArrowFunctionExpression` cannot be safely reordered

**Before:**

```typescript
function useField<T>(
    deserialize: (val: unknown) => T = (val) => val as T, // Violation
)
```

**After:**

```typescript
// Extract to module-level function declaration
function defaultDeserialize<T>(val: unknown): T {
    return val as T
}

function useField<T>(deserialize: (val: unknown) => T = defaultDeserialize)
```

#### JSXElement

> Reason: (BuildHIR::node.lowerReorderableExpression) Expression type `JSXElement` cannot be safely reordered

**Before:**

```typescript
function Layout({
    illustration = <DefaultIllustration />, // Violation
}: Props)
```

**After:**

```typescript
function Layout({ illustration: illustrationProp }: Props) {
    const illustration = illustrationProp ?? <DefaultIllustration />
}
```

#### CallExpression

> Reason: (BuildHIR::node.lowerReorderableExpression) Expression type `CallExpression` cannot be safely reordered

**Before:**

```typescript
function TimeInput({
    referenceDate = startOfDay(new Date()), // Violation
}: Props)
```

**After:**

```typescript
function TimeInput({ referenceDate: referenceDateProp }: Props) {
    const referenceDate = referenceDateProp ?? startOfDay(new Date())
}
```

For static values that don't change, extract to a module-level constant:

**Before:**

```typescript
function Popover({
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone, // Violation
}: Props)
```

**After:**

```typescript
const DEFAULT_TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone

function Popover({ timezone = DEFAULT_TIMEZONE }: Props)
```

### `switch(true)` pattern

> Reason: (BuildHIR::node.lowerReorderableExpression) Expression type `BinaryExpression` cannot be safely reordered
>
> Reason: (BuildHIR::node.lowerReorderableExpression) Expression type `LogicalExpression` cannot be safely reordered

The compiler cannot safely optimize `switch(true)` statements with complex case conditions. Convert to a switch on the variable directly:

**Before:**

```typescript
switch (true) {
    case status === 'pending':
        return { content: <Loader /> }
    case status === 'resolved' && data !== undefined:
        return { content: <Result data={data} /> }
}
```

**After:**

```typescript
switch (status) {
    case 'pending':
        return { content: <Loader /> }
    case 'resolved':
        if (data !== undefined) {
            return { content: <Result data={data} /> }
        }
        break
    case 'idle':
        return { content: <Idle /> }
}
return { content: <Default /> }
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

### Conditional hook calls

> Reason: Hooks must always be called in a consistent order, and may not be called conditionally. See the Rules of Hooks (https://react.dev/warnings/invalid-hook-call-warning)

The `store?.useState()` pattern conditionally calls a hook - when `store` is `undefined`, the hook isn't called; when defined, it is. This violates the Rules of Hooks which require hooks to be called unconditionally in the same order on every render.

**Before:**

```typescript
const renderedItems = store?.useState('renderedItems')
```

**After:**

```typescript
import { useStoreState } from '@ariakit/react'

const renderedItems = useStoreState(store, 'renderedItems')
```

The `store.useState()` pattern is from older versions of AriaKit. Since [version 0.4.9](https://ariakit.org/changelog#new-usestorestate-hook), AriaKit provides [`useStoreState`](https://ariakit.org/reference/use-store-state) which accepts stores that are null or undefined, returning undefined in those cases. The same principle applies to any conditional hook call - use an API that handles the conditional case internally.

### Function declaration order

> Reason: Cannot access variable before it is declared
>
> handleFormInputEnter is accessed before it is declared, which prevents the earlier access from updating when this value changes over time

or

> Reason: [PruneHoistedContexts] Rewrite hoisted function references

The compiler analyzes function dependencies statically. Functions must be declared before they're referenced by other functions.

**Before:**

```typescript
function handleFormInputEnter(event: KeyboardEvent) {
    onChange?.(getCurrentEditorValue())
    handleFormSubmit(event) // Error: accessed before declaration
}

function handleFormSubmit(event: KeyboardEvent | React.MouseEvent) {
    // ...
}
```

**After:**

```typescript
function handleFormSubmit(event: KeyboardEvent | React.MouseEvent) {
    // ...
}

function handleFormInputEnter(event: KeyboardEvent) {
    onChange?.(getCurrentEditorValue())
    handleFormSubmit(event) // Now valid
}
```

#### Self-referential callbacks

When a callback references itself (for retry logic with `setTimeout` or animation loops with `requestAnimationFrame`), reordering won't help. Instead, use an **inner function declaration** for the self-referencing logic.

**Before:**

```typescript
const _logout = useEvent(() => {
    if (syncStatus === 'ready') {
        logout()
        return
    }
    setTimeout(_logout, 500) // Error: _logout accessed before declared
})
```

**After:**

```typescript
const _logout = useEvent(() => {
    function handleLogout() {
        if (syncStatus === 'ready') {
            logout()
            return
        }
        setTimeout(handleLogout, 500)
    }
    handleLogout()
})
```

The inner function declaration is hoisted within its scope, allowing self-reference without depending on the outer variable. This pattern works for both `useEvent` and `useCallback`.

**Warning: Stale closures with async operations.** The inner function captures state values when the outer function is invoked. If the inner function is called later via `setTimeout`, it will see stale values. Use `useRef` instead for values read across async callbacks (like retry counters), since `.current` is read at access time rather than captured in the closure.

#### Avoiding self-reference entirely

If the self-reference is for "run once" behavior (like detaching a listener after first call), consider refactoring to avoid self-reference entirely:

```typescript
// Instead of detaching inside the handler via self-reference:
const onEvent = useEvent(function handler() {
    subject.detach(handler) // Self-reference violation
    // ...
})

// Use a ref to track state and detach in useEffect cleanup:
const hasRunRef = useRef(false)

const onEvent = useEvent(() => {
    if (hasRunRef.current) return
    hasRunRef.current = true
    // ...
})

useEffect(
    function attachEvent() {
        subject.attach(onEvent)
        return () => subject.detach(onEvent)
    },
    [onEvent],
)
```

### Optional chaining in try/catch blocks

> Reason: Support value blocks (conditional, logical, optional chaining, etc) within a try/catch statement

The compiler can't handle optional chaining (`?.()`) inside try/catch blocks.

**Before:**

```typescript
try {
    await doSomething()
    onSuccessCallback?.()
} catch (error) {
    onFailureCallback?.(error)
}
```

**After:**

```typescript
try {
    await doSomething()
    if (onSuccessCallback) {
        onSuccessCallback()
    }
} catch (error) {
    if (onFailureCallback) {
        onFailureCallback(error)
    }
}
```

### Mutable objects created with useMemo

> Reason: This value cannot be modified. Modifying a value previously passed as an argument to a hook is not allowed.

Creating mutable objects (Web Workers, stores, etc.) with `useMemo` and then mutating them in `useEffect` triggers a compiler error because the compiler tracks values through hooks.

**Before:**

```typescript
const worker = useMemo(() => createWebWorker(), [])

useEffect(
    function assignMessageHandler() {
        worker.onmessage = handleMessage // Error: mutating hook return value
    },
    [worker],
)
```

**After:**

```typescript
const workerRef = useRef<Worker | null>(null)

function getWorker(): Worker {
    if (!workerRef.current) {
        workerRef.current = createWebWorker()
    }
    return workerRef.current
}

useEffect(function assignMessageHandler() {
    const worker = getWorker()
    worker.onmessage = handleMessage
    return () => {
        worker.onmessage = null
    }
    // getWorker is non-reactive (only accesses a stable ref), so it's safe to omit from deps
}, [])
```

### Mutating function or hook return values

> Reason: This value cannot be modified. Modifying a value returned by a function is not allowed.

Objects returned from functions or hooks should be treated as immutable. Create new objects instead of mutating properties directly.

**Before:**

```typescript
function FilterSection({ onSetViewOptions }) {
    const parsedQuery = parseFilterQueryOrDefault(filterBy)

    function handleAssignedChange(assigneeFilter: string) {
        // Violation: mutating returned object
        parsedQuery.assignees = assigneeFilter === '!assigned' ? 'NOT_ASSIGNED' : 'ANY'
        onSetViewOptions({ filterBy: buildFilterQuery(parsedQuery) })
    }
}
```

**After:**

```typescript
function FilterSection({ onSetViewOptions }) {
    const parsedQuery = parseFilterQueryOrDefault(filterBy)

    function handleAssignedChange(assigneeFilter: string) {
        const newAssignees = assigneeFilter === '!assigned' ? 'NOT_ASSIGNED' : 'ANY'
        // Create new object with spread operator
        onSetViewOptions({
            filterBy: buildFilterQuery({ ...parsedQuery, assignees: newAssignees }),
        })
    }
}
```

### DOM mutations

> Reason: This value cannot be modified.

The compiler treats DOM property assignments as mutations that cannot be tracked.

#### Redirects during render

Assigning to `window.location.href` during render is a side effect. Move these to `useEffect`.

**Before:**

```typescript
function PublicRouteWrapper({ children }: { children: React.ReactNode }) {
    const authenticatedUser = localStorage.getItem('User')

    if (authenticatedUser) {
        // Violation: DOM mutation during render
        window.location.href = '/app'
        return null
    }

    return <>{children}</>
}
```

**After:**

```typescript
function PublicRouteWrapper({ children }: { children: React.ReactNode }) {
    const authenticatedUser = localStorage.getItem('User')

    function shouldRedirectToApp() {
        return Boolean(authenticatedUser)
    }

    useEffect(function redirectToApp() {
        if (shouldRedirectToApp()) {
            window.location.href = '/app'
        }
    }, [authenticatedUser])

    if (shouldRedirectToApp()) {
        return null
    }

    return <>{children}</>
}
```

#### Element property assignments

Assigning to element properties like `scrollTop` also triggers this error. Use the equivalent method call instead.

**Before:**

```typescript
useLayoutEffect(
    function scrollToElement() {
        if (resultList && resultList.scrollHeight > resultList.clientHeight) {
            // Violation: direct property assignment
            resultList.scrollTop = elementBottom - resultList.clientHeight
        }
    },
    [currentId, resultList],
)
```

**After:**

```typescript
useLayoutEffect(
    function scrollToElement() {
        if (resultList && resultList.scrollHeight > resultList.clientHeight) {
            // Use scroll() method instead of scrollTop assignment
            resultList.scroll({ top: elementBottom - resultList.clientHeight })
        }
    },
    [currentId, resultList],
)
```

## Identifying violations and verifying fixes (for LLMs)

When fixing violations programmatically, first identify modules with violations by checking `.react-compiler.rec.json`, then use the tracker CLI with `--show-errors` to see the exact errors:

```bash
npx @doist/react-compiler-tracker --check-files --show-errors src/path/to/file.tsx
```

Example output:

```
🔍 Checking 1 file for React Compiler errors…
⚠️ Found 4 React Compiler issues across 1 file

Detailed errors:
 - src/path/to/file.tsx: Line 15: Cannot access refs during render (x2)
 - src/path/to/file.tsx: Line 28: Existing memoization could not be preserved (x2)
```

Parse the output to extract error reasons (e.g., "Cannot access refs during render") and line numbers to plan the fix.

Once the fix is applied, verify it using one of the following methods:

**1. CLI Tool (recommended)**

Run the tracker with `--check-files` to verify changes against the records file:

```bash
npx @doist/react-compiler-tracker --check-files src/path/to/file.tsx
```

The tool compares the current errors against `.react-compiler.rec.json` and reports changes:

- **Errors increased** (exit code 1):

    ```
    React Compiler errors have increased in:
     • src/path/to/file.tsx: +2
    Please fix the errors and run the command again.
    ```

- **Errors decreased** (exit code 0):

    ```
    🎉 React Compiler errors have decreased in:
     • src/path/to/file.tsx: -2
    ```

- **No changes** (exit code 0): No output about changes, just the check summary.

This is faster than `--overwrite` as it only checks the specified files rather than the entire codebase.

**2. Babel with Inline Logger (alternative)**

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
