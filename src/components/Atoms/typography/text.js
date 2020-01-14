import React from 'react';
import styled from 'styled-components';

const CommonText = styled.div`
  font-weight: ${ props => props.bold ? 600 : 300 };
`

export const Text = props => {
  return <CommonText bold={props.bold}>{props.text}</CommonText>;
}
