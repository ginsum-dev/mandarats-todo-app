import { StyleSheet, Text, View } from 'react-native';
import { useMemo } from 'react';

import { boxColors, cardColors } from '../../lib/colors';

const CARD_BORDER_WIDTH = 1;
const BOX_BORDER_WIDTH = 1;
const CARD_PADDING = 2;
const BOX_GAP = 2;

const CELL_MARGIN_STYLES = Array.from(
  { length: 9 },
  (_, index) =>
    StyleSheet.create({
      margin: {
        marginRight: (index + 1) % 3 === 0 ? 0 : BOX_GAP,
        marginBottom: index >= 6 ? 0 : BOX_GAP,
      },
    }).margin,
);

type Props = {
  cardIndex: number;
  cardSize: number;
  getValue: (cardIndex: number, boxIndex: number) => string;
};

export default function ViewCard({ cardIndex, cardSize, getValue }: Props) {
  const availableWidth = Math.max(
    cardSize - CARD_BORDER_WIDTH * 2 - CARD_PADDING * 2 - 1,
    0,
  );
  const boxSize =
    availableWidth > 0 ? Math.max((availableWidth - BOX_GAP * 2) / 3, 0) : 0;
  const boxSizeStyle = useMemo(
    () => ({ width: boxSize, height: boxSize }),
    [boxSize],
  );

  if (cardSize <= 0) {
    return null;
  }

  return (
    <View
      className={`rounded-sm border ${
        cardIndex !== 4 ? cardColors[cardIndex] : 'bg-zinc-200 border-zinc-100'
      }`}
      style={{
        width: cardSize,
        height: cardSize,
        flexBasis: cardSize,
        borderWidth: CARD_BORDER_WIDTH,
        padding: CARD_PADDING,
      }}
    >
      <View
        className="flex-row flex-wrap"
        style={{ width: availableWidth, height: availableWidth }}
      >
        {Array.from({ length: 9 }).map((_, boxIndex) => {
          const isCenter = cardIndex === 4;
          const isBoxCenter = boxIndex === 4;
          const value = getValue(cardIndex, boxIndex);

          const boxColorClass = isCenter
            ? boxColors[boxIndex]
            : isBoxCenter
            ? boxColors[cardIndex]
            : 'bg-white border-gray-200';

          return (
            <View
              key={boxIndex}
              className={`items-center justify-center overflow-hidden border rounded-sm ${boxColorClass}`}
              style={[styles.box, boxSizeStyle, CELL_MARGIN_STYLES[boxIndex]]}
            >
              {value ? (
                <Text
                  className={`w-full text-center text-zinc-700 text-[10px] ${
                    isCenter && boxIndex === 4
                      ? 'font-semibold'
                      : isCenter && boxIndex !== 4
                      ? ''
                      : !isCenter && boxIndex === 4
                      ? 'font-semibold'
                      : ''
                  }`}
                  numberOfLines={3}
                  ellipsizeMode="tail"
                  style={
                    isCenter && isBoxCenter
                      ? styles.valueText
                      : styles.valueTextSmall
                  }
                >
                  {value}
                </Text>
              ) : (
                <Text className="text-sm w-full text-center text-gray-300 font-bold">
                  {/* {boxIndex + 1} */}
                </Text>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: BOX_BORDER_WIDTH,
  },
  valueText: {
    lineHeight: 12,
  },
  valueTextSmall: {
    lineHeight: 11,
    fontSize: 10,
  },
});
