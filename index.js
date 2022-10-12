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
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import {AppRegistry, Alert} from 'react-native';

if(__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

Amplify.configure(awsconfig);

Auth.configure(awsconfig);
Analytics.configure(awsconfig);

PushNotification.configure(awsconfig);

PushNotification.onRegister((token) => {
  console.log('registered', token);
});

PushNotification.onNotification((notification) => {
  console.log('notification received', notification);
  // notification.finish(PushNotificationIOS.FetchResult.NoData)
});

PushNotification.onNotificationOpened((notification) => {
  console.log('the notification was tapped');
  // Alert.alert("Notification tapped!")
});

Amplify.Logger.LOG_LEVEL = "DEBUG";

AppRegistry.registerComponent(appName, () => App);




// 99eb4a587c43907f785d490bcc89faef97b42f8bcffd999bbe05291d7a9d4a43