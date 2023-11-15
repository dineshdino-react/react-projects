import React, { useState , useEffect } from 'react';
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
} from 'react-native';
import axios from 'axios';
import { API_SERVER_URL } from './config';

const EditPatient = ({ route, navigation }) => {
  const { patient } = route.params;
  const [editedPatient, setEditedPatient] = useState({ ...patient });
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const isDataModified = JSON.stringify(editedPatient) !== JSON.stringify(patient);
    setIsDirty(isDataModified);
  }, [editedPatient, patient]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${API_SERVER_URL}/patients/${patient._id}`,
        editedPatient
      );
      if (response.data.success) {
        Alert.alert('Patient details updated successfully');
        navigation.goBack();
      } else {
        Alert.alert('Failed to update patient details');
      }
    } catch (error) {
      console.error('Error updating patient details:', error);
      Alert.alert('Failed to update patient details');
    }
  };

  const handleInputChange = (name, value) => {
    const updatedPatient = { ...editedPatient, [name]: value };
    setEditedPatient(updatedPatient);
    setIsDirty(JSON.stringify(updatedPatient) !== JSON.stringify(patient));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{ flex: 1, ...Platform.select({ android: { flex: 1 } }) }}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.body}>
            <View style={styles.mainblock}>
              <View style={styles.whitebox}>
                <View style={styles.header}>
                  <Text style={styles.txt}>Edit Patient</Text>
                </View>

                <TextInput
                  placeholder="Name *"
                  placeholderTextColor={'#a6a6a6'}
                  value={editedPatient.name}
                  onChangeText={text => handleInputChange('name', text)}
                  style={styles.inputbox}
                />
                <TextInput
                  placeholder="Patient id *"
                  value={editedPatient.patientId}
                  placeholderTextColor={'#a6a6a6'}
                  onChangeText={text => handleInputChange('patientId', text)}
                  style={styles.inputbox}
                />
                <TextInput
                  placeholder="Gender *"
                  value={editedPatient.gender}
                  placeholderTextColor={'#a6a6a6'}
                  onChangeText={text => handleInputChange('gender', text)}
                  style={styles.inputbox}
                />
                <TextInput
                  placeholder="Mobile *"
                  value={editedPatient.mobile.toString()}
                  placeholderTextColor={'#a6a6a6'}
                  onChangeText={text => handleInputChange('mobile', text)}
                  style={styles.inputbox}
                />
                <TextInput
                  placeholder="Treatment"
                  value={editedPatient.treatmentType}
                  placeholderTextColor={'#a6a6a6'}
                  onChangeText={text => handleInputChange('treatmentType', text)}
                  style={styles.inputbox}
                />
                <TextInput
                  placeholder="Age *"
                  value={editedPatient.age.toString()}
                  placeholderTextColor={'#a6a6a6'}
                  onChangeText={text => handleInputChange('age', text)}
                  style={styles.inputbox}
                />
                <TextInput
                  placeholder="BloodGroup *"
                  placeholderTextColor={'#a6a6a6'}
                  value={editedPatient.bloodGroup}
                  onChangeText={text => handleInputChange('bloodGroup', text)}
                  style={styles.inputbox}
                />
                <TextInput
                  placeholder="Weight *"
                  placeholderTextColor={'#a6a6a6'}
                  value={editedPatient.weight.toString()}
                  onChangeText={text => handleInputChange('weight', text)}
                  style={styles.inputbox}
                />
                <TextInput
                  placeholder="Height *"
                  placeholderTextColor={'#a6a6a6'}
                  value={editedPatient.height.toString()}
                  onChangeText={text => handleInputChange('height', text)}
                  style={styles.inputbox}
                />

                <TouchableOpacity
                  style={[
                    styles.updateButton,
                    isDirty ? {} : { backgroundColor: '#d9d9d9' },
                  ]}
                  disabled={!isDirty}
                  onPress={handleUpdate}>
                  <Text style={styles.updateButtonText}>Update</Text>
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
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 40,
  },
  updateButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#ff7373',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    top: 40,
  },
  updateButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  body: {
    flex: 1,
    alignItems: 'center',
  },
  mainblock: {
    width: '90%',
    backgroundColor: '#f2f2f2',
  },
  whitebox: {
    width: 350,
    backgroundColor: '#fff',
    alignItems: 'center',
    
    
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
  loginbtn: {
    height: 50,
    backgroundColor: '#ff7373',
    alignItems: 'center',
    justifyContent: 'center',
    top: 15,
    padding: 20,
  },
  start: {
    color: '#fff',
    fontWeight: 'normal',
    fontSize: 18,
  },
  inputbox: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#d9d9d9',
    paddingLeft: 15,
    marginTop: 10,
    padding: 20,
  },
});

export default EditPatient;
