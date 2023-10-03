/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { registerRootComponent } from 'expo'
import App from './App';
import appJSON from './app.json';

registerRootComponent(App);

AppRegistry.registerComponent(appJSON.expo.name, () => App);

