import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { UnderlinedTextInput } from '../TextComponents';
import { selectDescriptionItem, changeDescriptionItem } from './DescriptionSlice';
import SelectDropdown from 'react-native-select-dropdown';

const DescriptionView = ({}) => {

  const dispatch = useDispatch()
  const selector = itemName => useSelector(selectDescriptionItem(itemName))
  const setter = itemName=> (e)=>dispatch(changeDescriptionItem({itemName:itemName ,value:e}))

  return(
    <View style={styles.headingsContainer}>
      <View style={styles.headingsLine}>
        <UnderlinedTextInput content={selector('CHAR_NAME')} setContent={setter('CHAR_NAME')} legend={'Character Name'} size={3}/>
        <UnderlinedTextInput content={selector('PLAYER_NAME')} setContent={setter('PLAYER_NAME')} legend={'Player'} size={3} />
      </View>  
      <View style={styles.headingsLine}>
        <SelectDropdown 
          buttonStyle={{width:'15%', borderWidth:1, height:'100%', marginHorizontal:5, marginVertical:8}} 
          buttonTextStyle={{fontSize:10}} data={['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Wizard']} 
          defaultButtonText={selector('CLASS')} 
          buttonTextAfterSelection={selectedItem => selectedItem}
          onSelect={setter('CLASS')}
        />
        <UnderlinedTextInput content={selector('LEVEL')} setContent={setter('LEVEL')} legend={'Level'} size={0.5}/>
        <UnderlinedTextInput content={selector('RACE')} setContent={setter('RACE')} legend={'Race'} size={1}/>
        <UnderlinedTextInput content={selector('ALIGNMENT')} setContent={setter('ALIGNMENT')} legend={'Alignment'} size={0.7}/>
        <UnderlinedTextInput content={selector('DEITY')} setContent={setter('DEITY')} legend={'Deity'} size={1}/>
      </View>
      <View style={styles.headingsLine}>
        <SelectDropdown 
          buttonStyle={{width:'15%', borderWidth:1, height:'100%', marginHorizontal:5, marginVertical:8}} 
          buttonTextStyle={{fontSize:10}} data={['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Colossal']} 
          defaultButtonText={selector('SIZE')} 
          buttonTextAfterSelection={selectedItem => selectedItem}
          onSelect={setter('SIZE')}
        />
        <UnderlinedTextInput content={selector('AGE')} setContent={setter('AGE')} legend={'Age'} size={0.7}/>
        <UnderlinedTextInput content={selector('GENDER')} setContent={setter('GENDER')} legend={'Gender'} size={0.7}/>
        <UnderlinedTextInput content={selector('HEIGHT')} setContent={setter('HEIGHT')} legend={'Height'} size={0.7}/>
        <UnderlinedTextInput content={selector('WEIGHT')} setContent={setter('WEIGHT')} legend={'Weight'} size={0.7}/>
        <UnderlinedTextInput content={selector('EYES')} setContent={setter('EYES')} legend={'Eyes'} size={0.7}/>
        <UnderlinedTextInput content={selector('HAIR')} setContent={setter('HAIR')} legend={'Hair'} size={0.7}/>
        <UnderlinedTextInput content={selector('SKIN')} setContent={setter('SKIN')} legend={'Skin'} size={0.7}/>
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
