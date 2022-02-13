import React, {useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert, Modal } from 'react-native';
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
import { changeCurrentChar, selectCurrentChar } from './CharManagementSlice';


export const saveCharacter = async ({char, fileName}) => {
  
  try {
    const jsonValue = JSON.stringify(char) 
    if(fileName != null){
       await AsyncStorage.setItem(fileName , jsonValue)
    }
  } catch (e) {
    console.log('error', e)
  } 
  
}

const AlertWithPrompt = ({title, color='#111', onPress}) => {

  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState(false);
  const [tinput, setTinput] = useState({})
  const [newCharName, setNewCharName] = useState('')

  return(
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView} >
          <Text>Make new Character</Text>
          <Text>All unsaved progress will be lost</Text>
          <TextInput 
            style={{...tinput, fontSize:16, borderBottomWidth:1, width:250, margin:10 }} 
            value={newCharName} onChangeText={(e) => setNewCharName(e)}
            onFocus={()=> setTinput({...tinput, borderWidth:1, borderRadius:5})}
            onBlur={()=> setTinput({...tinput, borderBottomWidth:1})}
          />

          <View style={{flexDirection:'row' }}>
            <Button color={color} onPress={() => setModalVisible(false)} title={'Cancel'}></Button>
            <Button color={color} onPress={() => {onPress(); setModalVisible(false); dispatch(changeCurrentChar({value:newCharName})) }} title={'OK'}></Button>
          </View>
          
        </View>
      </Modal>
      <Button title={title} color={color} onPress={() => setModalVisible(!modalVisible)}>New Character</Button>
    </View>
  )
}

export function CharManagement ({navigation}){
  
  
  const char = useSelector(selectChar)
  const currentChar = useSelector(selectCurrentChar)
  const dispatch=useDispatch()

  const getCharList = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
      setData(keys)
    } catch(e) {
      console.log(e)
    }
    return keys
  }

  const [data, setData] = useState(['empty'])
  const [selectedChar, setSelectedChar] = useState('') 

    useEffect(()=>{
      getCharList()
    },[])

    

    const loadCharacter = async ({char}) => {   
      
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

    const newCharacter = async (char) => {   

      let character = {}    
      character = newCharacterTemplate
    
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
        { text: "OK", onPress: ()=>{
          dispatch(changeCurrentChar({value:selectedChar}))
          loadCharacter({char:selectedChar})
          navigation.navigate('Sheet')
        } }
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
        { text: "OK", onPress: () => { 
          saveCharacter({char:char, fileName:currentChar})
          getCharList()
          
        }}
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
        { text: "OK", onPress: async () => {
          saveCharacter({char:newCharacterTemplate, fileName:currentChar})
          newCharacter()
          // console.log(s, 'saved')          
          getCharList()
          
          navigation.navigate('Sheet')
        }}
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
      <View style={{flexDirection:'row', margin:10, padding:5, elevation:5, shadowColor:'#000'}}>
        <Text style={{fontSize:18}}>Currently playing with:</Text>
        <Text style={{fontSize:18, fontWeight:'bold', textAlign:'center'}}>{currentChar}</Text>
      </View>
        <AlertWithPrompt title={'new'} color={'#111'} onPress={ onMakeNewCharacterClick}/>
        <Button title={'save'} color={'#111'} onPress={onSaveCharacterClick}/>
        <Button title={'load'} color={'#111'} onPress={onLoadCharacterClick}/>
        <Button title={'remove'} color={'#111'} onPress={onRemoveCharacterClick}/>
    </View>
  )
}

const styles = StyleSheet.create({
  modalView: {
    marginVertical: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

})

