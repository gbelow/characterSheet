import React from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { UnderlinedTextInput } from './TextComponents';

export const DescriptionView = () => {
  return(
    <View style={styles.headingsContainer}>
      <View style={styles.headingsLine}>
        <UnderlinedTextInput content={'Theoric Yurgal'} legend={'Character Name'} size={3}/>
        <UnderlinedTextInput content={'Guilherme'} legend={'Player'} size={3} />
      </View>  
      <View style={styles.headingsLine}>
        <UnderlinedTextInput content={'Cleric'} legend={'Class'} size={2}/>
        <UnderlinedTextInput content={'1'} legend={'Level'} size={0.5}/>
        <UnderlinedTextInput content={'Dwarf'} legend={'Race'} size={1}/>
        <UnderlinedTextInput content={'LN'} legend={'Alignment'} size={0.7}/>
        <UnderlinedTextInput content={'Thyatis'} legend={'Deity'} size={1}/>
      </View>
      <View style={styles.headingsLine}>
        <UnderlinedTextInput content={'Medium'} legend={'Size'} size={1}/>
        <UnderlinedTextInput content={'70'} legend={'Age'} size={0.7}/>
        <UnderlinedTextInput content={'M'} legend={'Gender'} size={0.7}/>
        <UnderlinedTextInput content={'145'} legend={'Height'} size={0.7}/>
        <UnderlinedTextInput content={'85kg'} legend={'Weight'} size={0.7}/>
        <UnderlinedTextInput content={'Brown'} legend={'Eyes'} size={0.7}/>
        <UnderlinedTextInput content={'LN'} legend={'Hair'} size={0.7}/>
        <UnderlinedTextInput content={'Orange'} legend={'Skin'} size={0.7}/>
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
