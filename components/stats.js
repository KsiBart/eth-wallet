import React, {Component} from 'react'
import styles from "../styles/global";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  Button
} from 'react-native';

class Stats extends Component {

  // async onPressBalance() {
  //   try {
  //     console.warn('balance')
  //     const balance = await Geth.balanceAccount()
  //     Alert.alert('Balance', balance)
  //   } catch (error) {
  //     console.error('setAccount', error)
  //   }
  // }

  render() {
    return (
        <View style={styles.container}>
          <Text>
            Here are stats!!
          </Text>
        </View>
    )
  }
}

export default Stats