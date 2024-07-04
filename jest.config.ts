const config = {
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // Your ts-jest configuration options here
      }
    ]
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@api$': '<rootDir>/src/utils/burger-api', // Обновите путь к вашему api
    '^@utils-types$': '<rootDir>/src/utils/types' // Обновите путь к вашим типам
  },
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  transformIgnorePatterns: ['\\\\node_modules\\\\', '\\.pnp\\.[^\\\\]+$']
};

export default config;
