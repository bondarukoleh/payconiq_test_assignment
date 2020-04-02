# Payconiq test assignment
***
### Environment.
#### Node.js
You need Node.js to be installed. Version should be **not under 8**.
Checkout [Node install](https://nodejs.org/uk/download/ "https://nodejs.org/uk/download/") to install node.
To check that Node installed correctly run from your terminal:
`node --version`

***
### How to run tests?
#### Clone repository.
Run in terminal: 
`git clone https://github.com/bondarukoleh/payconiq_test_assignment.git`

#### Change directory to the cloned project directory.
Run in terminal:
`cd payconiq_test_assignment`

#### Install project dependencies.
Run in terminal:
`npm install`

#### Run the tests.
A little bit tricky, because you should provide your own GIT_TOKEN as an environment variable to have the ability to interact with git API.  
For more info about token please follow this [link](https://github.blog/2013-05-16-personal-api-tokens/ "https://github.blog/2013-05-16-personal-api-tokens/")

Please check the instructions in `start.test.sh.dist` file in project root. \
This is one of the easiest ways to pass the environment variable, plus the framework is more
prepared to run in CI/CD. \
Basically, you need to create a copy of it without .dist extension, set the GIT_TOKEN environment variable, \
make it executable, and run it in your terminal.

OR, if you don't like this way, you can modify the "test" script in `package.json` file, make it: 
```json
{
"scripts": {
    "test": "env GIT_TOKEN=YOUR_TOKEN_HERE mocha --opts ./config/mocha.opts"
  }
}
```

After environment variable is provided, run in terminal:
`./start.test.sh`
Or if you have modified package.json - `npm test`

***
### About test framework.
Test framework built with alike Page Object pattern. This means we logically group operations that we can execute by API paths.
That gives us more readable and explainable API objects we can work with. 

All logic of sending request is in `helpers/api/rest.client.js`, all response assertions are in tests.

### Possible improvements.
- Powerful logger, with depth levels, and informative error messages 
- Reporter
- Test retrier, rerunner, in case of flakiness
- JSDoc typing
- Refactoring

### About tools
**Mocha** - powerful, flexible, simple, easy-to-use test run library.
You can checkout it [here](https://mochajs.org/ "https://mochajs.org/")

**Chai**- great, wide-functional assertion library.
You can checkout it [here](https://www.chaijs.com/api/ "https://www.chaijs.com/api/")
