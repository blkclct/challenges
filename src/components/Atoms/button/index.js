import React, { Fragment } from 'react';
import styled from 'styled-components';

const CommonButton = styled.button`
  cursor: pointer;
  padding: 3px 6px;
  border: 1px solid #046ad9;
  border-radius: 5%;
  background-color: #fff;
  color: #046ad9;
  font-weight: 600;
  line-height: 1.5;
`;

const DecideButton = props => {
  switch (props.buttonText) {
    case 'Pay':
      return <CommonButton onClick={() => props.callHandlePay()}>{props.buttonText}</CommonButton>;
    case 'Donate':
      return <CommonButton onClick={() => props.setDonateStatus()}>{props.buttonText}</CommonButton>;
    default:
      return null;
  }
}

export const Button = props => {
  return (
    <Fragment>
      {DecideButton(props)}
    </Fragment>
  );
}
