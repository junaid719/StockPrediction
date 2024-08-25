import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';
import { BlurView } from 'expo-blur';

const prediction = () => {
  const [stockDataFile, setStockDataFile] = useState(null);
  const [sentimentAnalysisFile, setSentimentAnalysisFile] = useState(null);

  const pickFile = async (type) => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'text/csv', // Ensures only CSV files are selectable
    });

    if (result.type === 'success') {
      if (type === 'stockData') {
        setStockDataFile(result);
      } else if (type === 'sentimentAnalysis') {
        setSentimentAnalysisFile(result);
      }
    } else {
      Alert.alert('File selection was canceled');
    }
  };

  return (
    <LinearGradient
      colors={['#000000', '#800080']}
      style={styles.container}
    >
      <Text style={styles.header}>Prediction Screen</Text>

      <View style={styles.filePickerContainer}>
        <BlurView style={styles.absolute} blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white" />
        <Text style={styles.instructionText}>Select the CSV files for processing</Text>
        
        <TouchableOpacity style={styles.button} onPress={() => pickFile('stockData')}>
          <Text style={styles.buttonText}>
            {stockDataFile ? `Selected: ${stockDataFile.name}` : 'Select Stock Data CSV'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => pickFile('sentimentAnalysis')}>
          <Text style={styles.buttonText}>
            {sentimentAnalysisFile ? `Selected: ${sentimentAnalysisFile.name}` : 'Select Sentiment Analysis CSV'}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },
  filePickerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white for glass effect
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    overflow: 'hidden', // Ensures blur effect stays within bounds
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 10, // Match with container border radius
  },
  instructionText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default prediction;
