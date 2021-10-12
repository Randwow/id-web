import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Button, View, TextInput, input, TouchableOpacity, Alert  } from 'react-native';
import * as Notification from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import SearchBar from './Components/SearchBar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './Components/CameraScreen';
import myAlert from './Components/Alert';

const Main = createNativeStackNavigator();

Notification.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true
    };
  }
});

export default function App() {

  //Exectute at the launch of app for ios
  useEffect(() => {
    // Permission for iOS
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then(statusObj => {
        // Check if we already have permission
        if (statusObj.status !== "granted") {
          // If permission is not there, ask for the same
          return Permissions.askAsync(Permissions.NOTIFICATIONS)
        }
        return statusObj
      })
      .then(statusObj => {
        // If permission is still not given throw error
        if (statusObj.status !== "granted") {
          throw new Error("Permission not granted")
        }
      })
      .catch(err => {
        return null
      })
  }, [])

  useEffect(() => {
    //When app is closed
    const backgroundSubscription = Notification.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    //When the app is open
    const foregroundSubscription = Notification.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    }
  }, []);
  //=======================================================

  //Trigger Function Called by click of the button to
  //trigger notification

  //=======================================================
  const triggerNotification = () => {
    Notification.scheduleNotificationAsync({
      content: {
        title: "My First Notification",
        body: "Local Notification to be sent"
      },
      trigger: {
        seconds: 3
      }
    });
  }
  const createTwoButtonAlert = () =>
  Alert.alert(
    "Alert Title",
    "My Alert Msg",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );

  const UselessTextInput = () => {
    const [text, onChangeText] = React.useState("Useless Text");
  }  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.local} onPress={triggerNotification}>
        <Text style={styles.innerText}>Press Here</Text>
      </TouchableOpacity>
      <Button title={"Button Alert"} onPress={createTwoButtonAlert} />
      <SearchBar></SearchBar>
      <CameraScreen></CameraScreen>
    </View>
    
  )
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  innerText:{
    color:'green',
    fontSize:16,
    justifyContent:'center'
  },
  local:{
    borderRadius:10,
    top:100,
    width: 150,
    height:50,
    marginTop:15,
    backgroundColor: 'black',
    justifyContent:'center',
    alignItems: 'center'

  },
  local1:{
    borderRadius:10,
    top:75,
    width: 150,
    height:50,
    marginTop:15,
    backgroundColor: 'black',
    justifyContent:'center',
    alignItems: 'center'

  },
  input: {
    height: 60,
    width:10,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:10,
  },
});