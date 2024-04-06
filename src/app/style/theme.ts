import {MD3Theme} from 'react-native-paper/lib/typescript/types';
import {
    MD3LightTheme as DefaultLightTheme,
    MD3DarkTheme as DefaultDarkTheme
} from 'react-native-paper';
import {Theme} from "@react-navigation/native";

export const lightTheme: MD3Theme = {
    ...DefaultLightTheme,
    colors: {
        ...DefaultLightTheme.colors,
        primary: 'rgb(150, 73, 0)',
        onPrimary: 'rgb(255, 255, 255)',
        primaryContainer: 'rgb(255, 220, 198)',
        onPrimaryContainer: 'rgb(49, 19, 0)',
        secondary: 'rgb(117, 88, 70)',
        onSecondary: 'rgb(255, 255, 255)',
        secondaryContainer: 'rgb(255, 220, 198)',
        onSecondaryContainer: 'rgb(43, 23, 8)',
        tertiary: 'rgb(0, 104, 116)',
        onTertiary: 'rgb(255, 255, 255)',
        tertiaryContainer: 'rgb(151, 240, 255)',
        onTertiaryContainer: 'rgb(0, 31, 36)',
        error: 'rgb(186, 26, 26)',
        onError: 'rgb(255, 255, 255)',
        errorContainer: 'rgb(255, 218, 214)',
        onErrorContainer: 'rgb(65, 0, 2)',
        background: 'rgb(255, 251, 255)',
        onBackground: 'rgb(32, 26, 23)',
        surface: 'rgb(255, 251, 255)',
        onSurface: 'rgb(32, 26, 23)',
        surfaceVariant: 'rgb(244, 222, 211)',
        onSurfaceVariant: 'rgb(82, 68, 60)',
        outline: 'rgb(132, 116, 106)',
        outlineVariant: 'rgb(215, 195, 183)',
        shadow: 'rgb(0, 0, 0)',
        scrim: 'rgb(0, 0, 0)',
        inverseSurface: 'rgb(54, 47, 43)',
        inverseOnSurface: 'rgb(251, 238, 232)',
        inversePrimary: 'rgb(255, 183, 134)',
        elevation: {
            level0: 'transparent',
            level1: 'rgb(250, 242, 242)',
            level2: 'rgb(247, 237, 235)',
            level3: 'rgb(244, 231, 227)',
            level4: 'rgb(242, 230, 224)',
            level5: 'rgb(240, 226, 219)'
        },
        surfaceDisabled: 'rgba(32, 26, 23, 0.12)',
        onSurfaceDisabled: 'rgba(32, 26, 23, 0.38)',
        backdrop: 'rgba(58, 46, 38, 0.4)'
    }
}
export const darkTheme: MD3Theme = {
    ...DefaultDarkTheme,
    colors: {
        ...DefaultDarkTheme.colors,
        primary: 'rgb(255, 183, 134)',
        onPrimary: 'rgb(80, 36, 0)',
        primaryContainer: 'rgb(114, 54, 0)',
        onPrimaryContainer: 'rgb(255, 220, 198)',
        secondary: 'rgb(229, 191, 168)',
        onSecondary: 'rgb(66, 43, 27)',
        secondaryContainer: 'rgb(91, 65, 48)',
        onSecondaryContainer: 'rgb(255, 220, 198)',
        tertiary: 'rgb(79, 216, 235)',
        onTertiary: 'rgb(0, 54, 61)',
        tertiaryContainer: 'rgb(0, 79, 88)',
        onTertiaryContainer: 'rgb(151, 240, 255)',
        error: 'rgb(255, 180, 171)',
        onError: 'rgb(105, 0, 5)',
        errorContainer: 'rgb(147, 0, 10)',
        onErrorContainer: 'rgb(255, 180, 171)',
        background: 'rgb(32, 26, 23)',
        onBackground: 'rgb(236, 224, 218)',
        surface: 'rgb(32, 26, 23)',
        onSurface: 'rgb(236, 224, 218)',
        surfaceVariant: 'rgb(82, 68, 60)',
        onSurfaceVariant: 'rgb(215, 195, 183)',
        outline: 'rgb(159, 141, 131)',
        outlineVariant: 'rgb(82, 68, 60)',
        shadow: 'rgb(0, 0, 0)',
        scrim: 'rgb(0, 0, 0)',
        inverseSurface: 'rgb(236, 224, 218)',
        inverseOnSurface: 'rgb(54, 47, 43)',
        inversePrimary: 'rgb(150, 73, 0)',
        elevation: {
            level0: 'transparent',
            level1: 'rgb(43, 34, 29)',
            level2: 'rgb(50, 39, 32)',
            level3: 'rgb(57, 43, 35)',
            level4: 'rgb(59, 45, 36)',
            level5: 'rgb(63, 48, 39)'
        },
        surfaceDisabled: 'rgba(236, 224, 218, 0.12)',
        onSurfaceDisabled: 'rgba(236, 224, 218, 0.38)',
        backdrop: 'rgba(58, 46, 38, 0.4)'
    }
}

export const lightNavTheme: Theme = {
    dark: false,
    colors: {
        ...lightTheme.colors,
        card: lightTheme.colors.background,
        text: lightTheme.colors.primary,
        border: lightTheme.colors.onBackground,
        notification: lightTheme.colors.tertiary,
    }
}

export const darkNavTheme: Theme = {
    dark: true,
    colors: {
        ...darkTheme.colors,
        card: darkTheme.colors.onSecondary,
        text: darkTheme.colors.primary,
        border: darkTheme.colors.surfaceVariant,
        notification: darkTheme.colors.tertiary,
    }
}
