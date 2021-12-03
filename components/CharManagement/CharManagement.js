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
  const [data, setData] = useState(['char1', 'char2'])


  const loadCharacter = (character) => {   
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

  const getCharList = async () => {
    try {
      const value = await AsyncStorage.getItem('@test')
      if(value !== null) {
        console.log(value)
      }
    } catch(e) {
      // error reading value
    }
  }

  const saveCharacter = async () => {
    
    try {
      const jsonValue = JSON.stringify(char) 
      if(char.description.NAME != null){
        await AsyncStorage.setItem('@'+char.description.NAME, jsonValue)
      }
    } catch (e) {
      // saving error
    }
    setData(getCharList())
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
        { text: "OK", onPress: getCharList }
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
          defaultButtonText={'character'}
        />
        <Button title={'new'}  onPress={onMakeNewCharacterClick}/>
        <Button title={'save'}  onPress={onSaveCharacterClick}/>
        <Button title={'load'}  onPress={onLoadCharacterClick}/>
    </View>
  )
}