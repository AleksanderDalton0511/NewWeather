import { BackHandler } from "react-native";
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from "expo-navigation-bar";
import * as Location from 'expo-location';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { DataTable } from 'react-native-paper';

export default function Gps() {
  
  const[results, setResults] = useState([]);
  const[city, setCity] = useState('');
  const[isDaily, setDaily] = useState(false);
  let margin = "20%";
const request = async () => {const url = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=' + city + '&days=3';
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
  setResults(result);
} catch (error) {
	console.error(error);
}
}

NavigationBar.setVisibilityAsync("hidden");
NavigationBar.setBehaviorAsync("overlay-swipe");

  const request2 = async () => {const url = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=' + usePosition.coords.latitude+","+usePosition.coords.longitude + '&days=3';
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
    setResults(result);
    console.log(result.location.name);
  } catch (error) {
    console.error(error);
  }
  }
  
    const [usePosition, setLocation] = useState(null);

    async function MyLocation() {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);
    };
    MyLocation();
    request2();

    /*function handleBackButtonClick() {
      setSelectedFalse();
      return true;
    }
    
    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
      };
    }, []);

  const [selected, setSelected] = useState(false);
  const [safer, setSafer] = useState(true);

  useEffect(() => {
    (async () => {
      if(safer){
      request2();
      }
      else{
        setSelected(false);
        setDaily(false);
      }
    })();
  }, [trigger]);

  let word;
  if (selected){
    if (isDaily){
      word = "TODAY";
      margin = "90%";
      }
      else{
        word = "DAILY";
      }
    try{
      const locat = <Text style={{color: "red"}}>{results.location.name}</Text>

      function setSelectedFalse(){
        setSelected(false);
        setDaily(false);
        setTrigger(false);
      }

      let data;
      if(isDaily){
        data = <DataTable style={{marginTop: "5%", backgroundColor: "#7B858D"}}>

        <DataTable.Row>
        <DataTable.Cell><Text style={{color: "white"}}>TODAY</Text></DataTable.Cell>
        <DataTable.Cell><Text style={{color: "red"}}>{results.forecast.forecastday[0].day.avgtemp_c} C</Text></DataTable.Cell>
        <Image source = {{uri:'https:' + results.forecast.forecastday[0].day.condition.icon, width: 45, height: 45}}/>
      </DataTable.Row>

      <DataTable.Row>
      <DataTable.Cell><Text style={{color: "white"}}>TOMORROW</Text></DataTable.Cell>
        <DataTable.Cell><Text style={{color: "red"}}>{results.forecast.forecastday[1].day.avgtemp_c} C</Text></DataTable.Cell>
        <Image source = {{uri:'https:' + results.forecast.forecastday[1].day.condition.icon, width: 45, height: 45}}/>
      </DataTable.Row>

      <DataTable.Row>
      <DataTable.Cell><Text style={{color: "white"}}>AFTERTOMORROW</Text></DataTable.Cell>
        <DataTable.Cell><Text style={{color: "red"}}>{results.forecast.forecastday[2].day.avgtemp_c} C</Text></DataTable.Cell>
        <Image source = {{uri:'https:' + results.forecast.forecastday[2].day.condition.icon, width: 45, height: 45}}/>
      </DataTable.Row>

      
    </DataTable>
      */
  return(
    <View><Text>results.location.name</Text></View>
  )
}