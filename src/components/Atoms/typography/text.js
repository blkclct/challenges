import React from 'react';
import styled from 'styled-components';

const handleColorType = color => {
  switch (color) {
    case 'Primary':
      return 'color: #003070e;';
    case 'Alert':
      return 'color: red';
    default:
      return null;
  }
};

const handleFontSizeType = fontSize => {
  switch (fontSize) {
    case 'Small':
      return 'font-size: 14px;';
    case 'Medium':
      return 'font-size: 16px;';
    default:
      return null;
  }
}

const CommonText = styled.div`
  font-weight: ${ props => props.bold ? 600 : 300 };
  ${({ color }) => handleColorType(color)};
  ${({ fontSize }) => handleFontSizeType(fontSize)};

`

export const Text = ({
  children,
  bold = false,
  color = 'Primary',
  fontSize = 'Medium',
}) => {
  return (
    <CommonText
      bold={bold}
      color={color}
      fontSize={fontSize}
    >
      {children}
    </CommonText>
  );
}
