import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart } from 'react-native-chart-kit';
import { BlurView } from 'expo-blur';

const HistoryScreen = () => {
  // Sample historical data with predictions and error metrics
  const historyData = [
    {
      month: 'July',
      model: 'Model A',
      prediction: [70, 75, 72, 78, 74],
      actual: [68, 77, 71, 76, 73],
      rmse: 2.5,
      smape: 5.2,
    },
    {
      month: 'June',
      model: 'Model B',
      prediction: [60, 65, 63, 67, 66],
      actual: [61, 64, 62, 68, 65],
      rmse: 1.8,
      smape: 3.9,
    },
    {
      month: 'May',
      model: 'Model C',
      prediction: [80, 85, 83, 89, 88],
      actual: [82, 84, 81, 87, 86],
      rmse: 3.1,
      smape: 4.8,
    },
  ];

  const screenWidth = Dimensions.get('window').width;

  return (
    <LinearGradient
      colors={['#000000', '#800080']}
      style={styles.container}
    >
      <Text style={styles.header}>Prediction History</Text>
      <ScrollView>
        {historyData.map((item, index) => (
          <View key={index} style={styles.historyItem}>
            <BlurView style={styles.absolute} blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white" />
            <Text style={styles.historyText}>{item.month} - {item.model}</Text>
            <Text style={styles.errorMetrics}>RMSE: {item.rmse} | SMAPE: {item.smape}%</Text>

            <LineChart
              data={{
                labels: ['1st', '8th', '15th', '22nd', '29th'],
                datasets: [
                  { data: item.prediction, color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, strokeWidth: 2, label: 'Prediction' },
                  { data: item.actual, color: (opacity = 1) => `rgba(34, 202, 102, ${opacity})`, strokeWidth: 2, label: 'Actual' },
                ],
              }}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              style={styles.chart}
            />
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  decimalPlaces: 2,
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
  historyItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    marginBottom: 30,
    overflow: 'hidden',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 10,
  },
  historyText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
  errorMetrics: {
    fontSize: 16,
    color: '#FFD700', // Gold color for emphasis
    marginBottom: 15,
  },
  chart: {
    borderRadius: 10,
  },
});

export default HistoryScreen;
