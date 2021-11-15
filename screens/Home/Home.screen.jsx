import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-root-toast";
import { Keyboard } from "react-native";
import {
  Container,
  TaskList,
  Card,
  Task,
  TaskStatusButton,
  DeleteButton,
  AddButtonContainer,
  AddButton,
  Input,
  Label
} from "./Home.styles";
import { colors } from "../../styles/colors.styles";
import { db } from "../../firebase";


const Home = ({ user }) => {
  const [tasks, setTasks] = useState([]);

  const [inputValue, setInputValue] = useState("");

  const saveTask = async (e) => {
    e.preventDefault();

    const newTask = await db.collection('tasks').add({
      task: inputValue,
      completed: false,
      idUser: user.uid
    })
    console.log(newTask)
    Keyboard.dismiss();

    setInputValue("");

    Toast.show("Task added!", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      containerStyle: { marginTop: 50 },
    });
  };

  const deleteTask = async (e, id) => {
    e.preventDefault();
    const deletedTask = await db.collection('tasks').doc(id).delete();

    Toast.show("Task deleted!", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      containerStyle: { marginTop: 50 },
    });
  }

  const statusTask = async (e, task, estatus) => {
    e.preventDefault();
    const updated = await db.collection('tasks').doc(task.id).set({
      task: task.task,
      completed: estatus,
      idUser: task.idUser
    });
    Toast.show(estatus ? 'Task completed!' : 'Task uncompleted!', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      containerStyle: { marginTop: 50 },
    });
  }

  useEffect(() => {
    db.collection('tasks').onSnapshot(queryOnSnapshot => {
      const tasks = queryOnSnapshot.docs.map(task => ({
        id: task.id,
        ...task.data()
      }));

      tasks.filter(task => task.idUser === user.uid);

      setTasks(tasks);
      console.log(tasks)
    })

  }, [])


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
                    <TaskStatusButton onPress={(e) => { statusTask(e, item, true) }}>
                      <Ionicons
                        name="ellipse-outline"
                        size={30}
                        color="black"
                      />
                    </TaskStatusButton>
                  ) : (
                    <TaskStatusButton onPress={(e) => { statusTask(e, item, false) }}>
                      <Ionicons
                        name="checkmark-circle"
                        size={30}
                        color={colors.success}
                      />
                    </TaskStatusButton>
                  )}
                  <Task>{item.task}</Task>
                  <DeleteButton onPress={(e) => { deleteTask(e, item.id) }}>
                    <Ionicons name="trash" size={25} color={colors.red} />
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
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />
        <AddButton onPress={saveTask} disabled={inputValue.length < 1}>
          <Ionicons name="add-circle" size={50} color={colors.success} />
        </AddButton>
      </AddButtonContainer>
    </>
  );
};

export default Home;
