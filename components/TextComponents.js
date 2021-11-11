import React from "react"
import { Text, View, TextInput } from 'react-native';

export const TitleText = ({children}) => {
  return(
    <Text style={{color:'#333', fontSize:10}}>{children}</Text>
  )
}

export const BigTitleText = ({children}) => {
  return(
    <Text style={{color:'#333', fontSize:14, fontWeight:'bold',}}>{children}</Text>
  )
}

export const UnderlinedText = ({content='', legend='', size=0.8 }) => {
  let thisStyle = {flexDirection: 'column', marginRight: 10, width:50,}
  thisStyle.width = thisStyle.width*size

  return(
    <View style={thisStyle}>
      <Text style={{fontSize:12, borderRadius:1, borderBottomWidth:2, borderColor:'gray', width:'100%',}}> {content} </Text>
      <Text style={{fontSize:8,}}>{legend}</Text>
    </View>
  )
}
export const UnderlinedTextInput = ({content='', legend='', size=0.8 }) => {
  let thisStyle = {flexDirection: 'column', marginRight: 10, width:50,}
  thisStyle.width = thisStyle.width*size

  return(
    <View style={thisStyle}>
      <TextInput style={{fontSize:12, borderRadius:1, borderBottomWidth:2, borderColor:'gray', width:'100%',}}> {content} </TextInput>
      <Text style={{fontSize:8,}}>{legend}</Text>
    </View>
  )
}
