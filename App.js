import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList,TouchableOpacity, Button, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BlockRGB from "./components/BlockRGB";

const screenWidth = Dimensions.get("window").width;
const num = 6;
const tileSize = screenWidth / num;
console.log(tileSize)
console.log(tileSize)
function HomeScreen({navigation}) {
 const [colorArray, setColorArray] = useState([0]);

useEffect(() => {
  navigation.setOptions({
    headerRight: () => <Button onPress={resetColor} title="Reset color" />,
  });
});

useEffect(() => {
  navigation.setOptions({
    headerLeft: () => <Button onPress={addColor} title="Add color" />,
  });
});

function renderItem({ item }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Details", item)}>
      <BlockRGB red={item.red} green={item.green} blue={item.blue} />
    </TouchableOpacity>
  );
}

function addColor() {
  setColorArray([
    ...colorArray,
    {
      red: Math.floor(Math.random() * 256),
      green: Math.floor(Math.random() * 256),
      blue: Math.floor(Math.random() * 256),
      id: colorArray.length.toString(),
    },
  ]);
}

function resetColor() {
  setColorArray([]);
}

return (
  <View style={styles.container}>
    {/* <TouchableOpacity
      style={{ height: 40, justifyContent: "center" }}
      onPress={addColor}
    >
      <Text style={{ color: "red" }}>Add colour</Text>
    </TouchableOpacity> */}

    {/* <TouchableOpacity
      style={{ height: 40, justifyContent: "center" }}
      onPress={resetColor}
    >
      <Text style={{ color: "blue" }}>Reset colour</Text>
    </TouchableOpacity> */}

    <FlatList style={styles.list} data={colorArray} renderItem={renderItem} numColumns={num}/>
  </View>
);
}

function DetailsScreen({route}){
  console.log(route);
  const { red, green, blue } = route.params;
  return (
    <View style={{backgroundColor: `rgb(${red}, ${green}, ${blue})`, flex:1, justifyContent: 'center',alignItems: 'center'}}>
      <Text style={styles.text}>red: {red}</Text>
      <Text style={styles.text}>green: {green}</Text>
      <Text style={styles.text}>blue: {blue}</Text>
    </View>
  )
}

const Stack = createStackNavigator()

export default function App() {
 return (
   <NavigationContainer>
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
       <Stack.Screen name="Colour List" component={HomeScreen} />
       <Stack.Screen name="Details" component={DetailsScreen} />
     </Stack.Navigator>
   </NavigationContainer>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#fff",
   alignItems: "center",
 },
 list: {
   width: "100%",
 },
 text: {
  color: 'white',
  fontSize: 20,
},
});
