import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { makeComponentWithSelector } from './ReduxHOC';

export const Cell = ({content, fontSize=22, color='#555'}) => {
  return(
    <View style={{...styles.statsCell, borderColor:color, opacity:0.75}}>
      <Text style={{...styles.cellText, fontSize:fontSize}}>{content}</Text>
    </View>
  )
}

export const LargeCell = ({content}) => {
  return(
    <View style={{...styles.statsCell, borderColor:'#a00', opacity:0.75}}>
      <Text style={{...styles.cellText, fontWeight:'bold', fontSize:20}}>{content}</Text>
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

const CellInputRaw = ({content, setContent, fontSize=22}) => {
  return(
    <View style={styles.statsCell}>
      <TextInput style={{...styles.cellText, fontSize:fontSize}} onChangeText={setContent} keyboardType={'numeric'} value={''+content}/>
    </View>
  )
}

export const CellInput = makeComponentWithSelector(CellInputRaw)

const CellInputWithLegendRaw = ({legend, content, setContent, fontSize=22}) => {
  return(
    <View style={{flex:1, flexDirection:'column'}}>
      <Text style={styles.smallLegend}>{legend}</Text>
      <CellInputRaw content={content} setContent={setContent} fontSize={fontSize}/>
    </View>
  )
}
export const CellInputWithLegend = makeComponentWithSelector(CellInputWithLegendRaw)


export const CellWithLegend = ({legend, content, fontSize=22, color='#555', opacity=0.75}) => {
  return(
    <View style={{flex:1, flexDirection:'column', opacity:opacity}}>
      <Text style={{...styles.smallLegend}}>{legend}</Text>
      <Cell content={content} fontSize={fontSize} color={color}/>
    </View>
  )
}

const styles = StyleSheet.create({
  statsCell:{
    flex:1,
    borderWidth:1,
    borderRadius:3,
    borderColor:'#555',
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
    borderColor:'#555',
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
    fontSize: 12,
    color:'#777'
  }
})