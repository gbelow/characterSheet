import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export const Cell = ({content}) => {
  return(
    <View style={styles.statsCell}>
      <Text style={styles.cellText}>{content}</Text>
    </View>
  )
}

export const DoubleCell = ({content='', legend=''}) => {
  return(
    <View style={styles.blackStatsCell}>
      <Text style={styles.cellTextWhite}>{content}</Text>
      <Text style={styles.cellTextWhiteLegend}>{legend}</Text>
    </View>
  )
}

export const CellInput = ({content='', setContent}) => {
  return(
    <View style={styles.statsCell}>
      <TextInput style={styles.cellText} onChangeText={setContent}>{content}</TextInput>
    </View>
  )
}

export const CellInputWithLegend = ({legend, content, setContent}) => {
  return(
    <View style={{flex:1, flexDirection:'column'}}>
     <Text style={styles.smallLegend}>{legend}</Text>
    <CellInput content={content} setContent={setContent}/>
    </View>
  )
}
export const CellWithLegend = ({legend, content}) => {
  return(
    <View style={{flex:1, flexDirection:'column'}}>
      <Text style={styles.smallLegend}>{legend}</Text>
      <Cell content={content} />
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