module.exports = {
    './**/*.{js,jsx,ts,tsx,json,css,scss,less}': ['prettier --write', 'git add'],
    '*.{js,jsx,ts,tsx}': ['tsdx lint', 'git add'],
}
