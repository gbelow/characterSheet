import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, Image, ScrollView, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import dndPic from './assets/dndPic.png'
import DescriptionView from './components/Description/DescriptionsView';
import StatsTable from './components/Stats/StatsTable'
import { SavesTable } from './components/Saves/SavesTable';
import { ResourcesTable } from './components/Resources/ResourcesTable';
import { SkillsTable } from './components/Skills/SkillsTable';
import { GearView } from './components/Gear/GearView';
import { ItemsTable } from './components/Items/ItemsTable';
import { FeatsView } from './components/Feats/FeatsView';
import { SpellsView } from './components/Spells/SpellsView';
import {CharManagement} from './components/CharManagement/CharManagement';
import { Provider, useSelector } from 'react-redux';
import store from './app/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { selectCurrentChar } from './components/CharManagement/CharManagementSlice';
import { createTabNavigator } from './components/Navigation/TabNavigator';


const Tab = createTabNavigator()


const tabs = {description: DescriptionView, Combat: ResourcesTable, stats: StatsTable, 
  saves: SavesTable, gear: GearView, skills: SkillsTable, items: ItemsTable, feats: FeatsView, spells: SpellsView}

const Navigation = () => {
  return (
    <Tab.Navigator 
      // screenOptions={{lazy:false}} 
      // tabBar={props => <TabBar {...props} />} 
      // screenListeners={({ navigation, route }) => ({        
      //   tabPress: (e) => {
      //     // console.log(e.data.state.index, route.name)
      //   }
      // })}
    >
      <Tab.Screen name="Description" component={DescriptionView} />
      <Tab.Screen name="Combat" component={ResourcesTable} />
      <Tab.Screen name="Stats" component={StatsTable} />
      <Tab.Screen name="Saves" component={SavesTable} />
      <Tab.Screen name="Gear" component={GearView} />
      <Tab.Screen name="Skills" component={SkillsTable} />
      <Tab.Screen name="Items" component={ItemsTable} />
      <Tab.Screen name="Feats" component={FeatsView} />
      <Tab.Screen name="Spells" component={SpellsView} />
    </Tab.Navigator>
  )
} 
const TabBar = ({state, descriptors, navigation}) => { 

  return(
    <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:'space-evenly', borderWidth:1 }}>
      {
        state.routes.map((route, index) => {
          const isFocused = state.index === index;
          
          const onPress = () => {
            
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          return(
            <View key={route.name} style={{width:'30%', marginVertical:5,}}>
              <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              // accessibilityLabel={options.tabBarAccessibilityLabel}
              // testID={options.tabBarTestID}
              onPress={onPress}
              // onLongPress={onLongPress}
              style={{  borderWidth:1, paddingVertical:5, paddingHorizontal:5, backgroundColor:isFocused ? '#800' : '#000' }}
            >
              <Text style={{ color: isFocused ? '#800' : '#222', textAlign:'center' }}>
                {route.name}
              </Text>
            </TouchableOpacity>
            </View>
          )
        })
      }
      
    </View>
  )
} 

const HomeScreen = ({navigation}) => {
  return(
    <View style={{flexDirection:'column', marginVertical:30, alignItems:'center'}}>
      <Image source={dndPic} style={styles.dndPic} />   
      <CharManagement  navigation={navigation} />     
      
    </View>
  )
}

export default function App() { 
  
  const Stack = createNativeStackNavigator()

  return (
    <Provider store={store}>      
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name={'Home'}
            component={HomeScreen}
          />
          <Stack.Screen 
            name={'Sheet'}
            component={Navigation}
            options={({navigation, route})=> ({
              headerTitle: props => {
                const cchar = useSelector(selectCurrentChar)
                return(
                  <Text style={{fontWeight:'bold'}}>{cchar}'s Character Sheet</Text>
                )
              },
            })}
          />          
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingLeft:10,
    paddingRight:10,
    alignItems: 'center',
    marginTop: 10, 
    paddingBottom:10,
    
  },
  dndPic:{
    width:350,
    height:130,
  },
  

});
