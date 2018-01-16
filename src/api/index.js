export const URL = `https://api.fixer.io`;

/**
 * Loads the currency rates from the API and 
 * returns it in json-format as a promise
 * @param {String} date from which date
 * @param {String} base in what currency
 * @returns {Promise}
 */
export function loadRates(date = 'latest', base = "EUR") {
  return fetch(`${URL}/${date}?base=${base}`).then(data => data.json());
};

/**
 * Takes an object and returns an array of
 * objects with the structure: { key: '', value: ''}
 * @param {Object} obj object to convert
 * @returns {Array} 
 */
export function mapObjectToArray(rates){
  if(typeof rates !== 'object'){
    throw new Error("Not an object");
  }
  return Object.entries(rates)
    .map(entry => Object.assign({ value: entry[1]}, { key: entry[0] }));
}

export function sortArrayByName(arrayToSort){
  return arrayToSort.sort((a,b) => a.key > b.key);
}

export function sortArrayByValue(arrayToSort){
  return arrayToSort.sort((a,b) => a.value > b.value);
}