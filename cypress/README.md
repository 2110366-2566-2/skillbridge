Cypress Coding Standard
===========================
---

# 1. Project Structure
        - cypress
            - cypress
                - configs (Contains all configs per environment)
                - integration (Contains all test cases)
                    - testcypress
                        - Todo.feature
                - keywords (Contains all keywords)
                    - features
                        - Todo.js
                    - pages
                        - TodoPage.js
                - plugins
                    - index.js
                - support
                    - commands.js
                    - index.js
        - cypress.json
        - package-lock.json
        - package.json
        - README.md
        - .gitignore

---

# 2. Source file structure
## Project Configurations
### Package dependency
Use `package.json` file for install dependencies package.

*package.json*

```json
{
    ...,
    "dependencies": {
        "cypress": "^3.8.1",
        "cypress-cucumber-preprocessor": "^1.19.0",
        "mocha": "5.2.0",
        "mochawesome-merge": "^4.0.0"
    },
    ...
}
```

### Cypress configuration
Use file cypress.json to config project.

- Use reporter `mochawesome` forlog test result. See reporter option in this link. ([mochawesome-report-generator](https://github.com/adamgruber/mochawesome-report-generator/blob/master/README.md))
- For `baseUrl` and `env` use configs file per environment to declare it. See in [Configs file](##configs) section.
- See more config options in [Cypress Configuration](https://docs.cypress.io/guides/references/configuration.html)

*cypress.json*

```json
{
    "reporter": "mochawesome",
    "ignoreTestFiles": ["*.js", "*.md"],
    "reporterOptions": {
        "reportFilename":"test_result",
        "reportDir": "results/",
        "overwrite": false,
        "html": true,
        "json": true
    },
    "video": false
}
```

## Test data
Test data file must keep in fixtures folder and separate it per environment.
You can [cypress fixtures](https://docs.cypress.io/api/commands/fixture.html) feature to import test data.

- Example to load test data from fixture folder. [load-fixtures-spec](https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/fundamentals__fixtures/cypress/integration/load-fixtures-spec.js)

*Example: Import test data*

```js
    beforeEach(function() {
        var testDataFile = Cypress.env('ENV') + '/TestData.json'
        cy.fixture(testDataFile).then((user) => {
            this.user = user;
        })
    })
```

## Keywords
- ***Page*** is file that contains only function to manipulate each page. *(Such as input text, get text, click link, select dropdown list, get data form table, etc.)*
- ***Keywords*** is file that contains test steps and check expected result and declare it in `Cucumber` format.

## Test cases
Use Cucumber feature file to implement readable test cases.

*Example: Test case*

```Cucmber
Feature: Test Login
    @e2e-test
    Scenario: Log in success - String Input
        Given Go to login page
        When Login with username password 'tomsmith' 'SuperSecretPassword!'
        Then Verify login success
        When Click Logout link
        Then Verify logout success
```

# 3. Naming
### Package names
Use *`lowercase`* for folder name. They should short and also should be descriptive.

        - cypress
            - cypress
                - fixtures (Contains test data)
                - integration (Contains all test cases)
                    - testcypress
                - keywords (Contains all keywords)
                - plugins
                - configs (Contains all configs per environment)
                - support


### Filename
Use *`UpperCamelCase`* for filename including node js, feature file, config and test data. They should short and also should be descriptive.

- Use extension `.js` for NodeJS file.

    `keywords` file must end with "*Keywords.js".

    `page` file must end with "*Page.js".

        - keywords
            - features
                - LoginKeywords.js
            - pages
                - HomePage.js
                - LoginPage.js

- Use extension `.feature` for Cucumber file

        - integration
            - testcypress
                - TestLogin.feature

### Class
- Use *`UpperCamelCase`* for class names

*Example: Class*

```js
    class LoginPage {

    }
```

### Variables and Function 
- Use *`lowerCamelCase`* for variables, properties and function names

    Variables, properties and function names should use lowerCamelCase. They should short and also should be descriptive.. Single character variables and uncommon abbreviations should generally be avoided.

*Example: Variables*

```js
    var testDataFile = Cypress.env('ENV') + '/test_data.json';
```

*Example: Function*

```js
    static clickLoginBtn() {
        cy.get(LOGIN_BTN).click();
    }
```

### Enum names
- Use *`UpperCamelCase`* for Enum names

*Example: Class*

```js
    var Enum = require('enum');
```

### Constants
- Use *`CAPS_SNAKE_CASE`* for Constants

*Example: Constants*

```js
    const USERNAME_TXT = '[id=username]';
    const PASSWORD_TXT = '[id=password]';
    const LOGIN_BTN = '[id=login] button';
    const MESSAGE_LBL = '[id=flash]';
```

### Keywords and Test cases
*`Keywords`* should describe what is step does, not how does its task.

*Example: Keywords*

```js
    when("Login with correct username password", function () {
        inputUsernamePasswordAndClickLoginButton(this.user.correct_data.username,
        this.user.correct_data.password);
    });

    then("Verify login success", () => {
        HomePage.getMessageFromMessageLabel().
        should('contain',MESSAGE_LOGIN_SUCCESS);
    });
```

*`Test cases`* should start with test cases ID and put test case name following text after test case ID.

*Example: Test cases*

```Feature
    Scenario: TC_EWC_00002 Log in success - String Input
    ...

    Scenario: TC_EWC_00003 Log in success - Specific keywords
    ...

    Scenario: TC_EWC_00004 Log in failed - Wrong Username
    ...

    Scenario: TC_EWC_00005 Log in failed - Wrong Password
    ...
```

---

# 4. Formatting
## Formatter
Use ES Lint for auto suggest and auto format file.

## Indentation
Use 2 spaces for indenting your code and swear an oath to never mix tabs and spaces

## Newlines
Use UNIX-style newlines (\n), and a newline character as the last character of a file. Windows-style newlines (\r\n) are forbidden inside any repository.

## File encoding: UTF-8
Source files are encoded in UTF-8

## Characters per line
A line should not contain more than 80 characters

## Line-wrapping
There is no comprehensive, deterministic formula showing exactly how to line-wrap in every situation.

## Horizontal Whitespace
No trailing spaces are allowed

## Comments
- Comment Keywords (Comment) and '#' are both allowed
- Comment should be the description of the overall logic that the following keywords are doing

## Semicolons
Semicolons is required by Google ES lint javascript code style guide

## Curly braces
Curly braces belong on the same line as the thing that necessitates them.

*Example: Curly braces*

```js
    if (true) {
        console.log(‘winning’)
    }

    while (foo) {
        console.log(‘winning’)
    }

    if (true) {
        console.log(‘winning’);
    } else if (false) {
        console.log(‘this is good’);
    } else {
        console.log(‘finally’);
    }
```

## Quotes
Use single quotes for strings except to avoid escaping.

---

# 5. Practices
## Selecting Element
**Best Practice:** Use `data-*` attributes to provide context to your selectors and isolate them from CSS or JS changes.

- Don’t target elements based on CSS attributes such as: `id`, `class`, `tag`
- Don’t target elements that may change their textContent
- Add `data-*` attributes to make it easier to target elements

| Selector | Recommended | Notes |
| -------- | :---------- | ----- |
| `cy.get('button').click()` | Never | Worst - too generic, no context. |
| `cy.contains('Submit').click()` | Never | Bad. Still coupled to text content that may change. |
| `cy.get('.btn.btn-large').click()` | Never | Bad. Coupled to styling. Highly subject to change. |
| `cy.get('[name=submission]').click()` | Sparingly | Coupled to the name attribute which has HTML semantics. |
| `cy.get('#main').click()` | Depends | Better. But still coupled to styling or JS event listeners. |
| `cy.get('[data-cy=submit]').click()` | Always | Best. Isolated from all changes. |

## Assigning Return Values
**Best Practice:** Use closures to access and store what Commands yield you.

You rarely have to ever use `const`, `let`, or `var` in Cypress. If you’re using them, you will want to do some refactoring.

If you’re familiar with Cypress commands already, but find yourself using `const`, `let`, or `var` then you’re typically trying to do one of two things:

- You’re trying to store and compare values such as text, classes, attributes.
- You’re trying to share values between tests and hooks like `before` and `beforeEach`.

*`Bad example`*

```js
    // DONT DO THIS. IT DOES NOT WORK
    // THE WAY YOU THINK IT DOES.
    const a = cy.get('a')

    cy.visit('https://example.cypress.io')

    // nope, fails
    a.first().click()
```

*`Good example`*

```js
    cy.visit('https://example.cypress.io')

    cy.get('a').click()
```

## Don't visiting external sites
**Best Practice:** Only test what you control. Try to avoid requiring a 3rd party server. When necessary, always use cy.request() to talk to 3rd party servers via their APIs.

Try to take control of your application’s state.

## Test should be independent
**Best Practice:** Tests should always be able to be run independently from one another and still pass. Initialization using before or beforeEach and after.

## Do not need to creating “tiny” tests with a single assertion
**Best Practice:** Add multiple assertions and don’t worry about it

## Don't use waiting or sleep
**Best Practice:** Use route aliases or assertions to guard Cypress from proceeding until an explicit condition is met.

Waiting for cypress command `cy.request()`, `cy.visit()` and `cy.get()` are unnecessary because those command will wait ultil receives a response or automatically retries.

## Test cases
- Test steps are understandable.
- Select suitable abstraction level.
- Put tag in test cases.

---

# 6. Page object locator variable pattern
| Locator       | Abbreviation | Example         |
| --------------|--------------|-----------------|
| Text box      | TXT          | USERNAME_TXT    |
| Text area     | TXA          | DESCRIPTION_TXA |
| Button        | BTN          | SUBMIT_BTN      |
| Label         | LBL          | USER_ID_LBL     |
| Dropdown list | DDL          | PROVINCE_DDL    |
| Image         | IMG          | PROFILE_IMG     |
| Link          | LNK          | LOGOUT_LNK      |
| Table         | TBL          | USER_LIST_TBL   |

---

## Reference
- Cypress best practices. [Link](https://docs.cypress.io/guides/references/best-practices.html)
- Node.js Coding Style Guidelines. [Link](https://medium.com/swlh/node-js-coding-style-guidelines-74a20d00c40b)
- npm-coding-style. [Link](https://docs.npmjs.com/misc/coding-style)
- Cypress Document. [Link](https://docs.cypress.io/guides/overview/why-cypress.html)
- Cucumber. [Link](https://cucumber.io/docs/cucumber/)