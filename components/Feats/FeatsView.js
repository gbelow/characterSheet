import React, { useState } from "react";
import { View, Input,  } from "react-native";
import { SectionTitle, UnderlinedTextInput } from "../TextComponents";
import { changeFeatValue, selectFeatCategory } from "./FeatsSlice";
import { useDispatch, useSelector } from 'react-redux';

export function FeatsView({}){

  const dispatch = useDispatch()  
  const setChanger = category=> name => (e) => dispatch(changeFeatValue({category:category, name:name, value:e}))
  const categorySelector = itemName => useSelector(selectFeatCategory(itemName))

  const Line = ({name, setter, content}) =>{
    return(
      <UnderlinedTextInput size={3.5} content={content} setContent={setter(name)}/>
    )
  }

  const FeatsMap = ({category}) => {

    const feats = categorySelector(category)
    
    return(
      <>
        {
          Object.entries(feats).map(el => (
            <Line key={el[0]} name={el[0]} content={el[1]} setter={setChanger(category)}/>
          ))
        }
      </>
    )
  }

  return(
    <View style={{width:'100%', marginTop: 20}}>
      <SectionTitle title={'FEATS'} />
      <View style={{width:'100%', flexWrap:'wrap', height:200, alignItems:"center",}}>
        <FeatsMap category={'FEATS'}/>
      </View>
      <SectionTitle title={'SPECIAL ABILITIES'} />
      <View style={{width:'100%', flexWrap:'wrap', height:200, alignItems:"center",}}>
        <FeatsMap category={'SPECIAL_ABILITIES'}/>
      </View>
      <SectionTitle title={'LANGUAGES'} />
      <View style={{width:'100%', flexWrap:'wrap', height:100, alignItems:"center",}}>
        <FeatsMap category={'LANGUAGES'}/>
      </View>
    </View>
  )
}