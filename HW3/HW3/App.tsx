// Import all components and libraries to be used
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';

const API_KEY = ''; #Add your API key here

const WeatherApp = () => {
  // Define all required state variables
  const [weather, setWeather] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
        // Get Current Location data
        Geolocation.getCurrentPosition(
          info => {
            console.log("info");
            console.log(info);
            console.log("location");
            console.log(info.coords.latitude);
            
            // Get Weather data of Current location using API call
            (async () => {

            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${info.coords.latitude}&lon=${info.coords.longitude}&appid=${API_KEY}&units=metric`
              );
              console.log(response);
              setWeather({
                city: response.data.name,
                currentTemp: response.data.main.temp,
                condition: response.data.weather[0].description,
                minTemp: response.data.main.temp_min,
                maxTemp: response.data.main.temp_max,
              });
            }
            // If error make the variable empty 
            catch (error) {
              console.log(error);
              setWeather({});
            }
          })();

          },
          error => console.log(error)
        );
        
    
  }, []);

  // Function to handle event when user clicks on Get Weather button
  const getWeather = async () => {

    // Get Weather data of user given location using API call
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${API_KEY}&units=metric`
      );
      console.log(response);
      setWeather({
        city: response.data.name,
        currentTemp: response.data.main.temp,
        condition: response.data.weather[0].description,
        minTemp: response.data.main.temp_min,
        maxTemp: response.data.main.temp_max,
      });
    } 
    // If error make the variable empty 
    catch (error) {
      console.log(error);
      setWeather({});
    }
  };

  // Styles for all components
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      marginTop: 40,
    },
    search: {
      padding: 10,
      margin: 10,
      fontSize: 20,
      borderWidth: 1,
      borderRadius: 10,
    },
    button: {
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 40,
      borderWidth: 1,
      borderRadius: 10,
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
    },
    text_heading: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      paddingBottom: 40,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text_heading}>WEATHER DATA</Text>
      <Text style={styles.text}>CITY: {weather.city || 'N/A'}</Text>
      <Text style={styles.text}>CURRENT TEMP: {weather.currentTemp || 'N/A'}</Text>
      <Text style={styles.text}>CONDITION: {weather.condition || 'N/A'}</Text>
      <Text style={styles.text}>MIN TEMP: {weather.minTemp || 'N/A'}</Text>
      <Text style={styles.text}>MAX TEMP: {weather.maxTemp || 'N/A'}</Text>
      <TextInput
        placeholder="Enter a location"
        style={styles.search}
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
      />
      <Button title="Get Weather" style={styles.button} onPress={getWeather} />
    </View>
  );
};

export default WeatherApp;
