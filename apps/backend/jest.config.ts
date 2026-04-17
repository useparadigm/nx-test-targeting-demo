export default {
  displayName: "backend",
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@org/shared$": "<rootDir>/../../libs/shared/src/index.ts",
    "^@org/marketplace$": "<rootDir>/../../libs/marketplace/src/index.ts",
  },
};
