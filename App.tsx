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
import BootSplash from 'react-native-bootsplash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import './global.css';
import { useEffect, useState } from 'react';
import { MandaratData } from './src/types/dataType';
import { STORAGE_KEY } from './src/lib/constant';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [data, setData] = useState<MandaratData>({});
  useEffect(() => {
    const init = async () => {
      try {
        // 저장된 만다라트 데이터 불러오기
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) {
          setData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('초기화 에러:', error);
      }
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView className="flex-1">
        <SheetProvider context="global">
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <HomeScreen data={data} setData={setData} />
        </SheetProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
