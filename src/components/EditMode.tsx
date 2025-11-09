import { View } from 'react-native';
import Card from './card/EditCard';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface MandaratData {
  [key: string]: string;
}

const STORAGE_KEY = 'madaratData';

export default function EditMode({
  setMode,
}: {
  setMode: (mode: 'edit' | 'view') => void;
}) {
  const [data, setData] = useState<MandaratData>({});

  // Get box value
  const getValue = (cardIndex: number, boxIndex: number) => {
    return data[`${cardIndex}-${boxIndex}`] || '';
  };

  const handleChange = async (key: string, value: string) => {
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
    }
  };

  const getSavedData = async () => {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved data:', e);
      }
    }
  };

  useEffect(() => {
    getSavedData();
  }, []);

  return (
    <View className="flex-1 items-center bg-background">
      <Card getValue={getValue} handleChange={handleChange} setMode={setMode} />
    </View>
  );
}
