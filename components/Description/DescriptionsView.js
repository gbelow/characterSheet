import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { UnderlinedTextInput } from '../TextComponents';
import { selectDescriptionItem, changeDescriptionItem } from './DescriptionSlice';
import SelectDropdown from 'react-native-select-dropdown';
import { createSelector } from 'reselect';

const DescriptionView = ({}) => {

  const dispatch = useDispatch()
  const selector = useCallback(itemName => useSelector(selectDescriptionItem(itemName)), [useSelector, selectDescriptionItem])
  const setter = useCallback(itemName=> (e)=>dispatch(changeDescriptionItem({itemName:itemName ,value:e})), [dispatch, changeDescriptionItem])
  const numberSetter = useCallback(itemName=> (e)=>dispatch(changeDescriptionItem({itemName:itemName ,value:e.replace(/[^0-9]/g, '')})), [dispatch, changeDescriptionItem])

  return(
    <View style={styles.headingsContainer}>
      <View style={styles.headingsLine}>
        <UnderlinedTextInput id={'CHAR_NAME'} selector={selector} setChanger={setter} legend={'Character Name'} size={3} />
        <UnderlinedTextInput id='PLAYER_NAME' selector={selector} setChanger={setter}  legend={'Player'} size={3} />
      </View>  
      <View style={styles.headingsLine}>
        <SelectDropdown 
          buttonStyle={{width:'15%', borderWidth:1, height:'100%', marginHorizontal:5, marginVertical:8}} 
          buttonTextStyle={{fontSize:10}} data={['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Wizard']} 
          defaultButtonText='CLASS' 
          buttonTextAfterSelection={selectedItem => selectedItem}
          onSelect={setter('CLASS')}
        />
        <UnderlinedTextInput id='LEVEL' selector={selector} setChanger={numberSetter}  legend={'Level'} size={0.5}/>
        <UnderlinedTextInput id='RACE' selector={selector} setChanger={setter}  legend={'Race'} size={1}/>
        <UnderlinedTextInput id='ALIGNMENT' selector={selector} setChanger={setter}  legend={'Alignment'} size={0.7}/>
        <UnderlinedTextInput id='DEITY' selector={selector} setChanger={setter}  legend={'Deity'} size={1}/>
      </View>
      <View style={styles.headingsLine}>
        <SelectDropdown 
          buttonStyle={{width:'15%', borderWidth:1, height:'100%', marginHorizontal:5, marginVertical:8}} 
          buttonTextStyle={{fontSize:10}} data={['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Colossal']} 
          defaultButtonText='SIZE' 
          buttonTextAfterSelection={selectedItem => selectedItem}
          onSelect={setter('SIZE')}
        />
        <UnderlinedTextInput id='AGE' selector={selector} setChanger={numberSetter}  legend={'Age'} size={0.7}/>
        <UnderlinedTextInput id='GENDER' selector={selector} setChanger={setter}  legend={'Gender'} size={0.7}/>
        <UnderlinedTextInput id='HEIGHT' selector={selector} setChanger={numberSetter}  legend={'Height'} size={0.7}/>
        <UnderlinedTextInput id='WEIGHT' selector={selector} setChanger={numberSetter}  legend={'Weight'} size={0.7}/>
        <UnderlinedTextInput id='EYES' selector={selector} setChanger={setter}  legend={'Eyes'} size={0.7}/>
        <UnderlinedTextInput id='HAIR' selector={selector} setChanger={setter}  legend={'Hair'} size={0.7}/>
        <UnderlinedTextInput id='SKIN' selector={selector} setChanger={setter}  legend={'Skin'} size={0.7}/>
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
