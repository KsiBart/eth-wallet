import React, {Component} from 'react'
import styles from "../styles/global";
import Home from './home'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  Button
} from 'react-native';
import Geth from "react-native-geth";

class Account extends Component {

  async onPressBalance() {
    try {
      console.warn('balance')
      const balance = await Geth.balanceAccount()
      Alert.alert('Balance', balance)
    } catch (error) {
      console.error('setAccount', error)
    }
  }

  async onPressBalanceAt() {
    try{
      console.warn('balance at')
      const balance = await Geth.balanceAccountAt('0xcfd7884dc0ebd09ab00beb06f02d64d5b8ab49ea')
      Alert.alert('Balance', balance)
    } catch (error) {
      console.error('setAccount', error)
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>
          <Button
              onPress={this.onPressBalance}
              title="Account Balance"
              color="#841584"
          />
          <Button
              onPress={this.onPressBalanceAt}
              title="Account Balance At"
              color="#841584"
          />
        <View style={{flex: 0.06, flexDirection: 'row'}}/>
        <View>

          <Button
              onPress={() => navigate('DevSettings')}
              title="Settings"
              color="#841584"
          />
        </View>
        </View>
    )
  }
}

export default Account