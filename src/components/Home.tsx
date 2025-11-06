import { Text, View } from 'react-native';
import Card from './Card';
import { useState } from 'react';

interface MandaratData {
  [key: string]: string;
}

export default function Home() {
  const [data, setData] = useState<MandaratData>({});

  // Get box value
  const getValue = (cardIndex: number, boxIndex: number) => {
    return data[`${cardIndex}-${boxIndex}`] || '';
  };

  const handleChange = (key: string, value: string) => {
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
  };
  return (
    <View className="flex-1 items-center bg-background">
      <Text className="text-3xl sm:text-4xl font-bold text-center my-10 text-foreground">
        Mandarat Planner
      </Text>
      <Card getValue={getValue} onCardPress={() => {}} onBoxPress={() => {}} />
    </View>
  );
}
