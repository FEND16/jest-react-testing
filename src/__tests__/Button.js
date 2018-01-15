import React from 'react';
import toJSON from 'enzyme-to-json';
import { mount, render, shallow } from 'enzyme';
import Button from '../components/Button';

jest.useFakeTimers();

it('should expect timeout to have been called', () => {
  const wrapper = shallow(<Button onClick={() => {}} />);
  wrapper.find('[data-test="button"]').simulate('click');
  expect(setTimeout).toHaveBeenCalledTimes(1);
  jest.runAllTimers();
  expect(wrapper.state().disabled).toBe(false);
});

it('button state should be enabled from start', () => {
  const wrapper = mount(<Button onClick={() => {}} />);
  expect(wrapper.state().disabled).toBe(false);
})

it('button state should be disabled on click, check state', () => {
  const wrapper = mount(<Button onClick={() => {}} />);
  expect(wrapper.state().disabled).toBe(false);
  wrapper.find('[data-test="button"]').simulate('click');
  expect(wrapper.state().disabled).toBe(true);
})

it('button style should be disabled on click, check style', () => {
  const wrapper = mount(<Button onClick={() => {}} />);
  expect(wrapper.find('[data-test="button"]')
    .hasClass('cursor-not-allowed'))
    .toEqual(false);
  wrapper.find('[data-test="button"]').simulate('click');
  expect(wrapper.find('[data-test="button"]')
    .hasClass('cursor-not-allowed'))
    .toEqual(true);
})

/**
 * Snapshot testing is good for smaller components and 
 * making sure the correct styling or class is applied
 * but we have to check the snapshots manually.
 */
it('should match snapshot', () => {
  const wrapper = render(<Button onClick={()=>{}} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
})

it('button state should be disabled on click, check state', () => {
  const wrapper = shallow(<Button onClick={() => {}} />);
  expect(toJSON(wrapper)).toMatchSnapshot("1. before click");  
  wrapper.find('[data-test="button"]').simulate('click');
  expect(toJSON(wrapper)).toMatchSnapshot("2. after click");  
});