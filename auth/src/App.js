import React from 'react';
import firebase from 'firebase';
import { View } from 'react-native';
import { Header, Button, Spinner, CardSection } from './component/common';
import LoginForm from './component/LoginForm';

export default class App extends React.Component {

  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBpY8-_fDVH6mkrb-4j65me3i7wCq432x0',
      authDomain: 'auth-61bd9.firebaseapp.com',
      databaseURL: 'https://auth-61bd9.firebaseio.com',
      projectId: 'auth-61bd9',
      storageBucket: 'auth-61bd9.appspot.com',
      messagingSenderId: '1055745301170'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}> 
              Log Out
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size='large' />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        { this.renderContent() }
      </View>
    );
  }
}
