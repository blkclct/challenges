import React, { Fragment } from 'react';
import { Button } from '../../Atoms/button/index';
import { Text } from '../../Atoms/typography/text';
import styled from 'styled-components';

const backgroundImageType = backgroundImage => {
  switch (backgroundImage) {
    case 'Baan Kru Noi':
      return 'background: url(http://0.0.0.0:3000/images/baan-kru-noi.jpg) no-repeat;';
    case 'Habitat for Humanity Thailand':
      return 'background: url(http://0.0.0.0:3000/images/habitat-for-humanity-thailand.jpg) no-repeat;';
    case 'Paper Ranger':
      return 'background: url(http://0.0.0.0:3000/images/paper-ranger.jpg) no-repeat;';
    case 'Makhampom Theater':
      return 'background: url(http://0.0.0.0:3000/images/makhampom-theater.jpg) no-repeat;';
    case 'Thailand Association of the Blind':
      return 'background: url(http://0.0.0.0:3000/images/thailand-association-of-the-blind.jpg) no-repeat;';
    default:
      return null;
  }
};

const DonateBox = styled.div`
  ${({ backgroundImage }) => backgroundImageType(backgroundImage)};
  background-size: contain;
  padding-top: 350px;
  width: 100%;
  height: 100%;
  border-top-left-radius: 5%;
  border-top-right-radius: 5%;
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
      <DonateBox backgroundImage={props.donationName}>
        <DonateInnerBox>
          <Text
            bold={true}
            color={'Primary'}
            fontSize={'Small'}
          >
            {props.donationName}
          </Text>
          <Button
            buttonText={props.buttonText}
            setDonateStatus={props.setDonateStatus}
          />
        </DonateInnerBox>
      </DonateBox>
    </Fragment>
  );
}
