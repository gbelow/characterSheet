import React from "react";
import { View, Text } from "react-native";
import { Cell, DoubleCell, CellInput } from "../CellComponents";
import { UnderlinedText, SectionTitle, UnderlinedTextInput, TitleText} from "../TextComponents";
import { changeSpellValue, selectSpellLevel, selectSpellSummary } from "./SpellsSlice";
import { useDispatch, useSelector } from 'react-redux';

export function SpellsView({}){
  const dispatch = useDispatch()  
  const setChanger = level=> name => (e) => dispatch(changeSpellValue({level:level, name:name, value:e}))
  const levelSelector = itemName => useSelector(selectSpellLevel(itemName))
  
  const LevelList = ({level, list}) => {
    const spells = levelSelector(level)
    const changer = setChanger(level)
    return(
      <View>
        <TitleText fontSize={16}>{level + ' level spells:'}</TitleText>
        <View style={{flexWrap:"wrap", height:100}}>
          {Object.values(spells).map((el, id)=>{
            return <UnderlinedTextInput key={id} content={spells[id]} setContent={changer(id)} size={3}/>
          })}
        </View>
      </View>
    )
  }

  const Pair = ({title, value}) => {
    return(
      <View style={{flexDirection:'row', width:'70%' }}>
        <SectionTitle title={title} width={'50%'}/>
        <Cell content={value} />
      </View>
    )
  }

  const SpellSummary = () => {

    const summary = useSelector(selectSpellSummary('WIS'))
    
    return (
      <View style={{width:'100%', marginVertical:20}}>
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
          <View><Text > {'SPELLS \n KNOWN'} </Text></View>
          <View><Text > {'SPELL \n SAVE DC'} </Text></View>
          <View><Text > {'LEVEL'} </Text></View>
          <View><Text > {'SPELLS \n PER DAY'} </Text></View>
          <View><Text > {'BONUS \n SPELLS'} </Text></View>
        </View>
  
        {Object.values(summary).map((el, i)=> <DataRow key={i} level={i} item={el} /> )     }
  
      </View>
    )
  }

  

const DataRow = ({level, item}) => {

  return(
    <View style={{flexDirection:'row', height:40, justifyContent:'space-around'}}>
      <View ><CellInput  content={item.SPELLS_KNOWN}  /></View>
      <View ><CellInput  content={item.SPELL_SAVE_DC} /></View>
      <View ><Text style={{fontWeight:'bold'}}>{level+'th'}</Text></View>
      <View ><CellInput content={item.SPELLS_PER_DAY}  /></View>
      <View ><CellInput content={item.BONUS_SPELLS} /></View>
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