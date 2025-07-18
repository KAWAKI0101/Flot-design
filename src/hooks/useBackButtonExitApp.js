// useBackButtonExitApp.js
import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const useBackButtonExitApp = () => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
      return true;
    });

    return () => backHandler.remove();
  }, []);
};

export default useBackButtonExitApp;
