import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { makeComponentWithSelector } from './ReduxHOC';

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

const CellInputRaw = ({content, setContent}) => {
  return(
    <View style={styles.statsCell}>
      <TextInput style={styles.cellText} onChangeText={setContent} keyboardType={'numeric'} value={''+content}/>
    </View>
  )
}

export const CellInput = makeComponentWithSelector(CellInputRaw)

const CellInputWithLegendRaw = ({legend, content, setContent}) => {
  return(
    <View style={{flex:1, flexDirection:'column'}}>
      <Text style={styles.smallLegend}>{legend}</Text>
      <CellInputRaw content={content} setContent={setContent}/>
    </View>
  )
}
export const CellInputWithLegend = makeComponentWithSelector(CellInputWithLegendRaw)


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
    paddingHorizontal:4,
    paddingVertical:2,
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
  smallLegend:{
    fontSize: 10,
    color:'#888'
  }
})