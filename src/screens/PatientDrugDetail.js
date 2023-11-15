import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native-gesture-handler';
const PatientDrugDetail = ({route}) => {
  const {patient} = route.params;
  const {drug} = route.params;
  const [calculatedValue, setCalculatedValue] = useState(null);
  const [calculationType, setCalculationType] = useState('normal');
  const [fluidEstimation, setFluidEstimation] = useState(null);




  const handleCalculate = () => { 
    const result = calculate();
    const formattedResult = result.toFixed(2);
    setCalculatedValue(formattedResult);
    setCalculationType('normal');
  };
  PatientDrugDetail.propTypes = {
    route: PropTypes.object.isRequired,
  };

  const calculate = () => {
    const calcWeight = patient.weight;
    const calcDosage = drug.dosage;
    return calcWeight * calcDosage;
  };

  const renderCalculationBox = () => {
    if (calculationType === 'normal') {
      return (
        <View style={styles.calcpart}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>Weight</Text>
            <Text style={{paddingTop: 20}}>{patient.weight}</Text>
          </View>
          <Text style={{left: 30, top: 35, fontSize: 18}}>*</Text>
          <View
            style={{
              left: 60,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>Dosage</Text>
            <Text style={{paddingTop: 20}}>{drug.dosage}</Text>
          </View>
          <Text style={{left: 100, top: 15}}>=</Text>
          <Text style={{left: 160, top: 10, fontWeight: 'bold'}}>
            {calculatedValue} mg
          </Text>
        </View>
      );
    } else if (calculationType === 'fluid') {
      const weight = patient.weight;
      const fluidEstimation = 4 * Math.min(10, weight) + 2 * Math.min(10, Math.max(0, weight - 10)) + 1 * Math.max(0, weight - 20);
      const hours = (fluidEstimation * 6);
      const halfhour = (hours / 2);
      const secondhalfhour = ((hours/2)/2);
      const thirdspaceloss = (3*weight);
      const firsthour = (halfhour + fluidEstimation + thirdspaceloss);
      const secondhour = (secondhalfhour + fluidEstimation + thirdspaceloss);
      return (
        <>
        <View style={styles.calcpart}>
          <Text>Fluid Calculation = </Text>
          <Text><Text> 4 : 2 : 1 = </Text> <Text style={styles.color}>{fluidEstimation}</Text> * 6 (fastinghours)</Text>
        </View>
        <View style={styles.calcbox}>
        <Text style={styles.textcontainer}>1st hour = {halfhour} + {fluidEstimation} + {thirdspaceloss} = <Text style={styles.color}>{firsthour}</Text></Text>
        <Text style={styles.textcontainer}>2nd hour = {secondhalfhour} + {fluidEstimation} + {thirdspaceloss} = <Text style={styles.color}>{secondhour}</Text></Text>
        <Text style={styles.textcontainer}>3rd hour = <Text style={styles.color}> {secondhour}</Text></Text>
        </View>
        
        </>
      );
    } else if (calculationType === 'bloodLoss') {
      return (
        <View style={styles.calcpart}>
          <Text>Blood Loss Calculation:</Text>
          {/* Your Blood Loss Calculation */}
          <Text>Example Blood Loss Calculation Content</Text>
        </View>
      );
    }
    // Add more conditions for other calculation types if needed
  };
  const handleFluidCalculation = () => {
    const FluidEstimation = renderCalculationBox();
    setFluidEstimation(FluidEstimation);
    setCalculationType('fluid');
  };

  const handleBloodLossCalculation = () => {
    setCalculationType('bloodLoss');
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.outerbox}>
        <View style={styles.bodybox}>
          <View style={styles.headercontent}>
            <Text style={styles.headname}>Patient Drug Details</Text>
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
                  <View style={styles.input}>
                    <Text style={{color: '#2f2f2f'}}>
                      Drug name :{' '}
                      <Text style={{color: '#ff7373', fontWeight: 'bold'}}>
                        {drug.drugname}
                      </Text>
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={handleCalculate}>
                  <View style={styles.btnstyle}>
                    <Text style={styles.btn}>Calculate</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.body}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingTop: 15,
                  width: '100%',
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity
                  style={styles.btnstyle1}
                  onPress={handleFluidCalculation}>
                  <View>
                    <Text style={styles.btn}>Fluid Calculation</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnstyle1}
                  onPress={handleBloodLossCalculation}>
                  <View>
                    <Text style={styles.btn}>Blood Loss Calculation</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.togglebox}>
                <View style={styles.bodyhead}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                    Calculation :
                  </Text>
                </View>
                {renderCalculationBox()}
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PatientDrugDetail;

const styles = StyleSheet.create({
  textcontainer:{
  marginVertical:10,
  },
  color:{
  color:"red",
  fontWeight:"700"
  },
  calcpart: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
  },
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
  druglist: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 25,
    paddingLeft: 10,
    paddingRight: 30,
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

  searchstyle: {
    flexDirection: 'row',
    height: 30,
    borderWidth: 0.5,
    borderColor: '#d9d9d9',
    borderRadius: 5,
    width: '68%',
    paddingLeft: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnstyle: {
    width: '100%',
    padding: 7,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
    backgroundColor: '#ff7373',
  },
  btnstyle1: {
    width: '48%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
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
    top: 20,
    paddingBottom: 30,
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 20,
    top: 20,
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
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  dosagestyle: {
    right: 20,
    top: 10,
  },
});
