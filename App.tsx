import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import {store} from './src/store/app/store';
import {Provider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TrackPlayer, { Capability } from 'react-native-track-player';


TrackPlayer.updateOptions({
  alwaysPauseOnInterruption: true,
  capabilities: [
    Capability.Play,
    Capability.Pause,
    Capability.Stop,
  ],
});

function App(): React.JSX.Element {
  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer();
    
  };

  useEffect(() => {
    setupPlayer();

    return () => {
      TrackPlayer.stop();
    }
  }, [])

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
