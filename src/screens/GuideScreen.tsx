import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default function GuideScreen() {
  const navigation = useNavigation();
  return (
    <View className="relative flex-1 items-center bg-slate-50 pt-[60px] px-6">
      <View className="w-full flex-col px-6 bg-white rounded-lg p-4 mb-4 ">
        <Text className="text-xl font-bold text-zinc-700">만다라트란?</Text>
        <Text>
          만다라트(Mandal-Art)는 일본 디자이너 이마이즈미 히로아키가 개발한 목표
          달성 및 아이디어 발상 도구입니다. 중심 목표를 8개의 하위 목표로
          나누고, 각 하위 목표를 다시 8개의 실행 과제로 세분화하여 총 64개의
          구체적인 실천 항목을 만들어냅니다.
        </Text>
      </View>
      <View className="w-full flex-col px-6 bg-white rounded-lg p-4 mb-4">
        <Text className="text-xl font-bold text-zinc-700">사용 방법</Text>
        <Text>1단계: 핵심 목표 설정</Text>
        <Text>- 가장 중앙 칸에 달성하고 싶은 **핵심 목표**를 작성합니다</Text>
        <Text>- 명확하고 구체적인 목표일수록 좋습니다</Text>
        <Text>2단계: 8개 하위 목표 작성</Text>
        <Text>- 중앙 목표를 둘러싼 8개 칸에 **하위 목표**를 작성합니다</Text>
        <Text>- 핵심 목표를 달성하기 위해 필요한 요소들을 생각해봅니다</Text>
        <Text>3단계: 세부 실행 과제 작성</Text>
        <Text>- 각 하위 목표를 주변 8개 블록의 중심으로 옮깁니다</Text>
        <Text>
          - 각 하위 목표 주변에 **구체적인 실행 과제** 8개를 작성합니다
        </Text>
        <Text>- 실제로 실천 가능한 행동들로 채워갑니다</Text>
      </View>

      <View className="w-full flex-col px-6 bg-white rounded-lg p-4 mb-4">
        <Text className="text-xl font-bold text-zinc-700">기능 안내</Text>
        <Text>💾 저장하기</Text>
        <Text>- 작성한 내용은 자동으로 저장됩니다</Text>
        <Text>- 언제든지 돌아와서 확인할 수 있습니다</Text>
        <Text>✏️ 수정하기</Text>
        <Text>- 각 칸을 클릭하면 내용을 수정할 수 있습니다</Text>
        <Text>- 목표와 상황이 변하면 언제든 업데이트하세요</Text>
      </View>
      <View className="absolute bottom-20 left-6">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-zinc-200 rounded-full w-12 h-12 items-center justify-center shadow pl-1"
          activeOpacity={0.8}
        >
          <MaterialIcon name="arrow-back-ios" size={16} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
