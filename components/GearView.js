import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SectionTitle } from './TextComponents';

export function GearView(){
  
  const Armor = () => {
    return(
      <View style={{marginVertical:5}}>
        <View style={{flexDirection:'row', height:80, borderWidth:1}}>
          <BoxWithTitle title={'ARMOR/Protective Item'} size={3}/>
          <BoxWithTitle title={'TYPE'} size={1} />
          <BoxWithTitle title={'AC BONUS'} size={1}/>
          <BoxWithTitle title={'MAX DEX'} size={1} />
        </View>
        <View style={{flexDirection:'row', height:80, borderWidth:1}}>
          <BoxWithTitle title={'CHECK PENALTY'} size={1}/>
          <BoxWithTitle title={'SPELL FAILURE'} size={1} />
          <BoxWithTitle title={'SPEED'} size={1}/>
          <BoxWithTitle title={'WEIGHT'} size={1} />
          <BoxWithTitle title={'SPECIAL PROPERTIES'} size={1} />
        </View>
      </View>
    )
  }

  const Shield = () => {
    return(
      <View style={{marginVertical:5}}>
        <View style={{flexDirection:'row', height:80, borderWidth:1}}>
          <BoxWithTitle title={'SHIELD/Protective Item'} size={3}/>
          <BoxWithTitle title={'AC BONUS'} size={1}/>
          <BoxWithTitle title={'WEIGHT'} size={1} />
          <BoxWithTitle title={'CHECK PENALTY'} size={1} />
        </View>
        <View style={{flexDirection:'row', height:80, borderWidth:1}}>
          <BoxWithTitle title={'SPELL FAILURE'} size={1}/>
          <BoxWithTitle title={'SPECIAL PROPERTIES'} size={4}/>
        </View>
      </View>
    )
  }

  const ProtectiveItem = () => {
    return(
      <View style={{marginVertical:5}}>
        <View style={{flexDirection:'row', height:80, borderWidth:1}}>
          <BoxWithTitle title={'PROTECTIVE ITEM'} size={3}/>
          <BoxWithTitle title={'AC BONUS'} size={1}/>
          <BoxWithTitle title={'WEIGHT'} size={1} />
          <BoxWithTitle title={'SPECIAL PROPERTIES'} size={3} />
        </View>
      </View>
    )
  }

 const  Weapon = () => {
   return(
    <View style={{marginVertical:5}}>
      <View style={{flexDirection:'row', height:80, borderWidth:1}}>
        <BoxWithTitle title={'WEAPON'} size={3}/>
        <BoxWithTitle title={'ATTACK BONUS'} size={1}/>
        <BoxWithTitle title={'DAMAGE'} size={1} />
        <BoxWithTitle title={'CRITICAL'} size={1} />
      </View>
      <View style={{flexDirection:'row', height:80, borderWidth:1}}>
        <BoxWithTitle title={'RANGE'} size={1}/>
        <BoxWithTitle title={'TYPE'} size={1}/>
        <BoxWithTitle title={'NOTES'} size={3}/>
      </View>
    </View>
   )
 }

  const BoxWithTitle = ({title, size}) => {
    return(
      <View style={{flex:size,}}>
        <View style={{backgroundColor:'#000', paddingVertical:3, borderRightWidth :1, borderColor:'#fff', flex:2, justifyContent:'center'}}>
          <Text style={{color:'#fff', textAlign:'center'}}>{title} </Text>
        </View>
        <View style={{borderRightWidth:1, flex:3, justifyContent:'center'}}>
          <TextInput style={{textAlign:'center' }}></TextInput>
        </View>
      </View>
    )
  }

  return(
    <View style={{width:'100%'}}>
      <SectionTitle title={'GEAR'} />
      <Weapon />
      <Weapon />
      <Armor />
      <Shield />
      <ProtectiveItem />
      <ProtectiveItem />
    </View>
  )
}