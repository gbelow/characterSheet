import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Cell, DoubleCell, CellInput, CellInputWithLegend, CellWithLegend} from '../CellComponents'
import { useDispatch, useSelector } from 'react-redux';
import { changeResourceItem, selectResourceItem, selectArmorBonus, selectShieldBonus, selectTotalArmor, selectInitiative, selectFlat, selectTouch } from './ResourcesSlice';
import { selectStatsModifier } from '../Stats/StatsSlice';

export const ResourcesTable = () => {

  const dispatch = useDispatch()  
  const setter = (itemName)=> (e)=>dispatch(changeResourceItem({itemName:itemName, value:e}))
  const itemSelector = itemName => useSelector(selectResourceItem(itemName))
  const modifierSelector = itemName => useSelector(selectStatsModifier(itemName))

  MiscContainer = () => {
    return(
      <View style={styles.miscContainer}>
        <MiscInputItem content={'SPEED'} name={'SPEED'}/>
        <MiscInputItem content={'DR'} legend={'damage reduction'} name={'DAMAGE_REDUCTION'} />
        <MiscInputItem content={'SR'} legend={'spell resistance'} name={'SPELL_RESISTANCE'}/>
        <MiscInputItem content={'PR'} legend={'poison resistance'} name={'POISON_RESISTANCE'}/>
        <MiscItem content={'FLAT'} legend={'ARMOR CLASS'} name={'FLAT'} selector={selectFlat}/>
        <MiscItem content={'Touch'} legend={'ARMOR CLASS'} name={'TOUCH'} selector={selectTouch} />
        <MiscInputItem content={'ATK'} legend={'Base attack Bonus'} name={'BASE_ATTACK_BONUS'}/>
        <Initiative />
        <Grapple />
      </View>
    )
  }

  const MiscItem = ({content='', legend='', name='', selector}) => {    
    return(
      <View style={{flexDirection:'row', height:'25%', width:'33%', borderWidth:1}}>
        <DoubleCell content={content} legend={legend}/>
        <Cell content={useSelector(selector)} />
      </View>
    )
  }

  const MiscInputItem = ({content='', legend='', name=''}) => {
    return(
      <View style={{flexDirection:'row', height:'25%', width:'33%', borderWidth:1}}>
        <DoubleCell content={content} legend={legend}/>
        <CellInput content={itemSelector(name)} setContent={setter(name)}/>
      </View>
    )
  }
  
  const Initiative = () => {
    return(
      <View style={{flexDirection:'row', height:'25%', width:'66%', borderWidth:1, alignItems:'center'}}>
        <DoubleCell content={'INITIATIVE'} legend={'MODIFIER'} />
        <CellWithLegend legend={'TOTAL'} content={useSelector(selectInitiative)} />
        <Text>=</Text>
        <CellWithLegend legend={'dex mod'} content={modifierSelector('DEX')}/>
        <Text>+</Text>
        <CellInputWithLegend legend={'misc mod'} content={itemSelector('INI_MISC_MOD')} setContent={setter('INI_MISC_MOD')}/>
      </View>
    )
  }
  const Grapple = () => {    
    return(
      <View style={{flexDirection:'row', height:'25%', width:'99%', borderWidth:1, alignItems:'center'}}>
        <DoubleCell text={'GRAPPLE'} legend={'MODIFIER'} />
        <CellWithLegend legend={'TOTAL'} content={0}/>
        <Text>=</Text>
        <CellWithLegend legend={'base atk'} content={itemSelector('BASE_ATTACK_BONUS')}/>
        <Text>+</Text>
        <CellWithLegend legend={'strength mod'} content={modifierSelector('STR')}/>
        <Text>+</Text>
        <CellWithLegend legend={'size mod'} content={0} />
        <Text>+</Text>
        <CellInputWithLegend legend={'misc mod'} content={itemSelector('GRAPPLE_MISC_MOD')} setContent={setter('GRAPPLE_MISC_MOD')}/>
      </View>
    )
  }
  
  const HealthBar = () => {
    let sum = 0 
    return(
      <View style={styles.healthBarContainer}>
        <DoubleCell content={'HP'} legend={'HIT POINTS'}/>
        <CellInputWithLegend legend={'Full HP'} content={itemSelector('HP')} setContent={setter('HP')} />      
        <CellInputWithLegend legend={'Current HP'} content={itemSelector('CURRENT_HP')} setContent={setter('CURRENT_HP')}/>      
        <CellInputWithLegend legend={'Wounds'} content={itemSelector('WOUNDS')} setContent={setter('WOUNDS')}/>      
        <CellInputWithLegend legend={'Nonlethal Damage'} content={itemSelector('NON_LETHAL_DMG')} setContent={setter('NON_LETHAL_DMG')}/>      
      </View>
    )
  }
  
  const ArmorBar = () => { 
  
    return(
      <View style={styles.armorContainer}>
        <DoubleCell text={'AC'} legend={'ARMOR CLASS'}/>
        <View style={{flex:10}}>
          <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingRight:5}}>
            <CellWithLegend legend={'TOTAL'} content={useSelector(selectTotalArmor)}/>
            <Text>= 10 + </Text>
            <CellWithLegend legend={'armor bonus'} content={useSelector(selectArmorBonus)} />
            <Text>+</Text>
            <CellWithLegend legend={'shield bonus'} content={useSelector(selectShieldBonus)}/>
            <Text>+</Text>
            <CellWithLegend legend={'dex mod'} content={modifierSelector('DEX')} />
            <Text>+</Text>
          </View>
          <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingRight:5}}>
            <CellInputWithLegend legend={'size mod'}/>
            <Text>+</Text>
            <CellInputWithLegend legend={'natural armor'} content={itemSelector('NATURAL_ARMOR')} setContent={setter('NATURAL_ARMOR')}/>
            <Text>+</Text>
            <CellInputWithLegend legend={'deflection mod'} content={itemSelector('DEFLECT_MOD')} setContent={setter('DEFLECT_MOD')}/>
            <Text>+</Text>
            <CellInputWithLegend legend={'misc mod'} content={itemSelector('ARMOR_MISC_MOD')} setContent={setter('ARMOR_MISC_MOD')}/>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.resourcesContainer}>
      <HealthBar />
      <ArmorBar />
      <MiscContainer />
    </View>
  )
}




const styles = StyleSheet.create({
  resourcesContainer:{
    height:300,
    width:'100%',
    marginTop:20,
  },
  healthBarContainer:{
    flex:1,
    flexDirection:'row',
  },
  armorContainer:{
    flex:2,
    flexWrap:'wrap',
    flexDirection:'row',
  },
  miscContainer:{
    flex:4,
    flexDirection:'row',
    flexWrap:'wrap',
  },
  
  

})