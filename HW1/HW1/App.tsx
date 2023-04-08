// Import all components to be used
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Button } from 'react-native';

function FirstApp() {
  // Define all required state variables
  const [item, setItem] = useState('');
  const [itemList, setItemList] = useState([]);

  // Function to handle event when user clicks on ADD ITEM button
  const handleAddItem = () => {
    setItemList([...itemList, item]);
    setItem('');
  };

  // Function to handle event when user clicks on REMOVE ITEM button
  const handleRemoveItem = (index) => {
    const newItems = [...itemList];
    newItems.splice(index, 1);
    setItemList(newItems);
  };

  // Function to handle event when user enters text
  const handleInputChange = (text) => {
    setItem(text);
  };

  // Function to render each list item
  const renderItem = ({ item, index }) => (
    <View key={index} style={styles.row}>
      <Text style={styles.item}>{item}</Text>
      <Button title="Remove Item" onPress={() => handleRemoveItem(index)} />
    </View>
  );

  // Styles for all components
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'lightblue',
      padding: 10,
      flex: 1,
      paddingTop: 20,
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    text: {
      fontSize: 16,
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: 'gray',
      paddingHorizontal: 10,
      marginVertical: 10,
    },
    item: {
      margin: 10,
      fontSize: 18,
      height: 40,
    },
    count: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center',
      padding: 10,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hello! My name is Adithya Gowda Baragur</Text>
      <Text style={styles.text}>Here is my HW1 App!</Text>
      <View style={styles.container}>
      <FlatList
        data={itemList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

    </View>
      <TextInput
        style={styles.input}
        value={item}
        onChangeText={handleInputChange}
        placeholder="Enter your Item Name"
      />
      <Button
          title="Add Item"
          onPress={handleAddItem} />
      <Text style={styles.count}>
        Count of Total Items: {itemList.length}
      </Text>
    </View>

  );
}

export default FirstApp;
