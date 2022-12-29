module.exports = {
    collectCoverageFrom: [
        'src/**/*.{ts,tsx,js,jsx}',
        '!**/*.spec.{js,jsx,ts,tsx}',
        '!**/*.stories.{js,jsx,ts,tsx}',
        '!**/*storybook*.{js,jsx,ts,tsx}',
    ],
    setupFilesAfterEnv: ['./scripts/jestSetup.ts'],
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/src/__mocks__/styleMock.ts',
    },
    /**
     * Taken from the default documented value, and removed the part that matches files with
     * ".spec.*", leaving just ".test.*". This is to preserve the ".spec.*" files for Playwright
     * tests.
     * @see https://jestjs.io/docs/configuration#testregex-string--arraystring
     * @default "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$"
     */
    testRegex: '(/__tests__/.*|(\\.|/)test)\\.[jt]sx?$',
    testEnvironment: 'jsdom',
    watchPlugins: [
        require.resolve('jest-watch-typeahead/filename'),
        require.resolve('jest-watch-typeahead/testname'),
    ],
}
