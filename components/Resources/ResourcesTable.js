import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import {Cell, DoubleCell, CellInput, CellInputWithLegend, CellWithLegend} from '../CellComponents'
import { useDispatch, useSelector } from 'react-redux';
import { changeResourceItem, selectResourceItem, selectArmorBonus, selectShieldBonus, selectTotalArmor, selectInitiative, selectFlat, selectTouch, selectGrappleTotal, selectMaxDexMod, selectGrappleSizeMod, selectNormalSizeMod, changeResourceItemString } from './ResourcesSlice';
import { selectStatsModifier } from '../Stats/StatsSlice';
import SelectDropdown from 'react-native-select-dropdown';
import { selectGearItem, selectWeaponStatModifier } from '../Gear/GearSlice';
import { weapon } from '../CharManagement/NewCharacterTemplate';

export const ResourcesTable = () => {

  const dispatch = useDispatch()  
  const setter = (itemName)=> (e)=>dispatch(changeResourceItem({itemName:itemName, value:e}))
  const numberSetter = (itemName)=> (e)=>dispatch(changeResourceItem({itemName:itemName, value:e.replace(/[^0-9]/g, '')}))
  const itemSelector = itemName => useSelector(selectResourceItem(itemName))
  const modifierSelector = itemName => useSelector(selectStatsModifier(itemName))

  
  

  const MiscItem = ({content='', legend='', selector}) => {    
    return(
      <View style={{flexDirection:'row', height:50, width:130, borderWidth:1}}>
        <DoubleCell content={content} legend={legend}/>
        <Cell content={useSelector(selector)} />
      </View>
    )
  }

  const MiscInputItem = ({content='', legend='', name=''}) => {
    
    return(
      <View style={{flex:1, flexDirection:'row', height:50, borderWidth:1}}>
        <DoubleCell content={content} legend={legend}/>
        <CellInput id={name} selector={itemSelector} setChanger={numberSetter}/>
      </View>
    )
  }
  
  const Initiative = () => {
    return(
      <View style={{flexDirection:'row', height:70, width:300, borderWidth:1, alignItems:'center'}}>
        <DoubleCell content={'INITIATIVE'} legend={'MODIFIER'} />
        <CellWithLegend legend={'TOTAL'} content={useSelector(selectInitiative)} color={'#a00'} opacity={1} />
        <Text>=</Text>
        <CellWithLegend legend={'dex mod'} content={modifierSelector('DEX')}/>
        <Text>+</Text>
        <CellInputWithLegend legend={'misc mod'} id={'INI_MISC_MOD'} selector={itemSelector} setChanger={setter}/>
      </View>
    )
  }
  const Grapple = () => {    
    return(
      <View style={{flexDirection:'row', height:70, width:350, borderWidth:1, alignItems:'center'}}>
        <DoubleCell content={'GRAPPLE'} legend={'MODIFIER'} />
        <CellWithLegend legend={'TOTAL'} content={useSelector(selectGrappleTotal)} color={'#a00'} opacity={1}/>
        <Text>=</Text>
        <CellWithLegend legend={'base atk'} content={itemSelector('BASE_ATTACK_BONUS')}/>
        <Text>+</Text>
        <CellWithLegend legend={'strength mod'} content={modifierSelector('STR')}/>
        <Text>+</Text>
        <CellWithLegend legend={'size mod'} content={useSelector(selectGrappleSizeMod)} />
        <Text>+</Text>
        <CellInputWithLegend legend={'misc mod'} id={'GRAPPLE_MISC_MOD'} selector={itemSelector} setChanger={setter}/>
      </View>
    )
  }
  
  const HealthBar = () => {
    return(
      <View style={styles.healthBarContainer}>
        <DoubleCell content={'HP'} legend={'HIT POINTS'}/>
        <CellInputWithLegend legend={'Full HP'} id={'HP'} selector={itemSelector} setChanger={setter} fontSize={22} />      
        <CellInputWithLegend legend={'Current HP'} id={'CURRENT_HP'} selector={itemSelector} setChanger={setter} fontSize={22}/>      
        <CellInputWithLegend legend={'Wounds'} id={'WOUNDS'} selector={itemSelector} setChanger={setter} fontSize={22}/>      
        <CellInputWithLegend legend={'Nonlethal Damage'} id={'NON_LETHAL_DMG'} selector={itemSelector} setChanger={setter} fontSize={22}/>      
      </View>
    )
  }
  
  const ArmorBar = () => { 
  
    return(
      <View style={styles.armorContainer}>
        <DoubleCell content={'AC'} legend={'ARMOR CLASS'}/>
        <View style={{flex:15}}>
          <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingRight:5}}>
            <CellWithLegend legend={'TOTAL'} content={useSelector(selectTotalArmor)} fontSize={22} color={'#a00'} opacity={1}/>
            <Text style={styles.constants}>= 10 + </Text>
            <CellWithLegend legend={'armor bonus'} content={useSelector(selectArmorBonus)} fontSize={22}/>
            <Text style={styles.constants}>+</Text>
            <CellWithLegend legend={'shield bonus'} content={useSelector(selectShieldBonus)} fontSize={22}/>
            <Text style={styles.constants}>+</Text>
            <CellWithLegend legend={'dex mod'} content={useSelector(selectMaxDexMod)} fontSize={22} />
            <Text style={styles.constants}>+</Text>
          </View>
          <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingRight:5}}>
            <CellWithLegend legend={'size mod'} content={useSelector(selectNormalSizeMod)}/>
            <Text style={styles.constants}>+</Text>
            <CellInputWithLegend legend={'natural armor'} id={'NATURAL_ARMOR'} selector={itemSelector} setChanger={setter}/>
            <Text style={styles.constants}>+</Text>
            <CellInputWithLegend legend={'deflection mod'} id={'DEFLECT_MOD'} selector={itemSelector} setChanger={setter}/>
            <Text style={styles.constants}>+</Text>
            <CellInputWithLegend legend={'misc mod'} id={'ARMOR_MISC_MOD'} selector={itemSelector} setChanger={setter}/>
          </View>
        </View>
      </View>
    )
  }

  const WeaponBar = ({hand}) => {

    const i = hand == 'Main' ?  'MAIN_HAND' : 'OFF_HAND'
    const mh = useSelector(selectResourceItem(i)) || (hand == 'Main' ?  'WEAPON1' : 'SHIELD')
    let weap =  useSelector(selectGearItem(mh)) 
    const mod =  useSelector(selectWeaponStatModifier(mh))
    
    const x = (parseInt(useSelector(selectWeaponStatModifier(mh, 'damage')))+parseInt(weap.DAMAGE_BONUS)) 
    
    return(
      <View style={{marginVertical:5, flexDirection:'row', alignItems:'center'}}>
        <DoubleCell content={hand +'\n Hand'} legend={''}/>
        <SelectDropdown 
            buttonStyle={{width:60, borderWidth:1, height:50,  paddingHorizontal:0, borderColor:'#333'}} 
            buttonTextStyle={{fontSize:10}} data={['WEAPON1', 'WEAPON2', 'WEAPON3', 'WEAPON4', 'SHIELD', '']} 
            defaultValue={weap?.NAME}
            defaultButtonText={weap?.NAME }
            dropdownStyle={{width:120}}
            buttonTextAfterSelection={selectedItem => weap?.NAME}
            onSelect={ selectedItem => dispatch(changeResourceItemString({itemName:i, value:selectedItem}))}
            rowTextStyle={{fontSize:8}}
        />
        {
          weap?.DAMAGE ?
            <>
              <CellWithLegend legend={'Attack'} content={parseInt(mod)+parseInt(weap.ATK_BONUS)} fontSize={16}/>
              <CellWithLegend 
                legend={'Damage'} content={weap.DAMAGE + '+' 
                + x
                +'\n '+ weap.DAMAGE_TYPE} fontSize={16} 

              />
              <CellWithLegend legend={'Extra'} content={weap.BONUS_DAMAGE + '\n'+ weap.BONUS_DAMAGE_TYPE} fontSize={16} />        
              {/* <CellWithLegend legend={'Range'} content={weap.RANGE} fontSize={16} />         */}
              <CellWithLegend legend={'Ammo'} content={weap.AMMO} fontSize={16}  />     
            </>
            :
            <></>
        }
      </View>      
    )
  }

  const Extras = () => {
    return(
      <View style={{flex:1,borderWidth:2, fontSize:14, borderColor:'#333', margin:10, alignItems:'center'}}>
        <Text style={{fontSize:22, textAlign:'center', }}>Extras</Text>
        <Text style={{fontSize:12, textAlign:'center', color:'#555' }}>Write here anything that is missing(e.g. ki points, turn undead, etc)</Text>
        <View style={{ width:'95%', borderWidth:1, borderColor:'#333', margin:5}}>
          <TextInput 
            onChangeText={e => dispatch(changeResourceItemString({itemName:'EXTRAS', value:e}))} 
            style={{width:'100%', flexWrap:'wrap', fontSize:20}}
            value={useSelector(selectResourceItem('EXTRAS'))}
          ></TextInput>
        </View>
      </View>

    )
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.resourcesContainer}>
          <HealthBar />
          <View style={{flexDirection:'row'}}>
            <MiscInputItem content={'ATK'} legend={'Base attack Bonus'} name={'BASE_ATTACK_BONUS'}/>
            <MiscInputItem content={'SPEED'} name={'SPEED'}/>
          </View>
          <View style={{borderWidth:1, borderRadius:3, borderColor:'#333'}}>
            <Text>Equipped Weapons and Shields</Text>
            <WeaponBar hand={'Main'} />
            <WeaponBar hand={'Off'}/>
          </View>
          <ArmorBar />
          <View >
            <View style={{flexDirection:'row'}}>
              <MiscItem content={'FLAT'} legend={'ARMOR CLASS'} selector={selectFlat}/>
              <MiscItem content={'Touch'} legend={'ARMOR CLASS'} selector={selectTouch} />
            </View>
            <View style={{flexDirection:'row'}}>
              <MiscInputItem content={'DR'} legend={'damage reduction'} name={'DAMAGE_REDUCTION'} />
              <MiscInputItem content={'SR'} legend={'spell resistance'} name={'SPELL_RESISTANCE'}/>
              <MiscInputItem content={'PR'} legend={'poison resistance'} name={'POISON_RESISTANCE'}/>
            </View>
          </View>
          <Initiative />
          <Grapple />
          <Extras />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  resourcesContainer:{
    width:'100%',
    marginVertical:10,
  },
  healthBarContainer:{
    flexDirection:'row',
  },
  armorContainer:{
    flexWrap:'wrap',
    flexDirection:'row',
  },
  constants:{
    fontSize:22, 
    opacity:0.6, 
    color:'#aaa'
  }

})