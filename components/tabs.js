import React from 'react'

import { StackNavigator } from 'react-navigation';
import HomeScreen from "./home";
import AccountScreen from "./account"
import StatsScreen from "./stats"
import SendScreen from "./send"
import DevSettingsScreen from "./dev_settings"

const Tabs = StackNavigator({
  Home: { screen: HomeScreen },
  Account: { screen: AccountScreen },
  Stats: { screen: StatsScreen },
  Send: { screen: SendScreen },
  DevSettings: { screen: DevSettingsScreen },
});

export default Tabs

