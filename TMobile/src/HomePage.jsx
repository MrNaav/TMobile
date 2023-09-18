import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, View, TouchableOpacity, Button } from "react-native";
import { Text } from "react-native";

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
  extraButton: {
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

const HomePage = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  const fetchItensData = useCallback(async () => {
    try {
      const response = await axios.get(
        'https://rickandmortyapi.com/api/character'
      );
  
      setItems(response.data.results);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const browseDetails = (item) => {
    console.log(item.id);
    navigation.navigate('Detalhes', { id: item.id });
  };

  const navigateToPageExtra = () => {
    navigation.navigate('PageExtra');
  };

  useEffect(() => {
    fetchItensData();
  }, [page]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => browseDetails(item)}>
        <View style={styles.container}>
          <Text style={styles.item}>
            Nome: {item.name}
          </Text>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.item}>
            Espécie: {item.species}
          </Text>
          <Text style={styles.item}>
            Status: {item.status}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={() => {
      }}
    />
      <Button title = "Ir para a Página Extra sobre Gatos" onPress = {navigateToPageExtra} />
    </SafeAreaView>
  );
};

export default HomePage;