import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainTabNavigation from './MainTabNavigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ArticleDetails from '../screens/ArticleDetails';
import RootStackParamList from '../types/rootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabNavigation"
          component={MainTabNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ArticleDetails"
          component={ArticleDetails}
          options={{
            headerBackTitle: 'Back',
            headerTitle: '',
            headerTransparent: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
