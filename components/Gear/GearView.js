import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SectionTitle } from '../TextComponents';
import { useDispatch, useSelector } from 'react-redux';
import {changeGearItem, selectGearItem,} from './GearSlice'
import { selectStatsModifier } from '../Stats/StatsSlice';

export function GearView(){

  const dispatch = useDispatch()  
  const setter = (itemName, valueName)=> (e)=>dispatch(changeGearItem({itemName:itemName, valueName:valueName,value:e}))
  const itemSelector = itemName => useSelector(selectGearItem(itemName))
  const modifierSelector = itemName => useSelector(selectStatsModifier(itemName))
  
  const Armor = () => {

    const {NAME, TYPE, AC_BONUS, MAX_DEX, CHECK_PENALTY, SPELL_FAILURE, SPEED, WEIGHT, SPECIAL_PROPS} = itemSelector('ARMOR')
    
    return(
      <View style={{marginVertical:5}}>
        <View style={{flexDirection:'row', height:80, borderWidth:1}}>
          <BoxWithTitle title={'ARMOR/Protective Item'} size={3} content={NAME} setContent={setter('ARMOR', 'NAME')}/>
          <BoxWithTitle title={'TYPE'} size={1} content={TYPE} setContent={setter('ARMOR', 'TYPE')}/>
          <BoxWithTitle title={'AC BONUS'} size={1} content={AC_BONUS} setContent={setter('ARMOR', 'AC_BONUS')}/>
          <BoxWithTitle title={'MAX DEX'} size={1} content={MAX_DEX} setContent={setter('ARMOR', 'MAX_DEX')} />
        </View>
        <View style={{flexDirection:'row', height:80, borderWidth:1}}>
          <BoxWithTitle title={'CHECK PENALTY'} size={1} content={CHECK_PENALTY} setContent={setter('ARMOR', 'CHECK_PENALTY')}/>
          <BoxWithTitle title={'SPELL FAILURE'} size={1} content={SPELL_FAILURE} setContent={setter('ARMOR', 'SPELL_FAILURE')}/>
          <BoxWithTitle title={'SPEED'} size={1} content={SPEED} setContent={setter('ARMOR', 'SPEED')}/>
          <BoxWithTitle title={'WEIGHT'} size={1} content={WEIGHT} setContent={setter('ARMOR', 'WEIGHT')} />
          <BoxWithTitle title={'SPECIAL PROPERTIES'} size={1} content={SPECIAL_PROPS} setContent={setter('ARMOR', 'SPECIAL_PROPS')} />
        </View>
      </View>
    )
  }

  const Shield = () => {

    const {NAME, AC_BONUS, CHECK_PENALTY, SPELL_FAILURE, WEIGHT, SPECIAL_PROPS} = itemSelector('SHIELD')

    return(
      <View style={{marginVertical:5}}>
        <View style={{flexDirection:'row', height:80, borderWidth:1}}>
          <BoxWithTitle title={'SHIELD/Protective Item'} size={3} content={NAME} setContent={setter('SHIELD', 'NAME')}/>
          <BoxWithTitle title={'AC BONUS'} size={1} content={AC_BONUS} setContent={setter('SHIELD', 'AC_BONUS')}/>
          <BoxWithTitle title={'WEIGHT'} size={1} content={WEIGHT} setContent={setter('SHIELD', 'WEIGHT')}/>
          <BoxWithTitle title={'CHECK PENALTY'} size={1} content={CHECK_PENALTY} setContent={setter('SHIELD', 'CHECK_PENALTY')}/>
        </View>
        <View style={{flexDirection:'row', height:80, borderWidth:1}}>
          <BoxWithTitle title={'SPELL FAILURE'} size={1} content={SPELL_FAILURE} setContent={setter('SHIELD', 'SPELL_FAILURE')}/>
          <BoxWithTitle title={'SPECIAL PROPERTIES'} size={4} content={SPECIAL_PROPS} setContent={setter('SHIELD', 'SPECIAL_PROPS')}/>
        </View>
      </View>
    )
  }

  const ProtectiveItem = ({index}) => {
    
    const {NAME, AC_BONUS, WEIGHT, SPECIAL_PROPS} = itemSelector('PROT_ITEM'+index)
    
    return(
      <View style={{marginVertical:5}}>
        <View style={{flexDirection:'row', height:80, borderWidth:1}}>
          <BoxWithTitle title={'PROTECTIVE ITEM'} size={3} content={NAME} setContent={setter('PROT_ITEM'+index, 'NAME')}/>
          <BoxWithTitle title={'AC BONUS'} size={1} content={AC_BONUS} setContent={setter('PROT_ITEM'+index, 'AC_BONUS')}/>
          <BoxWithTitle title={'WEIGHT'} size={1} content={WEIGHT} setContent={setter('PROT_ITEM'+index, 'WEIGHT')} />
          <BoxWithTitle title={'SPECIAL PROPERTIES'} size={3}  content={SPECIAL_PROPS} setContent={setter('PROT_ITEM'+index, 'SPECIAL_PROPS')}/>
        </View>
      </View>
    )
  }

 const  Weapon = ({index}) => {
  const {NAME, ATK_BONUS, DAMAGE, CRITICAL, WEIGHT, RANGE, TYPE, NOTES} = itemSelector('WEAPON'+index)

   return(
    <View style={{marginVertical:5}}>
      <View style={{flexDirection:'row', height:80, borderWidth:1}}>
        <BoxWithTitle title={'WEAPON'} size={3} content={NAME} setContent={setter('WEAPON'+index, 'NAME')}/>
        <BoxWithTitle title={'ATTACK BONUS'} size={1} content={ATK_BONUS} setContent={setter('WEAPON'+index, 'ATK_BONUS')}/>
        <BoxWithTitle title={'DAMAGE'} size={1}  content={DAMAGE} setContent={setter('WEAPON'+index, 'DAMAGE')}/>
        <BoxWithTitle title={'CRITICAL'} size={1}  content={CRITICAL} setContent={setter('WEAPON'+index, 'CRITICAL')} />
      </View>
      <View style={{flexDirection:'row', height:80, borderWidth:1}}>
        <BoxWithTitle title={'RANGE'} size={1} content={RANGE} setContent={setter('WEAPON'+index, 'RANGE')}/>
        <BoxWithTitle title={'TYPE'} size={1} content={TYPE} setContent={setter('WEAPON'+index, 'TYPE')}/>
        <BoxWithTitle title={'NOTES'} size={3} content={NOTES} setContent={setter('WEAPON'+index, 'NOTES')}/>
      </View>
    </View>
   )
 }

  const BoxWithTitle = ({title, size, content='', setContent=()=>null}) => {
    return(
      <View style={{flex:size,}}>
        <View style={{backgroundColor:'#000', paddingVertical:3, borderRightWidth :1, borderColor:'#fff', flex:2, justifyContent:'center'}}>
          <Text style={{color:'#fff', textAlign:'center'}}>{title} </Text>
        </View>
        <View style={{borderRightWidth:1, flex:3, justifyContent:'center'}}>
          <TextInput style={{textAlign:'center' }} onChangeText={setContent} >{content}</TextInput>
        </View>
      </View>
    )
  }

  return(
    <View style={{width:'100%'}}>
      <SectionTitle title={'GEAR'} />
      <Weapon index={1}/>
      <Weapon index={2}/>
      <Armor />
      <Shield />
      <ProtectiveItem index={1} />
      <ProtectiveItem index={2} />
    </View>
  )
}