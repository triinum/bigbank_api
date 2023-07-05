const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
     // reporter: 'reporters/custom.js'
      // implement node event listeners here
    }
  },
});


