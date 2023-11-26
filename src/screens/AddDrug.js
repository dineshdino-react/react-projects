import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_SERVER_URL} from './config';

const AddDrug = () => {
  const [filledFields, setFilledFields] = useState(0);
  const [drugData, setDrugData] = useState({
    drugname: '',
    category: '',
    agegroup: '',
    dosage: {min: {value: 0, unit: ''}, max: {value: 0, unit: ''}},
    fataldosage: {value :0 , unit:''},
  });

  const [isSaveButtonActive, setIsSaveButtonActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    if (field === 'dosageMin' || field === 'dosageMax') {
      const unit = value.toLowerCase().includes('g') ? 'g/kg' : 'mg/kg';
      const numericValue = parseFloat(value);
  
      setDrugData({
        ...drugData,
        dosage: {
          ...drugData.dosage,
          [field === 'dosageMin' ? 'min' : 'max']: { value: numericValue, unit },
        },
      });
    } else if (field === 'fataldosage') {
      const unit = value.toLowerCase().includes('mg') ? 'g/kg' : 'mg/kg';
      const numericValue = parseFloat(value);
  
      setDrugData({
        ...drugData,
        fataldosage: { value: numericValue, unit },
      });
    } else {
      setDrugData({ ...drugData, [field]: value });
    }

    // Update the filledFields state based on the filled input fields
    if (value !== '' && value !== 0) {
      setFilledFields(prevFilledFields => prevFilledFields + 1);
    }
  };

  const isFormValid = () => {
    // Check if all required input fields are not empty, not equal to 0, and not empty strings
    return (
      drugData.drugname !== '' &&
      drugData.category !== '' &&
      drugData.dosage !== '' &&
      drugData.fataldosage !== '' &&
      drugData.drugname.trim() !== '' &&
      drugData.category.trim() !== ''
    );
  };

  const calculateProgress = () => {
    const totalFields = Object.keys(drugData).length;
    const progress = (filledFields / totalFields) * 100;
    return progress.toFixed(0); // Round to the nearest integer
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_SERVER_URL}/drugs`, drugData).then(response => {
        console.log('Drug details saved:', response.data);
      });
      // Handle success or navigate to another screen
      Alert.alert('Drug details saved');
      console.log('Drug data saved');
    } catch (error) {
      // Handle error
      console.error('Error saving drug data:', error);
    }
  };

  useEffect(() => {
    // Update the button state when the form data changes
    setIsSaveButtonActive(isFormValid());
  }, [drugData]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.body}>
            <View style={styles.mainblock}>
              <View style={styles.whitebox}>
                <View></View>
                <View style={styles.header}>
                  <Text style={styles.txt}>Add Drug</Text>
                </View>
                <TextInput
                  placeholder="Drug Name *"
                  placeholderTextColor={'#a6a6a6'}
                  onChangeText={text => handleInputChange('drugname', text)}
                  style={styles.inputbox}
                />
                <TextInput
                  placeholder="Category*"
                  placeholderTextColor={'#a6a6a6'}
                  onChangeText={text => handleInputChange('category', text)}
                  style={styles.inputbox}
                />
                <TextInput
                  placeholder="Age Group "
                  placeholderTextColor={'#a6a6a6'}
                  onChangeText={text => handleInputChange('agegroup', text)}
                  style={styles.inputbox}
                />
                <TextInput
                  placeholder="Dosage Min *"
                  placeholderTextColor={'#a6a6a6'}
                  onChangeText={text => handleInputChange('dosageMin', text)}
                  style={styles.inputbox}
                />

                <TextInput
                  placeholder="Dosage Max *"
                  placeholderTextColor={'#a6a6a6'}
                  onChangeText={text => handleInputChange('dosageMax', text)}
                  style={styles.inputbox}
                />
                <TextInput
                  placeholder="Fatal Dosage"
                  placeholderTextColor={'#a6a6a6'}
                  onChangeText={text => handleInputChange('fataldosage', text)}
                  // onChangeText={Number =>
                  //   handleInputChange('fataldosage', Number)
                  // }
                  style={styles.inputbox}
                />

                <TouchableOpacity
                  style={
                    isSaveButtonActive
                      ? styles.activeSaveButton
                      : styles.disabledSaveButton
                  }
                  onPress={handleSubmit}
                  disabled={!isSaveButtonActive || isLoading}>
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.start}>Save</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 10,
    backgroundColor: '#d9d9d9',
    borderRadius: 20,
    marginVertical: 10,
    right: 170,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    ...Platform.select({
      android: {paddingTop: 50},
    }),
  },
  body: {
    flex: 1,
    alignItems: 'center',
  },
  mainblock: {
    width: '100%',
    backgroundColor: '#f2f2f2',
  },
  whitebox: {
    width: 350,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 30,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
  },
  txt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff7373',
  },
  activeSaveButton: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#ff7373',
    alignItems: 'center',
    justifyContent: 'center',
    top: 15,
  },
  disabledSaveButton: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
    top: 15,
  },
  start: {
    color: '#fff',
    fontWeight: 'normal',
    fontSize: 18,
  },
  inputbox: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#d9d9d9',
    marginTop: 30,
    paddingLeft: 20,
  },
});

export default AddDrug;
