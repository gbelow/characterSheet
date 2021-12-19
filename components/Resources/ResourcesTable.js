import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Cell, DoubleCell, CellInput, CellInputWithLegend, CellWithLegend} from '../CellComponents'
import { useDispatch, useSelector } from 'react-redux';
import { changeResourceItem, selectResourceItem, selectArmorBonus, selectShieldBonus, selectTotalArmor, selectInitiative, selectFlat, selectTouch, selectGrappleTotal, selectMaxDexMod, selectGrappleSizeMod, selectNormalSizeMod } from './ResourcesSlice';
import { selectStatsModifier } from '../Stats/StatsSlice';

export const ResourcesTable = () => {

  const dispatch = useDispatch()  
  const setter = (itemName)=> (e)=>dispatch(changeResourceItem({itemName:itemName, value:e}))
  const numberSetter = (itemName)=> (e)=>dispatch(changeResourceItem({itemName:itemName, value:e.replace(/[^0-9]/g, '')}))
  const itemSelector = itemName => useSelector(selectResourceItem(itemName))
  const modifierSelector = itemName => useSelector(selectStatsModifier(itemName))

  
  const MiscContainer = () => {
    return(
      <View style={styles.miscContainer}>
        <MiscInputItem content={'SPEED'} name={'SPEED'}/>
        <MiscInputItem content={'DR'} legend={'damage reduction'} name={'DAMAGE_REDUCTION'} />
        <MiscInputItem content={'SR'} legend={'spell resistance'} name={'SPELL_RESISTANCE'}/>
        <MiscInputItem content={'PR'} legend={'poison resistance'} name={'POISON_RESISTANCE'}/>
        <MiscItem content={'FLAT'} legend={'ARMOR CLASS'} selector={selectFlat}/>
        <MiscItem content={'Touch'} legend={'ARMOR CLASS'} selector={selectTouch} />
        <MiscInputItem content={'ATK'} legend={'Base attack Bonus'} name={'BASE_ATTACK_BONUS'}/>
        <Initiative />
        <Grapple />
      </View>
    )
  }

  const MiscItem = ({content='', legend='', selector}) => {    
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
        <CellInput id={name} selector={itemSelector} setChanger={numberSetter}/>
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
        <CellInputWithLegend legend={'misc mod'} id={'INI_MISC_MOD'} selector={itemSelector} setChanger={setter}/>
      </View>
    )
  }
  const Grapple = () => {    
    return(
      <View style={{flexDirection:'row', height:'25%', width:'99%', borderWidth:1, alignItems:'center'}}>
        <DoubleCell content={'GRAPPLE'} legend={'MODIFIER'} />
        <CellWithLegend legend={'TOTAL'} content={useSelector(selectGrappleTotal)}/>
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
        <CellInputWithLegend legend={'Full HP'} id={'HP'} selector={itemSelector} setChanger={setter} />      
        <CellInputWithLegend legend={'Current HP'} id={'CURRENT_HP'} selector={itemSelector} setChanger={setter}/>      
        <CellInputWithLegend legend={'Wounds'} id={'WOUNDS'} selector={itemSelector} setChanger={setter}/>      
        <CellInputWithLegend legend={'Nonlethal Damage'} id={'NON_LETHAL_DMG'} selector={itemSelector} setChanger={setter}/>      
      </View>
    )
  }
  
  const ArmorBar = () => { 
  
    return(
      <View style={styles.armorContainer}>
        <DoubleCell content={'AC'} legend={'ARMOR CLASS'}/>
        <View style={{flex:10}}>
          <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingRight:5}}>
            <CellWithLegend legend={'TOTAL'} content={useSelector(selectTotalArmor)}/>
            <Text>= 10 + </Text>
            <CellWithLegend legend={'armor bonus'} content={useSelector(selectArmorBonus)} />
            <Text>+</Text>
            <CellWithLegend legend={'shield bonus'} content={useSelector(selectShieldBonus)}/>
            <Text>+</Text>
            <CellWithLegend legend={'dex mod'} content={useSelector(selectMaxDexMod)} />
            <Text>+</Text>
          </View>
          <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingRight:5}}>
            <CellWithLegend legend={'size mod'} content={useSelector(selectNormalSizeMod)}/>
            <Text>+</Text>
            <CellInputWithLegend legend={'natural armor'} id={'NATURAL_ARMOR'} selector={itemSelector} setChanger={setter}/>
            <Text>+</Text>
            <CellInputWithLegend legend={'deflection mod'} id={'DEFLECT_MOD'} selector={itemSelector} setChanger={setter}/>
            <Text>+</Text>
            <CellInputWithLegend legend={'misc mod'} id={'ARMOR_MISC_MOD'} selector={itemSelector} setChanger={setter}/>
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