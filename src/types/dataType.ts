export interface MandaratItem {
  content: string;
  isComplete: boolean;
  // 확장 가능한 메타데이터 (선택적)
  metadata?: {
    createdAt?: number;
    updatedAt?: number;
    priority?: number;
    tags?: string[];
    color?: string;
    notes?: string;
    // 미래 확장을 위한 인덱스 시그니처
    [key: string]: any;
  };
}

export interface MandaratData {
  [key: string]: MandaratItem;
}
