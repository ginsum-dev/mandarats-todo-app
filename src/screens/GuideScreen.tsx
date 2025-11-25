import { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

type SectionProps = {
  title: string;
  children: ReactNode;
  subtitle?: string;
};

const Section = ({ title, subtitle, children }: SectionProps) => (
  <View className="w-full mt-5 rounded-2xl border border-zinc-100 bg-white px-5 py-6 shadow-sm">
    <Text className="text-lg font-semibold text-zinc-800">{title}</Text>
    {subtitle ? (
      <Text className="mt-2 text-sm text-zinc-500">{subtitle}</Text>
    ) : null}
    <View className="mt-4 space-y-3">{children}</View>
  </View>
);

export default function GuideScreen() {
  const usageSteps = [
    {
      title: '1단계. 핵심 목표 설정',
      bullets: [
        '가장 중앙 칸에 달성하고 싶은 핵심 목표를 작성합니다.',
        '명확하고 구체적인 목표일수록 집중하기 쉽습니다.',
      ],
    },
    {
      title: '2단계. 8개의 하위 목표 작성',
      bullets: [
        '중앙 목표를 둘러싼 8개 칸에 하위 목표를 작성합니다.',
        '핵심 목표를 이루기 위해 필요한 주요 요소를 정리해 보세요.',
      ],
    },
    {
      title: '3단계. 실행 과제 세분화',
      bullets: [
        '각 하위 목표를 주변 8개 블록의 중앙으로 옮깁니다.',
        '각 칸에 구체적인 실행 과제 8개를 작성하여 실제 행동으로 연결합니다.',
      ],
    },
  ];

  const features = [
    {
      title: '자동 저장',
      description:
        '작성한 내용은 자동으로 저장되어 언제든지 이어서 확인할 수 있어요.',
    },
    {
      title: '간편 수정',
      description:
        '각 칸을 눌러 내용을 즉시 수정하고, 목표가 바뀌면 자유롭게 업데이트하세요.',
    },
    {
      title: '중앙 ↔ 주변 연동',
      description:
        '중앙과 주변 카드가 연동되어 목표 간의 관계를 쉽게 파악할 수 있어요.',
    },
    {
      title: '카드 전체 보기',
      description:
        '모든 카드를 한 번에 볼 수 있어요. 중앙 목표와 주변 목표를 쉽게 파악할 수 있어요.',
    },
    {
      title: '투두 탭',
      description:
        '실행 과제를 체크해 보세요. 체크한 과제는 완료 상태로 표시되어 쉽게 파악할 수 있어요.',
    },
  ];

  return (
    <View className="relative flex-1 bg-slate-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full items-start">
          <Text className="text-3xl font-bold text-zinc-800">
            만다라트 가이드
          </Text>
          <Text className="mt-2 text-base leading-6 text-zinc-500">
            만다라트는 목표를 체계적으로 설계하고 실행 계획을 세울 수 있도록
            도와주는 다이어그램 도구입니다. 아래 안내를 참고해 나만의 플랜을
            만들어 보세요.
          </Text>
        </View>

        <Section title="만다라트란?">
          <Text className="text-base leading-6 text-zinc-600">
            만다라트(Mandal-Art)는 일본 디자이너 이마이즈미 히로아키가 고안한
            목표 달성 및 아이디어 발상 도구입니다. 중심 목표를 8개의 하위 목표로
            나누고, 각 하위 목표를 다시 8개의 실행 과제로 세분화하여 총 64개의
            구체적인 실천 항목을 구성합니다.
          </Text>
        </Section>

        <Section
          title="사용 방법"
          subtitle="단계별로 차근차근 목표를 세분화해 보세요."
        >
          {usageSteps.map(step => (
            <View key={step.title} className="space-y-1.5 mt-3">
              <Text className="text-base font-semibold text-zinc-700">
                {step.title}
              </Text>
              {step.bullets.map(point => (
                <View key={point} className="flex-row items-start">
                  <Text className="mr-2 text-base text-indigo-500">{'•'}</Text>
                  <Text className="flex-1 text-base leading-6 text-zinc-600">
                    {point}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </Section>

        <Section
          title="기능 안내"
          subtitle="앱에서 제공하는 핵심 기능을 살펴보세요."
        >
          {features.map(feature => (
            <View key={feature.title} className="flex-row items-start mt-2">
              {/* <Text className="text-xl leading-6">{feature.icon}</Text> */}
              <View className="flex-1">
                <Text className="text-base font-semibold text-zinc-700">
                  {feature.title}
                </Text>
                <Text className="text-base leading-6 text-zinc-600">
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </Section>
      </ScrollView>

      {/* <View className="absolute bottom-20 left-6">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-zinc-200 rounded-full w-16 h-16 items-center justify-center shadow pl-1"
          activeOpacity={0.8}
        >
          <MaterialIcon name="arrow-back-ios" size={18} color="black" />
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 100,
    paddingBottom: 120,
    paddingHorizontal: 24,
  },
});
