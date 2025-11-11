import { Alert, Dimensions, Text, View } from 'react-native';
import Card from './card/EditCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { MandaratData } from '../types/dataType';
import { STORAGE_KEY } from '../lib/constant';

const { width: screenWidth } = Dimensions.get('window');

export default function EditMode({
  setMode,
  data,
  setData,
}: {
  setMode: (mode: 'edit' | 'view') => void;
  data: MandaratData;
  setData: (data: MandaratData) => void;
}) {
  // Get box value
  const getValue = (cardIndex: number, boxIndex: number) => {
    return data[`${cardIndex}-${boxIndex}`] || '';
  };

  const handleChange = async (key: string, value: string) => {
    const previousData = { ...data };
    const newData = { ...data, [key]: value };

    // 중앙 카드의 외곽 박스가 변경되면 해당 외곽 카드의 중앙 박스도 동기화
    const [cardIndex, boxIndex] = key.split('-').map(Number);
    if (cardIndex === 4 && boxIndex !== 4) {
      // 중앙 카드의 외곽 박스이면, 해당 박스 인덱스와 같은 카드의 중앙 박스(4번)도 업데이트
      const targetCardIndex = boxIndex;
      const targetKey = `${targetCardIndex}-4`;
      newData[targetKey] = value;
    }
    if (boxIndex === 4) {
      // 모바일 화면에서 중앙 박스가 변경되면 모든 카드의 중앙 박스도 동기화
      const targetCardIndex = cardIndex;
      const targetKey = `4-${targetCardIndex}`;
      newData[targetKey] = value;
    }

    setData(newData);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error('Failed to save data:', e);
      Alert.alert(
        '저장 실패',
        '변경 내용을 저장하는 동안 문제가 발생했습니다. 다시 시도해 주세요.',
      );
      setData(previousData);
    }
  };

  return (
    <View className="flex-1 items-center bg-background">
      <Card getValue={getValue} handleChange={handleChange} setMode={setMode} />
      <View
        className="flex-col items-start justify-center mt-6 p-4 bg-slate-100 rounded-md"
        style={{
          width: screenWidth - 32,
        }}
      >
        <Text className="text-sm text-zinc-500">
          1. 중앙에 핵심 목표를 적으세요
        </Text>
        <Text className="text-sm text-zinc-500">
          2. 주변 8칸에 목표 달성을 위한 하위 목표를 작성하세요
        </Text>
        <Text className="text-sm text-zinc-500">
          3. 각 하위 목표를 펼쳐 구체적인 실행 과제 8개씩 채워보세요
        </Text>
      </View>
      {/* <View
        className="flex-row items-center justify-center mt-16 p-4 bg-zinc-100 rounded-md"
        style={{
          width: screenWidth - 32,
        }}
      >
        <Text className="text-sm text-zinc-500">
          만다라트는 일본 디자이너 이마이즈미 히로아키가 개발한 목표 달성 및
          아이디어 발상 도구입니다. 중심 목표를 8개의 하위 목표로 나누고, 각
          하위 목표를 다시 8개의 실행 과제로 세분화하여 총 64개의 구체적인 실천
          항목을 만들어냅니다.
        </Text>
      </View> */}
    </View>
  );
}
