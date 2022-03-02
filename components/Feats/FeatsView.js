import React from "react";
import { View, SafeAreaView,  SectionList } from "react-native";
import { SectionTitle, UnderlinedTextInput } from "../TextComponents";
import { changeFeatValue, selectFeatCategory, selectFeatCategoryItem } from "./FeatsSlice";
import { useDispatch, useSelector, shallowEqual  } from 'react-redux';

export function FeatsView({}){

  const dispatch = useDispatch()  
  const setChanger = category => name => (e) => dispatch(changeFeatValue({category:category, name:name, value:e}))
  const categorySelector = itemName => useSelector(selectFeatCategory(itemName), shallowEqual )
  const categoryItemSelector = category => itemName => useSelector(selectFeatCategoryItem(category, itemName))


  const FeatsMap = ({category}) => {

    const feats = categorySelector(category)

    return(
      <View style={{flexDirection:'row', flexWrap:'wrap'}} >
        {
          feats.map(el => (
            <UnderlinedTextInput key={el+category} size={2.2} id={el} selector={categoryItemSelector(category)} setChanger={setChanger(category)}/>
          ))
        }
      </View>
    )
  }
  

  return(
    <SafeAreaView style={{marginHorizontal:5, alignItems:'center'}}>
      <SectionList
        sections={[
          {
            title:'FEATS',
            data: ['FEATS']
          },
          {
            title:'SPECIAL_ABILITIES',
            data: ['SPECIAL_ABILITIES']
          },
          {
            title:'LANGUAGES',
            data: ['LANGUAGES']
          }
        ]}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, section:{title}}) => {
          return(
            <FeatsMap category={item} />
          )
        }}
        renderSectionHeader={({ section: { title } }) => (
          <SectionTitle title={title} />
        )}
      >
        
      </SectionList>
    </SafeAreaView>
  )
}
//   return(
//     <SafeAreaView>
//       <ScrollView>
//         <View style={{width:'100%', marginTop: 20}}>
//           <SectionTitle title={'FEATS'} />
//           <SafeAreaView style={{width:'100%', flexWrap:'wrap', height:200, alignItems:"center"}}>
//             <FeatsMap category={'FEATS'}/>
//           </SafeAreaView>
//           <SectionTitle title={'SPECIAL ABILITIES'} />
//           <SafeAreaView style={{width:'100%', flexWrap:'wrap', height:200, alignItems:"center",}}>
//             <FeatsMap category={'SPECIAL_ABILITIES'}/>
//           </SafeAreaView>
//           <SectionTitle title={'LANGUAGES'} />
//           <SafeAreaView style={{width:'100%', flexWrap:'wrap', height:100, alignItems:"center",}}>
//             <FeatsMap category={'LANGUAGES'}/>
//           </SafeAreaView>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   )
// }