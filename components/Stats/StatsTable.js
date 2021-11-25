import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {Cell, DoubleCell, CellInput, } from '../CellComponents'
import {changeStatsItemValue, selectStatsItemValue, selectStatsItem} from './StatsSlice';

const StatsTable = () => {

  const dispatch = useDispatch()
  const itemValueselector = (itemName, valueName) => useSelector(selectStatsItemValue(itemName, valueName))
  const itemselector = itemName => useSelector(selectStatsItem(itemName))
  const setter = (itemName, valueName)=> (e)=>dispatch(changeStatsItemValue({itemName:itemName, valueName:valueName ,value:e}))
  
  const DataRow = ({stat='STR', score=10, legend='STRENGTH', buffs=0, debuffs=0}) => {
  
    const modifier = Math.floor((score+buffs-10)/2)
    
    return(
      <View style={styles.statsTableRow}>
        <View style={styles.statsTableCol}><DoubleCell text={stat}  legend={legend} /></View>
        <View style={styles.statsTableCol}><CellInput text={score}  setContent={setter(stat, 'score' )} /></View>
        <View style={styles.statsTableCol}><CellInput text={buffs}  setContent={setter(stat, 'buffs' )} /></View>
        <View style={styles.statsTableCol}><CellInput text={debuffs} setContent={setter(stat, 'debuffs' )}  /></View>
        <View style={styles.statsTableCol}><Cell text={'+'+modifier} /></View>
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

      <DataRow stat={'STR'} {...itemselector('STR')} />
      <DataRow stat={'DEX'} {...itemselector('DEX')} />
      <DataRow stat={'CON'} {...itemselector('CON')} />
      <DataRow stat={'INT'} {...itemselector('INT')} />
      <DataRow stat={'WIS'} {...itemselector('WIS')} />
      <DataRow stat={'CHA'} {...itemselector('CHA')} />

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