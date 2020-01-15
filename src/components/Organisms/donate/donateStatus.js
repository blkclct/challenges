import React, { Fragment } from 'react';
import { Button } from '../../Atoms/button/index';
import { Text } from '../../Atoms/typography/text';
import { PayStatus } from '../../Organisms/payment/paymentStatus';
import styled from 'styled-components';

const backgroundImageType = backgroundImage => {
  switch (backgroundImage) {
    case 1:
      return 'background: url(http://0.0.0.0:3000/images/baan-kru-noi.jpg) no-repeat top center;';
    case 2:
      return 'background: url(http://0.0.0.0:3000/images/habitat-for-humanity-thailand.jpg) no-repeat top center;';
    case 3:
      return 'background: url(http://0.0.0.0:3000/images/paper-ranger.jpg) no-repeat top center;';
    case 4:
      return 'background: url(http://0.0.0.0:3000/images/makhampom-theater.jpg) no-repeat top center;';
    case 5:
      return 'background: url(http://0.0.0.0:3000/images/thailand-association-of-the-blind.jpg) no-repeat top center;';
    default:
      return null;
  }
};

const DonateBox = styled.div`
  ${({ backgroundImage }) => backgroundImageType(backgroundImage)};
  background-size: 540px 300px;
  padding-top: 300px;
  width: 100%;
  height: 100%;
  border-top-left-radius: 3%;
  border-top-right-radius: 3%;
`

const DonateInnerBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  padding: 0 30px;
  margin: 0 auto;
`

export const DonateStatus = props => {
  return (
    <Fragment>
      {!(props.selectedDonate === (props.indexNumber + 1)) ? (
        <DonateBox backgroundImage={props.donationId}>
          <DonateInnerBox>
            <Text
              bold={true}
              color={'Primary'}
              fontSize={'Small'}
            >
              {props.donationName}
            </Text>
            <Button
              buttonText={props.buttonTextDonate}
              setDonateStatus={props.setDonateStatus}
              donationId={props.donationId}
            />
          </DonateInnerBox>
        </DonateBox>
      ) : (
        <PayStatus
          donateFee={props.donateFee}
          setDonateAmount={props.setDonateAmount}
          buttonTextPay={props.buttonTextPay}
          buttonTextClose={props.buttonTextClose}
          callHandlePay={props.callHandlePay}
          setDonateStatus={props.setDonateStatus}
          donationId={props.donationId}
        />
      )}
    </Fragment>
  );
}
