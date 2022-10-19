/**
 * @format
 */

import App from './App';
import {name as appName} from './app.json';
import Amplify from 'aws-amplify';
import awsconfig from './src/aws-exports';
import Analytics from '@aws-amplify/analytics';
import PushNotification from '@aws-amplify/pushnotification';
import Auth from '@aws-amplify/auth';
import 'react-native-get-random-values';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppRegistry} from 'react-native';
import {Platform} from 'react-native';

const storage = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: 1000 * 3600 * 24,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  sync: {
    // we'll talk about the details later.
  },
});

Amplify.configure(awsconfig);
Auth.configure(awsconfig);
Analytics.configure(awsconfig);
// PushNotification.configure(awsconfig);

PushNotification.onRegister(token => {
  console.log('registered', token);
});

PushNotification.onNotification(notification => {
  // Android
  console.log('notification received', notification);

  if (Platform.OS === 'ios') {
    // iOS
    console.log('notification received', notification._alert.body);
  }

});

PushNotification.onNotificationOpened(notification => {
  // Android
  console.log('the notification was tapped', notification);

  if (Platform.OS === 'ios') {
    // iOS
    console.log(
      'the notification was tapped',
      notification._data.aps.alert.body,
    );
    storage.save({
      key: 'notificationTappedBg', // Note: Do not use underscore("_") in key!
      data: {
        body: notification._data.aps.alert.body,
      },

      // if expires not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires: 1000 * 3600,
    });
  }
});

// Amplify.Logger.LOG_LEVEL = 'DEBUG';

AppRegistry.registerComponent(appName, () => App);

export default storage;
