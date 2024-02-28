import { BackHandler } from "react-native";
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from "expo-navigation-bar";
import * as Location from 'expo-location';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { DataTable } from 'react-native-paper';
import { ScrollView } from "react-native-web";

export default function Tab() {
  
  /*const[city, setCity] = useState('');
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
}
}*/

/*NavigationBar.setVisibilityAsync("hidden");
NavigationBar.setBehaviorAsync("overlay-swipe");*/

  const [results, setResults] = useState("");
  const [results2, setResults2] = useState("");
  const [condition, setCondition] = useState("");
  const [current, setCurrent] = useState("");
  const [city, setCity] = useState("");

  const [read, setRead] = useState(false);

async function req() {
  if(read!=true){
    const url = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=' + usePosition.coords.latitude+","+usePosition.coords.longitude + '&days=3';
      const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '3c9510ca70mshf8fe7463f988101p197cb5jsn5804d7f8fa69',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };
      const response = await fetch(url, options);
      const result = await response.json();
      setResults(result.forecast.forecastday[0].day.mintemp_c);
      setResults2(result.forecast.forecastday[0].day.maxtemp_c);
      setCondition(result.current.condition);
      setCurrent(result.current);
      setCity(result.location.name);
      console.log(result);
      setRead(true);
  }
  }
  req();

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
    <View>

      <DataTable>

      <DataTable.Row style={{borderBottomWidth: 0, marginTop: "10%"}}> 
        <DataTable.Cell><Text>{city}</Text></DataTable.Cell> 
      </DataTable.Row>

      <DataTable.Row style={{borderBottomWidth: 0, marginTop: "10%"}}> 
        <DataTable.Cell><Text>{current.temp_c}°</Text></DataTable.Cell> 
      </DataTable.Row>
      
      <DataTable.Row style={{borderBottomWidth: 0, marginTop: "10%"}}> 
        <DataTable.Cell><Text>{condition.text}</Text></DataTable.Cell> 
        <DataTable.Cell><Image source = {{uri:'https:' + condition.icon, width: 45, height: 45}}/></DataTable.Cell> 
      </DataTable.Row>

      <DataTable.Row style={{borderBottomWidth: 0, marginTop: "10%"}}> 
        <DataTable.Cell><Text>MAX: {results2}</Text></DataTable.Cell> 
        <DataTable.Cell><Text>MIN: {results}</Text></DataTable.Cell> 
      </DataTable.Row>

      </DataTable> 

      </View>
  )
}