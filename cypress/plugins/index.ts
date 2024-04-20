const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = (on: any, config: any) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config

    on("before:browser:launch", (browser: any = {}, launchOptions: any) => {
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

// const cucumber = require("cypress-cucumber-preprocessor").default;
// const browserify = require("@cypress/browserify-preprocessor");

// module.exports = (on: any) => {
//     const options = browserify.defaultOptions;
//     on("file:preprocessor", cucumber(options));
// };