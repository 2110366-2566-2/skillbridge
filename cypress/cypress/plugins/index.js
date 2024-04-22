// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// promisified fs module
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on("before:browser:launch", (browser = {}, launchOptions) => {
    if (browser.family === "chromium" && browser.name !== "electron") {
      launchOptions.args.push("--disable-site-isolation-trials");
      launchOptions.args.push(
        "--disable-features=CrossSiteDocumentBlockingIfIsolating,CrossSiteDocumentBlockingAlways,IsolateOrigins,site-per-process"
      );
      launchOptions.args.push(
        "--load-extension=cypress/extensions/Ignore-X-Frame-headers_v1.1"
      );
      return launchOptions;
    }
  });

  on("file:preprocessor", cucumber());
  // accept a configFile value or use development by default
  return;
};
