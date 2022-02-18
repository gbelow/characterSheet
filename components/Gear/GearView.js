import React, {useState} from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SectionTitle } from '../TextComponents';
import { useDispatch, useSelector } from 'react-redux';
import {changeGearItem, selectGearItem, selectGearItemValue, selectWeaponStatModifier} from './GearSlice'
import SelectDropdown from 'react-native-select-dropdown';
import { selectNormalSizeMod, selectResourceItem } from '../Resources/ResourcesSlice';

export function GearView(){

  const dispatch = useDispatch()  
  const setter = (itemName) => valueName => (e)=>dispatch(changeGearItem({itemName:itemName, valueName:valueName,value:e}))
  const itemSelector = itemName => useSelector(selectGearItem(itemName))
  const itemValueSelector = itemName => itemValue => useSelector(selectGearItemValue(itemName, itemValue))
  
  const Armor = () => {

    const armor = 'ARMOR'
    
    return(
      <View style={styles.equipmentContainer}>
        <View style={{flexDirection:'row', height:80, borderWidth:1}}>
          <TextInputBoxWithTitle title={'ARMOR/Protective Item'} size={3} id={'NAME'} selector={itemValueSelector(armor)} setChanger={setter(armor)} />
          <TextInputBoxWithTitle title={'TYPE'} size={1} id={'TYPE'} selector={itemValueSelector(armor)} setChanger={setter(armor)}/>
          <TextInputBoxWithTitle title={'AC BONUS'} size={1} id={'AC_BONUS'} selector={itemValueSelector(armor)} setChanger={setter(armor)} isNumber={true}/>
          <TextInputBoxWithTitle title={'MAX DEX'} size={1} id={'MAX_DEX'} selector={itemValueSelector(armor)} setChanger={setter(armor)} isNumber={true} />
        </View>
        <View style={{flexDirection:'row', height:80, borderWidth:1}}>
          <TextInputBoxWithTitle title={'CHECK PENALTY'} size={1} id={'CHECK_PENALTY'} selector={itemValueSelector(armor)} setChanger={setter(armor)} isNumber={true}/>
          <TextInputBoxWithTitle title={'SPELL FAILURE'} size={1} id={'SPELL_FAILURE'} selector={itemValueSelector(armor)} setChanger={setter(armor)} isNumber={true}/>
          <TextInputBoxWithTitle title={'SPEED'} size={1} id={'SPEED'} selector={itemValueSelector(armor)} setChanger={setter(armor)} isNumber={true}/>
          <TextInputBoxWithTitle title={'WEIGHT'} size={1} id={'WEIGHT'} selector={itemValueSelector(armor)} setChanger={setter(armor)} isNumber={true}/>
          <TextInputBoxWithTitle title={'SPECIAL PROPERTIES'} size={1} id={'SPECIAL_PROPS'} selector={itemValueSelector(armor)} setChanger={setter(armor)} />
        </View>
      </View>
    )
  }

  const Shield = () => {

    const shield = 'SHIELD'

    return(
      <View style={styles.equipmentContainer}>
        <View style={{flexDirection:'row', height:80, borderWidth:1}}>
          <TextInputBoxWithTitle title={'SHIELD/Protective Item'} size={3} id={'NAME'} selector={itemValueSelector(shield)} setChanger={setter(shield)}/>
          <TextInputBoxWithTitle title={'AC BONUS'} size={1} id={'AC_BONUS'} selector={itemValueSelector(shield)} setChanger={setter(shield)} isNumber={true}/>
          <TextInputBoxWithTitle title={'WEIGHT'} size={1} id={'WEIGHT'} selector={itemValueSelector(shield)} setChanger={setter(shield)} isNumber={true}/>
          <TextInputBoxWithTitle title={'CHECK PENALTY'} size={1} 
            id={'CHECK_PENALTY'} selector={itemValueSelector(shield)} setChanger={setter(shield)} 
            isNumber={true}
            />
        </View>
        <View style={{flexDirection:'row', height:80, borderWidth:1}}>
          <TextInputBoxWithTitle title={'SPELL FAILURE'} size={1} id={'SPELL_FAILURE'} selector={itemValueSelector(shield)} setChanger={setter(shield)} isNumber={true}/>
          <TextInputBoxWithTitle title={'SPECIAL PROPERTIES'} size={4} id={'SPECIAL_PROPS'} selector={itemValueSelector(shield)} setChanger={setter(shield)}/>
        </View>
      </View>
    )
  }

  const ProtectiveItem = ({index}) => {
    
    const prot = 'PROT_ITEM'+index
    return(
      <View style={styles.equipmentContainer}>
        <View style={{flexDirection:'row', height:80, borderWidth:1}}>
          <TextInputBoxWithTitle title={'PROTECTIVE ITEM'} size={3} id={'NAME'} selector={itemValueSelector(prot)} setChanger={setter(prot)}/>
          <TextInputBoxWithTitle title={'AC BONUS'} size={1} id={'AC_BONUS'} selector={itemValueSelector(prot)} setChanger={setter(prot)} isNumber={true}/>
          <TextInputBoxWithTitle title={'WEIGHT'} size={1} id={'WEIGHT'} selector={itemValueSelector(prot)} setChanger={setter(prot)} isNumber={true}/>
          <TextInputBoxWithTitle title={'SPECIAL PROPERTIES'} size={3}  id={'SPECIAL_PROPS'} selector={itemValueSelector(prot)} setChanger={setter(prot)}/>
        </View>
      </View>
    )
  }

 const  Weapon = ({index}) => {
  const weap = 'WEAPON'+index
  return(
  <View style={styles.equipmentContainer}>
    <View style={{flexDirection:'row', height:80, borderWidth:1}}>
      <TextInputBoxWithTitle title={'WEAPON'} size={3} id={'NAME'} selector={itemValueSelector(weap)}  setChanger={setter(weap)}/>
      <TextInputBoxWithTitle title={'RANGE'} size={1} id={'RANGE'} selector={itemValueSelector(weap)}  setChanger={setter(weap)} isNumber={true}/>
      <TextInputBoxWithTitle title={'TYPE'} size={1} id={'TYPE'} selector={itemValueSelector(weap)}  setChanger={setter(weap)}/>
      <TextInputBoxWithTitle title={'AMMO'} size={1} id={'AMMO'} selector={itemValueSelector(weap)}  setChanger={setter(weap)} isNumber={true}/>
      <TextInputBoxWithTitle title={'WEIGHT'} size={1} id={'WEIGHT'} selector={itemValueSelector(weap)}  setChanger={setter(weap)} isNumber={true}/>
    </View>
    <View style={{flexDirection:'row', height:80, borderWidth:1}}>
      <TextInputBoxWithTitle title={'DAMAGE'} size={1}  id={'DAMAGE'} selector={itemValueSelector(weap)}  setChanger={setter(weap)}/>
      <TextBoxWithTitle title={'BONUS FROM STAT'} size={1}  id={'BONUS_FROM_STAT'} selector={() => useSelector(selectWeaponStatModifier(weap))}  />
      <TextInputBoxWithTitle title={'DAMAGE BONUS'} size={1}  id={'DAMAGE_BONUS'} selector={itemValueSelector(weap)} setChanger={setter(weap)} />
      <TextInputBoxWithTitle title={'DAMAGE TYPE'} size={1}  id={'DAMAGE_TYPE'} selector={itemValueSelector(weap)}  setChanger={setter(weap)}/>
      <TextInputBoxWithTitle title={'SECOND DAMAGE'} size={1}  id={'BONUS_DAMAGE'} selector={itemValueSelector(weap)}  setChanger={setter(weap)}/>
      <TextInputBoxWithTitle title={'SECOND DAMAGE TYPE'} size={1}  id={'BONUS_DAMAGE_TYPE'} selector={itemValueSelector(weap)}  setChanger={setter(weap)}/>
      <TextInputBoxWithTitle title={'CRITICAL'} size={1}  id={'CRITICAL'} selector={itemValueSelector(weap)}  setChanger={setter(weap)} />
    </View>
    <View style={{flexDirection:'row', height:80, borderWidth:1}}>
      <TextBoxWithTitle 
        title={'CHAR ATTACK BONUS'} size={1} id={'ATK_BONUS'} 
        selector={() => useSelector(selectWeaponStatModifier(weap)) + useSelector(selectResourceItem('BASE_ATTACK_BONUS')) + useSelector(selectNormalSizeMod)}

      />
      <TextInputBoxWithTitle title={'GEAR ATTACK BONUS'} size={1} id={'ATK_BONUS'} selector={itemValueSelector(weap)}  setChanger={setter(weap)} isNumber={true}/>
      <DropdownBoxWithTitle title={'BONUS ATTRIBUTE'} size={1} id={'BONUS_ATTR'} selector={itemValueSelector(weap)}  setChanger={setter(weap)} />      
      <TextInputBoxWithTitle title={'NOTES'} size={3} id={'NOTES'} selector={itemValueSelector(weap)}  setChanger={setter(weap)}/>
    </View>
  </View>
  )
 }

  const TextBoxWithTitle = (props) => {
    return(
      <BoxWithTitle {...props} 
        Factory={({content:content, setContent:setContent}) =>  
          <Text style={{textAlign:'center', opacity:0.6 }}>{content}</Text>
        } 
      />
    )
  }
  const TextInputBoxWithTitle = (props) => {
    
    return(
      <BoxWithTitle {...props} 
        Factory={({content:content, setContent:setContent}) => 
          <TextInput style={{textAlign:'center' }}             
            onChangeText={(e)=>setContent(props.isNumber ? (parseInt(e.replace(/[^0-9]/g), '') ? parseInt(e.replace(/[^0-9]/g), '') : 0) : e)}  
            value={''+content}
            />
        } 
      />
    )
  }
  const DropdownBoxWithTitle = (props) => {
    return(
      <BoxWithTitle {...props} 
        Factory={({content:content, setContent:setContent}) => 
          <SelectDropdown 
            buttonStyle={{width:'100%', borderWidth:1, height:'100%', borderColor:'#444'}} 
            buttonTextStyle={{fontSize:10}} data={['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']} 
            defaultValue={content}
            defaultButtonText='STAT' 
            buttonTextAfterSelection={selectedItem => content}
            onSelect={setContent}
        />
        } 
      />      
    )
  }

  const BoxWithTitle = ({title, size, id='', selector, setChanger=()=>null, Factory=()=>null}) => {
    const content = selector(id)
    const setContent = setChanger(id)
    
    return(
      <View style={{flex:size,}}>
        <View style={{backgroundColor:'#000', paddingVertical:3, borderRightWidth :1, borderColor:'#fff', flex:2, justifyContent:'center'}}>
          <Text style={{color:'#fff', textAlign:'center'}}>{title} </Text>
        </View>
        <View style={{borderRightWidth:1, flex:3, justifyContent:'center'}}>
          <Factory content={content}  setContent={setContent} />
        </View>
      </View>
    )
  }  

  

  return(
    <View style={{width:'100%'}}>
      <SectionTitle title={'GEAR'} />
      <Weapon index={1}/>
      <Weapon index={2}/>
      <Weapon index={3}/>
      <Weapon index={4}/>
      <Armor />
      <Shield />
      <ProtectiveItem index={1} />
      <ProtectiveItem index={2} />
    </View>
  )
}

const styles = StyleSheet.create({
  equipmentContainer:{
    marginVertical:10, 
    borderWidth:3, 
    borderColor:'#444', 
    borderRadius:5
  }
  
  

});