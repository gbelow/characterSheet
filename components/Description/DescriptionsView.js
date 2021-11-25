import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { UnderlinedTextInput } from '../TextComponents';
import { selectDescriptionItem, changeDescriptionItem } from './DescriptionSlice';

const DescriptionView = ({}) => {

  const dispatch = useDispatch()
  const selector = itemName => useSelector(selectDescriptionItem(itemName))
  const setter = itemName=> (e)=>dispatch(changeDescriptionItem({itemName:itemName ,value:e}))

  return(
    <View style={styles.headingsContainer}>
      <View style={styles.headingsLine}>
        <UnderlinedTextInput content={selector('charName')} setContent={setter('charName')} legend={'Character Name'} size={3}/>
        <UnderlinedTextInput content={selector('playerName')} setContent={setter('playerName')} legend={'Player'} size={3} />
      </View>  
      <View style={styles.headingsLine}>
        <UnderlinedTextInput content={selector('class')} setContent={setter('class')} legend={'Class'} size={2}/>
        <UnderlinedTextInput content={selector('level')} setContent={setter('level')} legend={'Level'} size={0.5}/>
        <UnderlinedTextInput content={selector('race')} setContent={setter('race')} legend={'Race'} size={1}/>
        <UnderlinedTextInput content={selector('alignment')} setContent={setter('alignment')} legend={'Alignment'} size={0.7}/>
        <UnderlinedTextInput content={selector('deity')} setContent={setter('deity')} legend={'Deity'} size={1}/>
      </View>
      <View style={styles.headingsLine}>
        <UnderlinedTextInput content={selector('size')} setContent={setter('size')} legend={'Size'} size={1}/>
        <UnderlinedTextInput content={selector('age')} setContent={setter('age')} legend={'Age'} size={0.7}/>
        <UnderlinedTextInput content={selector('gender')} setContent={setter('gender')} legend={'Gender'} size={0.7}/>
        <UnderlinedTextInput content={selector('height')} setContent={setter('height')} legend={'Height'} size={0.7}/>
        <UnderlinedTextInput content={selector('weight')} setContent={setter('weight')} legend={'Weight'} size={0.7}/>
        <UnderlinedTextInput content={selector('eyes')} setContent={setter('eyes')} legend={'Eyes'} size={0.7}/>
        <UnderlinedTextInput content={selector('hair')} setContent={setter('hair')} legend={'Hair'} size={0.7}/>
        <UnderlinedTextInput content={selector('skin')} setContent={setter('skin')} legend={'Skin'} size={0.7}/>
      </View>  
    </View>
  )
}

export default DescriptionView

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
