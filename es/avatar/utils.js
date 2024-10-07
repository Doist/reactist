function getInitials(name) {
    var _initials

    if (!name) {
        return ''
    }

    const seed = name.trim().split(' ')
    const firstInitial = seed[0]
    const lastInitial = seed[seed.length - 1]
    let initials = firstInitial == null ? void 0 : firstInitial[0]

    if (
        firstInitial != null &&
        lastInitial != null &&
        initials != null && // Better readable this way.
        // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
        firstInitial[0] !== lastInitial[0]
    ) {
        initials += lastInitial[0]
    }

    return (_initials = initials) == null ? void 0 : _initials.toUpperCase()
}

function emailToIndex(email, maxIndex) {
    const seed = email.split('@')[0]
    const hash = seed ? seed.charCodeAt(0) + seed.charCodeAt(seed.length - 1) || 0 : 0
    return hash % maxIndex
}

export { emailToIndex, getInitials }
//# sourceMappingURL=utils.js.map
