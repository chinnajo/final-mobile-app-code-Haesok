/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import axios from './axios';
import {name as appName} from './app.json';
React.Component.prototype.axios = axios;
AppRegistry.registerComponent(appName, () => App);
