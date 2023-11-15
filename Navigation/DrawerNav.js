import React from 'react';
import {Login, Welcome, Forgot, Homepage} from '../src/screens';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PatientList from '../src/screens/PatientList';
import DrugList from '../src/screens/DrugList';
import AddPatient from '../src/screens/AddPatient';
import Settings from '../src/screens/Settings';
import PatientRecord from '../src/screens/PatientRecord';
import {AntDesign, Ionicons, Fontisto, Octicons} from '@expo/vector-icons';
import CustomDrawer from '../components/CustomDrawer';
import {Entypo} from '@expo/vector-icons';
import {createDrawerNavigator} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
//const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import {View, StyleSheet} from 'react-native';

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          position: 'absolute',
          bottom: 25,
          left: 16,
          right: 16,
          borderRadius: 20,
          paddingBottom: 0,
          shadowColor: '#000',
          shadowOffset: {height: 1, width: 0},
          shadowOpacity: 0.3,
          shadowRadius: 0.5,
          elevation: 2,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Homepage}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarLabelStyle: {color: '#ff7373'},
          
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={styles.infonew}>
                <AntDesign name="appstore1" size={28} color="#fff" />
              </View>
            ) : (
              <AntDesign name="appstore1" size={28} color="#ff7373" />
            ),
        }}
      />
      <Tab.Screen
        name="patientList"
        component={PatientList}
        options={{
          headerShown: false,
          tabBarLabel: 'Patientlist',
          tabBarLabelStyle: {color: '#ff7373'},
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={styles.infonew}>
                <Ionicons name="person" size={28} color="#fff" />
              </View>
            ) : (
              <Ionicons name="person" size={28} color="#ff7373" />
            ),
        }}
      />
      <Tab.Screen
        name="DrugList"
        component={DrugList}
        options={{
          headerShown: false,
          tabBarLabel: 'DrugList',
          tabBarLabelStyle: {color: '#ff7373'},
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={styles.infonew}>
                <Fontisto name="injection-syringe" size={28} color="#fff" />
              </View>
            ) : (
              <Fontisto name="injection-syringe" size={28} color="#FF7373" />
            ),
        }}
      />
      <Tab.Screen
        name="AddPatient"
        component={AddPatient}
        options={{
          headerShown: false,
          tabBarLabel: 'AddPatient',
          tabBarLabelStyle: {color: '#ff7373'},
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={styles.infonew}>
                <Octicons name="person-add" size={28} color="#fff" />
              </View>
            ) : (
              <Octicons name="person-add" size={28} color="#FF7373" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

function Drawernav() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#ff7373',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#ff7373',
        drawerLabelStyle: {
          marginLeft: -22,
          textTransform: 'capitalize',
          fontSize: 16,
          fontFamily: 'SFProDisplay-Regular',
        },
      }}>
      <Drawer.Screen
        name="home"
        component={BottomTabs}
        options={{ 
          drawerIcon: ({color}) => (
            <AntDesign name="appstore1" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="PatientRecord"
        component={PatientRecord}
        options={{
          drawerIcon: ({color}) => (
            <Entypo name="database" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="md-settings-sharp" size={20} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
export default Drawernav;

const styles = StyleSheet.create({
  infonew: {
    backgroundColor: '#ff7373',
    opacity: 1,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});

// dummy
{
  /*<Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarLabel: 'Settings',
          tabBarLabelStyle: {color: '#ff7373'},
          tabBarIcon: ({focused}) =>
            focused ? (
              <Ionicons name="md-settings-sharp" size={35} color="#ff7373" />
            ) : (
              <Ionicons name="md-settings-sharp" size={24} color="black" />
            ),
        }}
      />*/
}
