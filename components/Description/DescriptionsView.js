import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SectionTitle, UnderlinedTextInput } from '../TextComponents';
import { selectDescriptionItem, changeDescriptionItem, SizeKeys } from './DescriptionSlice';
import SelectDropdown from 'react-native-select-dropdown';
import { createSelector } from 'reselect';
import { borderLeftColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const DescriptionView = ({}) => {

  const dispatch = useDispatch()
  const selector = useCallback(itemName => useSelector(selectDescriptionItem(itemName)), [useSelector, selectDescriptionItem])
  const setter = useCallback(itemName=> (e)=>dispatch(changeDescriptionItem({itemName:itemName ,value:e})), [dispatch, changeDescriptionItem])
  const numberSetter = useCallback(itemName=> (e)=>dispatch(changeDescriptionItem({itemName:itemName ,value:e.replace(/[^0-9]/g, '')})), [dispatch, changeDescriptionItem])

  console.log(selector('CLASS'))
  return(
    <View style={styles.headingsContainer}>
      <Text style={{fontSize:30, fontWeight:'bold',}}>Description</Text>
      <View style={{...styles.headingsLine, justifyContent:'center'}}>
        <UnderlinedTextInput id={'CHAR_NAME'} selector={selector} setChanger={setter} legend={'Character Name'} size={3} fontSize={20} />
        <UnderlinedTextInput id='PLAYER_NAME' selector={selector} setChanger={setter}  legend={'Player'} size={3} fontSize={20} />
      </View>  
      <View style={styles.headingsLine}>
        <SelectDropdown 
          buttonStyle={{width:'25%', borderWidth:1, marginHorizontal:5, marginVertical:8}} 
          buttonTextStyle={{fontSize:16}} data={['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Wizard']} 
          defaultButtonText={selector('CLASS')} 
          buttonTextAfterSelection={selectedItem => selectedItem}
          onSelect={setter('CLASS')}
        />
        <UnderlinedTextInput id='LEVEL' selector={selector} setChanger={numberSetter}  legend={'Level'} size={1} fontSize={16}/>
        <UnderlinedTextInput id='RACE' selector={selector} setChanger={setter}  legend={'Race'} size={1.2} fontSize={16}/>
        <UnderlinedTextInput id='ALIGNMENT' selector={selector} setChanger={setter}  legend={'Alignment'} size={1.2} fontSize={16}/>
        <UnderlinedTextInput id='DEITY' selector={selector} setChanger={setter}  legend={'Deity'} size={1.2} fontSize={16}/>
      </View>
      <View style={{...styles.headingsLine, flexWrap:'wrap', }}>
        <SelectDropdown 
          buttonStyle={{width:'25%', borderWidth:1, marginHorizontal:5, marginVertical:8,}} 
          buttonTextStyle={{fontSize:16}} data={SizeKeys} 
          defaultButtonText={selector('SIZE')} 
          buttonTextAfterSelection={selectedItem => selectedItem}
          onSelect={setter('SIZE')}
        />
        <UnderlinedTextInput id='AGE' selector={selector} setChanger={numberSetter}  legend={'Age'} size={0.7} fontSize={16}/>
        <UnderlinedTextInput id='GENDER' selector={selector} setChanger={setter}  legend={'Gender'} size={1.2} fontSize={16}/>
        <UnderlinedTextInput id='HEIGHT' selector={selector} setChanger={numberSetter}  legend={'Height'} size={1.2} fontSize={16}/>
        
      </View>  
      <View  style={{...styles.headingsLine, flexWrap:'wrap', }}>
        <UnderlinedTextInput id='WEIGHT' selector={selector} setChanger={numberSetter}  legend={'Weight'} size={1.2} fontSize={16}/>
        <UnderlinedTextInput id='EYES' selector={selector} setChanger={setter}  legend={'Eyes'} size={1.2} fontSize={16}/>
        <UnderlinedTextInput id='HAIR' selector={selector} setChanger={setter}  legend={'Hair'} size={1.2} fontSize={16}/>
        <UnderlinedTextInput id='SKIN' selector={selector} setChanger={setter}  legend={'Skin'} size={1.2} fontSize={16}/>
      </View>
    </View>
  )
}

export default DescriptionView

const styles = StyleSheet.create({
  headingsContainer:{
    flex:1,
    marginHorizontal:10,
    width:'100%',
    alignItems:'center',
  },
  headingsLine:{
    flex:1,
    flexDirection: 'row', 
    width: '100%',
    paddingVertical:10,
  },

})
