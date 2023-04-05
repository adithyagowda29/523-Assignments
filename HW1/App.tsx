import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Button } from 'react-native';

function FirstApp() {
  const [item, setItem] = useState('');
  const [itemList, setItemList] = useState([]);

  const handleAddItem = () => {
    setItemList([...itemList, item]);
    setItem('');
  };

  const handleRemoveItem = (index) => {
    const newItems = [...itemList];
    newItems.splice(index, 1);
    setItemList(newItems);
  };

  const handleInputChange = (text) => {
    setItem(text);
  };

  const renderItem = ({ item, index }) => (
    <View key={index} style={styles.row}>
      <Text style={styles.item}>{item}</Text>
      <Button title="Remove" onPress={() => handleRemoveItem(index)} />
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'lightblue',
      padding: 10,
      flex: 1,
      paddingTop: 22,
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
        padding: 10,
        fontSize: 18,
        height: 44,
      },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hello! My name is Adithya Gowda Baragur</Text>
      <Text style={styles.text}>Welcome to EE P 523</Text>
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
        placeholder="Enter your name"
      />
      <Button
          title="Add element"
          onPress={handleAddItem} />
      <Text style={styles.count}>
        Total Items: {itemList.length}
      </Text>
    </View>
  );
}

export default FirstApp;
