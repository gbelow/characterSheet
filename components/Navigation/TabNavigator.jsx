import * as React from 'react';
import { Text, Pressable, View } from 'react-native';
import {
  NavigationHelpersContext,
  useNavigationBuilder,
  TabRouter,
  TabActions,
  createNavigatorFactory,
} from '@react-navigation/native';

function TabNavigator({
  initialRouteName,
  children,
  screenOptions,
  tabBarStyle,
  contentStyle,
}) {
  const { state, navigation, descriptors, NavigationContent } =
    useNavigationBuilder(TabRouter, {
      children,
      screenOptions,
      initialRouteName,
    });

  let loaded = React.useRef(new Set)
    
  return (
    <NavigationContent>
      <View style={[{ flexDirection:'row', flexWrap:'wrap', justifyContent:'space-evenly', borderWidth:1 }, tabBarStyle]}>
        {state.routes.map((route, index) => {

          const isFocused = state.index === index 
          return (
            <View key={route.name} style={{width:'30%', marginVertical:5,}}>              
              <Pressable
                key={route.key}
                onPress={() => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  });

                  loaded.current.add(index)

                  if (!event.defaultPrevented) {
                    navigation.dispatch({
                      ...TabActions.jumpTo(route.name),
                      target: state.key,
                    });
                  }
                }}
                style={{ borderWidth:1, paddingVertical:5, paddingHorizontal:5, backgroundColor:isFocused ? '#800' : '#444'  }}
                >
                  <Text style={{ color: isFocused ? '#fff' : '#222', textAlign:'center' }}>
                    {route.name}
                  </Text>
              </Pressable>
            </View>
        )})}
      </View>
      <View style={[{ flex: 1 }, contentStyle]}>
        {state.routes.map((route, i) => {          
          return (
            <View
              key={route.key}
              style= {{ display: i === state.index ? 'flex' : 'none' }}
            >
              {/* {descriptors[route.key].render() } */}
              {i === state.index || loaded.current.has( state.index) ? descriptors[route.key].render() : <Text></Text>}
            </View>
          );
        })}
      </View>
    </NavigationContent>
  );
}


export const createTabNavigator = createNavigatorFactory(TabNavigator);