import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import {Cell, DoubleCell, CellInput, LargeCell} from '../CellComponents'
import { TitleText, BigTitleText } from '../TextComponents';
import { selectStatsModifier } from '../Stats/StatsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { changeSaveItem, selectSaveItemValue, selectSaveTotal, convert } from './SavesSlice';

export const SavesTable = () => {

  const dispatch = useDispatch()  
  const setter = (itemName)=> valueName=> (e)=>dispatch(changeSaveItem({itemName:itemName, valueName:valueName, value:e}))
  const numberSetter = (itemName)=> valueName=> (e)=>dispatch(changeSaveItem({itemName:itemName, valueName:valueName, value:parseInt(e.replace(/[^0-9]/g, ''))}))
  const itemSelector = itemName=> itemValue => useSelector(selectSaveItemValue(itemName, itemValue))
  const totalSelector = itemName => useSelector(selectSaveTotal(itemName))
  const modifierSelector = itemName => useSelector(selectStatsModifier(itemName))

  const DataRow = ({stat='STR', legend=''}) => { 
      
    return(
      <View style={styles.savesTableRow}>
        <View style={{flex:3}}><DoubleCell content={stat}  legend={legend} /></View>
        <View style={styles.savesTableCol}><LargeCell content={totalSelector(stat)} /></View>
        <Text style={styles.savesTableSign}>=</Text>
        <View style={styles.savesTableCol}><CellInput id={'base'} selector={itemSelector(stat)} setChanger={numberSetter(stat)}/></View>
        <Text style={styles.savesTableSign}>+</Text>
        <View style={styles.savesTableCol}><Cell content={modifierSelector(convert(stat))}/></View>
        <Text style={styles.savesTableSign}>+</Text>
        <View style={styles.savesTableCol}><CellInput id={'magic'} selector={itemSelector(stat)} setChanger={numberSetter(stat)} /></View>
        <Text style={styles.savesTableSign}>+</Text>
        <View style={styles.savesTableCol}><CellInput id={'misc'} selector={itemSelector(stat)} setChanger={numberSetter(stat)} /></View>
        <Text style={styles.savesTableSign}>+</Text>
        <View style={styles.savesTableCol}><CellInput id={'temp'} selector={itemSelector(stat)} setChanger={numberSetter(stat)}/></View>
      </View>
    )
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.savesTable}>
          <View style={{...styles.savesTableRow, flex:0.6}}>
            <View style={{ flex:3 }}><BigTitleText>{'SAVING THROWS'}</BigTitleText></View>
            <View style={styles.savesTableCol}><BigTitleText style={{ }}> {'TOTAL'}</BigTitleText></View>
            <View style={styles.savesTableCol}><TitleText >{'Base \n Save'} </TitleText></View>
            <View style={styles.savesTableCol}><TitleText > {'Ability \n Modifier'} </TitleText></View>
            <View style={styles.savesTableCol}><TitleText > {'Magic \n Modifier'} </TitleText></View>
            <View style={styles.savesTableCol}><TitleText > {'Misc \n Modifier'} </TitleText></View>
            <View style={styles.savesTableCol}><TitleText > {'Temp. \n Modifier'}</TitleText></View>
          </View>
          <DataRow stat={'FORTITUDE'} legend={'(CONSTITUTION)'} baseSave={2} />
          <DataRow stat={'REFLEX'} legend={'(DEXTERITY)'} baseSave={0} />
          <DataRow stat={'WILL'} legend={'(WISDOM)'} baseSave={2} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  savesTable:{
    flex:1,
    width:'100%',
    marginTop:20,
  },
  savesTableCol:{
    flex:1
  },
  savesTableRow:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    marginVertical:10
  },
  savesTableSign:{
    fontSize: 16, 
    textAlign:'center',
    marginVertical:6,
  }

})