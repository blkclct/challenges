import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';
import { Button } from '../components/Atoms/button/index'
import { Text } from '../components/Atoms/typography/text'
import { HeadLine } from '../components/Atoms/typography/head-line'

import { summaryDonations } from '../helpers';


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
      };
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
      const buttonText = 'Pay';
      const cards = this.state.charities.map(function(item, i) {
        const payments = [10, 20, 50, 100, 500].map((amount, j) => (
          <label key={j}>
            <input
              type="radio"
              name="payment"
              onClick={function() {
                self.setState({ selectedAmount: amount })
              }} /> {amount}
          </label>
        ));

        return (
          <Card key={i}>
            <Text 
              bold={true}
              color={'Primary'}
              fontSize={'Small'}
            >
              {item.name}
            </Text>
            {payments}
            <Button
              buttonText={buttonText}
              callHandlePay={handlePay.call(self, item.id, self.state.selectedAmount, item.currency)}
            />
          </Card>
        );
      });

      const donate = this.props.donate;
      const message = this.props.message;
      const mainTitle = 'Omise Tamboon React';

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
