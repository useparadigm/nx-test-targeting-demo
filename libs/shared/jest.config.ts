export default {
  displayName: "shared",
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@org/shared$": "<rootDir>/src/index.ts",
  },
};
