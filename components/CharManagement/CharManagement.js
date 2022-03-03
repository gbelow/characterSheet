import React, {useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert, Modal, Pressable, ScrollView, SafeAreaView } from 'react-native';
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

const AlertWithPrompt = ({title, color='#000', onPress}) => {

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
          <View>
            <TextInput 
              style={{...tinput, fontSize:16, borderWidth:1, width:250, margin:10, borderColor:'#555', textAlign:'center' }} 
              value={newCharName} onChangeText={(e) => setNewCharName(e)}
              onFocus={()=> setTinput({...tinput, borderWidth:1, borderRadius:5})}
              onBlur={()=> setTinput({...tinput})}
              placeholder= "File Name"
            />
          </View>
          <Text>This will load a brand new character. All unsaved progress will be lost</Text>
          <View style={{flexDirection:'row' }}>
            <Button color={color} onPress={() => setModalVisible(false)} title={'Cancel'}></Button>
            <Button color={color} onPress={() => {
              if(newCharName){
                setModalVisible(false);                  
                onPress(newCharName);
              }else{
                Alert.alert("Please, choose a file name", "", [{text:'ok'}])
              }
            }} title={'OK'}></Button>
          </View>
          
        </View>
      </Modal>
      
      <Pressable 
        style={{backgroundColor:'#000', marginBottom:5, paddingVertical:10}} 
        onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={{textAlign:'center', color:'#fff'}}
            >New
          </Text>
      </Pressable>

    </View>
  )
}



export function CharManagement ({navigation}){  
  
  const char = useSelector(selectChar)
  const currentChar = useSelector(selectCurrentChar)
  const dispatch=useDispatch()
  const [data, setData] = useState([])
  const [selectedChar, setSelectedChar] = useState('') 

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

    useEffect(()=>{
      getCharList()
    },[])

    const CharListTable = () => {

      return(
        <View style={{borderWidth:3, borderColor:'#333', alignItems:'center', marginVertical:20, borderRadius:3  }}>
          <View style={{ borderBottomColor:'#333', borderBottomWidth:2, backgroundColor:'#000', width:'100%', paddingVertical:10}}>
            <Text style={{textAlign:'center', fontWeight:'bold', fontSize:20, color:'#fff'}}>Choose your character</Text>
          </View>
          <SafeAreaView style={{textAlign:'center', alignItems:'center', minHeight:50, maxHeight:250, width:300, marginTop:10  }}>
            <ScrollView style={{width:'100%'}}>
                {
                  data.length > 0 ?
                    data.map(el => 
                      <Pressable key={el} style={{paddingVertical:5, width:'100%', backgroundColor: (selectedChar == el ? '#444' : 'transparent')}} onPress={() => setSelectedChar(el)}>
                        <Text style={{textAlign:'center', }}>{el}</Text>
                      </Pressable>
                    )
                    : <Text style={{width:'100%', textAlign:'center'}}>Create your first character!</Text>
                  }

            </ScrollView>
          </SafeAreaView>
        </View>      
      )
    }

    

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
      "This will delete " + selectedChar + " . Do you really want to delete it?",
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
    // console.log(currentChar, selectedChar) b
    if(currentChar !== selectedChar){
      Alert.alert(
        "Load Character",
        "Do you want to load file " + selectedChar + "? All unsaved progress will be lost",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: ()=>{
            dispatch(changeCurrentChar({value:selectedChar}))
            loadCharacter({char:selectedChar})          
            // navigation.navigate('Sheet')
          } }
        ]
      );
    }else{
      // Alert.alert("Loading", 'Loading '+currentChar+', please wait a few seconds')
      // navigation.navigate('Sheet')
    }
    
  }

  const onSaveCharacterClick = () =>{
    Alert.alert(
      "Save Character",
      "Save " + currentChar + " under file named "+ selectedChar +"?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => { 
          saveCharacter({char:char, fileName:selectedChar})
          getCharList()
          
        }}
      ]
    );
  }

  const onMakeNewCharacterClick = (newCharName) => {
    
    
    Alert.alert(
      "New Character",
      "Create " +newCharName +"?All unsaved progress will be lost",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: async () => {
          saveCharacter({char:newCharacterTemplate, fileName:newCharName})
          newCharacter()
          dispatch(changeCurrentChar({value:newCharName}))
          // console.log(s, 'saved')          
          getCharList()
          Alert.alert("Loading", 'Loading '+newCharName+', please wait a few seconds')
          // navigation.navigate('Sheet')
        }}
      ]
    );
  }
  
  return(
    <View>
      {/* <SelectDropdown 
          buttonStyle={{borderWidth:1, marginHorizontal:5, marginVertical:10}} 
          buttonTextStyle={{fontSize:12}} data={data}
          defaultButtonText={selectedChar}
          onSelect={(e)=>{setSelectedChar(e)}}
      /> */}
      <CharListTable />
      <View style={{flexDirection:'row', margin:10, padding:5, elevation:5, shadowColor:'#000'}}>
        <Text style={{fontSize:18}}>Currently playing with:</Text>
        <Text style={{fontSize:18, fontWeight:'bold', textAlign:'center'}}>{currentChar}</Text>
      </View>
        <AlertWithPrompt title={'new'} color={'#000'} onPress={ onMakeNewCharacterClick}/>
        <Pressable style={{backgroundColor:'#000', marginBottom:5, paddingVertical:10}}  onPress={onSaveCharacterClick}><Text style={{textAlign:'center', color:'#fff'}}>Save</Text></Pressable>
        <Pressable style={{backgroundColor:'#000', marginBottom:5, paddingVertical:10}} onPress={onLoadCharacterClick}><Text style={{textAlign:'center', color:'#fff'}}>Load</Text></Pressable>
        <Pressable style={{backgroundColor:'#000', marginBottom:5, paddingVertical:10}} onPress={onRemoveCharacterClick}><Text style={{textAlign:'center', color:'#fff'}}>Delete</Text></Pressable>
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
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5
  },

})

