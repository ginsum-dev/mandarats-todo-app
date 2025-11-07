import { Button, Text, View } from 'react-native';
import EditMode from '../components/EditMode';
import { useState } from 'react';
import ViewMode from '../components/ViewMode';

export default function HomeScreen() {
  const [mode, setMode] = useState<'edit' | 'view'>('edit');

  return (
    <View className="flex-1 items-center bg-background pt-[80px]">
      <Text className="text-3xl sm:text-4xl font-bold text-center my-10 text-foreground">
        Mandarat Planner
      </Text>
      <View className="flex-row gap-4">
        <Button title="Edit" onPress={() => setMode('edit')} />
        <Button title="View" onPress={() => setMode('view')} />
      </View>
      {mode === 'edit' ? <EditMode /> : <ViewMode />}
    </View>
  );
}
