export default function underscore(camelCasedWord: string) {
    const strPath = camelCasedWord.split('::')
    let i = 0
    const j = strPath.length

    for (; i < j; i++) {
        strPath[i] = strPath[i].replace(new RegExp('([A-Z])', 'g'), '_$1')
        strPath[i] = strPath[i].replace(new RegExp('^_'), '')
    }

    return strPath.join('/').toLowerCase()
}
