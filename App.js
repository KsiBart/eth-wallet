/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import RNFS from 'react-native-fs';

import ToastExample from './src/toast_native';
import GethModule from './src/geth_native';
import Web3 from 'web3'

export default class App extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentWillMount() {
    this.initNode()
  }

  async initNode() {
    const chainID = 77733409;

    const genesis = `{
      "config": {
        "chainId": ${chainID},
        "homesteadBlock": 0,
        "eip155Block": 0,
        "eip158Block": 0
      },
      "difficulty": "2000000",
      "gasLimit": "2100000",
      "alloc": {}
    }`;

    const config = {
      "chainID": chainID, // --networkid / Network identifier (integer, 0=Olympic (disused), 1=Frontier, 2=Morden (disused), 3=Ropsten) (default: 1)
      "maxPeers": 0, // --maxpeers / Maximum number of network peers (network disabled if set to 0) (default: 25)
      "genesis": genesis, // genesis.json file
      // "nodeDir": "private-ethereum", // --datadir / Data directory for the databases and keystore
      // "keyStoreDir": "keystore", // --keystore / Directory for the keystore (default = inside the datadir)
      "enodes": "enode://654b2baa7528b8aa5a858962ee5fa19f74313b50ed60b6baa2571cfb6385c56388bf478467d751c9085c217a9cd48ab5d371d0f061370b76c059209e34d67fe6@10.0.1.29:30302" // --bootnodes / Comma separated enode URLs for P2P discovery bootstrap
    };

    const init = await GethModule.nodeConfig(config);
    this.setState({
      loaded: init
    })
    console.warn('Init...', init)
  }

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

        <Button
          onPress={this.onWeb3Provider.bind(this)}
          title="Web3 provider"
          color="#841584"
          accessibilityLabel="Web3 provider"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
