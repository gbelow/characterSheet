import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import {Cell, DoubleCell, CellInput} from '../CellComponents'
import { TitleText, BigTitleText } from '../TextComponents';
import { selectStatsModifier } from '../Stats/StatsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { changeSaveItem, selectSaveItem, selectSaveTotal, convert } from './SavesSlice';

export const SavesTable = () => {

  const dispatch = useDispatch()  
  const setter = (itemName)=> (e)=>dispatch(changeSaveItem({itemName:itemName, value:e}))
  const itemSelector = itemName => useSelector(selectSaveItem(itemName))
  const totalSelector = itemName => useSelector(selectSaveTotal(itemName))
  const modifierSelector = itemName => useSelector(selectStatsModifier(itemName))

  const DataRow = ({stat='STR', legend=''}) => { 
    let sum = 0
  
    return(
      <View style={styles.savesTableRow}>
        <View style={{flex:3}}><DoubleCell content={stat}  legend={legend} /></View>
        <View style={styles.savesTableCol}><CellInput content={itemSelector('BASE_'+stat)} setContent={setter('BASE_'+stat)}/></View>
        <Text style={styles.savesTableSign}>+</Text>
        <View style={styles.savesTableCol}><Cell content={modifierSelector(convert(stat))}/></View>
        <Text style={styles.savesTableSign}>+</Text>
        <View style={styles.savesTableCol}><CellInput content={itemSelector('MAGIC_'+stat)} setContent={setter('MAGIC_'+stat)} /></View>
        <Text style={styles.savesTableSign}>+</Text>
        <View style={styles.savesTableCol}><CellInput content={itemSelector('MISC_'+stat)} setContent={setter('MISC_'+stat)} /></View>
        <Text style={styles.savesTableSign}>+</Text>
        <View style={styles.savesTableCol}><CellInput content={itemSelector('TEMP_'+stat)} setContent={setter('BASE_'+stat)}/></View>
        <Text style={styles.savesTableSign}>=</Text>
        <View style={styles.savesTableCol}><Cell content={totalSelector(stat)} /></View>
      </View>
    )
  }

  return (
    <View style={styles.savesTable}>
      <View style={{...styles.savesTableRow, flex:0.6}}>
        <View style={{ flex:3 }}><BigTitleText>{'SAVING THROWS'}</BigTitleText></View>
        <View style={styles.savesTableCol}><TitleText >{'Base \n Save'} </TitleText></View>
        <View style={styles.savesTableCol}><TitleText > {'Ability \n Modifier'} </TitleText></View>
        <View style={styles.savesTableCol}><TitleText > {'Magic \n Modifier'} </TitleText></View>
        <View style={styles.savesTableCol}><TitleText > {'Misc \n Modifier'} </TitleText></View>
        <View style={styles.savesTableCol}><TitleText > {'Temp. \n Modifier'}</TitleText></View>
        <View style={styles.savesTableCol}><BigTitleText style={{ }}> {'TOTAL'}</BigTitleText></View>
      </View>

      <DataRow stat={'FORTITUDE'} legend={'(CONSTITUTION)'} baseSave={2} />
      <DataRow stat={'REFLEX'} legend={'(DEXTERITY)'} baseSave={0} />
      <DataRow stat={'WILL'} legend={'(WISDOM)'} baseSave={2} />

    </View>
  )
}


const styles = StyleSheet.create({
  savesTable:{
    height:145,
    width:'100%',
    marginTop:20,
  },
  savesTableCol:{
    flex:1
  },
  savesTableRow:{
    flex:1,
    flexDirection:'row',
  },
  savesTableSign:{
    fontSize: 16, 
    textAlign:'center',
    marginVertical:6,
  }

})