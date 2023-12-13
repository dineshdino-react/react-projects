import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SVGImg from '../images/img1.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import ParallaxLayer from './Parallaxlayers';
import {API_SERVER_URL} from './config';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
const Homepage = React.memo(({navigation}) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [doctorID, setDoctorID] = useState(null);

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      try {
        const token = await AsyncStorage.getItem('authtoken');
        if (token) {
          const response = await axios.get(`${API_SERVER_URL}/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('Doctor ID:', response.data.doctorID);
          const doctorID = response.data.doctorID;
          setDoctorID(doctorID);

          const recentlyViewedData = await AsyncStorage.getItem(
            'recentlyViewed',
          );
          if (recentlyViewedData && doctorID) {
            const recentlyViewedPatients = JSON.parse(recentlyViewedData);

            const response = await axios.get(
              `${API_SERVER_URL}/patients?doctorID=${doctorID}`,
            );
            const patientList = response.data;
            const validRecentlyViewed = recentlyViewedPatients.filter(
              recentPatient =>
                patientList.some(
                  patient =>
                    patient._id === recentPatient._id && !patient.isDeleted,
                ),
            );
            const sortedData = validRecentlyViewed.sort((a, b) => {
              const timeDifferenceA = Math.floor(
                (currentTime - new Date(a.timestamp)) / (1000 * 60),
              );
              const timeDifferenceB = Math.floor(
                (currentTime - new Date(b.timestamp)) / (1000 * 60),
              );
              return timeDifferenceA - timeDifferenceB;
            });

            setRecentlyViewed(sortedData);
          }
        }
      } catch (error) {
        console.error('Error fetching recently viewed patients:', error);
      }
    };
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 5000);
    fetchRecentlyViewed();
    return () => clearInterval(intervalId);
  }, [currentTime]);
  const renderRecentlyViewedItem = ({item}) => (
    <TouchableOpacity
      style={styles.recentlyViewedItem}
      onPress={() => navigation.navigate('PatientDetails', {patient: item})}>
      <View style={styles.time}>
        <Text style={styles.recentlyViewedItemText}>{item.name}</Text>
        <Text style={styles.timestamp}>
          {getTimeDifference(new Date(item.timestamp).toISOString())}
        </Text>
      </View>
    </TouchableOpacity>
  );
  const getTimeDifference = timestamp => {
    try {
      const viewedTime = new Date(timestamp);

      if (isNaN(viewedTime)) {
        throw new Error(`Invalid timestamp: ${timestamp}`);
      }

      const timeDifferenceInMinutes = Math.floor(
        (currentTime - viewedTime) / (1000 * 60),
      );

      if (timeDifferenceInMinutes < 1) {
        return 'just now';
      } else if (timeDifferenceInMinutes === 1) {
        return '1 min ago';
      } else if (timeDifferenceInMinutes < 60) {
        return `${timeDifferenceInMinutes} mins ago`;
      } else if (timeDifferenceInMinutes < 1440) {
        // 1440 minutes in a day
        const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
        return `${timeDifferenceInHours} ${
          timeDifferenceInHours === 1 ? 'hour' : 'hours'
        } ago`;
      } else {
        const timeDifferenceInDays = Math.floor(timeDifferenceInMinutes / 1440);
        return `${timeDifferenceInDays} ${
          timeDifferenceInDays === 1 ? 'day' : 'days'
        } ago`;
      }
    } catch (error) {
      console.error('Error calculating time difference:', error);
      return 'Invalid timestamp';
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.homescreen}>
        <View style={styles.header}>
          <SVGImg style={styles.img2} />
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              style={styles.img3}
              source={require('../images/op.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.body}>
          <View style={styles.upperpart}></View>
        </View>
        <ParallaxLayer/>
      </View>
        
      {/* Recently Viewed Patients */}
      <View style={styles.recentlyViewedContainer}>
        <Text style={styles.recentlyViewedTitle}>Recently Viewed Patients   <Entypo name="back-in-time" size={20} color="black" /></Text>
        
        <FlatList
          data={recentlyViewed}
          keyExtractor={item => item._id.toString()}
          renderItem={renderRecentlyViewedItem}
          removeClippedSubviews={true}
        />
      </View>
    </SafeAreaView>
  );
});
export default Homepage;
const styles = StyleSheet.create({
  recentlyViewedItemText:{
   fontSize:16
  },
  recentlyViewedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  recentlyViewedContainer: {
    padding: 20,
    top:150,
    backgroundColor: '#fff',
    margin: 10,
    height:"70%",
    borderRadius: 20,
  },
  timestamp: {
    color: 'red',
    fontSize:16
  },
  time: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 15,
  },
  imagebox: {
    height: 350,
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
    top: 20,
    padding: 30,
    borderRadius: 20,
  },
  imagelogo: {
    width: 300,
    height: 338,
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
