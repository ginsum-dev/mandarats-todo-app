import { MandaratData, MandaratItem } from '../types/dataType';

// 안전하게 content 가져오기
export function getContent(data: MandaratData, key: string): string {
  const item = data[key];
  if (!item) return '';
  return item.content || '';
}

// 안전하게 isComplete 가져오기
export function getIsComplete(data: MandaratData, key: string): boolean {
  const item = data[key];
  if (!item) return false;
  return item.isComplete || false;
}

// 안전하게 전체 item 가져오기
export function getItem(data: MandaratData, key: string): MandaratItem | null {
  return data[key] || null;
}
