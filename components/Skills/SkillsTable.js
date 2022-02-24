import React, {useCallback, useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert, SafeAreaView, ScrollView } from 'react-native';
import { Cell, LargeCell } from '../CellComponents';
import { UnderlinedText, UnderlinedTextInput, TitleText } from '../TextComponents';
import SelectDropdown from 'react-native-select-dropdown'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { changeSkillItemValue, selectAllSkillKeys, selectSkillTotal, createSkillItem, selectMaxSkill, selectSkillItemValue, changeSkillItemBool, removeSkillItem } from './SkillsSlice';
import {selectStatsModifier} from '../Stats/StatsSlice';
import CheckBox from '@react-native-community/checkbox';

export function SkillsTable ({}){

  const dispatch = useDispatch()  
  
  const createItem = (name, skill)=>(e)=>dispatch(createSkillItem({itemName:name, value:skill}))

  const modifierSelector = useCallback(itemName => useSelector(selectStatsModifier(itemName)), [])
  const setter =  useCallback( (itemName)=> valueName=> (e)=>dispatch(changeSkillItemValue({itemName:itemName, valueName:valueName ,value:e.replace(/[^0-9]/g, '')})))
  const remover =  useCallback( (itemName)=> (e)=>dispatch(removeSkillItem({itemName:itemName})))
  const checkBoxSetter =  useCallback( (itemName)=> valueName=> (e)=>dispatch(changeSkillItemBool({itemName:itemName, valueName:valueName })))
  const itemValueSelector = useCallback(itemName => itemValue => useSelector(selectSkillItemValue(itemName, itemValue))) 
  
  const allSkillKeys = useSelector(selectAllSkillKeys, shallowEqual )

  const SkillItem = ({name}) => {

    const selector = useCallback(itemValueSelector(name), [name])
    const setChanger = useCallback(setter(name), [name])
    const setCheckBoxChanger = useCallback(checkBoxSetter(name), [name])

    const onRemoveClick = (name) => {
      Alert.alert(
        "Remove Skill",
        "This will delete this skill",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: remover(name) }
        ]
      );
    }
    
    return(
      <View style={styles.skillItem}>
        <View style={{flex:0.5}}>
          <CheckBox
              value={selector('requiredTraining')}
              onValueChange={setCheckBoxChanger('requiredTraining')}
              disabled={true}   
            />
        </View>
        <View style={{flex:0.5}}>
          <CheckBox
              value={selector('isClassSkill')}
              onValueChange={setCheckBoxChanger('isClassSkill')}         
              disabled={false}   
            />
        </View>
        <View style={{flex:2}}>
          <Text style={{textAlign:'center'}}>{name.replace('_', ' ').replace('_', ' ').toLowerCase()}</Text>
        </View>
        <View style={{flex:1}}>
          <Text style={{textAlign:'center',}}>{selector('ability')}</Text>
        </View>
        <View style={{flex:1}}>
          <LargeCell content={useSelector(selectSkillTotal(name)) }/>
        </View>
        <View style={{flex:1, flexDirection:'row', alignItems:'center' }}>
          <Text>=</Text>
          <UnderlinedText content={modifierSelector(selector('ability'))} />
        </View>
        <View style={{flex:1, flexDirection:'row', alignItems:'center', }}>
          <Text>+</Text>
          <UnderlinedTextInput id={'ranks'} selector={selector} setChanger={setChanger}/>
        </View>
        <View style={{flex:1, flexDirection:'row', alignItems:'center', }}>
          <Text>+</Text>
          <UnderlinedTextInput id={'miscMod'} selector={selector} setChanger={setChanger}/>
        </View>
        <View style={{flex:1, flexDirection:'row', alignItems:'center', marginLeft:10 }}>          
          <Button title={'rm'} color={'#555'} onPress={() => onRemoveClick(name)}/>
        </View>
      </View>
    )
  }

  const SkillsHeader = () => {
    return(
      <View style={{flex:3, }}>
        <View style={{flex:1, flexDirection:'row', backgroundColor:'#222', paddingVertical:5, justifyContent:'space-between', alignItems:'center'}}>
          <View style={{flex:1}}>
            <Text style={{color:'#fff', fontSize:16, fontWeight:'bold', textAlign:'right', }}>SKILLS </Text>
          </View>
          <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end', marginHorizontal:5}}>
            <Text style={{color:'#fff', fontSize:10, textAlign:'right'}}>Max Ranks {'\n'} class/non-class </Text>
            <View style={{backgroundColor:'#fff', padding: 5}}><Text style={{fontSize:16}}>{useSelector(selectMaxSkill)}</Text></View>
          </View>
        </View>
        <View  style={{flex:1, flexDirection:'row', backgroundColor:'#fff' }}>
          <View style={{...styles.titleItem, flex:0.5}}>
            <TitleText>requires {'\n'} training</TitleText>        
          </View>
          <View style={{...styles.titleItem, flex:0.5}}>
            <TitleText>class</TitleText>        
          </View>
          <View style={{...styles.titleItem, flex:1.2}}>
            <TitleText>name</TitleText>
          </View>
          <View style={styles.titleItem}>
            <TitleText style={{textAlign:'center', flex:0.7}}>ability</TitleText>
          </View>
          <View style={{...styles.titleItem, borderColor:'#a00'}}>
            <TitleText>Skill {'\n'} Modifier</TitleText>
          </View>
          <View style={styles.titleItem}>
            <TitleText>Ability {'\n'} modifier</TitleText>
          </View>
          <View style={styles.titleItem}>
            <TitleText>RANKS</TitleText>
          </View>
          <View style={styles.titleItem}>
            <TitleText>misc {'\n'} modifier</TitleText>
          </View>
        </View>
      </View>
    )
  }

  const AddSkill = () => {

    const [skill, setSkill] = useState({ability: 'WIS', armorPen:false, requiredTraining:false, isClassSkill:false})
    const [name, setName] = useState('')
  
    return(
      <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center', height:50, marginVertical:10, borderWidth:1, paddingVertical:5}}>
        <TextInput style={{borderWidth:1, width:'30%'}} placeholder={'skill name'} onChangeText={(e)=>setName(e)} value={''+name}/>
        <SelectDropdown 
          buttonStyle={{width:'15%', borderWidth:1, height:'100%'}} 
          buttonTextStyle={{fontSize:12}} data={['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']} 
          defaultButtonText={'Select Ability'} 
          onSelect={(e)=>{setSkill({...skill, ability:e})}}
        />
        <View className={{paddingVertical:5}}>
          <Text style={{fontSize:8}} >requires {'\n'} training</Text>
          <CheckBox
              value={skill.requiredTraining}
              onValueChange={(v)=>{setSkill({...skill, requiredTraining:v})}}            
            />
        </View>
        <View className={{paddingVertical:5}}>
          <Text style={{fontSize:8}}>armor {'\n'} penalty</Text>
          <CheckBox
              value={skill.armorPen}
              onValueChange={(v)=>{setSkill({...skill, armorPen:v})}}            
            />
        </View>
        <View className={{paddingVertical:5}}>
          <Text style={{fontSize:8}}>class {'\n'} skill</Text>
          <CheckBox
              value={skill.isClassSkill}
              onValueChange={(v)=>{setSkill({...skill, isClassSkill:v})}}            
            />
        </View>
        <Button title={'add skill'} color={'#222'} onPress={createItem(name, skill)}/>
      </View>
    )
  }

  return(    
      <SafeAreaView style={{marginHorizontal:5}}>
        <ScrollView>
          <SkillsHeader />
          {
            allSkillKeys.map((item, id) => (
              <SkillItem key={id} name={item} />
            ))
          }
          <AddSkill />
        </ScrollView>
      </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  skillsTable:{
    flex:1,
    width:'100%',
    marginTop:20,
  },
  skillItem:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
  },
  titleItem:{
    flex:1,
    borderWidth:1,
    flexDirection:'row',
    alignItems:'center',
    borderColor:'#999',
    padding:5,
  }
})
