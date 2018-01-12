import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJSON from 'enzyme-to-json';
import fetchMock from 'fetch-mock';
import App from '../components/App';
import responseObject from '../responseObject';
import responseObjectSEK from '../responseObjectSEK'
import { mapObjectToArray, loadRates } from '../api';

/**
 * Helper function to force all the promises to resolve.
 * Needed when we must wait for a component to load
 * data on mount. Lifecycle methods will only run
 * when we use mount, not when we use shallow or render
 */
function flushAllPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

/**
 * Restore fetchMock after each test. Cleanup duty.
 */
afterEach(() => {
  fetchMock.restore();
  fetchMock.reset();
});

/**
 * I am using a mocked copy of the response object instead of calling
 * the API. These test are only checking if the components renders as it
 * should, not checking if the API is being called. For this purpose
 * we do not need to call the API because that would require much more work
 */

it('populate list with rates', () => {
  /* Mounts the whole app */
  const rates = mapObjectToArray(responseObject.rates);
  const wrapper = shallow(<App rates={rates} />);
  const list = wrapper.find('[data-test="list"]');
  expect(list.children()).toHaveLength(31);
});

it('first rate should be AUD', () => {
  const rates = mapObjectToArray(responseObject.rates);
  const wrapper = shallow(<App rates={rates} />);
  const list = wrapper.find('[data-test="list"]');
  const firstParagraph = list.find('p').first();
  expect(firstParagraph.text()).toContain('AUD');
});

it('should be base EUR', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('h1').text()).toContain('EUR');
});

it('should match snapshot', () => {
  const rates = mapObjectToArray(responseObject.rates);
  const wrapper = render(<App rates={rates} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

/**
 * SOLUTIONS TO EXERCISES
 */

/* Just don't pass anything to the App and check if list is
 * shorter 
 */
it('list should not be populated', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('[data-test="list"]').children()).toHaveLength(0);
});

/**
 * Fake the error message, pass a failing url to the API-function
 * and expect the message to be shown
 */
it('error message displays when fetch fails', () => {
  const message = 'You failed yo!';
  fetchMock.get('https://api.fixer.io/latest?base=EUR', responseObject);
  fetchMock.get('https://api.fixer.io/fail?base=fail', { throws: { message } });
  const wrapper = mount(<App base="fail" date="fail" />);
  return flushAllPromises().then(() => {
    expect(wrapper.find('.error').text()).toEqual(message);
  });
});

/**
 * Easier to test if the message is being set in the state
 * set state and see if it is visible
 */
it('error message displays when in state', () => {
  const message = 'You failed yo!';
  const wrapper = shallow(<App />);
  wrapper.setState({ error: message });
  expect(wrapper.find('.error').text()).toEqual(message);
});

/**
 * You can either call the api or fake passing the date. If you want to
 * randomize it you can make it pass either yesterday or today by writing
 * a random function. We can check multiple scenarios inside the expect()
 */
it('should check if rates have been updated today or yesterday', () => {
  /* Helper function to left pad a date, so '9' becomes '09' */
  const pad = str => (str.length === 1 ? `0${str}` : str);
  /* Weird stuff to get today and yesterday */
  const date = new Date();
  const yearAndMonth = date.toISOString().slice(0, 8);
  const yesterday = yearAndMonth + date.getDate();
  const today = yearAndMonth + pad((date.getDate() - 1).toString());
  const wrapper = shallow(<App date={today} />);
  const updated = wrapper.find('.fixed p').text();
  expect((updated.includes(today) || updated.includes(yesterday))).toBeTruthy();
});

/**
 * API TESTING, put it in a describe block to exclude all tests with skip
 */

describe.skip('API-testing', () => {
  /* loadRates returns an object, if we turn it into a string
   * and then parse it to json again we can check if the object
   * is valid JSON. If it is not valid JSON, this action should throw
   * an error */
  it('data from api should be json', () => {
    return loadRates().then(returnData => {
      expect(() => {
        JSON.parse(JSON.stringify(returnData));
      }).not.toThrow();
    });
  });
  /**
   * The function does not throw but returns an error message when
   * called with wrong url, check for that error instead.
   */
  it('should return error when called with wrong url', () => {
    return loadRates('fail', 'fail').then(returnData => {
      expect(returnData.error).toBe('Not found');
    });
  });
});

describe('mapObjectToArray', () => {
  it('mapObjectToArray should return array', () => {
    const testObject = { AUD: 1.5, SEK: 1.6 };
    const result = mapObjectToArray(testObject);
    expect(Array.isArray(result)).toBeTruthy();
  });

  /**
   * Sorry about this one, you have to put in an if into
   * the actual function to make it throw. I did that, check in
   * `api/index.js`
   */
  it('mapObjectToArray should throw an error', () => {
    const testObject = 'hello';
    expect(() => {
      mapObjectToArray(testObject);
    }).toThrowError('Not an object');
  });
});

describe('Base and Date', () => {
  it('should render SEK', async () => {
    const wrapper = shallow(<App base="SEK" />);
    expect(wrapper.find('h1').text()).toContain('SEK');
  });

  it('should render different date', () => {
    const date = '2007-02-27';
    const wrapper = shallow(<App date={date} />);
    expect(wrapper.find('.fixed p').text()).toContain(date);
  });

  it('should fetch from api at given date and currency', () => {
    const date = '2007-02-27';
    const base = 'SEK'
    /* mock the fetch but send along a different response, I created a different
     * response object and changed the url 
     */
    fetchMock.get(`https://api.fixer.io/${date}?base=${base}`, responseObjectSEK);
    const wrapper = mount(<App base={base} date={date} />);
    return flushAllPromises()
      .then(() => {
        expect(wrapper.find('h1').text()).toContain(base);
        expect(wrapper.find('.fixed p').text()).toContain(date);
    });
  });
});

describe('Input field test', () => {
  it('should search for currency', () => {
    const search = 'BGN';
    const rates = mapObjectToArray(responseObject.rates);
    const wrapper = shallow(<App rates={rates}/>);
    wrapper.setState({ search: search });
    expect(wrapper.find(`[data-test="list"] p`).first().text()).toContain(search)
  });

  it('list should be empty when search is wrong', () => {
    const search = 'blaj';
    const rates = mapObjectToArray(responseObject.rates);
    const wrapper = shallow(<App rates={rates}/>);
    /* Change the state to simulate a search instead of simulating 
     * an onchange, see below */
    wrapper.setState({ search: search });
    expect(wrapper.find(`[data-test="list"]`).children()).toHaveLength(0);
  });

  /**
   * This one is a bit akward. The docs and API has changed a bit from
   * 2 -> 3 which makes it hard to find a good way to change the node 
   * value. It is easier to just change the state instead of doing this
   */
  it('should update search field', () => {
    //Mocking because of mount triggers componentDidMount()
    fetchMock.get('https://api.fixer.io/latest?base=EUR', responseObject);
    const rates = mapObjectToArray(responseObject.rates);
    const wrapper = mount(<App rates={rates}/>);
    expect(wrapper.find("input").instance().value).toBe('');
    //wrapper.setState({ search: 'AUD' })
    wrapper.find("input").instance().value = 'AUD';
    wrapper.find('input').simulate('change');
    expect(wrapper.find("input").instance().value).toBe('AUD');
  })
});