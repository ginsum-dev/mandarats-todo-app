import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStaticNavigation } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import GuideScreen from '../screens/GuideScreen';
import ViewScreen from '../screens/ViewScreen';
import TodoScreen from '../screens/TodoScreen';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// Home 스택 네비게이터
const HomeStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: 'HomeScreen',
      },
    },
    Guide: {
      screen: GuideScreen,
      options: {
        title: 'Guide',
      },
    },
    ViewScreen: {
      screen: ViewScreen,
      options: {
        title: 'ViewScreen',
      },
    },
  },
});

// Bottom Tab 네비게이터
const BottomTabs = createBottomTabNavigator({
  initialRouteName: 'HomeTab',
  screens: {
    HomeTab: {
      screen: HomeStack,
      options: {
        title: 'Mandarat',
        tabBarIcon: ({ color, size }) => (
          <MaterialIcon name="grid" size={size} color={color} />
        ),
      },
    },
    TodoTab: {
      screen: TodoScreen,
      options: {
        title: 'Todo',
        tabBarIcon: ({ color, size }) => (
          <MaterialIcon name="format-list-bulleted" size={size} color={color} />
        ),
      },
    },
  },
  screenOptions: {
    headerShown: false,
    tabBarActiveTintColor: '#ff637e', // rose-500
    tabBarInactiveTintColor: '#a1a1a1', // zinc-500
    tabBarStyle: {
      backgroundColor: '#ffffff',
      borderTopWidth: 1,
      borderTopColor: '#e4e4e7',
      paddingBottom: 10,
      paddingTop: 8,
      height: 90,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '600',
    },
  },
});

const Navigation = createStaticNavigation(BottomTabs);

export default Navigation;
