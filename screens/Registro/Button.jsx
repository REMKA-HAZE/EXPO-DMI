import React from 'react';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ButtonContainer = styled.TouchableOpacity`
    border-radius:7px;
    margin-top: 10px;
    width: 350px;
    height: 40px;
    padding: 10px;
    border: 2px darkorange ;
    background-color: ${props => props.bgColor};
`;

const ButtonText = styled.Text`
    font-weight:bold;
    font-size: 15px;
    color: ${props=> props.color} ;
    text-align: center;
`;

const PressableButton = ({ onPress, bgColor, title,color }) => (
    <ButtonContainer onPress={onPress} bgColor={bgColor}>
        <ButtonText color={color}>{title}</ButtonText>
    </ButtonContainer>
);

export default PressableButton;