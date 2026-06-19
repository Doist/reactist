type ResolvedFigmaLink = {
    path: string
    url: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function resolveEntry(entry: unknown): ResolvedFigmaLink[] {
    if (isRecord(entry) && typeof entry.url === 'string' && entry.url.length > 0) {
        const path =
            typeof entry.path === 'string' && entry.path.length > 0 ? entry.path : entry.url
        return [{ path, url: entry.url }]
    }

    return []
}

function resolveFigmaLinks(param: unknown): ResolvedFigmaLink[] {
    if (Array.isArray(param)) {
        return param.flatMap(resolveEntry)
    }

    return resolveEntry(param)
}

export { resolveFigmaLinks }
export type { ResolvedFigmaLink }
