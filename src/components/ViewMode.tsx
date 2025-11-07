import { useEffect, useMemo, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ViewCard from './card/ViewCard';

interface MandaratData {
  [key: string]: string;
}

const GRID_HORIZONTAL_PADDING = 32;

export default function ViewMode() {
  const [data, setData] = useState<MandaratData>({});
  const { width: windowWidth } = useWindowDimensions();

  const { gridWidth, cardSize } = useMemo(() => {
    const availableWidth = Math.max(windowWidth - GRID_HORIZONTAL_PADDING, 0);
    const cardEdge = availableWidth > 0 ? availableWidth / 3 : 0;
    return {
      gridWidth: availableWidth,
      cardSize: cardEdge,
    };
  }, [windowWidth]);

  useEffect(() => {
    const getData = async () => {
      const storedData = await AsyncStorage.getItem('madaratData');
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    };
    getData();
  }, []);
  // Get box value
  const getValue = (cardIndex: number, boxIndex: number) => {
    return data[`${cardIndex}-${boxIndex}`] || '';
  };
  const containerStyle = useMemo(
    () => ({
      alignSelf: 'center' as const,
      width: gridWidth || undefined,
    }),
    [gridWidth],
  );

  return (
    <View className="flex-row flex-wrap" style={containerStyle}>
      {Array.from({ length: 9 }).map((_, cardIndex) => (
        <ViewCard
          key={cardIndex}
          cardIndex={cardIndex}
          cardSize={cardSize}
          getValue={getValue}
        />
      ))}
    </View>
  );
}
