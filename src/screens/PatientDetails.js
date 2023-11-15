import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import NavigationContainer from '@react-navigation/native';
import React from 'react';
import {useState, useEffect} from 'react';
import {FontAwesome} from '@expo/vector-icons';
import {Fontisto} from '@expo/vector-icons';
import {createStackNavigator} from '@react-navigation/stack';
import {API_SERVER_URL} from './config';
import {API_SERVER_SOCKET} from './config';
import PatientDrugDetail from './PatientDrugDetail';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
const Stack = createStackNavigator();

const PatientDetails = ({route}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [drugs, SetDrug] = useState([]);
  const [filteredDrugs, setFilteredDrugs] = useState([]);
  const socket = socketIOClient(`${API_SERVER_SOCKET}`);

  const navigation = useNavigation();

  const handleDrugClick = item => {
    // Navigate to the "PatientDrugDetail" page and pass the drug data as a parameter
    navigation.navigate('PatientDrugDetail', {patient, drug: item});
  };

  const handleSearch = text => {
    setSearchQuery(text);
    const filtered = drugs.filter(drug =>
      drug.drugname.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredDrugs(filtered);
  };

  useEffect(() => {
    // Fetch initial drug list from the server
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${API_SERVER_URL}/drugs`);
        SetDrug(response.data);
        setFilteredDrugs(response.data);
      } catch (error) {
        console.log('Error fetching patients:', error);
      }
    };

    // Listen for 'new-patient' events and update the patient list
    socket.on('new-patient', newPatient => {
      SetDrug(prevPatients => [...prevPatients, newPatient]);
      setFilteredDrugs(prevPatients => [...prevPatients, newPatient]);
    });
    fetchPatients();

    return () => {
      socket.disconnect(); // Disconnect the socket when the component unmounts
    };
  }, []);

  const {patient} = route.params;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.outerbox}>
        <View style={styles.bodybox}>
          <View style={styles.headercontent}>
            <Text style={styles.headname}>Patient Details</Text>
            <View style={styles.whitebox}>
              <View style={styles.listbox}>
                <View style={styles.listitem}>
                  <View style={styles.cir}>
                    <Text
                      style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
                      {patient.name[0].toUpperCase()}
                    </Text>
                  </View>
                </View>
                <View style={styles.patientcontent}>
                  <Text style={styles.tcontent}>
                    {patient.name.toUpperCase()}
                  </Text>
                  <Text>{patient.treatmentType}</Text>
                </View>
              </View>
              <View style={styles.bodycontent}>
                <Text>Age: {patient.age}</Text>
                <View style={styles.lineStyle} />
                <Text>{patient.gender}</Text>
                <View style={styles.lineStyle} />
                <View>
                  <Text style={styles.last}>Weight : {patient.weight} kg</Text>
                  <Text>Height : {patient.height}</Text>
                </View>
              </View>
            </View>
            <View style={styles.lineSt} />
            <View style={styles.properalign}>
              <View style={styles.search}>
                <View style={styles.searchstyle}>
                  <TextInput
                    placeholder="Search drug"
                    placeholderTextColor={'#2f2f2f'}
                    value={searchQuery}
                    onChangeText={handleSearch}
                    style={styles.input}></TextInput>

                  <FontAwesome
                    style={styles.seicon}
                    name="search"
                    size={18}
                    color="#ff7373"
                  />
                </View>
                <TouchableOpacity>
                  <View style={styles.btnstyle}>
                    <Text style={styles.btn}>Calculate</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.bodyhead}>
                <Text style={styles.head}>Drugs</Text>
                <Text style={styles.head}>Dosage</Text>
              </View>

              <FlatList style={{height:"54%"}}
                data={filteredDrugs}
                keyExtractor={item => item._id.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={() => handleDrugClick(item)}>
                    <View style={styles.listboxs}>
                      <View style={styles.listitems}>
                        <View style={styles.cir}>
                          <Fontisto
                            name="injection-syringe"
                            size={20}
                            color="#fff"
                          />
                        </View>
                        <Text style={styles.tcontents}>{item.drugname}</Text>
                      </View>
                      <View style={styles.drugcontent}>
                        <Text style={styles.dosagestyle}> {item.dosage} </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PatientDetails;

const styles = StyleSheet.create({
  listitems: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listitem: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    color: '#fff',
  },

  head: {
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  bodyhead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  input: {
    opacity: 0.5,
  },
  seicon: {
    paddingTop: 10,
    paddingRight: 10,
  },
  searchstyle: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#f0f0f0',
    width: '68%',
    paddingLeft: 20,
    justifyContent: 'space-between',
    borderRadius: 20,
  },
  btnstyle: {
    width: '100%',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
    backgroundColor: '#ff7373',
  },
  search: {
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  lineSt: {
    borderWidth: 0.5,
    borderColor: 'black',
    width: '100%',
    top: 10,
  },
  last: {
    paddingBottom: 10,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'black',
    height: 40,
  },
  bodycontent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom:20,
    alignItems: 'center',
  
  },
  patientcontent: {
    paddingLeft: 20,
  },
  drugcontent: {
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tcontent: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  tcontents: {
    fontSize: 15,
    fontWeight: 'bold',
    left: 15,
  },
  outerbox: {
    paddingLeft: 10,
    paddingRight: 10,
    
  },
  bodybox: {
    width: '100%',
    padding: 20,
    paddingBottom:0,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 20,
    top: 10,
    height: 'auto',
    
  },
  headname: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2f2f2f',
  },
  cir: {
    height: 40,
    width: 40,
    backgroundColor: '#ff7373',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listbox: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  listboxs: {
    flexDirection: 'row',
    paddingTop: 15,
    justifyContent: 'space-between',
  },
  dosagestyle: {
    right: 20,
    top: 10,
  },
});
