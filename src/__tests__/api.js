import fetchMock from 'fetch-mock';
import responseObject from '../responseObject';
import * as api from '../api';

it('should sort array by name', () => {
  const sortedArr = [
    { key: "AUD", value: 1.5316 },
    { key: "BGN", value: 1.9558 },
    { key: "BRL", value: 3.9196 },
    { key: "CAD", value: 1.5028 },
    { key: "CHF", value: 1.1772 },
  ]
  const unsortedArr = [
    { key: "CHF", value: 1.1772 },
    { key: "BGN", value: 1.9558 },
    { key: "AUD", value: 1.5316 },
    { key: "CAD", value: 1.5028 },
    { key: "BRL", value: 3.9196 },
  ]
  expect(api.sortArrayByName(unsortedArr)).toEqual(sortedArr);
})

it('should sort array by value', () => {
  const sortedArr = [
    { key: "CHF", value: 1.1772 },
    { key: "CAD", value: 1.5028 },
    { key: "AUD", value: 1.5316 },
    { key: "BGN", value: 1.9558 },
    { key: "BRL", value: 3.9196 },
  ]
  const unsortedArr = [
    { key: "CHF", value: 1.1772 },
    { key: "BGN", value: 1.9558 },
    { key: "AUD", value: 1.5316 },
    { key: "CAD", value: 1.5028 },
    { key: "BRL", value: 3.9196 },
  ]
  expect(api.sortArrayByValue(unsortedArr)).toEqual(sortedArr);
})

it('should call api with no values', async () => {
  fetchMock.get('https://api.fixer.io/latest?base=EUR', responseObject);
  const result = await api.loadRates();
  expect(result).toEqual(responseObject);
});