import { Text, View, Alert, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
// import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewMode from '../components/ViewMode';
import EditMode from '../components/EditMode';
import ErrorBoundary from '../components/common/ErrorBoundary';
import { STORAGE_KEY } from '../lib/constant';
import { MandaratData } from '../types/dataType';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen() {
  const [data, setData] = useState<MandaratData>({});
  const [reloadKey, setReloadKey] = useState(0);
  const [mode, setMode] = useState<'edit' | 'view'>('edit');
  // const navigation = useNavigation();

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
    <ErrorBoundary
      onReset={() => setReloadKey(prev => prev + 1)}
      fallbackTitle="앱에 문제가 발생했어요"
      fallbackMessage="잠시 후 다시 시도해 주세요. 계속해서 문제가 발생하면 앱을 재시작하거나 데이터를 초기화해 주세요."
    >
      <View className="flex-1 bg-slate-50 pt-[60px] px-6">
        <Text className="text-3xl sm:text-4xl font-bold text-center mt-10 mb-6 text-foreground text-zinc-700">
          My Manda
        </Text>

        <View className="flex-1 flex-col items-center relative">
          {mode === 'edit' ? (
            <EditMode setMode={setMode} data={data} setData={setData} />
          ) : (
            <ViewMode data={data} />
          )}
          {mode === 'view' && (
            <View className="absolute bottom-20 left-0">
              <TouchableOpacity
                onPress={() => setMode('edit')}
                className="bg-zinc-200 rounded-full w-12 h-12 items-center justify-center shadow pl-1"
                activeOpacity={0.8}
              >
                <MaterialIcon name="arrow-back-ios" size={16} color="black" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </ErrorBoundary>
  );
}
