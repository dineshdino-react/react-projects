import {useState, useEffect} from 'react';
import socketIOClient from 'socket.io-client';
import PatientDetails from './PatientDetails';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NoResultsIndicator from './NoResultsIndicator';
import EditPatient from './EditPatient';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Platform,
  TouchableOpacity,
  FlatList,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {FontAwesome} from '@expo/vector-icons';
import {NavigationContainer} from '@react-navigation/native';
import { API_SERVER_URL } from './config';
import { API_SERVER_SOCKET } from './config';
const Stack = createStackNavigator();

const PatientRecord = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [doctorID, setDoctorID] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleteAnimationVisible, setDeleteAnimationVisible] = useState(false);

  const socket = socketIOClient(`${API_SERVER_SOCKET}`);

  const handleSearch = text => {
    setSearchQuery(text);

    // Filter the patient list based on the search query
    const filtered = patients.filter(patient =>
      patient.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredPatients(filtered);
  };
 
{/*
  useEffect(() => {
    // Fetch initial patient list from the server
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${API_SERVER_URL}/patients`);
       const orderresponse = response.data.reverse();
        setPatients(orderresponse);
        setFilteredPatients(orderresponse);
      } catch (error) {
        console.log('Error fetching patients:', error);
      }
    };

    // Listen for 'new-patient' events and update the patient list
    socket.on('new-patient', newPatient => {
      setPatients(prevPatients => [...prevPatients, newPatient]);
      setFilteredPatients(prevPatients => [...prevPatients, newPatient]);
    });
    fetchPatients();
    
    return () => {
      socket.disconnect(); // Disconnect the socket when the component unmounts
    };
    
  }, []);
 
// handling refresh patientrecord event
const fetchPatients = async () => {
  try {
    const response = await axios.get(`${API_SERVER_URL}/patients`);
    orderresponse = response.data.reverse();
    setPatients(orderresponse);
    setFilteredPatients(orderresponse);
  } catch (error) {
    console.log('Error fetching patients:', error);
  } finally {
    // After the fetch is complete (success or error), stop the refresh indicator
    setRefreshing(false);
  }
};
const onRefresh = () => {
  // When the user pulls down to refresh, this function is called
  setRefreshing(true); // Start the refresh indicator
  fetchPatients(); // Fetch data again
};

*/}


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
        

        if (doctorID !== null && patients.length === 0) {
          const response = await axios.get(
            `${API_SERVER_URL}/patients?doctorID=${doctorID}`,
             
          );
             const orderresponse = response.data.reverse();
             setPatients(orderresponse);
             setFilteredPatients(orderresponse);
             setLoading(false);
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  fetchData();

 socket.on('new-patient', newPatient => {
// Check if the newPatient is not already in the patients list
if (!patients.find(patient => patient._id === newPatient._id)) {
  setPatients(prevPatients => [...prevPatients, newPatient]);
  setFilteredPatients(prevPatients => [...prevPatients, newPatient]);
}
});
  return () => {
    socket.disconnect();
  };
}, [doctorID]);


const onRefresh = async () => {
  setRefreshing(true);
  try {
    const response = await axios.get(
      `${API_SERVER_URL}/patients?doctorID=${doctorID}`,
    );
    
             const orderresponse = response.data.reverse();
             setPatients(orderresponse);
             setFilteredPatients(orderresponse);
  } catch (error) {
    console.log('Error fetching patients:', error);
  } finally {
    setRefreshing(false);
  }
};


  //handle patient deletion

  const handleDeletePatient = (objectId) => {
    // Show a confirmation alert before deleting
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this patient?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Deletion canceled'),
          style: 'cancel',
        },
        {
          text: 'Delete', style:'destructive',
          onPress: () => {
            // Send the ObjectId to your server for deletion
            axios 
              .delete(`${API_SERVER_URL}/patients/${objectId}`)
              .then((response) => {
                {/*Alert.alert('patient deleted successfully');*/}
                if (response.status === 204) {
                  // If the server successfully deletes the patient, update the patient list in the app
                  setPatients((prevPatients) =>
                    prevPatients.filter((patient) => patient._id !== objectId)
                  );
                  setFilteredPatients((prevPatients) =>
                    prevPatients.filter((patient) => patient._id !== objectId)
                  );
                  setDeleteAnimationVisible(true);
                  setTimeout(() => {
                    // Hide the delete animation after a certain duration
                    setDeleteAnimationVisible(false);
                  }, 2000);
                } else {
                  console.error('Patient deletion failed');
                }
              })
              .catch((error) => {
                console.error(error);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };



 { /*useEffect(() => {
    // Fetch initial patient list from the server
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${API_SERVER_URL}/patients`);
        orderresponse = response.data.reverse();
        setPatients(orderresponse);
        setFilteredPatients(orderresponse);
      } catch (error) {
        console.log('Error fetching patients:', error);
      }
    };

    // Listen for 'new-patient' events and update the patient list
    socket.on('new-patient', newPatient => {
      setPatients(prevPatients => [...prevPatients, newPatient]);
      setFilteredPatients(prevPatients => [...prevPatients, newPatient]);
    });
    fetchPatients();
    
    return () => {
      socket.disconnect(); // Disconnect the socket when the component unmounts
    };

    
  }, []);*/}

  
  return (
    <SafeAreaView>
      <View>
        <View style={styles.header}>
          <View style={styles.search}>
            <TextInput
              placeholder="Search patient"
              placeholderTextColor="#2f2f2f"
              value={searchQuery}
              onChangeText={handleSearch}
              style={styles.input}
            />
            <FontAwesome
              style={styles.seicon}
              name="search"
              size={24}
              color="#ff7373"
            />
          </View>
        </View>
        <Text style={styles.txt}>Patient Record</Text>
        <View style={styles.list}>
          <View style={styles.headercontent}>
            <Text style={styles.hcontent}>#</Text>
            <Text style={styles.hcontent}>Name</Text>
            <Text style={styles.hcontent}>Weight</Text>
            <Text style={styles.hcontent}>Actions</Text>
          </View>
          <View style={styles.overallbox}>
          {loading ? (
            <ActivityIndicator style={{flex:1}} size="large" color="#ff7373" />
          ) : filteredPatients.length === 0 ? (
            <NoResultsIndicator />
          ) : (
            <FlatList
              style={styles.sv}
              data={filteredPatients}
              keyExtractor={item => item._id.toString()}
              renderItem={({item}) => (
                <View style={styles.listbox}>
                  <View style={styles.listitem}>
                    <View style={styles.cir}>
                      <Text style={{color: '#fff', fontSize: 18, fontWeight:"bold"}}>
                        {item.name[0].toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.patientcontent}>
                    <Text style={styles.tcontent}>{item.name}</Text>
                    <View>
                      <Text
                        style={[
                          styles.genderText,
                          {color: item.gender === 'male' ? 'red' : 'blue'},
                        ]}>
                        {item.gender}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.wcontent}>{item.weight} kg</Text>
                  <FontAwesome5 onPress={() =>
                  navigation.navigate('Edit Record',{patient: item})
                } style={styles.econtent} name="edit" size={18} color="#097bbc" />
                  <MaterialCommunityIcons onPress={() => handleDeletePatient(item._id)} style={styles.dcontent} name="delete-empty" size={24} color="red" />
                </View> 
                
              )}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            />
          )}
          </View>
          {isDeleteAnimationVisible && (
        <View style={styles.deleteAnimationContainer}>
          <LottieView style={{height:150,width:150}} source={require('../images/animation1.json')} autoPlay loop={false} />
        </View>
          )}
        </View>
       
      </View>
          
    </SafeAreaView>
  );
};
export default function Dino() {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen name="Patient Record" component={PatientRecord} />
      <Stack.Screen name="Edit Record" component={EditPatient} />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  deleteAnimationContainer: {
    position: 'absolute',
    alignItems: 'center',
    top:"20%",
    left:"35%",
    justifyContent: 'center',
    backgroundColor:"#fff",
    zIndex: 1,
    borderRadius:100,
  },
  dcontent: {
    position: 'absolute',
    left: 310,
  },
  wcontent: {
    position: 'absolute',
    left: 185,
  },
  econtent: {
    position: 'absolute',
    left: 270,
  },
  overallbox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    height:"100%"
  },
  headercontent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
  },
  whitebox: {
    paddingBottom: 10,
  },

  sv: {
    height: '87%',
    ...Platform.select({
      android: {height: '81%'},
    }),
  },
  tcontent: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingBottom: 5,
    textTransform: 'capitalize',
  },
  patientcontent: {
    paddingLeft: 35,
  },
  cir: {
    height: 40,
    width: 40,
    backgroundColor: '#ff7373',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  list: {
    top: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  listbox: {
    width: '100%',
    padding: 20,
    paddingLeft: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  txt: {
    fontSize: 18,
    fontWeight: 'bold',
    top: 30,
    left: 20,
  },
  search: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: '100%',
    top: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingLeft: 20,
  },
  seicon: {
    top: 12,
    right: 40,
    height: 30,
    width: 30,
  },
});
