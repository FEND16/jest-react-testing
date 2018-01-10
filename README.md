# jest-react-testing

>Example app built with [`create-react-app`](https://github.com/facebookincubator/create-react-app) for integration and snapshot testing. The app fetches currency rates from [**fixer.io**](http://fixer.io/) and displays it in a list. It also has an update button that can be tested separately. **CSS-framework is [Tailwind](https://tailwindcss.com/)**

The project is already set up with all packages to test react components: [**`enzyme`**](http://airbnb.io/enzyme/docs/api/), `enzyme-adapter-react-16`, `react-test-renderer` and `enzyme-to-json` for snapshot testing. You can read more about setting it up here: [**Running test @ create-react-app**](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests)


## Installation

_with npm_
```bash
git clone https://github.com/FEND16/jest-react-testing.git
cd jest-react-testing
npm install
```
_with yarn_
```bash
git clone https://github.com/FEND16/jest-react-testing.git
cd jest-react-testing
yarn
```

## Running tests

Project has a few test already that are mostly integration tests and [`snapshot`](https://facebook.github.io/jest/docs/en/snapshot-testing.html) tests. All tests should pass when you run the test command.

```bash
yarn test
```
```bash
npm test
```

## ESLint

Running ESLint

```bash
./node_modules/.bin/eslint
```

Running from global eslint

```bash
npm i -g eslint
```

```bash
eslint .eslintrc
```

### ESLint editor integrations

If you want `.eslintrc` to be detected by your editor you need to install plugin/extensions for your editor.

* https://eslint.org/docs/user-guide/integrations

## Exercise 1

Test the following scenarios:

* The list of rates is **not** being populated
* An error message is being displayed when fetch catches an error
* _Updated_ should display yesterdays date or current date.
* Test the functions in `api/index.js`
  * `loadRates()` should return json when called with proper url
  * `loadRates()` should throw or return error when called without url
  * `mapObjectToArray()` should convert object to array
  * `mapObjectToArray()` should fail when called with anything but an object
  * Other scenarions that might occur when calling these functions, error messages etc.
* 

## Exercise 2

Right now the rates are returned with the base **EUR**. The API allows you to fetch data with another base or from a specific date:

* [https://api.fixer.io/latest?base=SEK](https://api.fixer.io/latest?base=SEK)
  * Fetches the data with Swedish Krona as the base for the rates
* [https://api.fixer.io/2007-01-027](https://api.fixer.io/2007-01-27)
  * Gets data from a specific date, in this case 2007-01-27

You can change this by providing props to `<App />`

```jsx
//index.js
ReactDOM.render(<App base="SEK" date="2007-01-27" />, mountPoint);
```

Or you can change the `this.state.date` and `this.state.base` in `<App />` and call `updateRates()` and new data will be fetched.

1. Change the props or state so the applications fetches a different date with still the same currency and that it fetches a different currency than EUR. Write tests that assert that the data is correctly fetches and correctly show in the DOM. This should be multiple tests. Divide it into smaller parts, think unit tests.

If you want to group tests together in the same test file you can use `describe()`:

```js
describe('async tests', () => {
    it('should test async call', () => {
        expect(true).toBe(true);
    });  
});

describe('button tests', () => {
    it('should call button', () => {
        expect(true).toBe(true);
    });  
});
```

## Exercise 3

1. Create an input field that filters the array in the state so you can search for a specific currency. Alternativly create a button or a checkbox that sorts the list based on highest/lowest value or based on the currencies name.
2. Unit/integration test this functionality. Test for example that the list is shorter when searching and that the input value is being updated on search (state is being updated as well). Assert that some change is happening. Below is some helper code that demonstrates how to simulate an `onChange`-event and how to get and set the value of an input field with `enzyme`.

```jsx
const wrapper = mount(<App />);
//Simulates an onchange event
wrapper.find('input').simulate('change', { target: { value: 'new value' } });
//Sets the value directly
wrapper.find('input').node.value = 'new value';
//Logs the value of an input field
console.log(wrapper.find('input').node.value);
```