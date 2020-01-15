import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';
import { summaryDonations } from '../utils/utils';
import { handlePay } from '../api/index';
import { Text } from '../components/Atoms/typography/text';
import { HeadLine } from '../components/Atoms/typography/head-line';
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
  @media (max-width: 1194px) {
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
  }
`

const Card = styled.div`
  width: 50%;
  max-width: 540px;
  max-height: 540px;
  margin-bottom: 50px;
  border: 1px solid #ccc;
  border-radius: 5%;
  box-shadow: rgba(0, 0, 0, 0.25) 2px 2px 10px;
  @media (max-width: 1194px) {
    width: 100%;
  }
`;

export default connect((state) => state)(
  class App extends Component {
    constructor(props) {
      super();

      this.state = {
        charities: [],
        selectedAmount: 10,
        selectedDonate: null,
      };
      this.setDonateAmount = this.setDonateAmount.bind(this);
      this.setDonateStatus = this.setDonateStatus.bind(this);
    }

    setDonateAmount(amount) {
      this.setState({
        selectedAmount: amount,
      });
    }

    setDonateStatus(id) {
      this.setState({
        selectedDonate: id,
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
      const buttonTextClose = '×';
      const donateFee = [10, 20, 50, 100, 500];
      const donate = this.props.donate;
      const message = this.props.message;
      const currency = 'THB';
      const mainTitle = 'Omise Tamboon React';
      const cards = this.state.charities.map(function(item, i) {
        return (
          <Card key={i}>
            <DonateStatus
              indexNumber={i}
              selectedDonate={self.state.selectedDonate}
              donationId={item.id}
              donationName={item.name}
              buttonTextDonate={buttonTextDonate}
              buttonTextClose={buttonTextClose}
              buttonTextPay={buttonTextPay}
              setDonateStatus={self.setDonateStatus}
              donateFee={donateFee}
              setDonateAmount={self.setDonateAmount}
              callHandlePay={handlePay.call(self, item.id, self.state.selectedAmount, item.currency)}
            />
          </Card>
        );
      });

      return (
        <Container>
          <HeadLine text={mainTitle} format={'First'} />
          <Text bold={true} color={'Primary'} fontSize={'Medium'}>
            All donations: {donate} {currency}
          </Text>
          <Text bold={true} color={'Alert'} fontSize={'Medium'}>
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
