import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  margin: 0;
`

const Radio = styled.input`
  border: 4px solid #046ad9;
  background-color: #fff;
  width: 16px;
  height: 16px;
  border-radius: 50%;
`;

export const DonatePayment = props => {
  return (
    <Label>
      <Radio
        type="radio"
        name="payment"
        onClick={() => {
          props.setDonateAmount(props.amount);
        }} /> {props.amount}
    </Label>
  );
}
