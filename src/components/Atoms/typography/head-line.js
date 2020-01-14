import React, { Fragment } from 'react';
import styled from 'styled-components';

const HeadLineFirst = styled.h1`
  color: #e4e4e5;
`

const HeadLineSecond = styled.h2`
  color: #e4e4e5;
`

const DecideHeadLine = props => {
  switch (props.format) {
    case 'First':
      return <HeadLineFirst>{props.text}</HeadLineFirst>
    case 'Second':
      return <HeadLineSecond>{props.text}</HeadLineSecond>
    default:
      return null;
  }
}

export const HeadLine = props => {
  return (
    <Fragment>
      {DecideHeadLine(props)}
    </Fragment>
  );
}
