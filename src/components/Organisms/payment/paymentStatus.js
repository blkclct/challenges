import React, { Fragment } from 'react';
import { Button } from '../../Atoms/button/index';
import { DonatePayment } from '../../Molecules/payment/donatePayment';
import styled from 'styled-components';

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

export const PayStatus = props => {
  return (
    <Fragment>
      <PaymentStatus>
        <PaymentInnerStatus>
          <PaymentCloseButton>×</PaymentCloseButton>
          <PaymentInnerBox>
            <PaymentInnerText>Select the amount to donate (THB)</PaymentInnerText>
            <DonatePaymentBox>
              {props.donateFee.map((amount, j) => (
                <DonatePayment
                  key={j}
                  amount={amount}
                  setDonateAmount={props.setDonateAmount}
                />
              ))}
            </DonatePaymentBox>
            <Button
              buttonText={props.buttonText}
              callHandlePay={props.callHandlePay}
            />
          </PaymentInnerBox>
        </PaymentInnerStatus>
      </PaymentStatus>
    </Fragment>
  );
}
