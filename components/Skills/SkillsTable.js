import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, CheckBox } from 'react-native';
import { Cell } from '../CellComponents';
import { UnderlinedText, UnderlinedTextInput, TitleText } from '../TextComponents';
import SelectDropdown from 'react-native-select-dropdown'
import { useDispatch, useSelector } from 'react-redux';
import { changeSkillItemValue, selectSkillsItem, selectAllSkills, selectSkillTotal, createSkillItem } from './SkillsSlice';
import {selectStatsModifier} from '../Stats/StatsSlice';

export function SkillsTable ({}){

  const dispatch = useDispatch()  
  const setter = (itemName, valueName)=> (e)=>dispatch(changeSkillItemValue({itemName:itemName, valueName:valueName ,value:e}))
  const createItem = (name, skill)=>(e)=>dispatch(createSkillItem({itemName:name, value:skill}))
  const itemSelector = itemName => useSelector(selectSkillsItem(itemName))
  const allSkillsSelector = () => useSelector(selectAllSkills)
  const modifierSelector = itemName => useSelector(selectStatsModifier(itemName))
  const skillTotalSelecter = itemName => useSelector(selectSkillTotal(itemName))

  const allSkills = allSkillsSelector()
  
  const SkillItem = ({item, name}) => {
    return(
      <View key={item.name} style={styles.skillItem}>
        <View style={{flex:0.5}}>
        </View>
        <View style={{flex:2}}>
          <Text>{name}</Text>
        </View>
        <View style={{flex:1}}>
          <Text style={{textAlign:'center',}}>{item.ability}</Text>
        </View>
        <View style={{flex:1}}>
          <Cell content={skillTotalSelecter(name)}/>
        </View>
        <View style={{flex:1, flexDirection:'row', alignItems:'center', }}>
          <Text>=</Text>
          <UnderlinedText content={modifierSelector(item.ability)} />
        </View>
        <View style={{flex:1, flexDirection:'row', alignItems:'center', }}>
          <Text>+</Text>
          <UnderlinedTextInput content={item.ranks} setContent={setter(name, 'ranks')}/>
        </View>
        <View style={{flex:1, flexDirection:'row', alignItems:'center', }}>
          <Text>+</Text>
          <UnderlinedTextInput content={item.miscMod} setContent={setter(name, 'miscMod')}/>
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
            <View style={{backgroundColor:'#fff', padding: 5}}><Text style={{fontSize:16}}> 4 / 2 </Text></View>
          </View>
        </View>
        <View  style={{flex:1, flexDirection:'row', backgroundColor:'#fff' }}>
          <View style={{...styles.titleItem, flex:0.6}}>
            <TitleText>class</TitleText>        
          </View>
          <View style={{...styles.titleItem, flex:2}}>
            <TitleText>name</TitleText>
          </View>
          <View style={styles.titleItem}>
            <TitleText style={{textAlign:'center',}}>ability</TitleText>
          </View>
          <View style={styles.titleItem}>
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

    const [skill, setSkill] = useState({ability: 'WIS', armorPen:false, requiredTraining:false})
    const [name, setName] = useState('')
  
    return(
      <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center', height:50, marginVertical:10, borderWidth:1, paddingVertical:5}}>
        <TextInput style={{borderWidth:1, width:'30%'}} placeholder={'skill name'} onChangeText={(e)=>setName(e)}>{name}</TextInput>
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
        <Button title={'add skill'}  onPress={createItem(name, skill)}/>
      </View>
    )
  }

  return(
    <View style={styles.skillsTable}>
      <SkillsHeader />
      {
        Object.entries(allSkills).map(item => (
          <SkillItem key={item[0]} item={item[1]} name={item[0]} />
        ))
      }
      <AddSkill />
    </View>
  )
}



const styles = StyleSheet.create({
  skillsTable:{
    height:1000,
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
