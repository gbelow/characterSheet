import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Cell } from '../CellComponents';
import { SectionTitle } from '../TextComponents';
import { useDispatch, useSelector } from 'react-redux';
import { changeItemValue, selectItem, selectWeightSum, selectCoins, changeCoin } from './ItemsSlice';

export function ItemsTable() {
  const dispatch = useDispatch()  
  const setter = (id, value)=> (e) => dispatch(changeItemValue({itemNumber:id, item:{[value]:e}}))
  const itemSelector = itemName => useSelector(selectItem(itemName))
  
  const [numberItems, setNumberItems] = useState(32)
  
  const TableRow = ({id}) => {
    const item = itemSelector(id)
    
    return(
      <View style={{flexDirection:'row', borderBottomWidth:1, height:20, width:'50%'}}>
        <View style={{flex:3, borderRightWidth:1}}><TextInput onChangeText={setter(id, 'name')}>{item.name}</TextInput></View>
        <View style={{flex:1, borderRightWidth:1}}><TextInput onChangeText={setter(id, 'value')}>{item.value}</TextInput></View>
        <View style={{flex:1, borderRightWidth:1}}><TextInput onChangeText={setter(id, 'weight')}>{item.weight}</TextInput></View>
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
        <Cell content={useSelector(selectWeightSum)}/>
      </View>
    )
  }

  const Money = ({text, id}) => {
    const coins = useSelector(selectCoins(id))
    const coinChange = id => (e) => dispatch(changeCoin({id:id, value:e}))
    
    return(
      <View style={{flexDirection:'row', alignItems:'center'}}>
        <Text>{text} - </Text>
        <TextInput onChangeText={coinChange(id)}>{coins.amount}</TextInput>
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
        <Money text={'CP'} id={'CP'}/>
        <Money text={'SP'} id={'SP'}/>
        <Money text={'GP'} id={'GP'}/>
        <Money text={'PP'} id={'PP'}/>
      </View>
    </View>
  )
}