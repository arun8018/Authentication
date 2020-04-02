import React from 'react';
import firebase from 'firebase';
import {View, Text} from 'react-native';
import Header from './src/Components/Header';
import LoginForm from './src/Components/LoginForm';
import Button from './src/Components/Button';
import Spinner from './src/Components/Spinner';
import CardSection from './src/Components/CardSection';
class App extends React.Component {
  state = {loggedIn: null};
  componentDidMount() {
    const firebaseConfig = {
      apiKey: 'AIzaSyC2bspibfDiefJkmbgSRaJrQTRTSMzpBHc',
      authDomain: 'auth-d11c0.firebaseapp.com',
      databaseURL: 'https://auth-d11c0.firebaseio.com',
      projectId: 'auth-d11c0',
      storageBucket: 'auth-d11c0.appspot.com',
      messagingSenderId: '924951708811',
      appId: '1:924951708811:web:9570c43f768c4fbdd7808e',
      measurementId: 'G-Y4DW1XN52S',
    };
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>LOGOUT</Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header HeaderText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
