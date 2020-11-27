import { useState, useEffect, useRef } from 'react'

const LOADING_TIMEOUT = 5000 // 5sec
const SCRIPT_ELM_ID = 'todoist-quick-add'
const TODOIST_DOMAIN = 'local.todoist.com'

type ShowProps = {
    content: string
    todoistDomain: string
    priority?: number
    date?: string
    theme?: number
}

declare global {
    interface Window {
        TodoistQuickAddSDK: {
            show: (parms: ShowProps) => void
        }
    }
}

type Props = {
    content: string
    priority?: number
    date?: string
    theme?: number
    onAdd?: () => void
    onClose?: () => void
    onLoadingSuccess?: () => void
    onLoadingError?: () => void
}

type CustomMessageEvent = {
    data: string
}

type MessageJSON = {
    type: string
}

function TodoistQuickAdd({
    content,
    priority,
    date,
    theme,
    onAdd,
    onClose,
    onLoadingSuccess,
    onLoadingError,
}: Props): null {
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const loadingTimerToClear = useRef<number | undefined>(undefined)

    // Set up post message listener
    useEffect(() => {
        function handleMessageReceived(event: CustomMessageEvent) {
            const data = event.data
            if (data && typeof data === 'string' && data.indexOf('Todoist Quick Add SDK')) {
                const json = JSON.parse(data) as MessageJSON
                switch (json.type) {
                    case 'LOADED_ADD_VIEW':
                        setIsLoaded(true)
                        clearTimeout(loadingTimerToClear.current)
                        if (onLoadingSuccess) {
                            onLoadingSuccess()
                        }
                        break

                    case 'TASK_ADDED':
                        if (onAdd) {
                            onAdd()
                        }
                        break

                    case 'CLOSE_ADD_VIEW':
                        if (onClose) {
                            onClose()
                        }
                        break
                }
            }
        }

        window.addEventListener('message', handleMessageReceived)
        return () => window.removeEventListener('message', handleMessageReceived)
    }, [onLoadingSuccess, onAdd, onClose])

    // Set up loading timeout
    useEffect(() => {
        function handleTimeout() {
            if (!isLoaded && onLoadingError) {
                onLoadingError()
            }
        }

        loadingTimerToClear.current = window.setTimeout(handleTimeout, LOADING_TIMEOUT)
        return () => window.clearTimeout(loadingTimerToClear.current)
    }, [isLoaded, onLoadingError])

    // Load the script
    useEffect(() => {
        const showQuickAdd = () => {
            window.TodoistQuickAddSDK.show({
                content: content,
                todoistDomain: TODOIST_DOMAIN,
                date: date,
                priority: priority,
                theme: theme,
            })
        }

        if (!document.getElementById(SCRIPT_ELM_ID)) {
            const script = document.createElement('script')
            script.src = 'https://static.todoist.com/todoist-quick-add.js'
            script.id = SCRIPT_ELM_ID
            script.addEventListener('load', () => showQuickAdd())
            script.addEventListener('error', () => onLoadingError && onLoadingError())
            document.head.appendChild(script)
        } else {
            if (window.TodoistQuickAddSDK) {
                showQuickAdd()
            } else if (onLoadingError) {
                onLoadingError()
            }
        }
    }, [content, priority, date, theme, onLoadingError])

    return null
}

export default TodoistQuickAdd
