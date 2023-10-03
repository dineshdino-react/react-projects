import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useContext} from 'react';
import {AuthContext} from '../../Context/AuthContext';

import SVGImg from '../images/img1.svg';
import SVGimg4 from '../images/img5.svg';
import SVGimg5 from '../images/arrow.svg';
import {SafeAreaView} from 'react-native-safe-area-context';

const Homepage = ({navigation}) => {
  return (
    <SafeAreaView>
      <View style={styles.homescreen}>
        <View style={styles.header}>
          <SVGImg style={styles.img2} />
          <Image style={styles.img3} source={require('../images/op.png')} />
        </View>
        <View style={styles.search}>
          <TextInput
            placeholder="Search"
            placeholderTextColor={'#2f2f2f'}
            style={styles.input}
          />
          <Image style={styles.img4} source={require('../images/search.png')} />
        </View>
        <View style={styles.body}>
          <View style={styles.upperpart}>
            <SVGimg4 style={styles.img5} />
            <View style={styles.learn}>
              <TouchableOpacity>
                <Text style={styles.L}>L</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.abt}>earn Anesthesia</Text>
              </TouchableOpacity>
              <SVGimg5 style={styles.arr} />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Homepage;
const styles = StyleSheet.create({
  arr: {
    top: 57,
    left: 10,
  },
  L: {
    color: 'black',
    fontSize: 70,
    fontWeight: '600',
  },
  abt: {
    top: 52,
    left: 5,
    color: '#ff7373',
  },
  learn: {
    top: -20,
    height: 100,
    width: 110,
    flexDirection: 'row',
    left: 170,
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img5: {
    top: 20,
    right: 7,
  },
  img4: {
    right: 40,
    top: 10,
    height: 30,
    width: 30,
  },
  input: {
    height: 50,
    width: '100%',
    top: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingLeft: 20,
  },
  homescreen: {
    backgroundColor: '#F0ECEC',
    flexDirection: 'column',
  },
  search: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  text: {
    color: '#2f2f2f',
  },
  img3: {
    height: 30,
    width: 30,
    padding: 10,
    top: -5,
  },
});
