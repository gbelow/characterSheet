import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {Cell, DoubleCell, CellInput} from '../CellComponents'
import {changeStatsItemValue, selectStatsModifier, selectStatsItemValue} from './StatsSlice';

const StatsTable = () => {  

  const dispatch = useDispatch()  
  const setter = (itemName)=> valueName => (e)=>dispatch(changeStatsItemValue({itemName:itemName, valueName:valueName ,value:e}))
  const numberSetter = (itemName)=> valueName => (e)=>dispatch(changeStatsItemValue({itemName:itemName, valueName:valueName ,value:e.replace(/[^0-9]/g, '')}))
  const modifierSelector = itemName => useSelector(selectStatsModifier(itemName))
  const statItemValueSelector = itemName => valueName => useSelector(selectStatsItemValue(itemName, valueName))

  const DataRow = ({stat='STR'}) => {
    const legend = useSelector(selectStatsItemValue(stat, legend))
    const modifier = modifierSelector(stat)
  
    return(
      <View style={styles.statsTableRow}>
        <View style={styles.statsTableCol}><DoubleCell content={stat}  legend={legend} /></View>
        <View style={styles.statsTableCol}><CellInput id={'score'}  selector={statItemValueSelector(stat)} setChanger={numberSetter(stat)} /></View>
        <View style={styles.statsTableCol}><CellInput id={'buffs'}  selector={statItemValueSelector(stat)} setChanger={numberSetter(stat)} /></View>
        <View style={styles.statsTableCol}><CellInput id={'debuffs'} selector={statItemValueSelector(stat)} setChanger={numberSetter(stat)} /></View>
        <View style={styles.statsTableCol}><Cell content={'+'+modifier} /></View>
      </View>
    )
  }

  return (
    <View style={styles.statsTable}>
      <View style={{...styles.statsTableRow, flex:0.6}}>
        <View><Text style={styles.statsTableTitle}> {'Ability \n Name'} </Text></View>
        <View><Text style={styles.statsTableTitle}> {'Ability \n Score'} </Text></View>
        <View><Text style={styles.statsTableTitle}> {'Buffs'} </Text></View>
        <View><Text style={styles.statsTableTitle}> {'Debuffs'} </Text></View>
        <View><Text style={styles.statsTableTitle}> {'Ability \n Modifier'} </Text></View>
      </View>

      <DataRow stat={'STR'} />
      <DataRow stat={'DEX'} />
      <DataRow stat={'CON'} />
      <DataRow stat={'INT'} />
      <DataRow stat={'WIS'} />
      <DataRow stat={'CHA'} />
    </View>
  )  
}

export default StatsTable

const styles = StyleSheet.create({

  statsTable:{
    height:275,
    width:'100%',
    marginTop:20,
  },
  statsTableTitle:{    
    fontSize: 10,
    color:'#888',
    textAlign:'center', 
  },  
  statsTableRow:{
    flex:1,
    flexDirection:'row',
    height:40,
    justifyContent:'space-around', 
  },
  statsTableCol:{
    flex:1,
  }

})