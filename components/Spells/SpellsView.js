import React, { useCallback } from "react";
import { View, Text } from "react-native";
import { Cell, DoubleCell, CellInput } from "../CellComponents";
import { UnderlinedText, SectionTitle, UnderlinedTextInput, TitleText} from "../TextComponents";
import { 
  changeSpellValue, selectSpellLevel, selectSpellSummaryLevelItem, 
  selectSpellItem, changeSpellSummary, changeSpellItem, 
  selectSpellSave, selectArcaneFailure, selectSpellLevelItem,
  selectAllLevelIDs, selectSpellSummaryKeys, selectSpellSaveDC, selectBonusSpells
}  from "./SpellsSlice";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

export function SpellsView({}){
  const dispatch = useDispatch()  
  const setChanger = useCallback(level=> name => (e) => dispatch(changeSpellValue({level:level, name:name, value:e})),[])
  const setSummaryChanger = useCallback(level => name => (e) => dispatch(changeSpellSummary({level:level, name:name, value:e})),[])
  const setItemChanger = useCallback((name) => (e) => dispatch(changeSpellItem({item:name, value:e})),[])
  const levelSelector = useCallback(itemName => useSelector(selectSpellLevel(itemName), shallowEqual ),[])
  const spellItemSelector = itemName => useSelector(selectSpellItem(itemName))
  const spellLevelItemSelector = useCallback((itemName) => id => useSelector(selectSpellLevelItem(itemName, id)),[])

  
  const LevelList = ({level}) => {
    const spellIDs = levelSelector(level)
    const changer = setChanger(level)
    const selector = spellLevelItemSelector(level)
    // console.log('dang' + level)
    
    return(
      <View>
        <TitleText fontSize={16}>{level + ' level spells:'}</TitleText>
        <View style={{flexWrap:"wrap", height:100}}>
          {Object.values(spellIDs).map((el)=>{
            return <UnderlinedTextInput key={level+'_'+el} id={el} selector={selector} setChanger={changer} size={2.5}/>
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
    const keys = useSelector(selectSpellSummaryKeys)
    return (
      <View style={{width:'100%', marginVertical:20}}>
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
          <View><Text > {'SPELLS \n KNOWN'} </Text></View>
          <View><Text > {'SPELL \n SAVE DC'} </Text></View>
          <View><Text > {'LEVEL'} </Text></View>
          <View><Text > {'SPELLS \n PER DAY'} </Text></View>
          <View><Text > {'BONUS \n SPELLS'} </Text></View>
        </View>
  
        {Object.values(keys).map((el)=> <DataRow key={el} level={el} />)}
  
      </View>
    )
  }  

const DataRow = ({level}) => {

  const selector= item => useSelector(selectSpellSummaryLevelItem(level, item))

  return(
    <View style={{flexDirection:'row', height:40, justifyContent:'space-around'}}>
      <View ><CellInput  id='SPELLS_KNOWN' selector={selector}  setChanger={setSummaryChanger(level)} /></View>
      <View ><Cell  content={useSelector(selectSpellSaveDC(level))} /></View>
      <View ><Text style={{fontWeight:'bold'}}>{level+'th'}</Text></View>
      <View ><CellInput id={'SPELLS_PER_DAY'}  selector={selector} setChanger={setSummaryChanger(level)} /></View>
      <View ><Cell content={useSelector(selectBonusSpells)} /></View>
    </View>
  )
}

  return(
    <View style={{width:'100%', alignItems:"center",}}>
      <SectionTitle title={'SPELLS'}/>
      <UnderlinedTextInput size={6} fontSize={16} legend={'Domains/Specialty'} id={'DOMAIN'} selector={spellItemSelector} setChanger={setItemChanger}/>
      {useSelector(selectAllLevelIDs, shallowEqual).map((el)=>{
            return <LevelList key={'level'+el} level ={el} />
          })}
      <Pair title={'SPELL SAVE'} value={useSelector(selectSpellSave)}/>
      <Pair title={'SPELL FAILURE'} value={useSelector(selectArcaneFailure)} />
      <SpellSummary />
    </View>
  )
}