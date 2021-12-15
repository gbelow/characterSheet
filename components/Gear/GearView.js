import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SectionTitle } from '../TextComponents';
import { useDispatch, useSelector } from 'react-redux';
import {changeGearItem, selectGearItem, selectGearItemValue} from './GearSlice'
import { selectStatsModifier } from '../Stats/StatsSlice';

export function GearView(){

  const dispatch = useDispatch()  
  const setter = (itemName) => valueName => (e)=>dispatch(changeGearItem({itemName:itemName, valueName:valueName,value:e}))
  const itemSelector = itemName => useSelector(selectGearItem(itemName))
  const itemValueSelector = itemName => itemValue => useSelector(selectGearItemValue(itemName, itemValue))
  const modifierSelector = itemName => useSelector(selectStatsModifier(itemName))
  
  const Armor = () => {

    const armor = 'ARMOR'
    
    return(
      <View style={{marginVertical:5}}>
        <View style={{flexDirection:'row', height:80, borderWidth:1}}>
          <BoxWithTitle title={'ARMOR/Protective Item'} size={3} id={'NAME'} selector={itemValueSelector(armor)} setChanger={setter(armor)}/>
          <BoxWithTitle title={'TYPE'} size={1} id={'TYPE'} selector={itemValueSelector(armor)} setChanger={setter(armor)}/>
          <BoxWithTitle title={'AC BONUS'} size={1} id={'AC_BONUS'} selector={itemValueSelector(armor)} setChanger={setter(armor)}/>
          <BoxWithTitle title={'MAX DEX'} size={1} id={'MAX_DEX'} selector={itemValueSelector(armor)} setChanger={setter(armor)} />
        </View>
        <View style={{flexDirection:'row', height:80, borderWidth:1}}>
          <BoxWithTitle title={'CHECK PENALTY'} size={1} id={'CHECK_PENALTY'} selector={itemValueSelector(armor)} setChanger={setter(armor)}/>
          <BoxWithTitle title={'SPELL FAILURE'} size={1} id={'SPELL_FAILURE'} selector={itemValueSelector(armor)} setChanger={setter(armor)}/>
          <BoxWithTitle title={'SPEED'} size={1} id={'SPEED'} selector={itemValueSelector(armor)} setChanger={setter(armor)}/>
          <BoxWithTitle title={'WEIGHT'} size={1} id={'WEIGHT'} selector={itemValueSelector(armor)} setChanger={setter(armor)} />
          <BoxWithTitle title={'SPECIAL PROPERTIES'} size={1} id={'SPECIAL_PROPS'} selector={itemValueSelector(armor)} setChanger={setter(armor)} />
        </View>
      </View>
    )
  }

  const Shield = () => {

    const shield = 'SHIELD'

    return(
      <View style={{marginVertical:5}}>
        <View style={{flexDirection:'row', height:80, borderWidth:1}}>
          <BoxWithTitle title={'SHIELD/Protective Item'} size={3} id={'NAME'} selector={itemValueSelector(shield)} setChanger={setter(shield)}/>
          <BoxWithTitle title={'AC BONUS'} size={1} id={'AC_BONUS'} selector={itemValueSelector(shield)} setChanger={setter(shield)}/>
          <BoxWithTitle title={'WEIGHT'} size={1} id={'WEIGHT'} selector={itemValueSelector(shield)} setChanger={setter(shield)}/>
          <BoxWithTitle title={'CHECK PENALTY'} size={1} id={'CHECK_PENALTY'} selector={itemValueSelector(shield)} setChanger={setter(shield)}/>
        </View>
        <View style={{flexDirection:'row', height:80, borderWidth:1}}>
          <BoxWithTitle title={'SPELL FAILURE'} size={1} id={'SPELL_FAILURE'} selector={itemValueSelector(shield)} setChanger={setter(shield)}/>
          <BoxWithTitle title={'SPECIAL PROPERTIES'} size={4} id={'SPECIAL_PROPS'} selector={itemValueSelector(shield)} setChanger={setter(shield)}/>
        </View>
      </View>
    )
  }

  const ProtectiveItem = ({index}) => {
    
    const prot = 'PROT_ITEM'+index
    return(
      <View style={{marginVertical:5}}>
        <View style={{flexDirection:'row', height:80, borderWidth:1}}>
          <BoxWithTitle title={'PROTECTIVE ITEM'} size={3} id={'NAME'} selector={itemValueSelector(prot)} setChanger={setter(prot)}/>
          <BoxWithTitle title={'AC BONUS'} size={1} id={'AC_BONUS'} selector={itemValueSelector(prot)} setChanger={setter(prot)}/>
          <BoxWithTitle title={'WEIGHT'} size={1} id={'WEIGHT'} selector={itemValueSelector(prot)} setChanger={setter(prot)} />
          <BoxWithTitle title={'SPECIAL PROPERTIES'} size={3}  id={'SPECIAL_PROPS'} selector={itemValueSelector(prot)} setChanger={setter(prot)}/>
        </View>
      </View>
    )
  }

 const  Weapon = ({index}) => {
  const weap = 'WEAPON'+index
  return(
  <View style={{marginVertical:5}}>
    <View style={{flexDirection:'row', height:80, borderWidth:1}}>
      <BoxWithTitle title={'WEAPON'} size={3} id={'NAME'} selector={itemValueSelector(weap)}  setChanger={setter(weap)}/>
      <BoxWithTitle title={'ATTACK BONUS'} size={1} id={'ATK_BONUS'} selector={itemValueSelector(weap)}  setChanger={setter(weap)}/>
      <BoxWithTitle title={'DAMAGE'} size={1}  id={'DAMAGE'} selector={itemValueSelector(weap)}  setChanger={setter(weap)}/>
      <BoxWithTitle title={'CRITICAL'} size={1}  id={'CRITICAL'} selector={itemValueSelector(weap)}  setChanger={setter(weap)} />
    </View>
    <View style={{flexDirection:'row', height:80, borderWidth:1}}>
      <BoxWithTitle title={'RANGE'} size={1} id={'RANGE'} selector={itemValueSelector(weap)}  setChanger={setter(weap)}/>
      <BoxWithTitle title={'TYPE'} size={1} id={'TYPE'} selector={itemValueSelector(weap)}  setChanger={setter(weap)}/>
      <BoxWithTitle title={'NOTES'} size={3} id={'NOTES'} selector={itemValueSelector(weap)}  setChanger={setter(weap)}/>
    </View>
  </View>
  )
 }

  const BoxWithTitle = ({title, size, id='', selector, setChanger=()=>null}) => {

    const content = selector(id)
    const setContent = setChanger(id)
    return(
      <View style={{flex:size,}}>
        <View style={{backgroundColor:'#000', paddingVertical:3, borderRightWidth :1, borderColor:'#fff', flex:2, justifyContent:'center'}}>
          <Text style={{color:'#fff', textAlign:'center'}}>{title} </Text>
        </View>
        <View style={{borderRightWidth:1, flex:3, justifyContent:'center'}}>
          <TextInput style={{textAlign:'center' }} onChangeText={setContent} value={''+content}/>
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