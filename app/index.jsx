import { useNavigation ,Link} from "expo-router";
import React, { useState } from "react";
import { View, Text,TouchableOpacity, Animated, ImageBackground, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';


export default function Index() {
  const navigation = useNavigation();
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

  return (
    <LinearGradient
      colors={['#000000', '#800080']} // Black and purple gradient
      style={{ flex: 1, justifyContent:'center',height:'100%',width:"100%"}}>
      {/* Centered Logo */}
      <View style={{width:'100%',alignItems:'center',justifyContent:'center'}}>
          <BlurView intensity={50} tint="light" style={styles.glassyContainer1}>
          <View style={{width:'100%',alignItems:'center',justifyContent:'center'}}>

       <Image
        source={require('../assets/images/Logo.png')} // Replace with your logo path
        style={{
          width: 100,
          height: 100,
          resizeMode: 'contain',
          
          // Space between logo and button
        }}
        />
        </View>
            </BlurView>
        </View>

      {/* Centered Button */}
      <Animated.View style={{ transform: [{ scale: buttonAnim }] }}>
        <TouchableOpacity 
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={{
            paddingVertical: 15,
            paddingHorizontal: 30,
            backgroundColor: '#34A853',
            borderRadius: 10,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 5,
            marginTop:15
          }}
        >
          <Link href={'/(auth)/signin'}>
          <Text style={{ color: 'white', fontWeight: '600', fontSize: 18 }}>
            Sign In
          </Text>
          </Link>
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity>
        <Link href={"/(tabs)/"}>
                <Text style={{ fontSize: 16, color: '#FFA500', fontWeight: '600', marginLeft: 5 }}>
                  HomePage
                </Text>
        </Link>
              </TouchableOpacity>
    </LinearGradient>
  );
}
const styles = {

  glassyContainer1: {
    marginTop: 28,
  width:150,
  height:150,
    padding: 12,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 10)', // Transparent white with slight opacity
    borderColor: 'rgba(255, 255, 255, 0.3)', // Light border to add glassy effect
    borderWidth: 1,
    overflow: 'hidden',
    justifyContent:'center'

  },
};
