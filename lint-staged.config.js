module.exports = {
    './**/*.{js,jsx,ts,tsx,md,mdx,json,css,scss,less}': ['prettier --write'],
    './**/*.{js,jsx,ts,tsx}': ['npx eslint --format codeframe --fix'],
}
