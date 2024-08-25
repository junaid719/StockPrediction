import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  // Sample user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://via.placeholder.com/150', // Placeholder image
  };

  return (
    <LinearGradient
      colors={['#000000', '#800080']}
      style={styles.container}
    >
      <View style={styles.profileHeader}>
        <BlurView style={styles.absolute} blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white" />
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>

      <View style={styles.profileOptions}>
        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="person-circle-outline" size={24} color="white" />
          <Text style={styles.optionText}>Account Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="lock-closed-outline" size={24} color="white" />
          <Text style={styles.optionText}>Privacy Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="notifications-outline" size={24} color="white" />
          <Text style={styles.optionText}>Notifications</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="help-circle-outline" size={24} color="white" />
          <Text style={styles.optionText}>Help & Support</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="log-out-outline" size={24} color="white" />
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 15,
    padding: 30,
    marginBottom: 30,
    overflow: 'hidden',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
  },
  profileOptions: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 15,
    padding: 20,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  optionText: {
    fontSize: 18,
    color: 'white',
    marginLeft: 15,
  },
});

export default ProfileScreen;
