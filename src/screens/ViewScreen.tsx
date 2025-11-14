import { useEffect, useMemo, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  StyleSheet,
} from 'react-native';

import ViewCard from '../components/card/ViewCard';
import { MandaratData } from '../types/dataType';
import { STORAGE_KEY } from '../lib/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const GRID_HORIZONTAL_PADDING = 32;

export default function ViewScreen() {
  const [data, setData] = useState<MandaratData>({});
  const navigation = useNavigation();
  useEffect(() => {
    const getStoredData = async () => {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      setData(JSON.parse(storedData || '{}'));
    };
    getStoredData();
  }, []);
  const { width: windowWidth } = useWindowDimensions();

  const { gridWidth, cardSize } = useMemo(() => {
    const availableWidth = Math.max(windowWidth - GRID_HORIZONTAL_PADDING, 0);
    const cardEdge = availableWidth > 0 ? availableWidth / 3 : 0;
    return {
      gridWidth: availableWidth,
      cardSize: cardEdge,
    };
  }, [windowWidth]);

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
    <View className="flex-1 bg-slate-50 px-6" style={styles.content}>
      <Text className="text-3xl sm:text-4xl font-bold text-center mt-10 mb-8 text-foreground text-zinc-700">
        MandaPlan
      </Text>
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
      <View className="absolute bottom-20 left-6">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-zinc-200 rounded-full w-16 h-16 items-center justify-center shadow pl-1"
          activeOpacity={0.8}
        >
          <MaterialIcon name="arrow-back-ios" size={18} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 120,
    paddingBottom: 120,
  },
});
