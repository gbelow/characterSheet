import React, { useState } from 'react';
import { FlatList, SafeAreaView, Text, TextInput, View } from 'react-native';
import { Cell, CellWithLegend } from '../CellComponents';
import { SectionTitle } from '../TextComponents';
import { useDispatch, useSelector } from 'react-redux';
import { changeItemValue, selectItem, selectWeightSum, selectCoins, changeCoin, selectWeightLimits } from './ItemsSlice';

export function ItemsTable() {
  const dispatch = useDispatch()  
  const setter = (id, value)=> (e) => dispatch(changeItemValue({itemNumber:id, item:{[value]:e}}))
  const itemSelector = itemName => useSelector(selectItem(itemName))
  
  const [numberItems, setNumberItems] = useState(32)
  
  const TableRow = ({id}) => {
    const item = itemSelector(id)
    
    return(
      <View style={{flexDirection:'row', borderBottomWidth:1, height:20, width:'50%'}}>
        <View style={{flex:3, borderRightWidth:1}}><TextInput onChangeText={setter(id, 'name')} value={''+item.name}/></View>
        <View style={{flex:0.6, borderRightWidth:1}}><TextInput onChangeText={setter(id, 'value')} value={''+item.value}/></View>
        <View style={{flex:0.6, borderRightWidth:1}}><TextInput onChangeText={setter(id, 'weight')} value={''+item.weight}/></View>
        <View style={{flex:0.6, borderRightWidth:1}}><TextInput onChangeText={setter(id, 'quantity')} value={item.quantity ? ''+item.quantity : '0'}/></View>
      </View>
    )
  }

  const TableLegend = () => {
    return(
      <View style={{flexDirection:'row', borderBottomWidth:1, height:20, width:'50%'}}>
        <View style={{flex:3, borderRightWidth:1, justifyContent:'center'}}><Text style={{textAlign:'center'}}>Item</Text></View>
        <View style={{flex:0.6, borderRightWidth:1, justifyContent:'center'}}><Text style={{textAlign:'center'}}>PG.</Text></View>
        <View style={{flex:0.6, borderRightWidth:1, justifyContent:'center'}}><Text style={{textAlign:'center'}}>WT.</Text></View>
        <View style={{flex:0.6, borderRightWidth:1, justifyContent:'center'}}><Text style={{textAlign:'center'}}>QT.</Text></View>
      </View>
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
        <TextInput onChangeText={coinChange(id)} value={''+coins.amount} />
      </View>
    )
  }

  const WeightLimits = ({}) => {

    const caps = useSelector(selectWeightLimits)

    return(
      <View>
        <SectionTitle title={'WEIGHT LIMITS'} />
        <View style={{borderWidth:1, height:80, flexDirection:'row', justifyContent:'space-between',alignItems:'center' ,paddingHorizontal:10}}>          
          <CellWithLegend legend={'LIGHT'} content={caps.light}/>          
          <CellWithLegend legend={'MEDIUM'} content={caps.medium}/>          
          <CellWithLegend legend={'HEAVY'} content={caps.heavy}/>          
          <CellWithLegend legend={'OVERHEAD'} content={caps.over}/>
          <CellWithLegend legend={'OFF GROUND'} content={caps.off}/>
          <CellWithLegend legend={'PUSH OR DRAG'} content={caps.drag}/>
        </View>
      </View>
    )
  }

  return(
    <SafeAreaView style={{marginHorizontal:5, alignItems:'center'}}>
      <FlatList 
        data={Array.from(Array(numberItems).keys())}
        renderItem={({item})=> <TableRow  id={item}/>}
        keyExtractor={(item) =>  item+''}
        numColumns={2}
        removeClippedSubviews={false}
        ListHeaderComponent={
          <>
            <SectionTitle title={'OTHER POSSESIONS'} /> 
            <View style={{flexDirection:'row', width:'100%'}}>
              <TableLegend />
              <TableLegend />
            </View>
          </>
        }
        ListFooterComponent={
          <>
            <TotalWeight />
            <SectionTitle title={'MONEY'} />
            <View style={{borderWidth:1, height:50, flexDirection:'row', justifyContent:'space-between',alignItems:'center' ,paddingHorizontal:10}}>
              <Money text={'CP'} id={'CP'}/>
              <Money text={'SP'} id={'SP'}/>
              <Money text={'GP'} id={'GP'}/>
              <Money text={'PP'} id={'PP'}/>
            </View>
            <WeightLimits />
          </>
        }
      />
    </SafeAreaView>
  )
}