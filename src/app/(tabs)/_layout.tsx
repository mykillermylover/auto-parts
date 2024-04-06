import {Icon} from "react-native-paper";
import React from "react";
import {MaterialBottomTabs} from "../shared/material-bottom-tabs";
export default function TabLayout() {
    return (
        <MaterialBottomTabs>
            <MaterialBottomTabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    tabBarIcon: ({color}) => <Icon size={30} source='home' color={color}/>
                }}
            />
            <MaterialBottomTabs.Screen
                name='settings'
                options={{
                    title: 'Settings',
                    tabBarIcon: ({color}) => <Icon size={30} source='cog' color={color}/>,
                }}
            />
        </MaterialBottomTabs>
    )
}
