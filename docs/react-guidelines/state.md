# State Management

## When to Use What

| Tool              | Use For                              | Examples                                                  |
| ----------------- | ------------------------------------ | --------------------------------------------------------- |
| **Redux Toolkit** | Global app state synced with backend | Tasks, projects, user settings, sync engine               |
| **Zustand**       | Feature-scoped client-side UI state  | Filters, sidebar expansion, modal state, view preferences |
| **React state**   | Component-local ephemeral state      | Form inputs, hover/focus, animation toggles               |
| **React Router**  | URL-derived state                    | Current route, search params, path params                 |

## Redux Toolkit

### Typed Hooks

Always use typed hooks instead of the base `useDispatch`, `useSelector`, or `useStore` from `react-redux`. If your project doesn't have these yet, create them following the [Redux Toolkit TypeScript guide](https://redux-toolkit.js.org/usage/usage-with-typescript#define-typed-hooks):

```typescript
// Good: typed hooks
import { useAppDispatch, useAppSelector } from 'src/reducers/typed-redux-hooks'

function TaskList() {
    const tasks = useAppSelector((state) => state.tasks)
    const dispatch = useAppDispatch()
}

// Bad: untyped hooks
import { useDispatch, useSelector } from 'react-redux'
```

### Slices

Use `createSlice` for all new Redux code. Each slice manages one domain of state.

```typescript
import { createSlice } from '@reduxjs/toolkit'

type TasksState = {
    [id: string]: Task
}

const initialState: TasksState = {}

const tasksSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        taskAdd: (state, action: PayloadAction<Task>) => {
            state[action.payload.id] = action.payload
        },
        taskRemove: (state, action: PayloadAction<string>) => {
            delete state[action.payload]
        },
    },
    extraReducers: (builder) => {
        // Handle actions from other slices or thunks
    },
})
```

### Thunks

Use `createAppAsyncThunk` (typed alias of RTK's `createAsyncThunk`) for async operations. If your project doesn't have this defined, create it alongside the typed hooks. Reducers can only access their own slice — when an action affects multiple slices, compute updates in the thunk.

```typescript
import { createAppAsyncThunk } from 'src/reducers/typed-redux-hooks'

export const projectFetch = createAppAsyncThunk(
    'projects/fetch',
    async ({ id }: { id: string }, { getState, rejectWithValue }) => {
        try {
            return await api.getProject(id)
        } catch (error: unknown) {
            return rejectWithValue(error)
        }
    },
)
```

### Selectors

Use `createAppSelector` (typed alias of Reselect's `createSelector`) for memoized derived state. If your project doesn't have this defined, create it following the [Reselect TypeScript guide](https://reselect.js.org/usage/best-practices#define-a-pre-typed-createselector). Never create new arrays or objects directly in `useAppSelector`.

**Important:** Always wrap input selectors in an array — this is required for the output selector's types to be inferred correctly. Input selectors should only extract raw state; do not transform data there.

```typescript
// Good: memoized selector with input selectors in an array
const selectActiveProjects = createAppSelector([(state) => state.projects], (projects) =>
    Object.values(projects).filter((p) => !p.isArchived),
)

const activeProjects = useAppSelector(selectActiveProjects)

// Bad: creates new array on every render
const activeProjects = useAppSelector((state) =>
    Object.values(state.projects).filter((p) => !p.isArchived),
)

// Bad: input selectors not in an array (types won't be inferred)
const selectActiveProjects = createAppSelector(
    (state) => state.projects,
    (projects) => Object.values(projects).filter((p) => !p.isArchived),
)
```

## Zustand

### Store Pattern

Never export the store directly. Only export custom hooks. Consider using the `devtools` middleware for Redux DevTools integration and `immer` for Immer-powered immutable updates in complex stores.

```typescript
import { create } from 'zustand'
import { devtools, immer } from 'zustand/middleware'

// Store is private
const useFilterStore = create((set) => ({
    query: '',
    priority: null as TaskPriority | null,

    actions: {
        search: (query: string) => set({ query }),
        filterByPriority: (priority: TaskPriority | null) => set({ priority }),
        clearFilters: () => set({ query: '', priority: null }),
    },
}))

// Only export atomic selectors and actions
export const useFilterQuery = () => useFilterStore((state) => state.query)
export const useFilterPriority = () => useFilterStore((state) => state.priority)
export const useFilterActions = () => useFilterStore((state) => state.actions)
```

### Atomic Selectors

Export one hook per state piece. Never return objects or arrays from selectors — new references cause unnecessary re-renders.

```typescript
// Good: atomic selectors with stable primitives
export const useSidebarOpen = () => useLayoutStore((state) => state.sidebarOpen)
export const useTheme = () => useLayoutStore((state) => state.theme)

// Bad: returns new object on every call
export const useLayout = () =>
    useLayoutStore((state) => ({ sidebarOpen: state.sidebarOpen, theme: state.theme }))
```

If a component needs multiple values, call multiple hooks.

### Actions

Group actions in an `actions` namespace. Model actions as events describing what happened, not as setters.

```typescript
// Good: event-style actions
actions: {
    toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
    selectProject: (id: string) => set({ selectedProjectId: id }),
    clearSelection: () => set({ selectedProjectId: null }),
}

// Bad: setter-style actions
actions: {
    setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
    setSelectedProjectId: (id: string | null) => set({ selectedProjectId: id }),
}
```

### Combining with Other State Sources

```typescript
// Zustand + Redux
export function useFilteredTasks() {
    const query = useFilterQuery() // Zustand
    const tasks = useAppSelector(selectAllTasks) // Redux
    return useMemo(() => tasks.filter((t) => t.content.includes(query)), [tasks, query])
}

// Zustand + Router
export function useCurrentViewConfig() {
    const { projectId } = useParams() // Router
    const config = useViewConfig() // Zustand
    return config[projectId]
}
```

## Rules

- **Never import `useDispatch` / `useSelector` from `react-redux`** - Use `useAppDispatch` / `useAppSelector`
- **Never export Zustand stores** - Only export custom hooks
- **Keep slices focused** - One domain per slice; cross-slice logic goes in thunks
- **Derived state in selectors** - Use `createAppSelector` for memoized computations, never derive in components
- **Actions are events** - Name them after what happened (`taskCompleted`), not what to set (`setCompleted`)
