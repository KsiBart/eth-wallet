import React from 'react'

import { StackNavigator } from 'react-navigation';
import HomeScreen from "./components/home";
import AccountScreen from "./components/account"

const Tabs = StackNavigator({
  Home: { screen: HomeScreen },
  Account: { screen: AccountScreen },
});

export default Tabs