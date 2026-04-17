export default {
  displayName: "marketplace",
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@org/shared$": "<rootDir>/../../libs/shared/src/index.ts",
    "^@org/marketplace$": "<rootDir>/src/index.ts",
  },
};
