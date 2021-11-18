import React from "react"
import { Text, View, TextInput } from 'react-native';

export const TitleText = ({children, fontSize=10}) => {
  return(
    <Text style={{color:'#333', fontSize:fontSize}}>{children}</Text>
  )
}

export const BigTitleText = ({children}) => {
  return(
    <Text style={{color:'#333', fontSize:14, fontWeight:'bold',}}>{children}</Text>
  )
}

export const SectionTitle = ({title, width='100%'}) => {
  return(
    <View style={{backgroundColor:'#000', paddingVertical:3, width:width, justifyContent:'center', height:40,}}>
        <Text style={{color:'#fff', fontSize:18, fontWeight:'bold', textAlign:'center',  }}>
          {title}
        </Text>
      </View>
  )
}

export const UnderlinedText = ({content='', legend='', size=0.8, fontSize=12 }) => {
  let thisStyle = {flexDirection: 'column', marginRight: 10, width:50}
  thisStyle.width = thisStyle.width*size

  return(
    <View style={thisStyle}>
      <Text style={{fontSize:fontSize, borderRadius:1, borderBottomWidth:2, borderColor:'gray', width:'100%',}}> {content} </Text>
      {legend ? <Text style={{fontSize:8,}}>{legend}</Text> : null  }
      
    </View>
  )
}
export const UnderlinedTextInput = ({content='', legend='', size=0.8, fontSize=12 }) => {
  let thisStyle = {flexDirection: 'column', marginRight: 10, width:50,}
  thisStyle.width = thisStyle.width*size

  return(
    <View style={thisStyle}>
      <TextInput style={{fontSize:fontSize, borderRadius:1, borderBottomWidth:2, borderColor:'gray', width:'100%',}}> {content} </TextInput>
      {legend ? <Text style={{fontSize:8,}}>{legend}</Text> : null  }
    </View>
  )
}
