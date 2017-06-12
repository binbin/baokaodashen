import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View, 
  Navigator, 
  TouchableHighlight,
  TouchableOpacity,
  BackAndroid,
  ToastAndroid
} from 'react-native';

import NavigationBar from 'react-native-navbar';

export default class Home extends Component{
    render(){
        return (
                        <View style={styles.box}>
                           <NavigationBar
                              title={{title:"高校"}}
                              />
                           <View style={styles.top_box}>
                              <View style={styles.prond}>
                                  <View>
                                    <Text>院校省份</Text>
                                  </View>
                                  <View>
                                    <Text>院校省份</Text>
                                  </View>
                                  <View>
                                    <Text>院校省份</Text>
                                  </View>
                              </View>
                           </View>
                        </View>
      );
    }
}

const styles = StyleSheet.create({
  box: {
    height:'100%',
    width:'100%'
  },
  top_box:{
    // backgroundColor:'#666'
  },
  prond:{
    backgroundColor:'#fff',
    marginTop:20,
    fontSize:20,
  }
});