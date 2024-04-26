import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabScreenAudio from '../screens/TabScreenAudio';
import TabScreenArticles from '../screens/TabScreenArticles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const MainTabNavigation = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {fontSize: 12},
      }}>
      <Tab.Screen
        name="Audio"
        component={TabScreenAudio}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="file-sound-o" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Articles"
        component={TabScreenArticles}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="article" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigation;

const styles = StyleSheet.create({});
