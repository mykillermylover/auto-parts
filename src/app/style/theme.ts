import {MD3Theme} from 'react-native-paper/lib/typescript/types';
import {
    MD3LightTheme as DefaultLightTheme,
    MD3DarkTheme as DefaultDarkTheme
} from 'react-native-paper';
import {Theme} from '@react-navigation/native';

// generated themes
const generatedLightTheme = {
    'colors': {
        'primary': 'rgb(123, 88, 0)',
        'onPrimary': 'rgb(255, 255, 255)',
        'primaryContainer': 'rgb(255, 222, 164)',
        'onPrimaryContainer': 'rgb(38, 25, 0)',
        'secondary': 'rgb(122, 89, 0)',
        'onSecondary': 'rgb(255, 255, 255)',
        'secondaryContainer': 'rgb(255, 222, 163)',
        'onSecondaryContainer': 'rgb(38, 25, 0)',
        'tertiary': 'rgb(44, 107, 40)',
        'onTertiary': 'rgb(255, 255, 255)',
        'tertiaryContainer': 'rgb(174, 244, 160)',
        'onTertiaryContainer': 'rgb(0, 34, 1)',
        'error': 'rgb(184, 31, 30)',
        'onError': 'rgb(255, 255, 255)',
        'errorContainer': 'rgb(255, 218, 214)',
        'onErrorContainer': 'rgb(65, 0, 2)',
        'background': 'rgb(255, 251, 255)',
        'onBackground': 'rgb(30, 27, 22)',
        'surface': 'rgb(255, 251, 255)',
        'onSurface': 'rgb(30, 27, 22)',
        'surfaceVariant': 'rgb(238, 225, 207)',
        'onSurfaceVariant': 'rgb(78, 70, 57)',
        'outline': 'rgb(127, 118, 103)',
        'outlineVariant': 'rgb(209, 197, 180)',
        'shadow': 'rgb(0, 0, 0)',
        'scrim': 'rgb(0, 0, 0)',
        'inverseSurface': 'rgb(52, 48, 42)',
        'inverseOnSurface': 'rgb(248, 239, 231)',
        'inversePrimary': 'rgb(253, 187, 20)',
        'elevation': {
            'level0': 'transparent',
            'level1': 'rgb(248, 243, 242)',
            'level2': 'rgb(244, 238, 235)',
            'level3': 'rgb(241, 233, 227)',
            'level4': 'rgb(239, 231, 224)',
            'level5': 'rgb(237, 228, 219)'
        },
        'surfaceDisabled': 'rgba(30, 27, 22, 0.12)',
        'onSurfaceDisabled': 'rgba(30, 27, 22, 0.38)',
        'backdrop': 'rgba(55, 47, 36, 0.4)'
    }
};
const generatedDarkTheme = {
    'colors': {
        'primary': 'rgb(253, 187, 20)',
        'onPrimary': 'rgb(65, 45, 0)',
        'primaryContainer': 'rgb(93, 66, 0)',
        'onPrimaryContainer': 'rgb(255, 222, 164)',
        'secondary': 'rgb(245, 190, 72)',
        'onSecondary': 'rgb(64, 45, 0)',
        'secondaryContainer': 'rgb(93, 66, 0)',
        'onSecondaryContainer': 'rgb(255, 222, 163)',
        'tertiary': 'rgb(147, 215, 134)',
        'onTertiary': 'rgb(0, 58, 4)',
        'tertiaryContainer': 'rgb(17, 82, 17)',
        'onTertiaryContainer': 'rgb(174, 244, 160)',
        'error': 'rgb(255, 180, 171)',
        'onError': 'rgb(105, 0, 5)',
        'errorContainer': 'rgb(147, 0, 10)',
        'onErrorContainer': 'rgb(255, 218, 214)',
        'background': 'rgb(30, 27, 22)',
        'onBackground': 'rgb(233, 225, 217)',
        'surface': 'rgb(30, 27, 22)',
        'onSurface': 'rgb(233, 225, 217)',
        'surfaceVariant': 'rgb(78, 70, 57)',
        'onSurfaceVariant': 'rgb(209, 197, 180)',
        'outline': 'rgb(154, 143, 128)',
        'outlineVariant': 'rgb(78, 70, 57)',
        'shadow': 'rgb(0, 0, 0)',
        'scrim': 'rgb(0, 0, 0)',
        'inverseSurface': 'rgb(233, 225, 217)',
        'inverseOnSurface': 'rgb(52, 48, 42)',
        'inversePrimary': 'rgb(123, 88, 0)',
        'elevation': {
            'level0': 'transparent',
            'level1': 'rgb(41, 35, 22)',
            'level2': 'rgb(48, 40, 22)',
            'level3': 'rgb(55, 45, 22)',
            'level4': 'rgb(57, 46, 22)',
            'level5': 'rgb(61, 49, 22)'
        },
        'surfaceDisabled': 'rgba(233, 225, 217, 0.12)',
        'onSurfaceDisabled': 'rgba(233, 225, 217, 0.38)',
        'backdrop': 'rgba(54, 47, 36, 0.4)'
    }
};

export const lightTheme: MD3Theme = {
    ...DefaultLightTheme,
    ...generatedLightTheme,
    colors: {
        ...DefaultLightTheme,
        ...generatedLightTheme.colors
    }
};
export const darkTheme: MD3Theme = {
    ...DefaultDarkTheme,
    ...generatedDarkTheme,
    colors: {
        ...DefaultDarkTheme,
        ...generatedDarkTheme.colors
    }
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
