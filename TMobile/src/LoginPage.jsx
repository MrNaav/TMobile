import React, { useState, useEffect } from 'react';
import { Alert, SafeAreaView, TextInput, Text, StyleSheet, Button, Image } from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0000CD",
    color: "white",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    color: 'white',
    width: 300,
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    color: 'black',
    fontWeight: 'bold',
  },
  characterInfo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  characterImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchRandomCharacter = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        const randomCharacter = response.data.results[0];
        setCharacter(randomCharacter);
      } catch (error) {
        console.error('Erro ao buscar personagem:', error);
      }
    };

    fetchRandomCharacter();
  }, []);

  const LoginValidation = () => {
    if (email.trim() !== '' || password.trim() !== '') {
      navigation.navigate('Home');
    } else {
      Alert.alert('O preenchimento dos campos é obrigatório');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Página de login</Text>
      <TextInput
        placeholder="E-mail"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        secureTextEntry
        placeholder="Senha"
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Login" onPress={LoginValidation} style={styles.button} />
      {character && (
        <React.Fragment>
          <Text style={styles.characterInfo}>Personagem Aleatório:</Text>
          <Text style={styles.characterInfo}>{character.name}</Text>
          <Image
            source={{ uri: character.image }}
            style={styles.characterImage}
          />
        </React.Fragment>
      )}
    </SafeAreaView>
  );
};

export default LoginPage;
