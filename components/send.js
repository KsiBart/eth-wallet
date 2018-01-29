import React, {Component} from 'react'
import styles from "../styles/global";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Button
} from 'react-native';

class Send extends Component {

  // async onPressBalance() {
  //   try {
  //     console.warn('balance')
  //     const balance = await Geth.balanceAccount()
  //     Alert.alert('Balance', balance)
  //   } catch (error) {
  //     console.error('setAccount', error)
  //   }
  // }

  constructor(props) {
    super(props);
    this.state = {
      address: null,
      amount: null
    };
  }

  sendTransaction() {
    Alert.alert(`Addr: ${this.state.address}`,
                `Amount: ${this.state.amount}`,
                [{text: 'OK', onPress: () => console.log('OK Pressed')},],
                { cancelable: false })
  }

  render() {
    return (
        <View style={styles.container}>
          <TextInput style={{width: 250}}
                     editable={true}
                     maxLength={40}
                     placeholder='account address'
                     onChangeText={(address) => this.setState({address})}
                     value={this.state.address}
          />

          <TextInput style={{width: 250}}
                     editable={true}
                     maxLength={40}
                     placeholder='Amount'
                     onChangeText={(amount) => this.setState({amount})}
                     value={this.state.amount}
          />

          <Button
              title='Send'
              onPress={() => this.sendTransaction()}/>
        </View>
    )
  }
}

export default Send