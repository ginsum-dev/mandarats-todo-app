/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Alert, StatusBar, useColorScheme } from 'react-native';
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
import ErrorBoundary from './src/components/common/ErrorBoundary';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [data, setData] = useState<MandaratData>({});
  const [reloadKey, setReloadKey] = useState(0);

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
        Alert.alert(
          '데이터 로드 실패',
          '저장된 정보를 불러오지 못했습니다. 네트워크 상태를 확인한 뒤 다시 시도해 주세요.',
        );
      }
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log('BootSplash has been hidden successfully');
    });
  }, [reloadKey]);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView className="flex-1">
        <SheetProvider context="global">
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <ErrorBoundary
            onReset={() => setReloadKey(prev => prev + 1)}
            fallbackTitle="앱에 문제가 발생했어요"
            fallbackMessage="잠시 후 다시 시도해 주세요. 계속해서 문제가 발생하면 앱을 재시작하거나 데이터를 초기화해 주세요."
          >
            <HomeScreen data={data} setData={setData} />
          </ErrorBoundary>
        </SheetProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
