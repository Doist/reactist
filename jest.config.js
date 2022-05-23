module.exports = {
    collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}'],
    setupFilesAfterEnv: ['./scripts/jestSetup.ts'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/src/__mocks__/styleMock.ts',
    },
    testEnvironment: 'jsdom',
    watchPlugins: [
        require.resolve('jest-watch-typeahead/filename'),
        require.resolve('jest-watch-typeahead/testname'),
    ],
}
