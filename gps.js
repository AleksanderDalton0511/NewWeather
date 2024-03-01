import { BackHandler } from "react-native";
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from "expo-navigation-bar";
import * as Location from 'expo-location';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { DataTable } from 'react-native-paper';
import { FlatList, ScrollView } from "react-native-web";
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import { storage } from "./components/storage";
import { useNavigation, useIsFocused } from '@react-navigation/native';

export default function Gps() {

  const navigation = useNavigation();
  
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

  const [results, setResults] = useState("");
  const [results2, setResults2] = useState("");
  const [condition, setCondition] = useState("");
  const [current, setCurrent] = useState("");
  const [city, setCity] = useState("");

  const [usePosition, setLocation] = useState("");

useEffect(() => {
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
  })();
}, []);

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
      setRead(true);
  }
  }
  req();

  const [visualList, setVisualList] = useState();

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
        setVisualList(ret.Name.oldList.map(person => ({ location: person })));
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

    const [ready, setReady] = useState();

    useEffect(() => {
      if(ready!=undefined){
        storage.save({
          key: 'tab', // Note: Do not use underscore("_") in key!
          data: {
            Name: {ready},
          },
          expires: null
        })
        navigation.navigate("Tab");
      }
      }, [ready]);

  return(
    <View>

      <DataTable>

      <DataTable.Row> 
        <DataTable.Cell><Text>{city}</Text></DataTable.Cell> 
      </DataTable.Row>

      <DataTable.Row> 
        <DataTable.Cell><Text>{current.temp_c}°</Text></DataTable.Cell> 
      </DataTable.Row>
      
      <DataTable.Row> 
        <DataTable.Cell><Text>{condition.text}</Text></DataTable.Cell> 
        <DataTable.Cell><Image source = {{uri:'https:' + condition.icon, width: 45, height: 45}}/></DataTable.Cell> 
      </DataTable.Row>

      <DataTable.Row> 
        <DataTable.Cell><Text>MAX: {results2}</Text></DataTable.Cell> 
        <DataTable.Cell><Text>MIN: {results}</Text></DataTable.Cell> 
      </DataTable.Row>

      <DataTable.Row> 
      <FlatList 
         data={visualList}
         renderItem={({item}) => <TouchableOpacity onPress={() => setReady(item)}><Text>{item.location}</Text></TouchableOpacity> }
         keyExtractor={(item) => item}
      />
      </DataTable.Row>

      </DataTable> 

      </View>
  )
}