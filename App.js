/**
Author Berk Altuğ
DigiMenu Inc.
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text,TextInput, View,Image,TouchableOpacity} from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions,createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';
import ChoiceScreen from './Screens/ChoiceScreen';
import QrScreen from './Screens/QrScreen';
import MenuScreen from './Screens/MenuScreen';
import CartScreen from './Screens/CartScreen';
import OptionScreen from './Screens/OptionScreen';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <AppContainer/>
    );
  }
}
const MenuNavigator = createBottomTabNavigator(
  {
    Menu:MenuScreen,
    Cart:CartScreen,
    Options:OptionScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Menu') {
          iconName = `list-alt`;
        } else if (routeName === 'Cart') {
          iconName = `shopping-cart`;
        }else if(routeName ==='Options'){
          iconName=`gears`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
    },
    }),tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }

  );
const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    SignUp: SignUpScreen,
    Choice:ChoiceScreen,
    Qr:QrScreen,
    Menu:MenuNavigator
  },
  {
    initialRouteName: "Login"
  }
);
const AppContainer = createAppContainer(AppNavigator);
