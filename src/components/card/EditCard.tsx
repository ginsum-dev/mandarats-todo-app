import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { cardColors, boxColors } from '../../lib/colors';
import BottomSheet from '../BottomSheet';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActionSheetRef } from 'react-native-actions-sheet';
import { useNavigation } from '@react-navigation/native';

interface CardProps {
  getValue: (cardIndex: number, boxIndex: number) => string;
  maxWidth?: number;
  handleChange: (key: string, value: string) => void;
  setMode: (mode: 'edit' | 'view') => void;
}

const { width: screenWidth } = Dimensions.get('window');
const GAP = 4;
const PADDING = 6;
const BORDER_WIDTH = 2;

export default function Card({ getValue, handleChange, setMode }: CardProps) {
  const [cardIndex, setCardIndex] = useState(4);
  const [bottomSheetValues, setBottomSheetValues] = useState<{
    [key: number]: string;
  }>({});
  const navigation = useNavigation();
  const cardWidth = screenWidth - 32;
  const availableWidth = cardWidth - PADDING * 2 - BORDER_WIDTH * 2;
  const boxSize = (availableWidth - GAP * 2) / 3;
  const bottomSheetRef = useRef<ActionSheetRef>(null);

  const handleBottomSheetOpen = () => {
    const initial: { [key: number]: string } = {};
    const boxOrder = [4, 0, 1, 2, 3, 5, 6, 7, 8];
    boxOrder.forEach(boxIndex => {
      initial[boxIndex] = getValue(cardIndex, boxIndex);
    });
    setBottomSheetValues(initial);
    bottomSheetRef.current?.show();
  };

  const handleBoxPress = (boxIndex: number) => {
    if (cardIndex === 4) {
      if (boxIndex === 4) {
        handleBottomSheetOpen();
      } else {
        setCardIndex(boxIndex);
      }
    }
  };

  const handleCardPress = () => {
    if (cardIndex !== 4) {
      handleBottomSheetOpen();
    }
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={cardIndex !== 4 ? 0.7 : 1}
        onPress={handleCardPress}
        disabled={cardIndex === 4}
        className={`rounded-md border-2 p-1.5 shadow-sm ${
          cardColors[cardIndex] || 'bg-white border-gray-200'
        }`}
        style={{
          width: cardWidth,
          aspectRatio: 1,
        }}
      >
        <View className="flex-row flex-wrap h-full">
          {Array.from({ length: 9 }).map((_, boxIndex) => {
            const isCenter = cardIndex === 4;
            const isBoxCenter = boxIndex === 4;
            const value = getValue(cardIndex, boxIndex);
            const isEditable = !(!isCenter && isBoxCenter);

            const boxColorClass = isCenter
              ? boxColors[boxIndex]
              : isBoxCenter
              ? boxColors[cardIndex]
              : 'bg-white border-gray-200';

            const isLastInRow = (boxIndex + 1) % 3 === 0;
            const isLastRow = boxIndex >= 6;

            return (
              <View
                key={boxIndex}
                className={isLastRow ? '' : 'mb-1'}
                style={!isLastInRow ? { marginRight: GAP } : undefined}
              >
                <TouchableOpacity
                  activeOpacity={isEditable ? 0.7 : 1}
                  onPress={() => handleBoxPress(boxIndex)}
                  disabled={!isCenter}
                  className={`rounded border overflow-hidden px-2.5 items-center justify-center ${boxColorClass}`}
                  style={{
                    width: boxSize,
                    height: boxSize,
                  }}
                >
                  {value ? (
                    <Text
                      className={`w-full text-center text-zinc-700 ${
                        isCenter && boxIndex === 4
                          ? 'text-2xl'
                          : isCenter && boxIndex !== 4
                          ? 'text-xl'
                          : !isCenter && boxIndex === 4
                          ? 'text-xl'
                          : 'text-base'
                      }`}
                      numberOfLines={3}
                      ellipsizeMode="tail"
                      style={{ lineHeight: isCenter ? 22 : 20 }}
                    >
                      {value}
                    </Text>
                  ) : (
                    <Text className="text-2xl w-full text-center text-gray-300 font-bold">
                      {boxIndex + 1}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </TouchableOpacity>
      <View className="flex-row justify-center gap-2">
        <BottomSheet
          ref={bottomSheetRef}
          cardIndex={cardIndex}
          handleChange={handleChange}
          values={bottomSheetValues}
          setValues={setBottomSheetValues}
          handleBottomSheetOpen={handleBottomSheetOpen}
        />
        {cardIndex !== 4 && (
          <TouchableOpacity
            onPress={() => setCardIndex(4)}
            className="mt-5 bg-zinc-200 rounded-full w-12 h-12 items-center justify-center"
          >
            <MaterialIcon name="arrow-u-left-top" size={20} color="#333333" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => setMode('view')}
          className="mt-5 bg-zinc-200 rounded-full w-12 h-12 items-center justify-center"
        >
          <MaterialIcon name="grid" size={20} color="#333333" />
        </TouchableOpacity>
        {cardIndex === 4 && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Guide' as never as never)}
            className="mt-5 bg-zinc-200 rounded-full w-12 h-12 items-center justify-center"
          >
            <MaterialIcon
              name="information-outline"
              size={20}
              color="#333333"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
