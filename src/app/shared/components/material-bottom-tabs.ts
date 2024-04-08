import {MaterialBottomTabNavigationOptions} from 'react-native-paper';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {withLayoutContext} from 'expo-router';

const {Navigator} = createMaterialBottomTabNavigator();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const MaterialBottomTabs = withLayoutContext<MaterialBottomTabNavigationOptions, typeof Navigator>(Navigator);
