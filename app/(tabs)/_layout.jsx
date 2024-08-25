import { Tabs } from 'expo-router';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Icon from 'react-native-vector-icons/Ionicons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const tabBarBackground = () => (
    <LinearGradient
      colors={['#000000', '#800080']}
      style={StyleSheet.absoluteFill}
    />
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF', // White color for active icons
        tabBarInactiveTintColor: '#CCCCCC', // Light grey for inactive icons
        tabBarBackground: tabBarBackground,
        headerShown: false,
        tabBarStyle: { backgroundColor: 'transparent' }, // Transparent to allow gradient to show
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'home' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="prediction"
        options={{
          title: 'Prediction',
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'trending-up' : 'trending-up-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'time' : 'time-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'compass' : 'compass-outline'} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
