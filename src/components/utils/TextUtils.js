const getInitials = (name) => {
    if (!name) {
        return ''
    }

    const seed = name.trim().split(' ')
    const first_initial = seed[0]
    const last_initial = seed[seed.length - 1]

    let initials = first_initial[0]
    if (first_initial[0] !== last_initial[0]) {
        initials += last_initial[0]
    }
    return initials.toUpperCase()
}

const emailToIndex = (email, maxIndex) => {
    const seed = email.split('@')[0]
    const hash = seed.charCodeAt(0) + seed.charCodeAt(seed.length - 1) || 0
    return hash % maxIndex
}

export {
    getInitials,
    emailToIndex
}
