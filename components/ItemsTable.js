import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Cell } from './CellComponents';
import { SectionTitle } from './TextComponents';

export function ItemsTable() {

  const [numberItems, setNumberItems] = useState(32)

  const TableRow = ({id, name, weight, value}) => {
    return(
      <View style={{flexDirection:'row', borderBottomWidth:1, height:20, width:'50%'}}>
        <View style={{flex:3, borderRightWidth:1}}><TextInput></TextInput></View>
        <View style={{flex:1, borderRightWidth:1}}><TextInput></TextInput></View>
        <View style={{flex:1, borderRightWidth:1}}><TextInput></TextInput></View>
      </View>
    )
  }

  const TableLegend = () => {
    return(
      <View style={{flexDirection:'row', borderBottomWidth:1, height:20, width:'50%'}}>
        <View style={{flex:3, borderRightWidth:1, justifyContent:'center'}}><Text style={{textAlign:'center'}}>Item</Text></View>
        <View style={{flex:1, borderRightWidth:1, justifyContent:'center'}}><Text style={{textAlign:'center'}}>PG.</Text></View>
        <View style={{flex:1, borderRightWidth:1, justifyContent:'center'}}><Text style={{textAlign:'center'}}>WT.</Text></View>
      </View>
    )
  }

  const RowMap = () => {
    let n = numberItems
    return(
      <>
        {
          Array.from(Array(n).keys()).map(el => (
            <TableRow key={el} id={el}/>
          ))
        }
      </>
    )
  }

  const TotalWeight = () => {
    return(
      <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', width:'50%', alignItems:'center', paddingHorizontal:5}}>
        <Text style={{fontWeight:'bold'}}>TOTAL WEIGHT  </Text>
        <Cell content='0'/>
      </View>
    )
  }

  const Money = ({text}) => {
    return(
      <View style={{flexDirection:'row'}}>
        <Text>{text} - </Text>
        <TextInput></TextInput>
      </View>
    )
  }

  return(
    <View style={{width:'100%', borderWidth:1}}>
      <SectionTitle title={'OTHER POSSESIONS'} /> 
        <View style={{flexDirection:'row', width:'100%'}}>
          <TableLegend />
          <TableLegend />
        </View>
      <View style={{height:20*(numberItems+2)/2, flexWrap:'wrap'}}>
        <RowMap />
        <TotalWeight />
      </View>
      <SectionTitle title={'MONEY'} />
      <View style={{borderWidth:1, height:50, flexDirection:'row', justifyContent:'space-between',alignItems:'center' ,paddingHorizontal:10}}>
        <Money text={'CP'}/>
        <Money text={'SP'}/>
        <Money text={'GP'}/>
        <Money text={'PP'}/>
      </View>
    </View>
  )
}