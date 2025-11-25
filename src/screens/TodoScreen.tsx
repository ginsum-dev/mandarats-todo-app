import { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { MandaratData } from '../types/dataType';
import { STORAGE_KEY } from '../lib/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { loadAndMigrateData } from '../lib/migration';
import { getContent, getIsComplete, getItem } from '../lib/dataHelper';
import { useNavigation } from '@react-navigation/native';
import { todoColors } from '../lib/colors';

export default function TodoScreen() {
  const [data, setData] = useState<MandaratData>({});

  useEffect(() => {
    const getStoredData = async () => {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      const migratedData = await loadAndMigrateData(storedData);
      setData(migratedData);
    };
    getStoredData();
  }, []);

  // 포커스될 때마다 데이터 새로고침
  // navigation 객체를 사용하려면 useNavigation 훅을 통해 가져와야 함
  // 또는 props로 전달 받아야 함
  // 여기서는 useNavigation 훅으로 대체
  // import { useNavigation } from '@react-navigation/native'; 필요

  // 아래 라인 최상단 import에 추가해야 함:
  // import { useNavigation } from '@react-navigation/native';

  const navigation = useNavigation();

  useEffect(() => {
    const refreshData = async () => {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      const migratedData = await loadAndMigrateData(storedData);
      setData(migratedData);
    };
    const unsubscribe = navigation.addListener('focus', () => {
      refreshData();
    });

    return unsubscribe;
  }, [navigation]);

  // 투두 항목 토글
  const toggleTodo = async (key: string) => {
    const item = getItem(data, key);
    if (!item) return;

    const newData = { ...data };
    newData[key] = {
      ...item,
      isComplete: !item.isComplete,
    };

    setData(newData);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error('Failed to save data:', e);
    }
  };

  // 카드별 투두리스트 데이터 생성
  const getTodoListForCard = (cardIndex: number) => {
    const title = getContent(data, `${cardIndex}-4`);
    const todoBoxes = [0, 1, 2, 3, 5, 6, 7, 8]; // 중앙(4) 제외
    const todos = todoBoxes
      .map(boxIndex => {
        const key = `${cardIndex}-${boxIndex}`;
        return {
          key,
          content: getContent(data, key),
          isComplete: getIsComplete(data, key),
        };
      })
      .filter(todo => todo.content.trim() !== ''); // 빈 항목 제외

    return { title, todos };
  };

  const cardOrder = [4, 0, 1, 2, 3, 5, 6, 7, 8];

  return (
    <View className="flex-1 bg-slate-50" style={styles.container}>
      <View className="px-6 pt-24 pb-4">
        <Text className="text-2xl font-bold text-center text-zinc-700">
          Todo
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {cardOrder.map(cardIndex => {
          const { title, todos } = getTodoListForCard(cardIndex);

          // 타이틀이 없거나 투두가 없으면 표시하지 않음
          if (!title.trim()) {
            return null;
          }

          return (
            <View
              key={cardIndex}
              className="mb-6 rounded-lg shadow-sm shadow-zinc-200"
            >
              {/* 카드 타이틀 */}
              <View
                className={`${todoColors[cardIndex]} rounded-t-lg px-5 py-3.5`}
              >
                <Text
                  className={`text-lg font-semibold ${
                    cardIndex === 4 ? 'text-white' : 'text-zinc-800'
                  }`}
                >
                  {title}
                </Text>
              </View>

              {/* 투두리스트 */}
              <View className="bg-white rounded-b-lg px-4 py-2">
                {todos.length === 0 && (
                  <Text className="text-zinc-400 text-center py-3">
                    만다라트 탭에서 하위 목표를 추가해주세요.
                  </Text>
                )}
                {todos.map((todo, index) => (
                  <TouchableOpacity
                    key={todo.key}
                    onPress={() => toggleTodo(todo.key)}
                    className="flex-row items-center py-3"
                    style={
                      index !== todos.length - 1
                        ? styles.todoItemBorder
                        : undefined
                    }
                  >
                    {/* 체크박스 */}
                    <View
                      className={`w-6 h-6 rounded border items-center justify-center mr-3 ${
                        todo.isComplete
                          ? 'bg-rose-400 border-rose-400'
                          : 'border-zinc-400'
                      }`}
                    >
                      {todo.isComplete && (
                        <MaterialIcon name="check" size={16} color="white" />
                      )}
                    </View>

                    {/* 텍스트 */}
                    <Text
                      className={`flex-1 text-base ${
                        todo.isComplete
                          ? 'text-zinc-400 line-through'
                          : 'text-zinc-800'
                      }`}
                    >
                      {todo.content}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  todoItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e7',
  },
});
