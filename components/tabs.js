import React from 'react'

import { StackNavigator } from 'react-navigation';
import HomeScreen from "./home";
import AccountScreen from "./account"

const Tabs = StackNavigator({
  Home: { screen: HomeScreen },
  Account: { screen: AccountScreen },
});

export default Tabs

