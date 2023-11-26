import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SVGImg from '../images/img1.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import ParallaxCarousel from './Parallaxlayers';
import { useFocusEffect } from '@react-navigation/native';

const Homepage = ({ navigation }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchRecentlyViewed = async () => {
    try {
      const recentlyViewedData = await AsyncStorage.getItem('recentlyViewed');
      if (recentlyViewedData) {
        const recentlyViewedPatients = JSON.parse(recentlyViewedData);
         // Sort the array based on the time difference in ascending order
         recentlyViewedPatients.sort((a, b) => {
          const timeDifferenceA = Math.floor((currentTime - new Date(a.timestamp)) / (1000 * 60));
          const timeDifferenceB = Math.floor((currentTime - new Date(b.timestamp)) / (1000 * 60));
          return timeDifferenceA - timeDifferenceB;
        });
        setRecentlyViewed(recentlyViewedPatients);
      }
    } catch (error) {
      console.error('Error fetching recently viewed patients:', error);
    }
  };

  const intervalId = setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);

  // Use useFocusEffect to refetch the recently viewed patients when the screen gains focus
  // useFocusEffect(() => {
  //   fetchRecentlyViewed();

  //   // Clear the interval when the component is unmounted
  //  
  // });



  // Use useFocusEffect to refetch the recently viewed patients when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      fetchRecentlyViewed();
      return () => clearInterval(intervalId);
     }, [])
  );

  const getTimeDifference = (timestamp) => {
    try {
      const viewedTime = new Date(timestamp);

      if (isNaN(viewedTime)) {
        throw new Error(`Invalid timestamp: ${timestamp}`);
      }

      const timeDifference = Math.floor((currentTime - viewedTime) / (1000 * 60));

      if (timeDifference < 1) {
        return 'just now';
      } else if (timeDifference === 1) {
        return '1 min ago';
      } else {
        return `${timeDifference} mins ago`;
      }
    } catch (error) {
      console.error('Error calculating time difference:', error);
      return 'Invalid timestamp';
    }
  };

  const renderRecentlyViewedItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recentlyViewedItem}
      onPress={() => navigation.navigate('PatientDetails', { patient: item })}
    >
      <View style={styles.time}>
      <Text style={styles.recentlyViewedItemText}>{item.name}</Text>
      <Text style={styles.timestamp}>{getTimeDifference(new Date(item.timestamp).toISOString())}</Text>
      </View>
     
    </TouchableOpacity>
  );


  return (
    
    <SafeAreaView>
      <View style={styles.homescreen}>
        <View style={styles.header}>
         <SVGImg style={styles.img2} /> 
          <TouchableOpacity onPress={()=>navigation.openDrawer()}>
          <Image style={styles.img3} source={require('../images/op.png')} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.body}>
          <View style={styles.upperpart}>
              {/* <View style={{top:30}}><ParallaxCarousel /></View> */}
                
          </View>
         
        </View>
        
      </View>
       {/* Recently Viewed Patients */}
       <View style={styles.recentlyViewedContainer}>
          <Text style={styles.recentlyViewedTitle}>Recently Viewed Patients</Text>
          <FlatList
            data={recentlyViewed}
            keyExtractor={(item) => item._id.toString()}
            renderItem={renderRecentlyViewedItem}
          />
        </View>
    </SafeAreaView>
   
   
  );
};
export default Homepage;
const styles = StyleSheet.create({
  time:{
    flex:1,
    justifyContent:"space-between",
    flexDirection:"row",
    padding:10,
    paddingLeft:30,
    paddingRight:30,
    
  },
  imagebox:{
   height:350,
   width:"100%",
   overflow:'hidden',
   justifyContent:"center",
   alignContent:"center",
   backgroundColor:"#fff",
   top:20,
   padding:30,
   borderRadius:20,
   
  },
  imagelogo:{
    width:300,
    height:338,
  },
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
    fontFamily: 'SFProDisplay-Regular',
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
