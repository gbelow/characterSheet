import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import {Cell, DoubleCell, CellInput} from './CellComponents'
import { TitleText, BigTitleText } from './TextComponents';

export const SavesTable = () => {
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

const DataRow = ({stat='STR', baseSave=10, legend=''}) => { 
  let sum = 0

  return(
    <View style={styles.savesTableRow}>
      <View style={{flex:3}}><DoubleCell text={stat}  legend={legend} /></View>
      <View style={styles.savesTableCol}><Cell text={ baseSave} /></View>
      <Text style={styles.savesTableSign}>+</Text>
      <View style={styles.savesTableCol}><Cell/></View>
      <Text style={styles.savesTableSign}>+</Text>
      <View style={styles.savesTableCol}><CellInput/></View>
      <Text style={styles.savesTableSign}>+</Text>
      <View style={styles.savesTableCol}><CellInput/></View>
      <Text style={styles.savesTableSign}>+</Text>
      <View style={styles.savesTableCol}><CellInput/></View>
      <Text style={styles.savesTableSign}>=</Text>
      <View style={styles.savesTableCol}><Cell text={sum}  /></View>
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