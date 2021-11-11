import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, ScrollView, SafeAreaView } from 'react-native';
import dndPic from './assets/dndPic.png'
import { DescriptionView } from './components/DescriptionsView';
import {StatsTable} from './components/StatsTable'
import { SavesTable } from './components/SavesTable';
import { ResourcesTable } from './components/ResourcesTable';
import { SkillsTable } from './components/SkillsTable';


export default function App() {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar style="auto" />
          <Image source={dndPic} style={styles.dndPic} />
          <DescriptionView />
          <ResourcesTable />        
          <StatsTable />
          <SavesTable />        
          <SkillsTable />
      </ScrollView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    height:3000,
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
