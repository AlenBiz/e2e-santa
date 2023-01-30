const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
  defaultCommandTimeout: 8000, 
  pageLoadTimeout:10000,
  e2e: {
    baseUrl: "https://staging.lpitko.ru",
    testIsolation: false,
    specPattern: "**/*.feature",
    setupNodeEvents(on, config) {
      
      const bundler = createBundler({
      plugins: [createEsbuildPlugin(config)],
      });
      
      on("file:preprocessor", bundler);
      addCucumberPreprocessorPlugin(on, config);
      return config;
  
    },
  },
});
