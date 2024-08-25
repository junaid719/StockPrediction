import React from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const HomeScreen = () => {
  // Sample data for the three models
  const dataA = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{ data: [20, 45, 28, 80, 99, 43, 50], strokeWidth: 2 }],
  };

  const dataB = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{ data: [30, 60, 40, 90, 70, 85, 30], strokeWidth: 2 }],
  };

  const dataC = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{ data: [50, 20, 10, 40, 60, 75, 90], strokeWidth: 2 }],
  };

  // Screen width for responsive chart design
  const screenWidth = Dimensions.get('window').width;

  return (
    <LinearGradient
      colors={['#000000', '#800080']} // Black and purple gradient
      style={{ flex: 1, justifyContent: 'center', height: '100%', width: '100%' }}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Stock Market Prediction</Text>

        {/* Model A Prediction */}
        <View style={styles.chartContainer}>
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
          <Text style={styles.chartTitle}>Model A Prediction</Text>
          <LineChart
            data={dataA}
            width={screenWidth - 40} // Chart width
            height={220} // Chart height
            chartConfig={chartConfig}
            style={styles.chart}
          />
        </View>

        {/* Model B Prediction */}
        <View style={styles.chartContainer}>
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
          <Text style={styles.chartTitle}>Model B Prediction</Text>
          <LineChart
            data={dataB}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            style={styles.chart}
          />
        </View>

        {/* Model C Prediction */}
        <View style={styles.chartContainer}>
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
          <Text style={styles.chartTitle}>Model C Prediction</Text>
          <LineChart
            data={dataC}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            style={styles.chart}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  chartContainer: {
    marginBottom: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white for glass effect
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    overflow: 'hidden', // Ensures blur effect doesn't spill out of container
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 10, // Match with container border radius
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
  },
  chart: {
    borderRadius: 10,
  },
});

export default HomeScreen;
