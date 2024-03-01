import { BackHandler } from "react-native";
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from "expo-navigation-bar";
import * as Location from 'expo-location';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { DataTable } from 'react-native-paper';
import { ScrollView } from "react-native-web";
import { storage } from "./components/storage";

export default function Tab() {

  const [results, setResults] = useState("");
  const [results2, setResults2] = useState("");
  const [condition, setCondition] = useState("");
  const [current, setCurrent] = useState("");
  const [city, setCity] = useState("");

  const [loc, setLoc] = useState("");

  useEffect(() => {
    storage
      .load({
        key: 'tab',
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
        setLoc(ret.Name.ready.location);
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

const request = async () => {const url = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=' + loc + '&days=3';
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
  setResults(result.forecast.forecastday[0].day.mintemp_c);
      setResults2(result.forecast.forecastday[0].day.maxtemp_c);
      setCondition(result.current.condition);
      setCurrent(result.current);
      setCity(result.location.name);
} catch (error) {
}
}

    request();

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