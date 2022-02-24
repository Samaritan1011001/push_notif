/**
 * @format
 */

// import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

 import Amplify from 'aws-amplify';
 import awsconfig from './src/aws-exports';
 import Analytics from '@aws-amplify/analytics';
 import PushNotification from '@aws-amplify/pushnotification';
 import Auth from '@aws-amplify/auth';
import 'react-native-get-random-values';

import {AppRegistry} from 'react-native';



Amplify.configure(awsconfig);

Auth.configure(awsconfig);
Analytics.configure(awsconfig);
// Amplify.Logger.LOG_LEVEL = "DEBUG";

PushNotification.configure(awsconfig);
PushNotification.onRegister((token) => {
  console.log('registered', token);
});

PushNotification.onNotification((notification) => {
  console.log('notification received', notification);
});

PushNotification.onNotificationOpened((notification) => {
  console.log('the notification was tapped');
});
AppRegistry.registerComponent(appName, () => App);



