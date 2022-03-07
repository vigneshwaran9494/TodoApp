import React, {FC, useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../resources/colors/Colors';

/**
 * default renderers
 */
const SplashScreen: FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('home-screen');
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text testID="logoTestText" style={styles.appTitleStyle}>
        Todo App
      </Text>
      <Text style={styles.version}>Version 1.0</Text>
    </SafeAreaView>
  );
};

/**
 * define styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  appTitleStyle: {
    fontFamily: 'Futura',
    fontSize: 24,
    color: Colors.primary,
  },
  version: {
    marginTop: '80%',
    fontFamily: 'Futura',
    fontSize: 10,
  },
});

export default SplashScreen;
