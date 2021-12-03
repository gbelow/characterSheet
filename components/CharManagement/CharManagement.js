import React, {useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { useDispatch, useSelector } from 'react-redux';
import newCharacterTemplate from '../CharManagement/NewCharacterTemplate';
import { loadCharacter } from './CharManagerSlice';

export const CharManagement = () => {

  const dispatch = useDispatch()
  const charLoader = (item) => dispatch(loadCharacter(item))
  

  const loadCharacter = () => {
    Alert.alert(
      "Load Character",
      "All unsaved progress will be lost",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => null }
      ]
    );
  }

  const getCharList = () => {

  }

  const saveCharacter = () =>{
    Alert.alert('save Button pressed')
  }

  const makeNewCharacter = () => {
    Alert.alert(
      "New Character",
      "All unsaved progress will be lost",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => charLoader(newCharacterTemplate) }
      ]
    );
  }

  return(
    <View>
      <SelectDropdown 
          buttonStyle={{borderWidth:1, marginHorizontal:5, marginVertical:10}} 
          buttonTextStyle={{fontSize:12}} data={['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Colossal']}           
          defaultButtonText={'character'}
        />
        <Button title={'new'}  onPress={makeNewCharacter}/>
        <Button title={'save'}  onPress={saveCharacter}/>
        <Button title={'load'}  onPress={loadCharacter}/>
    </View>
  )
}