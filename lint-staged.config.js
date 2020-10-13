module.exports = {
    './**/*.{js,jsx,ts,tsx,json,css,scss,less}': ['prettier --write'],
    '*.{js,jsx,ts,tsx}': ['tsdx lint'],
}
