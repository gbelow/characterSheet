import React from "react";
import { View, Text } from "react-native";
import { Cell, DoubleCell, CellInput } from "./CellComponents";
import { UnderlinedText, SectionTitle, UnderlinedTextInput, TitleText} from "./TextComponents";

export function SpellsView({}){
  
  const LevelList = ({level, list}) => {
    return(
      <View>
        <TitleText fontSize={16}>{level + ' level spells:'}</TitleText>
        <View style={{flexWrap:"wrap", height:100}}>
          {Array.from(Array(6).keys() ).map((el, id)=>{
            return <UnderlinedTextInput key={id} content={'lv'+level+' spell'} size={3}/>
          })}
        </View>
      </View>
    )
  }

  const Pair = ({title, value}) => {
    return(
      <View style={{flexDirection:'row', width:'70%' }}>
        <SectionTitle title={title} width={'50%'}/>
        <Cell text={value} />
      </View>
    )
  }

  const SpellSummary = () => {
    return (
      <View style={{width:'100%', marginVertical:20}}>
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
          <View><Text > {'SPELLS \n KNOWN'} </Text></View>
          <View><Text > {'SPELL \n SAVE DC'} </Text></View>
          <View><Text > {'LEVEL'} </Text></View>
          <View><Text > {'SPELLS \n PER DAY'} </Text></View>
          <View><Text > {'BONUS \n SPELLS'} </Text></View>
        </View>
  
        <DataRow stat={'STR'}  score={12} />
        <DataRow stat={'DEX'}  score={10} />
        <DataRow stat={'CON'}  score={12} />
        <DataRow stat={'INT'}  score={16} />
        <DataRow stat={'WIS'}  score={16} />
  
      </View>
    )
  }

  

const DataRow = ({}) => {

  return(
    <View style={{flexDirection:'row', height:40, justifyContent:'space-around'}}>
      <View ><CellInput text={5}   /></View>
      <View ><CellInput text={13}  /></View>
      <View ><Text style={{fontWeight:'bold'}}>{1+'th'}</Text></View>
      <View ><CellInput text={2}   /></View>
      <View ><CellInput text={0} /></View>
    </View>
  )
}
  
  return(
    <View style={{width:'100%', alignItems:"center",}}>
      <SectionTitle title={'SPELLS'}/>
      <UnderlinedText size={6} fontSize={16} legend={'Domains/Specialty'} content={'travel/knowledge'}/>
      {Array.from(Array(10).keys() ).map((el, id)=>{
            return <LevelList key={el} level ={el} />
          })}
      <Pair title={'SPELL SAVE'} value={'13'}/>
      <Pair title={'SPELL FAILURE'} value={'50%'}/>
      <SpellSummary />
    </View>
  )
}