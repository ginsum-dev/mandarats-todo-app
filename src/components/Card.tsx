import React, { useState, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Button } from 'react-native';
import { cardColors, boxColors } from '../lib/colors';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';

interface CardProps {
  getValue: (cardIndex: number, boxIndex: number) => string | null;
  onCardPress?: () => void;
  onBoxPress?: (boxIndex: number) => void;
  maxWidth?: number;
}

const { width: screenWidth } = Dimensions.get('window');
const CARD_MAX_WIDTH = 286;
const GAP = 4;
const PADDING = 6;
const BORDER_WIDTH = 2;

export default function Card({
  getValue,
  onCardPress,
  onBoxPress,
  maxWidth = CARD_MAX_WIDTH,
}: CardProps) {
  const [cardIndex, setCardIndex] = useState(4);
  const cardWidth = Math.min(maxWidth, screenWidth - 32);
  const availableWidth = cardWidth - PADDING * 2 - BORDER_WIDTH * 2;
  const boxSize = (availableWidth - GAP * 2) / 3;

  // BottomSheet 설정

  const actionSheetRef = useRef<ActionSheetRef>(null);

  const openActionSheet = useCallback(() => {
    actionSheetRef.current?.show();
  }, []);

  const handleCardPress = () => {
    if (cardIndex !== 4 && onCardPress) {
      onCardPress();
    }
  };

  const handleBoxPress = (boxIndex: number) => {
    if (cardIndex === 4) {
      setCardIndex(boxIndex);
      if (onBoxPress) {
        onBoxPress(boxIndex);
      }
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
                  className={`rounded border overflow-hidden px-1 items-center justify-center ${boxColorClass}`}
                  style={{
                    width: boxSize,
                    height: boxSize,
                  }}
                >
                  {value ? (
                    <Text
                      className={`w-full text-center ${
                        isCenter && boxIndex === 4
                          ? 'text-2xl'
                          : isCenter && boxIndex !== 4
                          ? 'text-xl'
                          : !isCenter && boxIndex === 4
                          ? 'text-xl'
                          : 'text-base'
                      }`}
                      numberOfLines={isCenter ? 2 : 3}
                      ellipsizeMode="tail"
                      style={{ lineHeight: 20 }}
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

      {/* BottomSheet를 열기 위한 버튼 */}
      <TouchableOpacity
        onPress={openActionSheet}
        className="mt-4 bg-blue-500 rounded-lg py-3 px-6 items-center"
      >
        <Text className="text-white font-semibold text-base">열기</Text>
      </TouchableOpacity>

      {/* BottomSheet */}
      <ActionSheet ref={actionSheetRef}>
        <Text>Hi, I am here.</Text>

        <Button title="Close" onPress={() => actionSheetRef.current?.hide()} />
      </ActionSheet>
    </View>
  );
}
