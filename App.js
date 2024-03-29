import React from 'react';
import { StyleSheet, Text,  View, Image, Button,  Alert, Pressable } from 'react-native';
import dndPic from './assets/dndPic.png'
import DescriptionView from './components/Description/DescriptionsView';
import StatsTable from './components/Stats/StatsTable'
import { SavesTable } from './components/Saves/SavesTable';
import { ResourcesTable } from './components/Resources/ResourcesTable';
import { SkillsTable } from './components/Skills/SkillsTable';
import { GearView } from './components/Gear/GearView';
import { ItemsTable } from './components/Items/ItemsTable';
import { FeatsView } from './components/Feats/FeatsView';
import { SpellsView } from './components/Spells/SpellsView';
import {CharManagement, saveCharacter} from './components/CharManagement/CharManagement';
import { Provider, useSelector } from 'react-redux';
import store from './app/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { selectCurrentChar } from './components/CharManagement/CharManagementSlice';
import { createTabNavigator } from './components/Navigation/TabNavigator';
import { selectChar } from './components/Description/DescriptionSlice';


const Tab = createTabNavigator()

// const tabs = {description: DescriptionView, Combat: ResourcesTable, stats: StatsTable, 
//   saves: SavesTable, gear: GearView, skills: SkillsTable, items: ItemsTable, feats: FeatsView, spells: SpellsView}


const HomeScreen = ({navigation}) => {
  return(
    <View style={{flexDirection:'column', marginVertical:30, alignItems:'center'}}>
      <Image source={dndPic} style={styles.dndPic} />   
      <CharManagement  navigation={navigation} />     
      
    </View>
  )
}


const Navigation = () => {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Description" component={DescriptionView} />
      <Tab.Screen name="Combat" component={ResourcesTable} />
      <Tab.Screen name="Stats" component={StatsTable} />
      <Tab.Screen name="Saves" component={SavesTable} />
      <Tab.Screen name="Gear" component={GearView} />
      <Tab.Screen name="Skills" component={SkillsTable} /> 
      <Tab.Screen name="Items" component={ItemsTable} />
      <Tab.Screen name="Feats" component={FeatsView} />
      <Tab.Screen name="Spells" component={SpellsView} />
    </Tab.Navigator>
  )
} 

const SaveButton = () => {
  const fileName = useSelector(selectCurrentChar)
  const char = useSelector(selectChar)
  return(
    <Pressable
      style={{backgroundColor:'#000', color:'#fff', padding:10}}
      onPress={() => {                
        try{
          saveCharacter({char:char, fileName:fileName}) 
        }finally{
          Alert.alert('Saved!')
        }
      }}
    >
    <Text style={{color:'#fff'}}>Save</Text>
    </Pressable>
  )
}

const Header = () => {
  return(
    <View style={{marginTop:20, flexDirection:'row', paddingVertical:10, justifyContent:'space-around', alignItems:'center'}}>
      <Text style={{fontWeight:'bold', fontSize:16}}>{useSelector(selectCurrentChar)}'s Character Sheet</Text>
      <SaveButton />
    </View>
  )
}

export default function App() { 
  
  const Stack = createNativeStackNavigator()
  
  return (
    <Provider store={store}>      
      <NavigationContainer>
        <Header />
        <Navigation />
        
      </NavigationContainer>
    </Provider>
  );
}



const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#222',
    paddingLeft:10,
    paddingRight:10,
    alignItems: 'center',
    marginTop: 10, 
    paddingBottom:10,
    
  },
  dndPic:{
    width:350,
    height:130,
  },
  

});
