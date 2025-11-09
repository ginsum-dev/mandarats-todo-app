import { Text, View } from 'react-native';
import EditMode from '../components/EditMode';
import { useState } from 'react';
import ViewMode from '../components/ViewMode';
import { MandaratData } from '../types/dataType';

export default function HomeScreen({
  data,
  setData,
}: {
  data: MandaratData;
  setData: (data: MandaratData) => void;
}) {
  const [mode, setMode] = useState<'edit' | 'view'>('edit');

  return (
    <View className="flex-1 items-center bg-background pt-[80px]">
      <Text className="text-3xl sm:text-4xl font-bold text-center my-10 text-foreground text-zinc-700">
        Mandarat
      </Text>
      <View className="flex-col items-center justify-center">
        {mode === 'edit' ? (
          <EditMode setMode={setMode} data={data} setData={setData} />
        ) : (
          <ViewMode setMode={setMode} data={data} />
        )}
      </View>
    </View>
  );
}
