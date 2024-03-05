import { BackHandler } from "react-native";
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from "expo-navigation-bar";
import * as Location from 'expo-location';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { DataTable } from 'react-native-paper';
import { ScrollView } from "react-native-web";
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import searchCities from "./components/helper";
import { storage } from "./components/storage";

export default function Search() {
  const [input, setInput] = useState("");

  const [oldList, setOldList] = useState([]);

  useEffect(() => {
    storage
      .load({
        key: 'city',
        autsoSync: true,
        syncInBackground: true,
        syncParams: {
          extraFetchOptions: {
            // blahblah
          },
          someFlag: true
        }
      })
      .then(ret => {
        setOldList(ret.Name.oldList);
      })

      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
    
    }, []);

    const [seeResult, setSeeResult] = useState();

    const request = async () => {const url = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=' + input + '&days=3';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3c9510ca70mshf8fe7463f988101p197cb5jsn5804d7f8fa69',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};
try {
	const response = await fetch(url, options);
	const result = await response.json();
  setSeeResult(result.location.name);
} catch (error) {
}
}

  function Save(){
    request();
  }

  useEffect(() => {
    if(seeResult!=undefined){
      oldList.push(seeResult);
      storage.save({
        key: 'city', // Note: Do not use underscore("_") in key!
        data: {
          Name: {oldList},
        },
        expires: null
      });
    };
    //navigation.navigate("Gps");
    }, [seeResult]);

  return (
    <View>
      <TextInput
        placeholder="Enter city name eg: Chen"
        onChangeText={newText => setInput(newText)}
        value={input}
        style={{
          width: 400,
          height: 40,
          borderColor: "black",
          borderWidth: 1
        }}
      />
      <TouchableOpacity onPress={Save}><Text>Save</Text></TouchableOpacity>
      </View>
  );
}