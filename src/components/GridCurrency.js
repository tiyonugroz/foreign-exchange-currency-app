import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { thousands_separators } from '../utils';
import {
	Item,
	Header,
	Grid,
	Button,
} from 'semantic-ui-react';

import commonCurrency from '../data/Common-Currency.json';

class GridCurrency extends Component {

	handleRemove = (code) => {
		this.props.remove(code);
	}

	render() {
		const { code, currency } = this.props;

		return (
			<Grid celled data-test="currencyComponent">
				<Grid.Row>
					<Grid.Column width={13}>
						<Item.Group>
							<Item>
								<Item.Content>
									<Item.Extra>
										<Header as='h3' floated="left">{code}</Header>
										<Header as='h3' floated="right">{thousands_separators((currency.rates[code] * currency.amount).toFixed(4))}</Header>
									</Item.Extra>
									<Item.Description>
										<em>{`${code} - ${commonCurrency[code].name}`}</em>
									</Item.Description>
									<Item.Description>
										<em>{`1 USD = ${code} ${thousands_separators((currency.rates[code] * 1).toFixed(4))}`}</em>
									</Item.Description>
								</Item.Content>
							</Item>
						</Item.Group>
					</Grid.Column>
					<Grid.Column width={3}>
						<Button
							style={{ marginTop: '2em' }}
							fluid
							size='large'
							color='red'
							onClick={() => this.handleRemove(code)}
						>
							-
            </Button>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

GridCurrency.propTypes = {
	code: PropTypes.string.isRequired,
	currency: PropTypes.shape({
		amount: PropTypes.string.isRequired,
		codes: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
		rates: PropTypes.shape(PropTypes.number.isRequired).isRequired,
	}).isRequired,
	remove: PropTypes.func.isRequired,
};

const mapState = state => ({
	currency: state.currency,
});

export default connect(mapState)(GridCurrency);