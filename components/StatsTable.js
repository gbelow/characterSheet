import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import {Cell, DoubleCell, CellInput, } from './CellComponents'

export const StatsTable = () => {
  return (
    <View style={styles.statsTable}>
      <View style={{...styles.statsTableRow, flex:0.6}}>
        <View><Text style={styles.statsTableTitle}> {'Ability \n Name'} </Text></View>
        <View><Text style={styles.statsTableTitle}> {'Ability \n Score'} </Text></View>
        <View><Text style={styles.statsTableTitle}> {'Buffs'} </Text></View>
        <View><Text style={styles.statsTableTitle}> {'Debuffs'} </Text></View>
        <View><Text style={styles.statsTableTitle}> {'Ability \n Modifier'} </Text></View>
      </View>

      <DataRow stat={'STR'} legend={'STRENGTH'} score={12} />
      <DataRow stat={'DEX'} legend={'DEXTERITY'} score={10} />
      <DataRow stat={'CON'} legend={'CONSTITUTION'} score={12} />
      <DataRow stat={'INT'} legend={'INTELLIGENCE'} score={16} />
      <DataRow stat={'WIS'} legend={'WISDOM'} score={16} />
      <DataRow stat={'CHA'} legend={'CHARISMA'} score={10} />

    </View>
  )
}

const DataRow = ({stat='STR', score=10, legend='STRENGTH', buffs=0, debuffs=0}) => {
  
  const modifier = Math.floor((score+buffs-10)/2)

  return(
    <View style={styles.statsTableRow}>
      <View style={styles.statsTableCol}><DoubleCell text={stat}  legend={legend} /></View>
      <View style={styles.statsTableCol}><CellInput text={score}  /></View>
      <View style={styles.statsTableCol}><CellInput text={buffs}   /></View>
      <View style={styles.statsTableCol}><CellInput text={debuffs}   /></View>
      <View style={styles.statsTableCol}><Cell text={'+'+modifier} /></View>
    </View>
  )
}

const data=[
  {id:'0', component:<DataRow stat={'STR'} legend={'STRENGTH'} score={12} />},
  {id:'1', component:<DataRow stat={'DEX'} legend={'DEXTERITY'} score={10} />},
  {id:'2', component:<DataRow stat={'CON'} legend={'CONSTITUTION'} score={12} />},
  {id:'3', component:<DataRow stat={'INT'} legend={'INTELLIGENCE'} score={16} />},
  {id:'4', component:<DataRow stat={'WIS'} legend={'WISDOM'} score={16} />},
  {id:'5', component:<DataRow stat={'CHA'} legend={'CHARISMA'} score={10} />},
]

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