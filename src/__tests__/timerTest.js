import React from 'react';
import { shallow } from 'enzyme';
import Button from '../components/Button';

jest.useFakeTimers();

/*
 * Ensures that the timeout is being called in isolation
 */

it('should expect timeout to have been called', () => {
  const wrapper = shallow(<Button onClick={() => {}} />);
  wrapper.find('[data-test="button"]').simulate('click');
  expect(setTimeout).toHaveBeenCalledTimes(1);
  jest.runAllTimers();
  expect(wrapper.state().disabled).toBe(false);
});