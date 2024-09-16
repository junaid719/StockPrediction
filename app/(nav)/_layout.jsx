import { Stack } from 'expo-router';
import React from 'react'

export default function nav() {


  return (
    <Stack>
    <Stack.Screen name="dashboard" options={{ headerShown: false }} />
    <Stack.Screen name="searchscreen" options={{ headerShown: false }} />
  </Stack>
  );
}
