/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Auth, Analytics} from 'aws-amplify';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import storage from '.';
import { Platform } from 'react-native';


const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const [body, setBody] = useState('');
  useEffect(() => {
    // PushNotification.onNotificationOpened((notification) => {
    //   // console.log('the notification was tapped', notification.getData().data.pinpoint);
    //   // Alert.alert("Notification tapped!")
    //   console.log('the notification was tapped')
    //   isTapped?setIsTapped(false):setIsTapped(true)
    // });
    // load
    if (Platform.OS === 'ios') {
      storage
        .load({
          key: 'notificationTappedBg',

          // autoSync (default: true) means if data is not found or has expired,
          // then invoke the corresponding sync method
          autoSync: true,

          // syncInBackground (default: true) means if data expired,
          // return the outdated data first while invoking the sync method.
          // If syncInBackground is set to false, and there is expired data,
          // it will wait for the new data and return only after the sync completed.
          // (This, of course, is slower)
          syncInBackground: true,

          // you can pass extra params to the sync method
          // see sync example below
          syncParams: {
            extraFetchOptions: {
              // blahblah
            },
            someFlag: true,
          },
        })
        .then(ret => {
          // found data go to then()
          console.log(ret.body);
          setBody(ret.body);
        })
        .catch(err => {
          // any exception including data not found
          // goes to catch()
          console.warn(err.message);
          switch (err.name) {
            case 'NotFoundError':
              // TODO;
              break;
            case 'ExpiredError':
              // TODO
              break;
          }
        });
    }
  });
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [isTapped, setIsTapped] = useState(false);

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  const endpointId = Analytics.getPluggable('AWSPinpoint')._config.endpointId;
  console.log('EnpintID -> ', endpointId);
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Header />
      {/* <Button title='Signout' onPress={signOut} /> */}
      <View>
        <Text style={{color: 'white'}}>{body}</Text>
        {isTapped && (
          <Section>
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
