module.exports = {
    './**/*.{js,jsx,ts,tsx,md,mdx,json,css,scss,less}': ['prettier --write'],
    '*.{js,jsx,ts,tsx': ['tsdx lint'],
}
