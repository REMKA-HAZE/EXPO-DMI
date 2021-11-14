import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  TaskList,
  Card,
  Task,
  TaskStatusButton,
  DeleteButton,
  AddButtonContainer,
  AddButton,
  Input
} from "./Home.styles";
import { View } from "react-native";

const Home = () => {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      name: "Hacer la tarea fthhhhhhh",
      completed: false,
    },
    {
      id: "2",
      name: "Hacer la cama",
      completed: true,
    },
    {
      id: "3",
      name: "Hacer comida",
      completed: false,
    },
    {
      id: "4",
      name: "Hacer ejercicio",
      completed: true,
    },
    {
      id: "15",
      name: "Hacer la tarea fthhhhhhh",
      completed: false,
    },
    {
      id: "6",
      name: "Hacer la cama",
      completed: true,
    },
    {
      id: "7",
      name: "Hacer comida",
      completed: false,
    },
    {
      id: "8",
      name: "Hacer ejercicio",
      completed: true,
    },
    {
      id: "9",
      name: "Hacer la tarea fthhhhhhh",
      completed: false,
    },
    {
      id: "10",
      name: "Hacer la cama",
      completed: true,
    },
  ]);

  return (
    <>
      <Container>
        {tasks.length > 0 ? (
          <TaskList
            data={tasks}
            numColumns={1}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <Card>
                  {item.completed === false ? (
                    <TaskStatusButton>
                      <Ionicons
                        name="ellipse-outline"
                        size={30}
                        color="black"
                      />
                    </TaskStatusButton>
                  ) : (
                    <TaskStatusButton>
                      <Ionicons
                        name="checkmark-circle"
                        size={30}
                        color="#1b7500"
                      />
                    </TaskStatusButton>
                  )}
                  <Task>{item.name}</Task>
                  <DeleteButton>
                    <Ionicons name="trash" size={25} color="red" />
                  </DeleteButton>
                </Card>
              );
            }}
          />
        ) : (
          <Label>No tasks found :(</Label>
        )}
      </Container>
      <AddButtonContainer
        behavior={Platform.OS === "ios" ? "padding" : ""}
      >
        <Input
          type="text"
          placeholder="New task"
        // value={inputValue}
        // onChangeText={(text) => setInputValue(text)}
        />
        <AddButton>
          <Ionicons name="add-circle" size={40} color="black" />
        </AddButton>
      </AddButtonContainer>
    </>
  );
};

export default Home;
