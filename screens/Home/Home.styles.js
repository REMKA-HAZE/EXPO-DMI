import { Dimensions } from "react-native";
import styled from "styled-components/native";

let width = Dimensions.get('window').width - 20;

const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
`;

const TaskList = styled.FlatList`
    flex: 1;
`;

const Card = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: ${width};
    border-radius: 15px;
    background-color : white;
    padding: 0;
    margin: 5px;
    box-shadow: 1px 1px 2px #cfcfcf;
    text-align: justify;
`;


const TaskStatusButton = styled.TouchableOpacity`
    flex: 1;
    align-items: baseline; 
    margin-left: 10px;
`;

const DeleteButton = styled.TouchableOpacity`
    flex: 1;
    align-items: baseline; 
    margin-right: 10px;
`;

const Task = styled.Text`
    flex: 10;
    font-size: 17px;
    color: black;
    padding: 20px ;
`;
const AddButtonContainer = styled.KeyboardAvoidingView`
    background-color: white;
    flex-direction: row;
    align-items: center;
`;

const AddButton = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
`;

const Input = styled.TextInput`
    flex: 3;
    padding: 5px;
    margin: 10px;
    border-radius: 8px;
    height: 40px;
    width: 100%;
    border-width: .5px;
    border-color: #828282;
    font-size: 20px;
    box-shadow: 1px 1px 2px #cfcfcf;
  `;

export { Container, TaskList, Card, Task, TaskStatusButton, DeleteButton, AddButtonContainer, AddButton, Input }