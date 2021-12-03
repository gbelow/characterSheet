import React, {useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { useDispatch, useSelector } from 'react-redux';
import newCharacterTemplate from '../CharManagement/NewCharacterTemplate';
import { loadDescription, selectChar } from '../Description/DescriptionSlice';
import { loadFeats } from '../Feats/FeatsSlice';
import { loadGear } from '../Gear/GearSlice';
import { loadItems } from '../Items/ItemsSlice';
import { loadSaves } from '../Saves/SavesSlice';
import { loadSkills } from '../Skills/SkillsSlice';
import { loadSpells } from '../Spells/SpellsSlice';
import { loadStats } from '../Stats/StatsSlice';
import { loadResources } from '../Resources/ResourcesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function CharManagement (){
  
  const dispatch = useDispatch()
  const char = useSelector(selectChar)

  const getCharList = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
      setData(keys)
    } catch(e) {
      console.log('error2')
    }
    return keys
  }

  const [data, setData] = useState(['empty'])
  const [selectedChar, setSelectedChar] = useState('') 

    useEffect(()=>{
      getCharList()
    })

  const loadCharacter = async (char) => {   
    let character = {}
    try {
      character = JSON.parse(await AsyncStorage.getItem(char))      
    } catch(e) {
      console.log(e)
      return 'err'
    }    
    dispatch(loadDescription(character.description))
    dispatch(loadFeats(character.feats))
    dispatch(loadGear(character.gear))
    dispatch(loadItems(character.items))
    dispatch(loadSaves(character.saves))
    dispatch(loadSkills(character.skills))
    dispatch(loadSpells(character.spells))
    dispatch(loadStats(character.stats))
    dispatch(loadResources(character.resources))
    
  }
  
  

  const removeValue = async (char) => {
    try {
      await AsyncStorage.removeItem(char)
    } catch(e) {
      // remove error
    }
    getCharList()
    console.log('Done.')
  }  

  const saveCharacter = async () => {
    
    try {
      const jsonValue = JSON.stringify(char) 
      if(char.description.CHAR_NAME != null){
        await AsyncStorage.setItem(char.description.CHAR_NAME , jsonValue)
      }
    } catch (e) {
      console.log('error')
    }
    getCharList()
  }

  const onRemoveCharacterClick = () => {
    Alert.alert(
      "Delete Character",
      "This will delete the selected character",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => removeValue(selectedChar) }
      ]
    );
  }

  const onLoadCharacterClick = () => {
    Alert.alert(
      "Load Character",
      "All unsaved progress will be lost",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: ()=>loadCharacter(selectedChar) }
      ]
    );
  }

  const onSaveCharacterClick = () =>{
    Alert.alert(
      "Save Character",
      "Save character",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: saveCharacter}
      ]
    );
  }

  const onMakeNewCharacterClick = () => {
    Alert.alert(
      "New Character",
      "All unsaved progress will be lost",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => loadCharacter(newCharacterTemplate)}
      ]
    );
  }

  return(
    <View>
      <SelectDropdown 
          buttonStyle={{borderWidth:1, marginHorizontal:5, marginVertical:10}} 
          buttonTextStyle={{fontSize:12}} data={data}
          defaultButtonText={selectedChar}
          onSelect={(e)=>{setSelectedChar(e)}}
        />
        <Button title={'new'} color={'#222'} onPress={onMakeNewCharacterClick}/>
        <Button title={'save'} color={'#222'} onPress={onSaveCharacterClick}/>
        <Button title={'load'} color={'#222'} onPress={onLoadCharacterClick}/>
        <Button title={'remove'} color={'#222'} onPress={onRemoveCharacterClick}/>
    </View>
  )
}