import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { UnderlinedTextInput } from './TextComponents';

export const DescriptionView = ({data, setData}) => {

  return(
    <View style={styles.headingsContainer}>
      <View style={styles.headingsLine}>
        <UnderlinedTextInput content={data.charName} setContent={(e) => setData({...data, charName:e})} legend={'Character Name'} size={3}/>
        <UnderlinedTextInput content={data.playerName} setContent={(e) => setData({...data, playerName:e})} legend={'Player'} size={3} />
      </View>  
      <View style={styles.headingsLine}>
        <UnderlinedTextInput content={data.charClass} setContent={(e) => setData({...data, class:e})} legend={'Class'} size={2}/>
        <UnderlinedTextInput content={data.level} setContent={(e) => setData({...data, level:e})} legend={'Level'} size={0.5}/>
        <UnderlinedTextInput content={data.race} setContent={(e) => setData({...data, race:e})} legend={'Race'} size={1}/>
        <UnderlinedTextInput content={data.alignment} setContent={(e) => setData({...data, alignment:e})} legend={'Alignment'} size={0.7}/>
        <UnderlinedTextInput content={data.deity} setContent={(e) => setData({...data, deity:e})} legend={'Deity'} size={1}/>
      </View>
      <View style={styles.headingsLine}>
        <UnderlinedTextInput content={data.size} setContent={(e) => setData({...data, size:e})} legend={'Size'} size={1}/>
        <UnderlinedTextInput content={data.age} setContent={(e) => setData({...data, age:e})} legend={'Age'} size={0.7}/>
        <UnderlinedTextInput content={data.gender} setContent={(e) => setData({...data, gender:e})} legend={'Gender'} size={0.7}/>
        <UnderlinedTextInput content={data.height} setContent={(e) => setData({...data, height:e})} legend={'Height'} size={0.7}/>
        <UnderlinedTextInput content={data.weight} setContent={(e) => setData({...data, weight:e})} legend={'Weight'} size={0.7}/>
        <UnderlinedTextInput content={data.eyes} setContent={(e) => setData({...data, eyes:e})} legend={'Eyes'} size={0.7}/>
        <UnderlinedTextInput content={data.hair} setContent={(e) => setData({...data, hair:e})} legend={'Hair'} size={0.7}/>
        <UnderlinedTextInput content={data.skin} setContent={(e) => setData({...data, skin:e})} legend={'Skin'} size={0.7}/>
      </View>  
    </View>
  )
}

const styles = StyleSheet.create({
  headingsContainer:{
    height:100,
  },
  headingsLine:{
    flex:1,
    flexDirection: 'row', 
    width: '100%',
  },

})
