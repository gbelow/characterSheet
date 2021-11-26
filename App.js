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
import { ItemsTable } from './components/ItemsTable';
import { FeatsView } from './components/Feats/FeatsView';
import { SpellsView } from './components/SpellsView';
import createCharacter from './app/createCharacter';
import { Provider } from 'react-redux';
import store from './app/store';


export default function App() {

  const [character, setCharacter] = useState(createCharacter())

  return (
    <Provider store={store}>
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
          <StatusBar style="auto" />
            <Image source={dndPic} style={styles.dndPic} />
            <DescriptionView data={character.description} setData={(el) => setCharacter({...character, description: el})}/>
            <ResourcesTable  />
            <StatsTable />
            <SavesTable />        
            <GearView />
            <SkillsTable />
            {/* <ItemsTable /> */}
            {/* <FeatsView /> */}
            {/* <SpellsView /> */}
        </ScrollView> 
      </SafeAreaView>
    </Provider>
  );
}



const styles = StyleSheet.create({
  container: {
    height:6000,
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
