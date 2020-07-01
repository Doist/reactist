module.exports = {
    setupFilesAfterEnv: ['./scripts/jestSetup.ts'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/src/__mocks__/styleMock.ts',
    },
    testURL: 'http://localhost',
}
