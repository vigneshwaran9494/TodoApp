import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//Import Screens
import SplashScreen from '../screens/splash/Splash-Screen';
import HomeScreen from '../screens/home/Home-Screen';

const App = createNativeStackNavigator();

const AppStack: FC = () => {
  return (
    <App.Navigator
      initialRouteName={'splash-screen'}
      screenOptions={{headerShown: false}}>
      <App.Screen name="splash-screen" component={SplashScreen} />
      <App.Screen name="home-screen" component={HomeScreen} />
    </App.Navigator>
  );
};


const InitialRoute: FC = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default InitialRoute;
