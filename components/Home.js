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
                              title={{title:"Home"}}
                              />
                           <View style={styles.top_box}>
                             <Text style={styles.top_box_title}>2017内蒙古分数线：</Text>
                             <View style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={styles.top_box_left}>
                                      <Text style={[styles.top_box_text_left,styles.top_box_text]}>理科</Text>
                                      <Text style={[styles.top_box_text_left,styles.top_box_text]}>本科一批：*</Text>
                                      <Text style={[styles.top_box_text_left,styles.top_box_text]}>本科二批：*</Text>
                                    </View>
                                    <View>
                                      <Text style={styles.top_box_text}>文科</Text>
                                      <Text style={styles.top_box_text}>本科一批：*</Text>
                                      <Text style={styles.top_box_text}>本科二批：*</Text>
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

  },
  top_box_left:{
    width:'50%',
    // borderRightWidth:0.2,
    // borderRightColor:'#d6d7da'
  },
  top_box_title:{
      fontSize:20,
      paddingTop:10,
      paddingBottom:10,
      color:'#666'
  },
  top_box_text:{
    fontSize:20,
    lineHeight:28,
    paddingLeft:20,
    color:'#666',
  },
  top_box_text_left:{
    borderRightWidth:0.8,
    borderRightColor:'#666'
  }
});