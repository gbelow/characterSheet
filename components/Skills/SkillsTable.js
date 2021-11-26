import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Cell } from '../CellComponents';
import { UnderlinedText, UnderlinedTextInput, TitleText } from '../TextComponents';
import SelectDropdown from 'react-native-select-dropdown'
import { useDispatch, useSelector } from 'react-redux';
import { changeSkillItemValue, selectSkillsItem, selectAllSkills } from './SkillsSlice';

export function SkillsTable ({}){

  const dispatch = useDispatch()  
  const setter = (itemName, valueName)=> (e)=>dispatch(changeSkillItemValue({itemName:itemName, valueName:valueName ,value:e}))
  const itemSelector = itemName => useSelector(selectSkillsItem(itemName))
  const allSkillsSelector = () => useSelector(selectAllSkills)
  const modifierSelector = itemName => useSelector(selectStatsModifier(itemName))

  const allSkills = allSkillsSelector()

  const SkillItem = ({item}) => {
    return(
      <View key={item.name} style={styles.skillItem}>
        <View style={{flex:0.5}}>          
        </View>
        <View style={{flex:2}}>
          <Text>{item.name}</Text>
        </View>
        <View style={{flex:1}}>
          <Text style={{textAlign:'center',}}>{item.ability}</Text>
        </View>
        <View style={{flex:1}}>
          <Cell />
        </View>
        <View style={{flex:1, flexDirection:'row', alignItems:'center', }}>
          <Text>=</Text>
          <UnderlinedText content={'0'}/>
        </View>
        <View style={{flex:1, flexDirection:'row', alignItems:'center', }}>
          <Text>+</Text>
          <UnderlinedTextInput content={'0'}/>
        </View>
        <View style={{flex:1, flexDirection:'row', alignItems:'center', }}>
          <Text>+</Text>
          <UnderlinedTextInput content={'0'}/>
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

  return(
    <View style={styles.skillsTable}>
      <SkillsHeader />
      {
        Object.entries(allSkills).map(item => (
          <SkillItem key={item[0]} item={item[1]} />
        ))
      }
      <AddSkill />
    </View>
  )
}

const AddSkill = () => {
  return(
    <View style={{flex:1, flexDirection:'row', justifyContent:'space-around', alignItems:'center', marginVertical:10, borderWidth:1, paddingVertical:5}}>
      <TextInput style={{borderWidth:1, width:'30%'}} placeholder={'skill name'} />
      <SelectDropdown buttonStyle={{width:'30%', borderWidth:1, height:'100%'}} buttonTextStyle={{fontSize:12}} data={['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']} defaultButtonText={'Select Ability'} />
      <Button title={'add skill'}  />
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

const skillList = [
  {name:'appraise', ability: 'int', armorPen:false, requiredTraining:false},
  {name:'balance', ability: 'dex', armorPen:true, requiredTraining:false},
  {name:'bluff', ability: 'cha', armorPen:false, requiredTraining:false},
  {name:'climb', ability: 'str', armorPen:true, requiredTraining:false},
  {name:'concentration', ability: 'con', armorPen:false, requiredTraining:false},
  {name:'decipher script', ability: 'int', armorPen:false, requiredTraining:true},
  {name:'diplomacy', ability: 'cha', armorPen:false, requiredTraining:false},
  {name:'disable device', ability: 'dex', armorPen:false, requiredTraining:true},
  {name:'disguise', ability: 'cha', armorPen:false, requiredTraining:false},
  {name:'escape artist', ability: 'dex', armorPen:true, requiredTraining:false},
  {name:'forgery', ability: 'int', armorPen:false, requiredTraining:false},
  {name:'gather information', ability: 'cha', armorPen:false, requiredTraining:false},
  {name:'handle animal', ability: 'cha', armorPen:false, requiredTraining:true},
  {name:'heal', ability: 'wis', armorPen:false, requiredTraining:false},
  {name:'hide', ability: 'dex', armorPen:true, requiredTraining:false},
  {name:'intimidate', ability: 'cha', armorPen:false, requiredTraining:false},
  {name:'jump', ability: 'str', armorPen:true, requiredTraining:false},
  {name:'listen', ability: 'wis', armorPen:false, requiredTraining:false},
  {name:'move silently', ability: 'dex', armorPen:true, requiredTraining:false},
  {name:'open lock', ability: 'dex', armorPen:false, requiredTraining:true},
  {name:'ride', ability: 'dex', armorPen:false, requiredTraining:false},
  {name:'search', ability: 'int', armorPen:false, requiredTraining:false},
  {name:'sense motive', ability: 'wis', armorPen:false, requiredTraining:false},
  {name:'sleight of hand', ability: 'dex', armorPen:true, requiredTraining:true},
  {name:'spellcraft', ability: 'int', armorPen:false, requiredTraining:true},
  {name:'spot', ability: 'wis', armorPen:false, requiredTraining:false},
  {name:'survival', ability: 'wis', armorPen:false, requiredTraining:false},
  {name:'swim', ability: 'str', armorPen:true, requiredTraining:false},
  {name:'tumble', ability: 'dex', armorPen:true, requiredTraining:true},
  {name:'use magic device', ability: 'cha', armorPen:false, requiredTraining:false},
  {name:'use rope', ability: 'dex', armorPen:false, requiredTraining:false},
]