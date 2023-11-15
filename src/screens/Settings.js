import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Octicons} from '@expo/vector-icons';
import React, {useState, useEffect} from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActionSheetProvider,
  connectActionSheet,
} from '@expo/react-native-action-sheet';
import ResetPassword from './ResetPassword';
import BezierLineGraph from './BezierLineGraph';
import {Ionicons} from '@expo/vector-icons';
import {API_SERVER_URL, API_SERVER_SOCKET} from './config';
import {PieChart} from 'react-native-svg-charts';
import Profile from './profile';
const Settings = () => {
  const [patientcount, setPatientcount] = useState(null);

  const [patients, setPatients] = useState([]);
  const [doctorID, setDoctorID] = useState(null);
  const [userdata, setuserdata] = useState('');
  const [resetPasswordVisible, setResetPasswordVisible] = useState(false);
  const socket = socketIOClient(API_SERVER_SOCKET);

  // Add a function to open the Reset Password modal
  // Function to open the ResetPassword action sheet
  const openResetPasswordActionSheet = () => {
    setResetPasswordVisible(true);
  };

  // Function to close the ResetPassword action sheet
  const closeResetPasswordActionSheet = () => {
    setResetPasswordVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
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
          const userData = response.data;
          if (userData && userData.name && userData.doctorID) {
            setuserdata(userData);
          }

          if (doctorID !== null && patients.length === 0) {
            const response = await axios.get(
              `${API_SERVER_URL}/patients?doctorID=${doctorID}`,
            );
            setPatients(response.data); // Update patients state
            setPatientcount(response.data.length);
          }
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };
    fetchData();

    socket.on('new-patient', () => {
      setPatientcount(prevCount => prevCount + 1);
    });
    socket.on('delete-patient', () => {
      fetchData(); // Fetch patients again when a patient is deleted
    });

    return () => {
      socket.disconnect();
    };
  }, [doctorID]);
  const data = {};

  const percentageText =
    patientcount !== null
      ? `${Math.round((patientcount / 100) * 100)}%`
      : 'Loading...';

  // const profilename = userdata.name
  // const profiledata = profilename[0]
  return (
    <ActionSheetProvider>
      <SafeAreaView>
        <View style={styles.setcontainer}>
          <View style={styles.container}>
            <Text style={{fontSize: 18, fontWeight: 'bold', bottom: 30}}>
              Settings
            </Text>
            <View style={styles.subbox}>
              <View style={styles.rightbox}>
                <View style={styles.cir}>
                  {userdata.name && userdata.name.length > 0 && (
                    <Text
                      style={{color: '#fff', fontSize: 30, fontWeight: 'bold'}}>
                      {userdata.name[0]}
                    </Text>
                  )}
                </View>
                <Text style={{fontWeight: 'bold'}}>{userdata.name}</Text>
              </View>
              <View style={styles.lineStyle} />
              <View style={styles.graphcontainer}>
                <View style={styles.leftbox}>
                  <View style={styles.graphbox}>
                    <Octicons name="graph" size={24} color="#ff7373" />
                  </View>
                  <Text style={{left: 10, fontWeight: 'bold'}}>Overview</Text>
                  <View>
                    <View
                      style={{
                        height: 15,
                        width: 15,
                        backgroundColor: '#ff7373',
                        borderRadius: 50,
                        left: 50,
                        top: 50,
                      }}></View>
                    <Text style={{top: 35, left: 70}}>Patients</Text>
                  </View>
                </View>
                <View style={styles.circlegraph}>
                  <DonutChart percentage={patientcount} />
                  <View style={styles.centerTextContainer}>
                    {patientcount === null ? (
                      <ActivityIndicator size="small" color="#ff7373" />
                    ) : (
                      <Text style={styles.centerText}>{percentageText}</Text>
                    )}
                  </View>
                  <Text style={{width: 180, top: 105, position: 'absolute'}}>
                    data obtained from the total number of patients
                  </Text>
                </View>
              </View>
            </View>

            {/* <BezierLineGraph data={data} /> */}

            <View
              style={{
                top: 30,
                borderColor: '#d9d9d9',
                borderWidth: 0.5,
                borderRadius: 50,
                marginTop: 20,
              }}>
              <View
                style={{
                  backgroundColor: '#ff7373',
                  width: 70,
                  bottom: 10,
                  left: 10,
                  borderRadius: 50,
                  alignItems: 'center',
                }}>
                <Text style={{color: '#fff', padding: 3}}>doctor-id</Text>
              </View>
              <Text
                style={{
                  paddingLeft: 15,
                  fontWeight: 'bold',
                  paddingBottom: 5,
                  bottom: 5,
                }}>
                {userdata.doctorID}
              </Text>
            </View>

            <View
              style={{
                top: 30,
                borderColor: '#d9d9d9',
                borderWidth: 0.5,
                borderRadius: 50,
                marginBottom: 20,
                marginTop: 30,
              }}>
              <View
                style={{
                  backgroundColor: '#ff7373',
                  width: 70,
                  bottom: 10,
                  left: 10,
                  borderRadius: 50,
                  alignItems: 'center',
                }}>
                <Text style={{color: '#fff', padding: 3}}>email</Text>
              </View>
              <Text
                style={{
                  paddingLeft: 15,
                  fontWeight: 'bold',
                  paddingBottom: 5,
                  bottom: 5,
                }}>
                Email
              </Text>
            </View>
            <TouchableOpacity onPress={openResetPasswordActionSheet}>
              <View
                style={{
                  top: 30,
                  borderColor: '#d9d9d9',
                  borderWidth: 0.5,
                  borderRadius: 50,
                  marginBottom: 20,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#ff7373',
                  flexDirection: 'row',
                }}>
                <ResetPassword
                  visible={resetPasswordVisible}
                  userdata={userdata}
                  onClose={closeResetPasswordActionSheet}
                />

                <Text
                  onPress={openResetPasswordActionSheet}
                  style={{
                    paddingLeft: 25,
                    paddingBottom: 5,
                    bottom: 5,
                    padding: 15,
                    color: 'white',
                    fontSize: 16,
                  }}>
                  reset password
                </Text>
                <Ionicons
                  style={{right: 10}}
                  name="arrow-forward-circle-outline"
                  size={24}
                  color="#fff"
                />
              </View>
            </TouchableOpacity>

            {/* <Profile /> */}
          </View>
          
        </View>
      </SafeAreaView>
    </ActionSheetProvider>
  );
};

const DonutChart = ({percentage}) => {
  const data = [
    {
      key: 1,
      value: percentage,
      svg: {fill: '#ff7373'},
      arc: {
        outerRadius: '100%',
        cornerRadius: 10,
        startAngle: 0,
        endAngle: (percentage / 100) * (Math.PI * 2),
      },
    },
    {
      key: 2,
      value: 100 - percentage,
      svg: {fill: '#d9d9d9'},
      arc: {
        outerRadius: '100%',
        cornerRadius: 10,
        startAngle: (percentage / 100) * (Math.PI * 2),
        padAngle: 0,
        endAngle: Math.PI * 2,
      },
    },
  ];

  return (
    <PieChart style={{height: 100, width: 100}} data={data} innerRadius="70%" />
  );
};

export default Settings;

const styles = StyleSheet.create({
  circlegraph: {
    top: 20,
    left: 20,
  },
  centerTextContainer: {
    position: 'absolute',
    top: '44%',
    left: '30%',
  },
  centerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  leftbox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'black',
    height: 150,
    right: 30,
  },
  graphbox: {
    backgroundColor: '#d9d9d9',
    padding: 4,
    borderRadius: 4,
  },
  graphcontainer: {
    right: 50,
    bottom: 40,
  },
  rightbox: {
    justifyContent: 'center',
    alignItems: 'center',
    right: 15,
  },
  setcontainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#d9d9d9',
  },
  container: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    paddingBottom: 50,
    paddingTop: 50,
    flex: 1,
  },
  subbox: {
    flexDirection: 'row',
    top: 20,
    justifyContent: 'space-around',
  },
  cir: {
    height: 60,
    width: 60,
    backgroundColor: '#ff7373',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
  },
});
