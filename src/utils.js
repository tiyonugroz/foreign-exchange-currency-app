import checkPropTypes from 'check-prop-types';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';
import { middlewares } from './../src/createStore';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export const thousands_separators = (num) => {
	const num_parts = num.toString().split(".");
	num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	return num_parts.join(".");
}

export const validateInput = (data) => {
	let errors = {};

	if (Validator.isEmpty(data.amount)) {
    errors.amount = 'Please fill your amount';
	} else if (!Validator.isNumeric(data.amount)) {
    errors.amount = 'Your amount is invalid';
	}
	
  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export const findByTestAtrr = (component, attr) => {
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
};

export const checkProps = (component, expectedProps) => {
    const propsErr = checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
    return propsErr;
};

export const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
    return createStoreWithMiddleware(rootReducer, initialState);
};