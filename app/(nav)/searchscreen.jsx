import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function SearchScreen() {
  const [searchTicker, setSearchTicker] = useState('');
  const [searchedStock, setSearchedStock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch data for a specific stock based on ticker
  const fetchSearchedStock = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`http://192.168.125.218:5000/insertintotable/${searchTicker}`);
      
      if (response.data) {
        setSearchedStock(response.data);
      } else {
        setError('No data found for the ticker.');
      }
    } catch (err) {
      console.error('Error fetching stock data:', err);  // Log the error to see more details
      setError('Failed to fetch stock data for the ticker provided.');
      setSearchedStock(null);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Company</Text>

      {/* Search input for a specific company */}
      <TextInput
        style={styles.input}
        placeholder="Enter Stock Ticker (e.g., AAPL)"
        value={searchTicker}
        onChangeText={setSearchTicker}
      />
      <Button title="Search Company" onPress={fetchSearchedStock} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Display searched stock data */}
      {searchedStock && (
        <View style={styles.stockContainer}>
          <Text>Value: {searchedStock.value.toFixed(2)}</Text>
          <Text>Change: {searchedStock.change.toFixed(2)}</Text>
          <Text>% Change: {searchedStock['%change'].toFixed(2)}%</Text>
          <Text>High: {searchedStock.high.toFixed(2)}</Text>
          <Text>Low: {searchedStock.low.toFixed(2)}</Text>
          <Text>Open: {searchedStock.open.toFixed(2)}</Text>
          <Text>Prev Close: {searchedStock.prev_close.toFixed(2)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  stockContainer: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});
