import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import times from 'lodash/times';
import { validateInput } from './utils';
import {
  Container,
  Header,
  Input,
  Grid,
  Divider,
  Button,
  Dropdown,
} from 'semantic-ui-react';
import {
  fetchCurrency,
  addCode,
  removeCode,
  changeCurrency
} from './actions/currency';
import GridCurrency from './components/GridCurrency';
import GridPlaceholder from './components/GridPlaceholder';

import commonCurrency from './data/Common-Currency.json';

class App extends Component {
  state = {
    data: {
      amount: '10.00',
    },
    errors: {},
    codes: ['IDR', 'EUR', 'GBP', 'SGD'],
    typingTimeout: 0,
    buttonAddMore: true,
    formAddMore: false,
    buttonSubmit: true,
    addMore: ''
  }

  componentDidMount() {
    this.props.fetchCurrency(this.state.data.amount);
  }

  isValid = () => {
    const { errors, isValid } = validateInput(this.state.data);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  };

  handleChange = (e, { name, value }) => {
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }

    let errors = Object.assign({}, this.state.errors);
    delete errors[name];
    this.setState({
      data: {
        amount: value,
      },
      errors
    },
      () => {
        this.setState({
          typingTimeout: setTimeout(() => {
            if (this.isValid()) {
              this.props.changeCurrency(value);
            }
          }, 600)
        })
      })
  }

  remove = (code) => {
    this.setState({
      codes: this.state.codes.filter(item => item !== code)
    });

    this.props.addCode(code);
  }

  handleButtonAddMore = () =>
    this.setState({
      buttonAddMore: false,
      formAddMore: true
    })

  handleChangeAddMore = (e, { name, value }) =>
    this.setState({
      [name]: value,
      buttonSubmit: false
    })

  handleSubmitAddMore = () => {
    this.setState({
      codes: [...this.state.codes, this.state.addMore],
      buttonAddMore: true,
      formAddMore: false,
      buttonSubmit: true
    });

    this.props.removeCode(this.state.addMore);
  }

  render() {
    const { currency } = this.props;
    const { codes, data, errors, buttonAddMore, formAddMore, buttonSubmit } = this.state;

    const currencyOptions = !currency.codes ? [] : currency.codes.map((item, idx) => {
      return {
        key: idx,
        value: item,
        text: `${item} - ${commonCurrency[item].name}`
      }
    })

    return (
      <div>
        <Container text>
          <Grid>
            <Grid.Row>
              <Grid.Column width={16}>
                <Header as='h3'>USD - United States Dollar</Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={3}>
                <span style={{ display: 'block', marginTop: '.5em' }}>USD</span>
              </Grid.Column>
              <Grid.Column width={13}>
                <Input
                  fluid
                  type="text"
                  name="amount"
                  placeholder="Your Amount"
                  defaultValue={data.amount}
                  onChange={this.handleChange}
                  error={!!errors.amount}
                />
                {errors.amount && <span style={{ color: "#ae5856" }}>{errors.amount}</span>}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>

        <Divider />

        {
          currency.rates ? (
            <Container text>
              {
                codes.map((item, i) => (
                  <GridCurrency remove={this.remove} code={item} key={i} />
                ))
              }
              {
                currency.codes.length > 0 ? (
                  <Grid>
                    {
                      buttonAddMore && (
                        <Grid.Row>
                          <Grid.Column width={16}>
                            <Button
                              fluid
                              size='large'
                              color='green'
                              onClick={this.handleButtonAddMore}
                            >
                              + Add More Currencies
                            </Button>
                          </Grid.Column>
                        </Grid.Row>
                      )
                    }
                    {
                      formAddMore && (
                        <Grid.Row>
                          <Grid.Column width={13}>
                            <Dropdown
                              name='addMore'
                              placeholder='Select Currency'
                              fluid
                              search
                              selection
                              options={currencyOptions}
                              onChange={this.handleChangeAddMore}
                            />
                          </Grid.Column>
                          <Grid.Column width={3}>
                            <Button
                              fluid
                              size='large'
                              color='blue'
                              onClick={this.handleSubmitAddMore}
                              disabled={buttonSubmit}
                            >
                              Submit
                            </Button>
                          </Grid.Column>
                        </Grid.Row>
                      )
                    }
                  </Grid>
                ) : (
                    <Divider horizontal style={{ marginTop: '3em' }}>
                      <h3>
                        You have done.{' '}
                        <span role="img" aria-label="party popper">
                          🎉
                      </span>
                      </h3>
                    </Divider>
                  )
              }
            </Container>
          ) : (
            <Container text>
              {
                times(codes.length, i => (
                  <GridPlaceholder key={i} />
                ))
              }
            </Container>
          )
        }
      </div>
    );
  }
}

App.propTypes = {
  fetchCurrency: PropTypes.func.isRequired,
  changeCurrency: PropTypes.func.isRequired,
  addCode: PropTypes.func.isRequired,
  removeCode: PropTypes.func.isRequired,
  currency: PropTypes.shape({
    codes: PropTypes.arrayOf(PropTypes.string.isRequired),
    rates: PropTypes.shape(PropTypes.number.isRequired),
  }).isRequired,
};

const mapState = state => ({
  currency: state.currency,
});

const mapDispatch = {
  fetchCurrency,
  changeCurrency,
  addCode,
  removeCode,
};

export default connect(mapState, mapDispatch)(App);
