/**
Author Berk Altuğ
DigiMenu Inc.
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text,TextInput, View,Image,TouchableOpacity} from 'react-native';
import { createAppContainer, StackActions, NavigationActions,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator }  from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';
import QrScreen from './Screens/QrScreen';
import MenuScreen from './Screens/MenuScreen';
import CartScreen from './Screens/CartScreen';
import OptionScreen from './Screens/OptionScreen';
import AuthLoadingScreen from './Screens/AuthLoadingScreen';
import ForgetPasswordScreen from './Screens/ForgetPasswordScreen';
import codePush from "react-native-code-push";
type Props = {};
class App extends Component<Props> {
  render() {
    return (
      <AppContainer/>
    );
  }
}
const AuthNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    SignUp: SignUpScreen,
    ForgetPassword:ForgetPasswordScreen
  },
  {
    headerMode:'none',
    header:null
  }
);

const MenuNavigator = createBottomTabNavigator(
  {
    Menu:MenuScreen,
    Sepet:CartScreen,
    Ayarlar:OptionScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Menu') {
          iconName = `list-alt`;
        } else if (routeName === 'Sepet') {
          iconName = `shopping-cart`;
        }else if(routeName ==='Ayarlar'){
          iconName=`gears`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
    }
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },

  }

  );
  const AppNavigator = createStackNavigator(
    {
      Qr:QrScreen,
      Menu:MenuNavigator
    },
    {
        headerMode:'none',
        header:null
    }
  );
const MainNavigator = createSwitchNavigator(
  {
    Auth:AuthNavigator,
    App:AppNavigator,
    AuthLoading:AuthLoadingScreen
  },
  {
    initialRouteName: "AuthLoading"
  }
);
const AppContainer = createAppContainer(MainNavigator);
const codePushOptions ={ checkFrequency:codePush.CheckFrequency.ON_APP_START};
export default codePush(codePushOptions)(App);
