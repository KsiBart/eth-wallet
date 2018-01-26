import React, {Component} from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  Button
} from 'react-native';
import RNFS from 'react-native-fs';

import ToastExample from '../src/toast_native';
import GethModule from '../src/geth_native';
import Web3 from 'web3'
import styles from "../styles/global";

class DevSettings extends Component<{}> {

  async start() {
    if(this.state.loaded) {
      await GethModule.startNode()
      ToastExample.show('Node started...', ToastExample.SHORT)



      const listenerAddress = await GethModule.listenerAddress()
      console.warn('Listener address...', listenerAddress)
    }
  }

  async stop() {
    if(this.state.loaded){
      await GethModule.stopNode()
      ToastExample.show('Node stopped...', ToastExample.SHORT)
    }
  }

  onNodeStart() {
    this.start()
  }

  onNodeStop() {
    this.stop()
  }

  onWeb3Provider() {
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8045"));
      // web3 = new Web3(new Web3.providers.IpcProvider(RNFS.DocumentDirectoryPath + "/ethereum/geth.ipc"));
    }

    console.warn('web3', web3)

    if(!web3.isConnected()) {
      console.warn('web3 not connected')
    } else {
      console.warn('web3 connected')
    }

    RNFS.readDir(RNFS.DocumentDirectoryPath + "/ethereum") // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
        .then((result) => {
          console.warn('GOT RESULT', result);

          // stat the first file
          return Promise.all([RNFS.stat(result[0].path), result[0].path]);
        })
        .then((statResult) => {
          if (statResult[0].isFile()) {
            // if we have a file, read it
            return RNFS.readFile(statResult[1], 'utf8');
          }

          return 'no file';
        })
        .then((contents) => {
          // log the file contents
          console.warn(contents);
        })
        .catch((err) => {
          console.warn(err.message, err.code);
        });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 0.06, flexDirection: 'row'}}>
          <Button
            onPress={this.onNodeStart.bind(this)}
            title="Start Node"
            color="#841584"
            accessibilityLabel="Start node"
                />

          <Button
            onPress={this.onNodeStop.bind(this)}
            title="Stop Node"
            color="#841584"
            accessibilityLabel="Stop node"
                />
        </View>
        <View style={{flex: 0.06, flexDirection: 'row'}}/>
        <View style={{flex: 0.06, flexDirection: 'row'}}>
          <Button
              onPress={this.onWeb3Provider.bind(this)}
              title="Web3 provider"
              color="#841584"
              accessibilityLabel="Web3 provider"
                  />
        </View>
      </View>
    )
  }
}

export default DevSettings
