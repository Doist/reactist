type ResolvedFigmaLink = {
    label: string
    url: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function resolveEntry(entry: unknown): ResolvedFigmaLink[] {
    if (typeof entry === 'string') {
        return entry.length > 0 ? [{ label: entry, url: entry }] : []
    }

    if (isRecord(entry) && typeof entry.url === 'string' && entry.url.length > 0) {
        const label =
            typeof entry.label === 'string' && entry.label.length > 0 ? entry.label : entry.url
        return [{ label, url: entry.url }]
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
