import {withLayoutContext} from "expo-router";
import {createStackNavigator, StackNavigationOptions} from "@react-navigation/stack";

const {Navigator} = createStackNavigator();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const MaterialStack = withLayoutContext<StackNavigationOptions, typeof Navigator>(Navigator);
