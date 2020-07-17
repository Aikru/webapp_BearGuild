module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  snapshotSerializers: ["jest-serializer-vue"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,ts,vue}",
    "!**/node_modules/**",
    "!src/main.ts",
    "!src/registerServiceWorker.ts",
    "!src/router/*.ts",
  ],
};
