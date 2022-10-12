/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert
} from 'react-native';
import { Auth, Analytics } from 'aws-amplify';

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';
import PushNotification from '@aws-amplify/pushnotification';
import { withAuthenticator } from 'aws-amplify-react-native';

const myFirstEvent = { name: 'pn_url_open_event' };

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
 useEffect(()=>{
  // PushNotification.onNotificationOpened((notification) => {
  //   // console.log('the notification was tapped', notification.getData().data.pinpoint);
  //   // Alert.alert("Notification tapped!")
  //   console.log('the notification was tapped')
  //   isTapped?setIsTapped(false):setIsTapped(true)
  // });
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

const endpointId = 
  Analytics.getPluggable('AWSPinpoint')._config.endpointId;
  console.log("EnpintID -> ", endpointId);
  return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        {/* <Button title='Signout' onPress={signOut} /> */}
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          {isTapped && <Section >
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>}
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

// export default withAuthenticator(App);
export default App;
