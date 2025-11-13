import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import GuideScreen from '../screens/GuideScreen';
import ViewScreen from '../screens/ViewScreen';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {},
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: 'HomeScreen',
        headerShown: false,
      },
    },
    Guide: {
      screen: GuideScreen,
      options: {
        title: 'Guide',
        headerShown: false,
      },
    },
    ViewScreen: {
      screen: ViewScreen,
      options: {
        title: 'ViewScreen',
        headerShown: false,
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default Navigation;
