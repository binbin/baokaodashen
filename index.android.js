/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import Bar from './components/Bar'

import Home from './components/Home'
import University from './components/University'

export default class baokaodashen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tabNames: ['Home', '高校', '专业', '个人中心'],
      tabIconNames: ['home', 'university', 'list-ul', 'user'],
    };
  }

  render() {
    let tabNames = this.state.tabNames;
    let tabIconNames = this.state.tabIconNames;
    return (
      <ScrollableTabView
        renderTabBar={() => <Bar tabNames={tabNames} tabIconNames={tabIconNames}/>}
        tabBarPosition='bottom'>

        <View style={styles.content} tabLabel='key1'>
          <Home/>
        </View>

        <View style={styles.content} tabLabel='key2'>
          <University/>
        </View>

        <View style={styles.content} tabLabel='key3'>
          <Text>#3</Text>
        </View>

        <View style={styles.content} tabLabel='key4'>
          <Text>#4</Text>
        </View>
      </ScrollableTabView>
    );
  }

}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBEBEB',
    flex: 1,
    height:'100%',
    width:'100%'
  }
});
console.disableYellowBox = true

AppRegistry.registerComponent('baokaodashen', () => baokaodashen);
