module.exports = {
    collectCoverageFrom: [
        'src/**/*.{ts,tsx,js,jsx}',
        '!**/*.stories.{js,jsx,ts,tsx}',
        '!**/*storybook*.{js,jsx,ts,tsx}',
    ],
    setupFilesAfterEnv: ['./scripts/jestSetup.ts'],
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/src/__mocks__/styleMock.ts',
    },
    testEnvironment: 'jsdom',
    watchPlugins: [
        require.resolve('jest-watch-typeahead/filename'),
        require.resolve('jest-watch-typeahead/testname'),
    ],
}
