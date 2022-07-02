import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList,TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BlockRGB from "./components/BlockRGB";

function HomeScreen() {
 const [colorArray, setColorArray] = useState([0]);

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
    <TouchableOpacity
      style={{ height: 40, justifyContent: "center" }}
      onPress={addColor}
    >
      <Text style={{ color: "red" }}>Add colour</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{ height: 40, justifyContent: "center" }}
      onPress={resetColor}
    >
      <Text style={{ color: "blue" }}>Reset colour</Text>
    </TouchableOpacity>

    <FlatList style={styles.list} data={colorArray} renderItem={renderItem} />
  </View>
);

 function renderItem({ item }) {
   return <BlockRGB red={item.red} green={item.green} blue={item.blue} />;
 }
}

const Stack = createStackNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen name="Colour List" component={HomeScreen} />
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
   width: "30%",
 },
});
