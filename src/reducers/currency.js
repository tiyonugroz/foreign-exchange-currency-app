import { 
  CURRENCY_FETCHED, 
  CURRENCY_CHANGED,
  CODE_ADDED,
  CODE_REMOVED
} from '../actions/currency';

export default function currency(state = {}, action) {
  switch (action.type) {
    case CURRENCY_FETCHED:
      return action.payload
    
    case CURRENCY_CHANGED:
      return {
        ...state,
        amount: action.payload.amount,
        rates: action.payload.rates
      }
    
    case CODE_ADDED:
      return {
        ...state,
        codes: [...state.codes, action.payload]
      }

    case CODE_REMOVED:
      return {
        ...state,
        codes: state.codes.filter(item => item !== action.payload)
      }

    default:
      return state;
  }
}
