import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  

`;
const TextInput = styled.TextInput`
  width: 100%;
  height: 40px;
  font-size: 18px;
  color: #010101;
  border-bottom-width:1px;
`;
const InputContainer = ({placeholder, value}) => {
  return (
    <Container>
      <TextInput placeholder={placeholder} value={value}  ></TextInput>
    </Container>
  );
};
export default InputContainer;