export const CURRENCY_FETCHED = 'CURRENCY_FETCHED';
export const CURRENCY_CHANGED = 'CURRENCY_CHANGED';
export const CODE_ADDED = 'CODE_ADDED';
export const CODE_REMOVED = 'CODE_REMOVED';

export function currencyFetched(data) {
  return {
    type: CURRENCY_FETCHED,
    payload: data,
  }
}

export function currencyChanged(data) {
  return {
    type: CURRENCY_CHANGED,
    payload: data,
  }
}

export function addCode(code) {
  return {
    type: CODE_ADDED,
    payload: code,
  }
}

export function removeCode(code) {
  return {
    type: CODE_REMOVED,
    payload: code,
  }
}

export function fetchCurrency(amount) {
  return dispatch => {
    fetch('https://api.exchangeratesapi.io/latest?base=USD')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          let codes = [];
          for (const key in data.rates) {
            if (key !== 'USD' && key !== 'IDR' && key !== 'EUR' && key !== 'GBP' && key !== 'SGD') {
              codes.push(key)
            }
          }

          const currency = {
            amount,
            codes,
            rates: data.rates
          }

          dispatch(currencyFetched(currency));
        } else {
          alert(data.error);
        }
      });
  }
}

export function changeCurrency(amount) {
  return dispatch => {
    fetch('https://api.exchangeratesapi.io/latest?base=USD')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          const currency = {
            amount,
            rates: data.rates
          }

          dispatch(currencyChanged(currency));
        } else {
          alert(data.error);
        }
      });
  }
}
