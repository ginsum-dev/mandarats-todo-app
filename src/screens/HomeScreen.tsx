import { Text, View, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditMode from '../components/EditMode';
import ErrorBoundary from '../components/common/ErrorBoundary';
import { STORAGE_KEY } from '../lib/constant';
import { MandaratData } from '../types/dataType';

interface HomeScreenProps {
  route: { params?: any };
}

export default function HomeScreen({ route }: HomeScreenProps) {
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

  console.log(route.params);

  return (
    <ErrorBoundary
      onReset={() => setReloadKey(prev => prev + 1)}
      fallbackTitle="앱에 문제가 발생했어요"
      fallbackMessage="잠시 후 다시 시도해 주세요. 계속해서 문제가 발생하면 앱을 재시작하거나 데이터를 초기화해 주세요."
    >
      <View className="flex-1 bg-slate-50 pt-[60px] px-6">
        <Text className="text-3xl sm:text-4xl font-bold text-center mt-10 mb-8 text-foreground text-zinc-700">
          My Manda
        </Text>

        <EditMode
          data={data}
          setData={setData}
          index={route.params?.cardIndex}
        />
      </View>
    </ErrorBoundary>
  );
}
