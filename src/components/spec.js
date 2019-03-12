import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr, checkProps } from '../utils';
import GridPlaceholder from './GridPlaceholder';
import GridCurrency from './GridCurrency';

describe('Grid Placeholder Component', () => {
	describe('Component Renders', () => {
		let wrapper;
		beforeEach(() => {
			wrapper = shallow(<GridPlaceholder />);
		});

		it('Should renders without error', () => {
			const component = findByTestAtrr(wrapper, 'placeholderComponent');
			expect(component.length).toBe(1);
		});
	});
});


describe('Grid Currency Component', () => {
	describe('Checking PropTypes', () => {
		it('Should NOT throw a warning', () => {
			const expectedProps = {
				code: 'test1',
				currency: {
					amount: '10.00',
					codes: ['test1', 'test2', 'test3'],
					rates: {
						test1: 10,
						test2: 20,
						test3: 30
					}
				},
				remove: () => {

				}
			};
			const propsError = checkProps(GridCurrency, expectedProps);
			expect(propsError).toBeUndefined();
		});
	});
});