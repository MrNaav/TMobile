import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 10,
    marginVertical: 5,
    width: 300,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
  },
  Button: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    color: 'black',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

const ExtraPage = ({ navigation }) => {
  const [characters, setCharacters] = useState([]);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get(
        'https://rickandmortyapi.com/api/character'
      );
      setCharacters(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const navigateHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <FlatList
          data={characters}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text>{item.name}</Text>
            </View>
          )}
        />
        <TouchableOpacity onPress={navigateHome} style={styles.Button}>
          <Text>Voltar para a tela Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ExtraPage;