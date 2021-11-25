import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export const Cell = ({text=''}) => {
  return(
    <View style={styles.statsCell}>
      <Text style={styles.cellText}> {text} </Text>
    </View>
  )
}

export const DoubleCell = ({text='', legend=''}) => {
  return(
    <View style={styles.blackStatsCell}>
      <Text style={styles.cellTextWhite}> {text} </Text>
      <Text style={styles.cellTextWhiteLegend}>{legend}</Text>
    </View>
  )
}

export const CellInput = ({text='', setContent}) => {
  return(
    <View style={styles.statsCell}>
      <TextInput style={styles.cellText} onChangeText={setContent}>{text}</TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
  statsCell:{
    flex:1,
    borderWidth:1,
    borderRadius:3,
    borderColor:'#333',
    justifyContent:'center',
    color:'#000',
    fontSize:18,
    fontWeight: "bold", 
    marginBottom:7,
    marginHorizontal:3,
    marginVertical:3,
  },
  blackStatsCell:{
    borderWidth:1,
    borderRadius:3,
    borderColor:'#333',
    justifyContent:'center',
    backgroundColor:'#000',
    color:'#fff',
    fontSize:18,
    fontWeight: "bold", 
    marginVertical:3,
    marginHorizontal:3,
    paddingVertical:3,
    paddingHorizontal:3,
  },
  cellText:{
    fontSize:12,
    textAlign:'center', 
  },
  cellTextWhite:{
    color:'#fff',
    fontSize:18,
    fontWeight: "bold", 
    textAlign:'center', 
  },
  cellTextWhiteLegend:{
    color:'#fff',
    fontSize:10,
    fontWeight: "bold", 
    textAlign:'center', 
  },
})