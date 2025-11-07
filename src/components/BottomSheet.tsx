import { useCallback, useEffect, useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { boxColors } from '../lib/colors';

interface BottomSheetProps {
  cardIndex: number;
  getValue: (cardIndex: number, boxIndex: number) => string;
  handleChange: (key: string, value: string) => void;
}

export default function BottomSheet({
  cardIndex,
  getValue,
  handleChange,
}: BottomSheetProps) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [values, setValues] = useState<{ [key: number]: string }>({});
  const [open, setOpen] = useState(false);
  const openBottomSheet = useCallback(() => {
    actionSheetRef.current?.show();
    setOpen(true);
  }, []);

  // Drawer가 열릴 때마다 최신 값으로 업데이트
  useEffect(() => {
    if (open) {
      const initial: { [key: number]: string } = {};
      const boxOrder = [4, 0, 1, 2, 3, 5, 6, 7, 8];
      boxOrder.forEach(boxIndex => {
        initial[boxIndex] = getValue(cardIndex, boxIndex);
      });
      setValues(initial);
    }
  }, [open, cardIndex, getValue]);

  // 중앙 박스(4번)를 먼저, 나머지는 순서대로
  const boxOrder = [4, 0, 1, 2, 3, 5, 6, 7, 8];

  return (
    <View>
      {/* BottomSheet를 열기 위한 버튼 */}
      <TouchableOpacity
        onPress={openBottomSheet}
        className={`mt-5 bg-rose-300 rounded-lg py-3 px-6 items-center w-[120px]`}
      >
        <Text className="text-white font-semibold text-base">Edit</Text>
      </TouchableOpacity>
      {/* BottomSheet */}
      <ActionSheet ref={actionSheetRef}>
        <View className="px-6 pt-10 pb-1 flex-col gap-4">
          <View className="bg-zinc-100 rounded-md px-3 py-4">
            <Text className="text-base font-medium text-zinc-500">
              핵심 목표
            </Text>
            <TextInput
              value={values[4] || ''}
              onChangeText={newValue => {
                const key = `${cardIndex}-${4}`;
                // 로컬 state 즉시 업데이트 (한글 입력 깨짐 방지)
                setValues(prev => ({
                  ...prev,
                  [4]: newValue,
                }));
                // 부모 컴포넌트의 데이터 업데이트
                handleChange(key, newValue);
              }}
              placeholder={`목표를 입력하세요`}
              className={`w-full px-3 py-3 bg-white border border-zinc-200 font-semibold text-lg text-md rounded-md text-zinc-600`}
            />
          </View>

          <View className="flex-col bg-zinc-100 rounded-md px-3 py-4">
            <Text className="text-base font-medium text-zinc-500">
              핵심 목표 달성을 위한 목표
            </Text>
            <View className="flex-col gap-2">
              {boxOrder.map(boxIndex => {
                const isCenter = boxIndex === 4;
                return (
                  <View key={boxIndex}>
                    {!isCenter && (
                      <TextInput
                        value={values[boxIndex] || ''}
                        onChangeText={newValue => {
                          const key = `${cardIndex}-${boxIndex}`;
                          // 로컬 state 즉시 업데이트 (한글 입력 깨짐 방지)
                          setValues(prev => ({
                            ...prev,
                            [boxIndex]: newValue,
                          }));
                          // 부모 컴포넌트의 데이터 업데이트
                          handleChange(key, newValue);
                        }}
                        placeholder={`${boxIndex + 1}번 목표를 입력하세요`}
                        className={`w-full border bg-white border-zinc-200 text-md rounded-md px-3 py-3 text-zinc-700 ${
                          isCenter
                            ? `${boxColors[cardIndex]} font-semibold text-lg`
                            : ''
                        }`}
                      />
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        <View className="pb-10">
          <TouchableOpacity
            onPress={() => actionSheetRef.current?.hide()}
            className="w-[300px] mx-auto mt-5 bg-rose-300 rounded-lg py-3 px-6 items-center"
          >
            <Text className="text-white font-semibold text-base">닫기</Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>
    </View>
  );
}
