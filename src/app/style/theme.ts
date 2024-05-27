import { MD3Theme } from 'react-native-paper/lib/typescript/types';
import { MD3DarkTheme as DefaultDarkTheme, MD3LightTheme as DefaultLightTheme } from 'react-native-paper';
import { Theme } from '@react-navigation/native';

// generated themes
const generatedLightTheme = {
    'colors': {
        'primary': 'rgb(166, 59, 0)',
        'onPrimary': 'rgb(255, 255, 255)',
        'primaryContainer': 'rgb(255, 219, 206)',
        'onPrimaryContainer': 'rgb(55, 14, 0)',
        'secondary': 'rgb(138, 81, 0)',
        'onSecondary': 'rgb(255, 255, 255)',
        'secondaryContainer': 'rgb(255, 220, 190)',
        'onSecondaryContainer': 'rgb(44, 22, 0)',
        'tertiary': 'rgb(0, 105, 113)',
        'onTertiary': 'rgb(255, 255, 255)',
        'tertiaryContainer': 'rgb(132, 243, 255)',
        'onTertiaryContainer': 'rgb(0, 32, 35)',
        'error': 'rgb(186, 26, 26)',
        'onError': 'rgb(255, 255, 255)',
        'errorContainer': 'rgb(255, 218, 214)',
        'onErrorContainer': 'rgb(65, 0, 2)',
        'background': 'rgb(255, 251, 255)',
        'onBackground': 'rgb(32, 26, 24)',
        'surface': 'rgb(255, 251, 255)',
        'onSurface': 'rgb(32, 26, 24)',
        'surfaceVariant': 'rgb(245, 222, 214)',
        'onSurfaceVariant': 'rgb(83, 67, 62)',
        'outline': 'rgb(133, 115, 109)',
        'outlineVariant': 'rgb(216, 194, 186)',
        'shadow': 'rgb(0, 0, 0)',
        'scrim': 'rgb(0, 0, 0)',
        'inverseSurface': 'rgb(54, 47, 44)',
        'inverseOnSurface': 'rgb(251, 238, 234)',
        'inversePrimary': 'rgb(255, 181, 152)',
        'elevation': {
            'level0': 'transparent',
            'level1': 'rgb(251, 241, 242)',
            'level2': 'rgb(248, 236, 235)',
            'level3': 'rgb(245, 230, 227)',
            'level4': 'rgb(244, 228, 224)',
            'level5': 'rgb(243, 224, 219)'
        },
        'surfaceDisabled': 'rgba(32, 26, 24, 0.12)',
        'onSurfaceDisabled': 'rgba(32, 26, 24, 0.38)',
        'backdrop': 'rgba(59, 45, 40, 0.4)'
    }
};
const generatedDarkTheme = {
    'colors': {
        'primary': 'rgb(255, 181, 152)',
        'onPrimary': 'rgb(89, 28, 0)',
        'primaryContainer': 'rgb(127, 43, 0)',
        'onPrimaryContainer': 'rgb(255, 219, 206)',
        'secondary': 'rgb(255, 184, 111)',
        'onSecondary': 'rgb(74, 40, 0)',
        'secondaryContainer': 'rgb(105, 60, 0)',
        'onSecondaryContainer': 'rgb(255, 220, 190)',
        'tertiary': 'rgb(77, 217, 230)',
        'onTertiary': 'rgb(0, 54, 59)',
        'tertiaryContainer': 'rgb(0, 79, 85)',
        'onTertiaryContainer': 'rgb(132, 243, 255)',
        'error': 'rgb(255, 180, 171)',
        'onError': 'rgb(105, 0, 5)',
        'errorContainer': 'rgb(147, 0, 10)',
        'onErrorContainer': 'rgb(255, 180, 171)',
        'background': 'rgb(32, 26, 24)',
        'onBackground': 'rgb(237, 224, 220)',
        'surface': 'rgb(32, 26, 24)',
        'onSurface': 'rgb(237, 224, 220)',
        'surfaceVariant': 'rgb(83, 67, 62)',
        'onSurfaceVariant': 'rgb(216, 194, 186)',
        'outline': 'rgb(160, 141, 134)',
        'outlineVariant': 'rgb(83, 67, 62)',
        'shadow': 'rgb(0, 0, 0)',
        'scrim': 'rgb(0, 0, 0)',
        'inverseSurface': 'rgb(237, 224, 220)',
        'inverseOnSurface': 'rgb(54, 47, 44)',
        'inversePrimary': 'rgb(166, 59, 0)',
        'elevation': {
            'level0': 'transparent',
            'level1': 'rgb(43, 34, 30)',
            'level2': 'rgb(50, 38, 34)',
            'level3': 'rgb(57, 43, 38)',
            'level4': 'rgb(59, 45, 39)',
            'level5': 'rgb(63, 48, 42)'
        },
        'surfaceDisabled': 'rgba(237, 224, 220, 0.12)',
        'onSurfaceDisabled': 'rgba(237, 224, 220, 0.38)',
        'backdrop': 'rgba(59, 45, 40, 0.4)'
    }
};

export const lightTheme: MD3Theme = {
    ...DefaultLightTheme,
    // ...generatedLightTheme,
    // colors: {
    //     ...DefaultLightTheme,
    //     ...generatedLightTheme.colors
    // }
};
export const darkTheme: MD3Theme = {
    ...DefaultDarkTheme,
    // ...generatedDarkTheme,
    // colors: {
    //     ...DefaultDarkTheme,
    //     ...generatedDarkTheme.colors
    // }
};

export const lightNavTheme: Theme = {
    dark: false,
    colors: {
        ...lightTheme.colors,
        card: lightTheme.colors.background,
        text: lightTheme.colors.primary,
        border: lightTheme.colors.onBackground,
        notification: lightTheme.colors.tertiary,
    }
};

export const darkNavTheme: Theme = {
    dark: true,
    colors: {
        ...darkTheme.colors,
        card: darkTheme.colors.onSecondary,
        text: darkTheme.colors.primary,
        border: darkTheme.colors.surfaceVariant,
        notification: darkTheme.colors.tertiary,
    }
};
