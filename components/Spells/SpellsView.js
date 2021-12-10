import React from "react";
import { View, Text } from "react-native";
import { Cell, DoubleCell, CellInput } from "../CellComponents";
import { UnderlinedText, SectionTitle, UnderlinedTextInput, TitleText} from "../TextComponents";
import { 
  changeSpellValue, selectSpellLevel, selectSpellSummary, 
  selectSpellItem, changeSpellSummary, changeSpellItem, 
  selectSpellSave, selectArcaneFailure, selectSpellLevelItem,
  selectAllLevelIDs
}  from "./SpellsSlice";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

export function SpellsView({}){
  const dispatch = useDispatch()  
  const setChanger = level=> name => (e) => dispatch(changeSpellValue({level:level, name:name, value:e}))
  const setSummaryChanger = (level,name) => (e) => dispatch(changeSpellSummary({level:level, name:name, value:e}))
  const setItemChanger = (name) => (e) => dispatch(changeSpellItem({item:name, value:e}))
  const levelSelector = itemName => useSelector(selectSpellLevel(itemName), shallowEqual )
  const spellItemSelector = itemName => useSelector(selectSpellItem(itemName))
  const spellLevelItemSelector = (itemName, id) => useSelector(selectSpellLevelItem(itemName, id))
  
  const LevelList = ({level}) => {
    const spellIDs = levelSelector(level)
    const changer = setChanger(level)
    return(
      <View>
        <TitleText fontSize={16}>{level + ' level spells:'}</TitleText>
        <View style={{flexWrap:"wrap", height:100}}>
          {Object.values(spellIDs).map((el)=>{
            return <UnderlinedTextInput key={el} content={spellLevelItemSelector(level, el)} setContent={changer(el)} size={3}/>
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

    const summary = useSelector(selectSpellSummary)
    
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
      <View ><CellInput  content={parseInt(item.SPELLS_KNOWN)}  setContent={setSummaryChanger(level, 'SPELLS_KNOWN')} /></View>
      <View ><Cell  content={item.SPELL_SAVE_DC} /></View>
      <View ><Text style={{fontWeight:'bold'}}>{level+'th'}</Text></View>
      <View ><CellInput content={item.SPELLS_PER_DAY} setContent={setSummaryChanger(level, 'SPELLS_PER_DAY')} /></View>
      <View ><Cell content={item.BONUS_SPELLS} /></View>
    </View>
  )
}

  return(
    <View style={{width:'100%', alignItems:"center",}}>
      <SectionTitle title={'SPELLS'}/>
      <UnderlinedTextInput size={6} fontSize={16} legend={'Domains/Specialty'} content={spellItemSelector('DOMAIN')} setContent={setItemChanger('DOMAIN')}/>
      {useSelector(selectAllLevelIDs, shallowEqual).map((el, id)=>{
            return <LevelList key={el} level ={el} />
          })}
      <Pair title={'SPELL SAVE'} value={useSelector(selectSpellSave)}/>
      <Pair title={'SPELL FAILURE'} value={useSelector(selectArcaneFailure)} />
      <SpellSummary />
    </View>
  )
}