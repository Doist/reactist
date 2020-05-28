const getInitials = (name?: string) => {
    if (!name) {
        return ''
    }

    const seed = name.trim().split(' ')
    const firstInitial = seed[0]
    const lastInitial = seed[seed.length - 1]

    let initials = firstInitial[0]
    if (firstInitial[0] !== lastInitial[0]) {
        initials += lastInitial[0]
    }
    return initials.toUpperCase()
}

const emailToIndex = (email: string, maxIndex: number) => {
    const seed = email.split('@')[0]
    const hash = seed.charCodeAt(0) + seed.charCodeAt(seed.length - 1) || 0
    return hash % maxIndex
}

export { getInitials, emailToIndex }
