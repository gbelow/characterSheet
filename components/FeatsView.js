import React, { useState } from "react";
import { View, Input,  } from "react-native";
import { UnderlinedText, SectionTitle, UnderlinedTextInput } from "./TextComponents";

export function FeatsView({}){

  const [numFeats, setNumFeats] = useState(16)
  const [numAbilities, setNumAbilities] = useState(16)
  const [numLangs, setNumLangs] = useState(8)

  const Line = ({id, text}) =>{
    return(
      <UnderlinedTextInput size={3.5} content={'text'}/>
    )
  }

  const FeatsMap = () => {
    let n = numFeats
    return(
      <>
        {
          Array.from(Array(n).keys()).map(el => (
            <Line key={el} id={el}/>
          ))
        }
      </>
    )
  }

  return(
    <View style={{width:'100%', marginTop: 20}}>
      <SectionTitle title={'FEATS'} />
      <View style={{width:'100%', flexWrap:'wrap', height:200, alignItems:"center",}}>
        <FeatsMap />
      </View>
      <SectionTitle title={'SPECIAL ABILITIES'} />
      <View style={{width:'100%', flexWrap:'wrap', height:200, alignItems:"center",}}>
        <FeatsMap />
      </View>
      <SectionTitle title={'LANGUAGES'} />
      <View style={{width:'100%', flexWrap:'wrap', height:100, alignItems:"center",}}>
        <FeatsMap />
      </View>
    </View>
  )
}