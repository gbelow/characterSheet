import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, Image, ScrollView, SafeAreaView, Button } from 'react-native';
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
import {CharManagement} from './components/CharManagement/CharManagement';
import { Provider, useSelector } from 'react-redux';
import store from './app/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { selectCurrentChar } from './components/CharManagement/CharManagementSlice';

const tabs = {description: DescriptionView, Combat: ResourcesTable, stats: StatsTable, 
  saves: SavesTable, gear: GearView, skills: SkillsTable, items: ItemsTable, feats: FeatsView, spells: SpellsView}

const Navigation = ({selectedTab, setSelected=()=>null}) => {
  return(
    <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:'space-evenly', borderWidth:1 }}>
      {
        Object.keys(tabs).map(el => (
          <View key={el} style={{width:'30%', marginVertical:5}}>
            <Button  color={selectedTab == el ? '#800' : '#111'} title={el} onPress={() => setSelected(el)} />
          </View>
          ))
      }
      
    </View>
  )
} 

const HomeScreen = ({navigation}) => {
  return(
    <View style={{flexDirection:'column', marginVertical:30, alignItems:'center'}}>
      <Image source={dndPic} style={styles.dndPic} />   
      <CharManagement  navigation={navigation} />     
      
    </View>
  )
}

const SheetScreen = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('description')
  const SelectedTab = tabs[selectedTab]

  return(
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        {/* <StatusBar style="auto" /> */}
        <View style={{flexDirection:'column', marginVertical:10, alignItems:'center'}}>
          <Text style={{fontWeight:'bold', fontSize:22}}>{useSelector(selectCurrentChar)}</Text>
          <Navigation selectedTab={selectedTab} setSelected={setSelectedTab} />    
        </View>
        <SelectedTab />
      </ScrollView> 
    </SafeAreaView>
  )
  
}

export default function App() { 
  
  const Stack = createNativeStackNavigator()

  return (
    <Provider store={store}>      
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
          name={'Home'}
          component={HomeScreen}
          />
          <Stack.Screen 
            name={'Sheet'}
            component={SheetScreen}
            options={({navigation, route})=> ({
              headerTitle: props => {
                const cchar = useSelector(selectCurrentChar)
                return(
                  <Text style={{fontWeight:'bold'}}>{cchar}'s Character Sheet</Text>
                )
              },
            })}
          />          
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}



const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#fff',
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
