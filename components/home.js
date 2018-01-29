import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableHighlight,
} from 'react-native';



import styles from "../styles/global";
import RNFS from 'react-native-fs';

import ToastExample from '../src/toast_native';
import GethModule from '../src/geth_native';
import Web3 from 'web3'

export default class Home extends Component<{}> {
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


  static navigationOptions = ({ navigation }) => ({
    headerRight:
        <TouchableHighlight onPress={() => navigation.navigate('Account')}>
          <Image style={styles.icon}
                 source={require('../styles/images/settings.png')}/>
        </TouchableHighlight>
  });

  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>
          <View style={{flex: 0.4, flexDirection: 'column'}}>
            <View>
              <Text style={styles.headerText}>
                Balance:
              </Text>
            </View>
            <View>
              <Text style={styles.headerText}>
                0
              </Text>
            </View>
          </View>

          <View style={{flex: 0.07, flexDirection: 'row'}}>
            <Button
                title='Stats'
                onPress={() => navigate('Stats')}
                color="#841584"/>
            <Button
                title='Send'
                onPress={() => navigate('Send')}
                color="#211584"/>
          </View>
        </View>
    );
  }
}
