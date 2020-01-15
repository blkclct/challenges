import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';
import { summaryDonations } from '../utils/utils';
import { Button } from '../components/Atoms/button/index';
import { Text } from '../components/Atoms/typography/text';
import { HeadLine } from '../components/Atoms/typography/head-line';
import { DonatePayment } from '../components/Molecules/payment/donatePayment';
import  { DonateStatus } from '../components/Organisms/donate/donateStatus';

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  text-align: center;
  margin: 0 auto;
`

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin: 50px auto 0 auto;
  padding: 0px 30px;
`

const Card = styled.div`
  width: 50%;
  max-width: 540px;
  max-height: 540px;
  margin-bottom: 50px;
  border: 1px solid #ccc;
  border-radius: 5%;
  box-shadow: rgba(0, 0, 0, 0.25) 2px 2px 10px;
`;

const PaymentStatus = styled.div`
  width: 540px;
  max-width: 100%;
  height: 420px;
  max-height: 100%;
`

const PaymentInnerStatus = styled.div`
  padding: 20px;
  margin: 0 auto;
`

const PaymentCloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
`

const PaymentInnerBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 80px;
  margin: 0 auto;
`

const PaymentInnerText = styled.div`
  margin: 20px 0;
`

const DonatePaymentBox = styled.div`
  margin-bottom: 20px;
`

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
              <DonateStatus
                donationName={item.name}
                buttonText={buttonTextDonate}
                setDonateStatus={self.setDonateStatus}
              />
            ) : (
              <Fragment>
                <PaymentStatus>
                  <PaymentInnerStatus>
                    <PaymentCloseButton>×</PaymentCloseButton>
                    <PaymentInnerBox>
                      <PaymentInnerText>Select the amount to donate (THB)</PaymentInnerText>
                      <DonatePaymentBox>
                        {donateFee.map((amount, j) => (
                          <DonatePayment
                            key={j}
                            amount={amount}
                            setDonateAmount={self.setDonateAmount}
                          />
                        ))}
                      </DonatePaymentBox>
                      <Button
                        buttonText={buttonTextPay}
                        callHandlePay={handlePay.call(self, item.id, self.state.selectedAmount, item.currency)}
                      />
                    </PaymentInnerBox>
                  </PaymentInnerStatus>
                </PaymentStatus>
              </Fragment>
            )}
          </Card>
        );
      });

      return (
        <Container>
          <HeadLine text={mainTitle} format={'First'} />
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
          <CardContainer>
            {cards}
          </CardContainer>
        </Container>
      );
    }
  }
);

function handlePay(id, amount, currency) {
  const self = this;
  return function() {
    fetch('http://localhost:3001/payments', {
      method: 'POST',
      headers: { 'Content-type' : 'application/json' },
      body: `{
        "charitiesId": ${id}, "amount": ${amount}, "currency": "${currency}"
      }`,
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
