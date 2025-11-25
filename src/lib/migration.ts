import { MandaratData, MandaratItem } from '../types/dataType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from './constant';

// 기존 형식인지 확인 (문자열인지 객체인지)
export function isOldFormat(data: any): boolean {
  if (!data || typeof data !== 'object') return false;
  return Object.values(data).some(value => typeof value === 'string');
}

// 기존 형식을 새 형식으로 변환
export function migrateData(oldData: any): MandaratData {
  const newData: MandaratData = {};

  Object.keys(oldData).forEach(key => {
    const value = oldData[key];
    if (typeof value === 'string') {
      // 기존 형식: 문자열 -> 새 형식: 객체
      newData[key] = {
        content: value,
        isComplete: false,
      };
    } else if (value && typeof value === 'object' && 'content' in value) {
      // 이미 새 형식인 경우
      newData[key] = value as MandaratItem;
    }
  });

  return newData;
}

// 데이터 로드 및 마이그레이션
export async function loadAndMigrateData(
  storedData: string | null,
): Promise<MandaratData> {
  if (!storedData) {
    return {};
  }

  try {
    const parsedData = JSON.parse(storedData);

    // 기존 형식이면 마이그레이션
    if (isOldFormat(parsedData)) {
      const migratedData = migrateData(parsedData);
      // 마이그레이션된 데이터 저장
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(migratedData));
      return migratedData;
    }

    // 이미 새 형식이면 그대로 반환
    return parsedData as MandaratData;
  } catch (error) {
    console.error('데이터 파싱 에러:', error);
    return {};
  }
}
