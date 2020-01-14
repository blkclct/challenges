import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';
import { Button } from '../components/Atoms/button/index';
import { Text } from '../components/Atoms/typography/text';
import { HeadLine } from '../components/Atoms/typography/head-line';
import { DonatePayment } from '../components/Molecules/payment/donatePayment';

const Card = styled.div`
  margin: 10px;
  border: 1px solid #ccc;
`;

export default connect((state) => state)(
  class App extends Component {
    constructor(props) {
      super();

      this.state = {
        charities: [],
        selectedAmount: 10,
        selectedDonate: false,
      };

      this.setDonateAmount = this.setDonateAmount.bind(this);
      this.setDonateStatus = this.setDonateStatus.bind(this);
    }

    setDonateAmount(amount) {
      this.setState({
        selectedAmount: amount,
      });
    }

    setDonateStatus() {
      this.setState({
        selectedDonate: true,
      });
    }

    componentDidMount() {
      const self = this;
      fetch('http://localhost:3001/charities')
        .then(function(resp) { return resp.json(); })
        .then(function(data) {
          self.setState({ charities: data }) });

      fetch('http://localhost:3001/payments')
        .then(function(resp) { return resp.json() })
        .then(function(data) {
          self.props.dispatch({
            type: 'UPDATE_TOTAL_DONATE',
            amount: summaryDonations(data.map((item) => (item.amount))),
          });
        })
    }

    render() {
      const self = this;
      const buttonTextPay = 'Pay';
      const buttonTextDonate = 'Donate';
      const donateFee = [10, 20, 50, 100, 500];
      const donate = this.props.donate;
      const message = this.props.message;
      const mainTitle = 'Omise Tamboon React';
      const cards = this.state.charities.map(function(item, i) {
        return (
          <Card key={i}>
            {!self.state.selectedDonate ? (
              <Fragment>
                <Text
                  bold={true}
                  color={'Primary'}
                  fontSize={'Small'}
                >
                  {item.name}
                </Text>
                <Button
                  buttonText={buttonTextDonate}
                  setDonateStatus={self.setDonateStatus}
                />
              </Fragment>
            ) : (
              <Fragment>
                <p>Select the amount to donate (THB)</p>
                {donateFee.map((amount, j) => (
                  <DonatePayment
                    key={j}
                    amount={amount}
                    setDonateAmount={self.setDonateAmount}
                  />
                ))}
                <Button
                  buttonText={buttonTextPay}
                  callHandlePay={handlePay.call(self, item.id, self.state.selectedAmount, item.currency)}
                />
              </Fragment>
            )}
          </Card>
        );
      });

      return (
        <div>
          <HeadLine
            text={mainTitle}
            format={'First'}
          />
          <Text
            bold={true}
            color={'Primary'}
            fontSize={'Medium'}
          >
            All donations: {donate}
          </Text>
          <Text
            bold={true}
            color={'Alert'}
            fontSize={'Medium'}
          >
            {message}
          </Text>
          {cards}
        </div>
      );
    }
  }
);

function handlePay(id, amount, currency) {
  const self = this;
  return function() {
    fetch('http://localhost:3001/payments', {
      method: 'POST',
      body: `{ "charitiesId": ${id}, "amount": ${amount}, "currency": "${currency}" }`,
    })
      .then(function(resp) { return resp.json(); })
      .then(function() {
        self.props.dispatch({
          type: 'UPDATE_TOTAL_DONATE',
          amount,
        });
        self.props.dispatch({
          type: 'UPDATE_MESSAGE',
          message: `Thanks for donate ${amount}!`,
        });

        setTimeout(function() {
          self.props.dispatch({
            type: 'UPDATE_MESSAGE',
            message: '',
          });
        }, 2000);
      });
  }
}
