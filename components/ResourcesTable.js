import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import {Cell, DoubleCell, CellInput} from './CellComponents'
import { TitleText, BigTitleText } from './TextComponents';

export const ResourcesTable = () => {
  return (
    <View style={styles.resourcesContainer}>
      <HealthBar />
      <ArmorBar />
      <MiscContainer />
    </View>
  )
}

MiscContainer = () => {
  return(
    <View style={styles.miscContainer}>
      <MiscItem text={'SPEED'}/>
      <MiscItem text={'DR'} legend={'damage reduction'}/>
      <MiscItem text={'SR'} legend={'spell resistance'}/>
      <MiscItem text={'PR'} legend={'poison resistance'}/>
      <MiscItem text={'FLAT'} legend={'ARMOR CLASS'}/>
      <MiscItem text={'Touch'} legend={'ARMOR CLASS'}/>
      <MiscItem text={'ATK'} legend={'Base attack Bonus'}/>
      <Initiative />
      <Grapple />
    </View>
  )
}
const MiscItem = ({text='', legend=''}) => {
  return(
    <View style={{flexDirection:'row', height:'25%', width:'33%', borderWidth:1}}>
      <DoubleCell text={text} legend={legend}/>
      <CellInput />
    </View>
  )
}

const Initiative = () => {
  return(
    <View style={{flexDirection:'row', height:'25%', width:'66%', borderWidth:1, alignItems:'center'}}>
      <DoubleCell text={'INITIATIVE'} legend={'MODIFIER'} />
      <CellWithLegend legend={'TOTAL'}/>
      <Text>=</Text>
      <CellWithLegend legend={'dex mod'}/>
      <Text>+</Text>
      <CellInputWithLegend legend={'misc mod'}/>
    </View>
  )
}
const Grapple = () => {
  return(
    <View style={{flexDirection:'row', height:'25%', width:'99%', borderWidth:1, alignItems:'center'}}>
      <DoubleCell text={'GRAPPLE'} legend={'MODIFIER'} />
      <CellWithLegend legend={'TOTAL'}/>
      <Text>=</Text>
      <CellWithLegend legend={'base atk'}/>
      <Text>+</Text>
      <CellInputWithLegend legend={'strength mod'}/>
      <Text>+</Text>
      <CellInputWithLegend legend={'size mod'}/>
      <Text>+</Text>
      <CellInputWithLegend legend={'misc mod'}/>
    </View>
  )
}


const CellInputWithLegend = ({legend}) => {
  return(
    <View style={{flex:1, flexDirection:'column'}}>
     <Text style={styles.smallLegend}>{legend}</Text>
    <CellInput />
    </View>
  )
}
const CellWithLegend = ({legend}) => {
  return(
    <View style={{flex:1, flexDirection:'column'}}>
      <Text style={styles.smallLegend}>{legend}</Text>
      <Cell />
    </View>
  )
}

const HealthBar = () => {
  let sum = 0 
  return(
    <View style={styles.healthBarContainer}>
      <DoubleCell text={'HP'} legend={'HIT POINTS'}/>
      <CellInputWithLegend legend={'Full HP'} />      
      <CellInputWithLegend legend={'Current HP'} />      
      <CellInputWithLegend legend={'Wounds'} />      
      <CellInputWithLegend legend={'Nonlethal Damage'} />      
    </View>
  )
}

const ArmorBar = () => { 
  let sum = 0

  return(
    <View style={styles.armorContainer}>
      <DoubleCell text={'AC'} legend={'ARMOR CLASS'}/>
      <View style={{flex:10}}>
        <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingRight:5}}>
          <CellWithLegend legend={'TOTAL'}/>
          <Text>= 10 + </Text>
          <CellWithLegend legend={'armor bonus'}/>
          <Text>+</Text>
          <CellWithLegend legend={'shield bonus'}/>
          <Text>+</Text>
          <CellWithLegend legend={'dex mod'}/>
          <Text>+</Text>
        </View>
        <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingRight:5}}>
          <CellInputWithLegend legend={'size mod'}/>
          <Text>+</Text>
          <CellInputWithLegend legend={'natural armor'}/>
          <Text>+</Text>
          <CellInputWithLegend legend={'deflection mod'}/>
          <Text>+</Text>
          <CellInputWithLegend legend={'misc mod'}/>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  resourcesContainer:{
    height:300,
    width:'100%',
    marginTop:20,
  },
  healthBarContainer:{
    flex:1,
    flexDirection:'row',
  },
  armorContainer:{
    flex:2,
    flexWrap:'wrap',
    flexDirection:'row',
  },
  miscContainer:{
    flex:4,
    flexDirection:'row',
    flexWrap:'wrap',
  },
  smallLegend:{
    fontSize: 10,
    color:'#888'
  }
  

})