import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {Cell, DoubleCell, CellInput, } from '../CellComponents'
import {changeStatsItemValue, selectStatsModifier, selectStatsItem} from './StatsSlice';

const StatsTable = () => {  

  const dispatch = useDispatch()  
  const setter = (itemName, valueName)=> (e)=>dispatch(changeStatsItemValue({itemName:itemName, valueName:valueName ,value:e}))
  const itemSelector = itemName => useSelector(selectStatsItem(itemName))
  const modifierSelector = itemName => useSelector(selectStatsModifier(itemName))

  const DataRow = ({stat='STR'}) => {
    const {score, legend, buffs, debuffs} = itemSelector(stat)
    const modifier = modifierSelector(stat)
  
    return(
      <View style={styles.statsTableRow}>
        <View style={styles.statsTableCol}><DoubleCell content={stat}  legend={legend} /></View>
        <View style={styles.statsTableCol}><CellInput content={score}  setContent={setter(stat, 'score' )} /></View>
        <View style={styles.statsTableCol}><CellInput content={buffs}  setContent={setter(stat, 'buffs' )} /></View>
        <View style={styles.statsTableCol}><CellInput content={debuffs} setContent={setter(stat, 'debuffs' )}  /></View>
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