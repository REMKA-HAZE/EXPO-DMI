import styled from "styled-components/native";

const StyledView = styled.View`
    flex: 1;
    align-items: center;
    align-content: center;
    justify-content: center;
`
const Header = styled.Text`
align-self: center;
    color: black;
    font-size: 22px;
`
const InfoContainer = styled.View`
    flex: 1;
    align-content: center;
    justify-content: center;
`
const AccountImage = styled.Image`
    height: 300px;
    width: 300px;
    border-radius: 200px;
    align-self: center;
    margin: 20px;
`

export { StyledView, Header, InfoContainer, AccountImage }