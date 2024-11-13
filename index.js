/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import LoginScreen from './Screens/Auth/Login';
import Main from './Screens/Main';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Main);
