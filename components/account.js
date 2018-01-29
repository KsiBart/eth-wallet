import React, {Component} from 'react'
import styles from "../styles/global";
import Home from './home'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
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

  static navigationOptions = ({ navigation }) => ({
    headerRight:
        <TouchableHighlight onPress={() => navigation.navigate('DevSettings')}>
          <Image style={styles.icon}
                 source={require('../styles/images/settings_dev.png')}/>
        </TouchableHighlight>
  });
  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>
          <Button
              onPress={this.onPressBalance}
              title="Account Balance"
              color="#841584"
          />
          <View style={{flex: 0.2, flexDirection: 'column'}}/>
          <Button
              onPress={this.onPressBalanceAt}
              title="Account Balance At"
              color="#841584"
          />
        </View>
    )
  }
}

export default Account