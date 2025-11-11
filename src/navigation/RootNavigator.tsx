import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import GuideScreen from '../screens/GuideScreen';
import { createStaticNavigation } from '@react-navigation/native';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {},
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: '',
        headerShown: false,
      },
    },
    Guide: {
      screen: GuideScreen,
      options: {
        title: 'Guide',
        headerBackVisible: false,
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default Navigation;
