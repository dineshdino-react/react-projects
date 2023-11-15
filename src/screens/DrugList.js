import {useState, useEffect} from 'react';
import socketIOClient from 'socket.io-client';
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
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {FontAwesome} from '@expo/vector-icons';
import {Fontisto} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import {API_SERVER_URL} from './config';
import {API_SERVER_SOCKET} from './config';
import AddDrug from './AddDrug';

const Stack = createStackNavigator();

const DrugList = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [drugs, SetDrug] = useState([]);
  const [filteredDrugs, setFilteredDrugs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const socket = socketIOClient(`${API_SERVER_SOCKET}`);

  const handleSearch = text => {
    setSearchQuery(text);
    const filtered = drugs.filter(drug =>
      drug.drugname.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredDrugs(filtered);
    // Set the isSearchFocused state based on whether the search input has text
    setIsSearchFocused(text.length > 0);
  };

  useEffect(() => {
    // Fetch initial drug list from the server
    const Fetchdrugs = async () => {
      try {
        const response = await axios.get(`${API_SERVER_URL}/drugs`);
        SetDrug(response.data);
        setFilteredDrugs(response.data);
      } catch (error) {
        console.log('Error fetching patients:', error);
      }
    };

    // Listen for 'new-patient' events and update the patient list
    socket.on('new-patient', newDrug => {
      SetDrug(prevDrug => [...prevDrug, newDrug]);
      setFilteredDrugs(prevDrug => [...prevDrug, newDrug]);
    });
    Fetchdrugs();

    return () => {
      socket.disconnect(); // Disconnect the socket when the component unmounts
    };
  }, []);

  const Fetchdrugs = async () => {
    try {
      const response = await axios.get(`${API_SERVER_URL}/drugs`);
      SetDrug(response.data);
      setFilteredDrugs(response.data);
    } catch (error) {
      console.error('Error fetching drugs:', error);
    } finally {
      // After the fetch is complete (success or error), stop the refresh indicator
      setRefreshing(false);
    }
  };
  const onRefresh = () => {
    // When the user pulls down to refresh, this function is called
    setRefreshing(true); // Start the refresh indicator
    Fetchdrugs(); // Fetch data again
  };

  return (
    <SafeAreaView>
      <View>
        <View style={styles.header}>
          <View style={styles.search}>
            <TextInput
              placeholder="Search drug"
              placeholderTextColor={'#2f2f2f'}
              onChangeText={handleSearch}
              value={searchQuery}
              style={styles.input}></TextInput>
            <FontAwesome
              style={styles.seicon}
              name="search"
              size={24}
              color="#ff7373"
            />
          </View>
        </View>
        <View style={styles.infobox}>
          {isSearchFocused ? null : (
            <View style={styles.infocontent}>
              <View style={styles.rside}>
                <Text style={styles.uppertxt}>About Drugs</Text>
                <Text style={styles.lowertxt}>
                  These anesthesia drugs are provided for the patients; they
                  will be effective as soon as possible.
                </Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.drugheader}>
          <Text style={styles.txt}>List of Drugs</Text>

          <TouchableOpacity
            style={styles.ciredit}
            onPress={() => navigation.navigate('AddDrug')}>
            <Text style={styles.adddrugtxt}>Add Drug</Text>
            <Ionicons
              style={styles.addcircle}
              name="md-add-circle"
              size={29}
              color="#ff7373"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.list}>
          <FlatList
            style={styles.sv}
            data={filteredDrugs}
            keyExtractor={item => item._id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity style={styles.listbox}>
                <View style={styles.listitem}>
                  <View style={styles.cir}>
                    <Fontisto name="injection-syringe" size={24} color="#fff" />
                  </View>
                </View>
                <View style={styles.patientcontent}>
                  <Text style={styles.tcontent}>{item.drugname}</Text>
                  <Text>Dosage : {item.dosage} </Text>
                </View>
              </TouchableOpacity>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default function Druglist() {
  return (
    <Stack.Navigator initialRouteName="Drugitem">
      <Stack.Screen name="Drugitem" component={DrugList} />
      <Stack.Screen name="AddDrug" component={AddDrug} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  adddrugtxt: {},
  ciredit: {
    height: 30,
    width: 100,
    top: 35,
    borderRadius: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  },
  addcircle: {},
  drugheader: {
    flexDirection: 'row',
    paddingRight: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  uppertxt: {
    fontSize: 18,
    fontWeight: 'bold',
    ...Platform.select({
      android: {fontSize: 15},
    }),
  },
  lowertxt: {
    ...Platform.select({
      android: {lineHeight: 15, fontSize: 12},
      ios: {lineHeight: 20, fontSize: 14},
    }),
    width: '65%',
    paddingTop: 10,
  },
  infocontent: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {height: 1, width: 0},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
  },
  infobox: {
    top: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  whitebox: {
    paddingBottom: 10,
    top: 10,
  },

  sv: {
    height: '64%',
    ...Platform.select({
      ios: {height: '63.4%'},
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
    height: 50,
    width: 50,
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
    paddingLeft: 20,
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {height: 1, width: 0},
    shadowOpacity: 0.2,
    shadowRadius: 0.5,
    elevation: 1,
    marginTop: 10,
  },
  txt: {
    fontSize: 18,
    fontWeight: 'bold',
    top: 35,
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
