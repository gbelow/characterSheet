import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, Image, ScrollView, SafeAreaView } from 'react-native';
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
import { Provider } from 'react-redux';
import store from './app/store';



export default function App() {
  console.log('app')
  return (
    <Provider store={store}>      
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
          <StatusBar style="auto" />
          <View style={{flexDirection:'row', marginVertical:30}}>
            <Image source={dndPic} style={styles.dndPic} />   
            <CharManagement />         
          </View>
            <DescriptionView />
            <ResourcesTable  />
            <StatsTable />
            <SavesTable />        
            <GearView />
            <SkillsTable />
            <ItemsTable />
            <FeatsView />
            <SpellsView />
        </ScrollView> 
      </SafeAreaView>
    </Provider>
  );
}



const styles = StyleSheet.create({
  container: {
    height:6300,
    backgroundColor: '#fff',
    paddingLeft:10,
    paddingRight:10,
    alignItems: 'center',
    marginTop: 40, 
  },
  dndPic:{
    width:250,
    height:100,
  },
  

});
