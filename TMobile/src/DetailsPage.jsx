import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, View, TouchableOpacity, Button, ScrollView, Text } from "react-native";
import axios from "axios";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0000CD",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  item: {
    backgroundColor: "black",
    color: "white",
    fontWeight: 'bold',
    fontStyle: 'italic',
    padding: 10,
    marginVertical: 5,
    width: 300,
    alignItems: 'center',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  button: {
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

const DetailsPage = ({ route, navigation }) => {
  const { id } = route.params;
  const [DetailsItem, setItemDetails] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const { data } = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        setItemDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItemDetails();
  }, [id]);

  const navigateHome = () => {
    navigation.navigate('HomePage');
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {DetailsItem && (
            <>
              <View>
                <Text style={styles.item}>
                  Nome: {DetailsItem.name}
                </Text>
                <Image
                  source={{ uri: DetailsItem.image }}
                  style={styles.image}
                />
                <Text style={styles.item}>
                  Status: {DetailsItem.status}
                </Text>
                <Text style={styles.item}>
                  Espécie: {DetailsItem.species}
                </Text>
                <Text style={styles.item}>
                  Gênero: {DetailsItem.gender}
                </Text>
                <Text style={styles.item}>
                  Localização: {DetailsItem.location && DetailsItem.location.name}
                </Text>
                <TouchableOpacity onPress={navigateHome} style={styles.button}>
                  <Text style={{ fontWeight: 'bold', color: 'black' }}>
                    Voltar para Home
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsPage;