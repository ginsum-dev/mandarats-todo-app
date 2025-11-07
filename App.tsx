/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
//import RootNavigator from './src/navigation/RootNavigator';
//import { NavigationContainer } from '@react-navigation/native';
import { SheetProvider } from 'react-native-actions-sheet';
import HomeScreen from './src/screens/HomeScreen';

import './global.css';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView className="flex-1">
        <SheetProvider context="global">
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <AppContent />
        </SheetProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

function AppContent() {
  return (
    <HomeScreen />
    // <NavigationContainer>
    //   <RootNavigator />
    // </NavigationContainer>
  );
}

export default App;
