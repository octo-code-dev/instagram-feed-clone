import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//TouchableOpacity is a type of button on React Native that when the user clicks on it, its opacity is lowered
import { Image, TouchableOpacity } from 'react-native';

import Feed from './pages/Feed';
import New from './pages/New';

import logo from './assets/logo.png';
import camera from './assets/camera.png';

const Stack = createStackNavigator();

function LogoTitle() {
    return(
        <Image source={logo} />
    );
}

function MyStack() {
    return(
        <NavigationContainer>
          <Stack.Navigator
              initialRouteName='New'
              screenOptions={{
              headerTintColor: '#000',
              headerTitle: (props) => <LogoTitle {...props} />,
              headerTitleAlign: 'center',
              headerBackTitle: null,
              mode: 'modal'
              }}
          >
              <Stack.Screen 
                  name="Feed" 
                  component={Feed} 
                  options={({navigation}) => ({
                      headerRight: () => (
                          <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate('New') }>
                              <Image source={camera} />
                          </TouchableOpacity>
                      ), 
                  })}
              />
              <Stack.Screen 
              name="New" 
              component={New}
              options={{ headerTitle: 'Nova publicação'  }}
              />
          </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MyStack;
