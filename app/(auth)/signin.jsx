// import { useNavigation } from "expo-router";
// import React, { useState } from "react";
// import { View, Text, ScrollView, TextInput, TouchableOpacity, Animated, ImageBackground, Image } from "react-native";
// import { SafeAreaView } from "react-native";
// import { LinearGradient } from 'expo-linear-gradient';
// import { BlurView } from 'expo-blur';

// const Signin = () => {
//   const navigation = useNavigation();
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [buttonAnim] = useState(new Animated.Value(1));

//   const handlePressIn = () => {
//     Animated.spring(buttonAnim, {
//       toValue: 0.95,
//       useNativeDriver: true,
//     }).start();
//   };

//   const handlePressOut = () => {
//     Animated.spring(buttonAnim, {
//       toValue: 1,
//       friction: 3,
//       tension: 40,
//       useNativeDriver: true,
//     }).start();
//   };

//   return (
//     <LinearGradient
//       colors={['#000000', '#800080']} // Black and purple gradient
//       style={{ flex: 1 }}>
//       <SafeAreaView style={{ flex: 1,}}>
//         <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
//           <View
//             style={{
//               paddingHorizontal: 20,
//               marginVertical: 24,
//             }}
//           >
//             <View style={{width:'100%',alignItems:'center',justifyContent:'center'}}>
//           <BlurView intensity={50} tint="light" style={styles.glassyContainer1}>
//           <View style={{width:'100%',alignItems:'center',justifyContent:'center'}}>

//        <Image
//         source={require('../../assets/images/Logo.png')} // Replace with your logo path
//         style={{
//           width: 100,
//           height: 100,
//           resizeMode: 'contain',
          
//           // Space between logo and button
//         }}
//         />
//         </View>
//             </BlurView>
//         </View>


//             <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white', marginTop: 20, textAlign: 'center' }}>
//               StockPrediction
//             </Text>

//             {/* Glassy Text Input */}
//             <BlurView intensity={50} tint="light" style={styles.glassyContainer}>
//               <TextInput
//                 placeholder="Email"
//                 placeholderTextColor="#b0c4de"
//                 value={form.email}
//                 onChangeText={(e) => setForm({ ...form, email: e })}
//                 keyboardType="email-address"
//                 style={styles.glassyInput}
//               />
//             </BlurView>

//             <BlurView intensity={50} tint="light" style={styles.glassyContainer}>
//               <TextInput
//                 placeholder="Password"
//                 placeholderTextColor="#b0c4de"
//                 value={form.password}
//                 onChangeText={(e) => setForm({ ...form, password: e })}
//                 secureTextEntry
//                 style={styles.glassyInput}
//               />
//             </BlurView>

//             <Animated.View style={{ width:'100%',transform: [{ scale: buttonAnim }] }}>
//               <TouchableOpacity
//                 onPressIn={handlePressIn}
//                 onPressOut={handlePressOut}
//                 style={{
//                   marginTop: 28,
//                   paddingVertical: 15,
//                   backgroundColor: '#34A853',
//                   borderRadius: 10,
//                   alignItems: 'center',
//                   shadowColor: '#000',
//                   shadowOffset: { width: 0, height: 4 },
//                   shadowOpacity: 0.3,
//                   shadowRadius: 8,
//                   elevation: 5,
                            
//                    }}
//               >
//                 <Text style={{ color: 'white', fontWeight: '600', fontSize: 18 }}>
//                   Sign In
//                 </Text>
//               </TouchableOpacity>
//             </Animated.View>

//             <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 20 }}>
//               <Text style={{ fontSize: 16, color: '#fff' }}>
//                 Don't have an account?
//               </Text>
//               <TouchableOpacity onPress={() => navigation.navigate('signup')}>
//                 <Text style={{ fontSize: 16, color: '#FFA500', fontWeight: '600', marginLeft: 5 }}>
//                   Signup
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => navigation.navigate('index')}>
//                 <Text style={{ fontSize: 16, color: '#FFA500', fontWeight: '600', marginLeft: 5 }}>
//                   Back to Home
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//      </LinearGradient> 
//   );
// };

// const styles = {
//   glassyContainer: {
//     marginTop: 28,
//     padding: 12,
//     borderRadius: 10,
//     backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent white with slight opacity
//     borderColor: 'rgba(255, 255, 255, 0.3)', // Light border to add glassy effect
//     borderWidth: 1,
//     overflow: 'hidden', // Required for BlurView to work properly
//   },
//   glassyContainer1: {
//     marginTop: 28,
//   width:150,
//   height:150,
//     padding: 12,
//     borderRadius: 100,
//     backgroundColor: 'rgba(255, 255, 255, 10)', // Transparent white with slight opacity
//     borderColor: 'rgba(255, 255, 255, 0.3)', // Light border to add glassy effect
//     borderWidth: 1,
//     overflow: 'hidden',
//     justifyContent:'center'

//   },
//   glassyInput: {
//     color: 'white',
//     fontSize: 16,
//   },
// };

// export default Signin;




import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, Animated ,Image} from "react-native";
import { SafeAreaView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import axios from 'axios'; // Import Axios

const Signin = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [buttonAnim] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(buttonAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  // Function to handle the form submission and make the API call
  const handleSignin = async () => {
    const formData = new FormData();
    formData.append('email', form.email);
    formData.append('password', form.password);

    try {
      const response = await axios.post(' http://192.168.125.218:5000/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        // Handle successful login (e.g., navigate to another screen)
        navigation.navigate('(tabs)')
      } else {
        // Handle failure (e.g., show error message)
        console.log('Login failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error making API call:', error);
    }
  };

  return (
    <LinearGradient
      colors={['#000000', '#800080']} // Black and purple gradient
      style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <View
            style={{
              paddingHorizontal: 20,
              marginVertical: 24,
            }}
          >
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <BlurView intensity={50} tint="light" style={styles.glassyContainer1}>
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    source={require('../../assets/images/Logo.png')} // Replace with your logo path
                    style={{
                      width: 100,
                      height: 100,
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              </BlurView>
            </View>

            <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white', marginTop: 20, textAlign: 'center' }}>
              StockPrediction
            </Text>

            {/* Glassy Text Input */}
            <BlurView intensity={50} tint="light" style={styles.glassyContainer}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#b0c4de"
                value={form.email}
                onChangeText={(e) => setForm({ ...form, email: e })}
                keyboardType="email-address"
                style={styles.glassyInput}
              />
            </BlurView>

            <BlurView intensity={50} tint="light" style={styles.glassyContainer}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#b0c4de"
                value={form.password}
                onChangeText={(e) => setForm({ ...form, password: e })}
                secureTextEntry
                style={styles.glassyInput}
              />
            </BlurView>

            <Animated.View style={{ width: '100%', transform: [{ scale: buttonAnim }] }}>
              <TouchableOpacity
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handleSignin} // Call the signin function on press
                style={{
                  marginTop: 28,
                  paddingVertical: 15,
                  backgroundColor: '#34A853',
                  borderRadius: 10,
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 5,
                }}
              >
                <Text style={{ color: 'white', fontWeight: '600', fontSize: 18 }}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </Animated.View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 20 }}>
              <Text style={{ fontSize: 16, color: '#fff' }}>
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                <Text style={{ fontSize: 16, color: '#FFA500', fontWeight: '600', marginLeft: 5 }}>
                  Signup
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('index')}>
                <Text style={{ fontSize: 16, color: '#FFA500', fontWeight: '600', marginLeft: 5 }}>
                  Back to Home
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = {
  glassyContainer: {
    marginTop: 28,
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent white with slight opacity
    borderColor: 'rgba(255, 255, 255, 0.3)', // Light border to add glassy effect
    borderWidth: 1,
    overflow: 'hidden', // Required for BlurView to work properly
  },
  glassyContainer1: {
    marginTop: 28,
    width: 150,
    height: 150,
    padding: 12,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 10)', // Transparent white with slight opacity
    borderColor: 'rgba(255, 255, 255, 0.3)', // Light border to add glassy effect
    borderWidth: 1,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  glassyInput: {
    color: 'white',
    fontSize: 16,
  },
};

export default Signin;
