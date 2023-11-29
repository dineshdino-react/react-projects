import {useState, useEffect} from 'react';
import socketIOClient from 'socket.io-client';
import PatientDetails from './PatientDetails';
import NoResultsIndicator from './NoResultsIndicator';
import {ActivityIndicator} from 'react-native';
import PatientDrugDetail from './PatientDrugDetail';
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
  RefreshControl,
  StatusBar,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {FontAwesome} from '@expo/vector-icons';
import {API_SERVER_URL} from './config';
import {API_SERVER_SOCKET} from './config';
const Stack = createStackNavigator();

const PatientList = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [doctorID, setDoctorID] = useState(null);
  const socket = socketIOClient(`${API_SERVER_SOCKET}`);

  const handleSearch = text => {
    setSearchQuery(text);
    const filtered = patients.filter(patient =>
      patient.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredPatients(filtered);
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
          
  
          if (doctorID !== null && patients.length === 0) {
            const response = await axios.get(
              `${API_SERVER_URL}/patients?doctorID=${doctorID}`,
            );
            setPatients(response.data);
            setFilteredPatients(response.data);
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
  }, []);
  

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await axios.get(
        `${API_SERVER_URL}/patients?doctorID=${doctorID}`,
      );
      setPatients(response.data);
      setFilteredPatients(response.data);
    } catch (error) {
      console.log('Error fetching patients:', error);
    } finally {
      setRefreshing(false);
    }
  };

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
        <Text style={[styles.txt, styles.text]}>List of Patients</Text>
        <View style={styles.list}>
          {loading ? (
            <ActivityIndicator size="large" color="#ff7373" />
          ) : filteredPatients.length === 0 ? (
            <NoResultsIndicator />
          ) : (
            <FlatList
              style={styles.sv}
              data={filteredPatients}
              keyExtractor={item => item._id.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.listbox}
                  onPress={() =>
                    navigation.navigate('PatientDetails', {patient: item})
                  }>
                  <View style={styles.listitem}>
                    <View style={styles.cir}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        {item.name[0].toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.patientcontent}>
                    <View style={{flexDirection:"row"}}>
                    <Text style={[styles.tcontent, styles.text]}>{item.name} </Text>
                    <Text style={{color:"red"}}> P_Id :({item.patientId})</Text>
                    </View>
                    
                    <Text style={{fontFamily:"SFProDisplay-Regular"}}>Weight: {item.weight} kg</Text>
                  </View>
                </TouchableOpacity>
              )}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default function Dino() {
  return (
    <Stack.Navigator
      initialRouteName="PatientList"
      screenOptions={{headerShown: true}}>
      <Stack.Screen name="PatientList" component={PatientList} />
      <Stack.Screen name="PatientDetails" component={PatientDetails} />
      <Stack.Screen name="PatientDrugDetail" component={PatientDrugDetail} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily:'SFProDisplay-Bold',
    textTransform:'capitalize' 
  },
  whitebox: {
    paddingBottom: 10,
  },

  sv: {
    height: '83.2%',
    ...Platform.select({
      android: {height: '81%'},
    }),
  },
  tcontent: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  patientcontent: {
    paddingLeft: 20,
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
    height: 80,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 10,
    paddingLeft: 20,
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {height: 1, width: 0},
    shadowOpacity: 0.2,
    shadowRadius: 0.5,
    elevation: 1,
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
