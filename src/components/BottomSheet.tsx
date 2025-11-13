import { Dispatch, forwardRef, RefObject, SetStateAction, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import OctIcon from 'react-native-vector-icons/Octicons';

interface BottomSheetProps {
  cardIndex: number;
  handleChange: (key: string, value: string) => void;
  values: { [key: number]: string };
  setValues: Dispatch<SetStateAction<{ [key: number]: string }>>;
  handleBottomSheetOpen: () => void;
}

const BottomSheet = forwardRef<ActionSheetRef, BottomSheetProps>(
  (
    { cardIndex, handleChange, values, setValues, handleBottomSheetOpen },
    ref,
  ) => {
    // 중앙 박스(4번)를 먼저, 나머지는 순서대로
    const boxOrder = [4, 0, 1, 2, 3, 5, 6, 7, 8];
    const focusableBoxes = boxOrder.filter(box => box !== 4);
    const inputRefs = useRef<Array<TextInput | null>>([]);

    const focusNext = (nextIndex: number) => {
      const nextInput = inputRefs.current[nextIndex];
      if (nextInput) {
        nextInput.focus();
      }
    };

    return (
      <View>
        {/* BottomSheet를 열기 위한 버튼 */}
        <TouchableOpacity
          onPress={handleBottomSheetOpen}
          className={`mt-5 bg-zinc-200 rounded-full w-12 h-12 items-center justify-center`}
        >
          <OctIcon name="pencil" size={20} color="#333333" />
        </TouchableOpacity>
        {/* BottomSheet */}
        <ActionSheet
          ref={ref}
          useBottomSafeAreaPadding
          keyboardHandlerEnabled={false}
          // gestureEnabled
          closeOnPressBack={false}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}
            style={styles.keyboardAvoider}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View className="bg-zinc-100 rounded-md px-3 py-4 mb-4">
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
                  className={`w-full h-12 px-3 py-1 bg-white border border-zinc-200 font-semibold text-lg rounded-md text-zinc-600`}
                  style={styles.textInput}
                  returnKeyType="next"
                  onSubmitEditing={() => focusNext(0)}
                />
              </View>

              <View className="flex-col bg-zinc-100 rounded-md px-3 py-4 mb-4">
                <Text className="text-base font-medium text-zinc-500">
                  핵심 목표 달성을 위한 목표
                </Text>
                <View className="flex-col gap-2">
                  {boxOrder.map(boxIndex => {
                    const isCenter = boxIndex === 4;
                    const focusIndex = focusableBoxes.indexOf(boxIndex);
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
                            className={`w-full h-12 border bg-white border-zinc-200 text-lg rounded-md px-3 py-1 text-zinc-700`}
                            style={styles.textInput}
                            ref={element => {
                              if (focusIndex !== -1) {
                                inputRefs.current[focusIndex] = element;
                              }
                            }}
                            onSubmitEditing={() => {
                              const isLast =
                                focusIndex === focusableBoxes.length - 1;
                              if (isLast) {
                                focusNext(0);
                              } else {
                                focusNext(focusIndex + 1); // 다음 칸으로 포커스 이동
                              }
                            }}
                          />
                        )}
                      </View>
                    );
                  })}
                </View>
              </View>

              <View className="pb-10">
                <TouchableOpacity
                  onPress={() =>
                    (ref as RefObject<ActionSheetRef>)?.current?.hide()
                  }
                  className="w-[300px] mx-auto mt-5 bg-rose-300 rounded-lg py-3 px-6 items-center"
                >
                  <Text className="text-white font-semibold text-base">
                    닫기
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </ActionSheet>
      </View>
    );
  },
);

export default BottomSheet;

const styles = StyleSheet.create({
  keyboardAvoider: {
    maxHeight: '100%',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 16,
  },
  textInput: {
    lineHeight: 20,
  },
});
