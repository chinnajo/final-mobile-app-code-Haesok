import React, {useEffect} from 'react';
import {BackHandler, ToastAndroid} from 'react-native';

const ScreenWithBackHandler = ({enabled}) => {
  useEffect(() => {
    const handleBackButton = () => {
      ToastAndroid.show('Custom back button logic', ToastAndroid.SHORT); // Perform any desired action
      return true; // Return true to indicate that the back button press is handled
    };

    if (enabled) {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    }

    return () => {
      if (enabled) {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      }
    };
  }, [enabled]);

  // Render your screen components here
};

export default ScreenWithBackHandler;
