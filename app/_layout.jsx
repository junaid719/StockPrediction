// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect } from 'react';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/useColorScheme';

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="index" options={{ headerShown: false }}  />
//         <Stack.Screen name="(auth)" options={{
//           headerShown:false
//         }} /> 
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//       </Stack>
//     </ThemeProvider>
//   );
// }


import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useNavigation } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

import { useColorScheme } from '@/hooks/useColorScheme';

import AsyncStorage from '@react-native-async-storage/async-storage';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility
  const [userInfo, setUserInfo] = useState(""); // State for dropdown visibility
  const dropdownAnimation = useState(new Animated.Value(0))[0]; // State for animated dropdown

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfo');
      console.log("valueeeee", value)
      if (value !== null) {
        let res = JSON.parse(value)
        setUserInfo(res?.data)
              navigation.replace('(tabs)')
      }
      else {
        setUserInfo("")
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  useEffect(() => {
    getData()
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    Animated.timing(dropdownAnimation, {
      toValue: dropdownVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: true, // Enables native driver for smoother animations
    }).start();
  };

  // Function to navigate to a route and close the dropdown
  const navigateTo = (route) => {
    router.push(route);
    // Close the dropdown
    Animated.timing(dropdownAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setDropdownVisible(false));
  };
  console.log("userInfo", userInfo)
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* Wrapping the Stack Navigator with the Navbar */}
      <View style={styles.container}>
        {/* Custom Navbar with Logo and Animated Dropdown */}
        <LinearGradient
          colors={['#000000', '#800080']}
          style={styles.navbarBackground} // Use absoluteFill style to cover the entire navbar
        >
          <View style={styles.navbar}>
            {/* Logo on the Left */}
            <Image
              source={require('../assets/images/Logo.png')} // Replace with your logo's path
              style={styles.logo}
            />

            {/* Animated Dropdown on the Right */}
            <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
              <Text style={styles.navText}>Menu</Text>
            </TouchableOpacity>
          </View>

          {/* Animated Dropdown Content with Gradient */}
          <Animated.View
            style={[
              styles.dropdown,
              {
                transform: [
                  {
                    scaleY: dropdownAnimation, // Using scaleY for smooth dropdown effect
                  },
                ],
              },
            ]}
          >
            {dropdownVisible && (
              <LinearGradient
                colors={['#000000', '#800080']} // Same gradient as the navbar
                style={styles.dropdownGradient} // Style for gradient dropdown
              >
                <TouchableOpacity onPress={() => navigateTo('/(tabs)/')}>
                  <Text style={styles.dropdownText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateTo('/(nav)/dashboard')}>
                  <Text style={styles.dropdownText}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateTo('/(nav)/searchscreen')}>
                  <Text style={styles.dropdownText}>Search</Text>
                </TouchableOpacity>
              </LinearGradient>
            )}
          </Animated.View>
        </LinearGradient>

        {/* Stack Navigator */}
        <View style={styles.content}>
          <Stack
            initialRouteName={userInfo?.token ? "(tabs)" : "(auth)"}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(nav)" options={{ headerShown: false }} />
          </Stack>
        </View>
      </View>
    </ThemeProvider>
  );
}

// Styles for Navbar and container
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbarBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 80, // Adjust the height according to your design
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  logo: {
    width: 40,
    height: 40, // Adjust logo size as needed
    resizeMode: 'contain',
  },
  dropdownButton: {
    padding: 10,
    backgroundColor: 'transparent',
  },
  navText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dropdown: {
    position: 'absolute',
    right: 0,
    top: 75,
    borderRadius: 10,
    overflow: 'hidden',
    zIndex: 10, // Make sure dropdown is above other content
  },
  dropdownGradient: {
    paddingVertical: 10, // Vertical padding for dropdown items
    paddingHorizontal: 15, // Horizontal padding
    borderRadius: 8, // Rounded corners for dropdown
  },
  dropdownText: {
    padding: 15,
    fontSize: 12,
    color: '#fff', // Text color to contrast the gradient background
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  content: {
    flex: 1, // Ensures the stack content fills the rest of the space below the Navbar
    marginTop: 80, // Add margin to avoid content overlapping with navbar
  },
});

