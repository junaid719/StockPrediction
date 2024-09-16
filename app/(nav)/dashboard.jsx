// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Button } from 'react-native';
// import axios from 'axios';
// import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';

// export default function MainScreen({ navigation }) {
//   const [stockData, setStockData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Fetch stock data for all companies
//   const fetchStockData = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       const response = await axios.post('http://192.168.125.218:5000/insertintotable');
//       setStockData(response.data);
//     } catch (err) {
//       setError('Failed to fetch stock data. Make sure the backend is running.');
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchStockData();
//   }, []);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Stock Market Data</Text>

//       {/* Button to navigate to the Search Screen */}
//       <Button title="Search Company" onPress={() => navigation.navigate('SearchScreen')} />

//       {loading && <ActivityIndicator size="large" color="#0000ff" />}

//       {error ? <Text style={styles.error}>{error}</Text> : null}

//       {/* Table View for All Companies */}
//       <View style={styles.table}>
//         <View style={styles.tableHeader}>
//           <Text style={styles.tableHeaderCell}>Ticker</Text>
//           <Text style={styles.tableHeaderCell}>Value</Text>
//           <Text style={styles.tableHeaderCell}>Change</Text>
//           <Text style={styles.tableHeaderCell}>% Change</Text>
//           <Text style={styles.tableHeaderCell}>High</Text>
//           <Text style={styles.tableHeaderCell}>Low</Text>
//           <Text style={styles.tableHeaderCell}>Open</Text>
//           <Text style={styles.tableHeaderCell}>Prev Close</Text>
//         </View>
//         {stockData.map((stock, index) => (
//           <View key={index} style={styles.tableRow}>
//             <Text style={styles.tableCell}>{stock.ticker}</Text>
//             <Text style={styles.tableCell}>{stock.value.toFixed(2)}</Text>
//             <Text style={[styles.tableCell, { color: stock.change > 0 ? 'green' : 'red' }]}>
//               {stock.change.toFixed(2)}
//             </Text>
//             <Text style={[styles.tableCell, { color: stock['%change'] > 0 ? 'green' : 'red' }]}>
//               {stock['%change'].toFixed(2)}%
//             </Text>
//             <Text style={styles.tableCell}>{stock.high.toFixed(2)}</Text>
//             <Text style={styles.tableCell}>{stock.low.toFixed(2)}</Text>
//             <Text style={styles.tableCell}>{stock.open.toFixed(2)}</Text>
//             <Text style={styles.tableCell}>{stock.prev_close.toFixed(2)}</Text>
//           </View>
//         ))}
//       </View>

//       {/* Unified Graph for All Companies */}
//       <VictoryChart theme={VictoryTheme.material}>
//         {stockData.map((stock, index) => (
//           <VictoryLine
//             key={index}
//             data={[
//               { x: 'Open', y: stock.open },
//               { x: 'Close', y: stock.value },
//               { x: 'High', y: stock.high },
//               { x: 'Low', y: stock.low },
//             ]}
//             style={{
//               data: { stroke: index % 2 === 0 ? 'blue' : 'orange' },
//             }}
//           />
//         ))}
//       </VictoryChart>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   table: {
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   tableHeader: {
//     flexDirection: 'row',
//     backgroundColor: '#f0f0f0',
//     padding: 10,
//   },
//   tableHeaderCell: {
//     flex: 1,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   tableRow: {
//     flexDirection: 'row',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//   },
//   tableCell: {
//     flex: 1,
//     textAlign: 'center',
//   },
//   error: {
//     color: 'red',
//     marginTop: 10,
//   },
// });

// Old Code Is here 


// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList } from 'react-native';
// import axios from 'axios';
// import { VictoryChart, VictoryLine } from 'victory-native';

// export default function App() {
//   const [stockData, setStockData] = useState([]);
//   const [predictions, setPredictions] = useState([]);

//   useEffect(() => {
//     // Fetch stock data from the Flask backend
//     const fetchStockData = async () => {
//       try {
//         const response = await axios.get('http://10.0.2.2:5000/api/stock-data'); // For Android Emulator
//         setStockData(response.data.stocks);
//         setPredictions(response.data.predictions);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchStockData();
//   }, []);

//   const renderItem = ({ item }) => (
//     <View style={styles.row}>
//       <Text style={styles.cell}>{item.company}</Text>
//       <Text style={styles.cell}>{item.value.toFixed(2)}</Text>
//       <Text style={[styles.cell, { color: item.change >= 0 ? 'green' : 'red' }]}>
//         {item.change.toFixed(2)} ({item.percentChange.toFixed(2)}%)
//       </Text>
//       <Text style={styles.cell}>{item.high.toFixed(2)}</Text>
//       <Text style={styles.cell}>{item.low.toFixed(2)}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Stock Dashboard</Text>

//       {/* Stock Data Table */}
//       <View style={styles.table}>
//         <View style={styles.row}>
//           <Text style={styles.header}>Company</Text>
//           <Text style={styles.header}>Value</Text>
//           <Text style={styles.header}>Change</Text>
//           <Text style={styles.header}>High</Text>
//           <Text style={styles.header}>Low</Text>
//         </View>
//         <FlatList
//           data={stockData}
//           renderItem={renderItem}
//           keyExtractor={item => item.company}
//         />
//       </View>

//       {/* ARIMA Predictions Graph */}
//       <VictoryChart>
//         {predictions.map((prediction, index) => (
//           <VictoryLine
//             key={index}
//             data={[{ x: 'Next Day', y: prediction.nextDayPrediction }]}
//             style={{
//               data: { stroke: 'blue' },
//             }}
//           />
//         ))}
//       </VictoryChart>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   table: {
//     marginBottom: 20,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 10,
//   },
//   cell: {
//     fontSize: 16,
//     width: '20%',
//     textAlign: 'center',
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     width: '20%',
//     textAlign: 'center',
//   },
// });




// New code is here 




// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, Alert, ActivityIndicator, ScrollView } from 'react-native';
// import axios from 'axios';

// const StockPredictionApp = () => {
//   const [company, setCompany] = useState('');
//   const [predictions, setPredictions] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchPredictions = () => {
//     if (company === '') {
//       Alert.alert('Error', 'Please enter a company name');
//       return;
//     }

//     setIsLoading(true);

//     // Make POST request to Flask backend
//     axios.post('http://192.168.182.218:5000/insertintotable', { nm: company })
//       .then(response => {
//         setPredictions(response.data);  // Set the fetched predictions
//         setIsLoading(false);
//       })
//       .catch(error => {
//         console.error(error);
//         Alert.alert('Error', 'Failed to fetch predictions. Please try again.');
//         setIsLoading(false);
//       });
//   };

//   return (
//     <ScrollView contentContainerStyle={{ padding: 20 }}>
//       <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Stock Price Predictor</Text>

//       <TextInput
//         placeholder="Enter Company Name (Ticker Symbol)"
//         value={company}
//         onChangeText={text => setCompany(text)}
//         style={{
//           height: 50,
//           borderColor: 'gray',
//           borderWidth: 1,
//           paddingHorizontal: 10,
//           marginVertical: 10,
//           borderRadius: 5,
//         }}
//       />

//       <Button title="Get Predictions" onPress={fetchPredictions} />

//       {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

//       {predictions && (
//         <View style={{ marginTop: 20 }}>
//           <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Predicted Prices (Next 7 Days):</Text>
//           {predictions.map((price, index) => (
//             <Text key={index} style={{ fontSize: 16 }}>
//               Day {index + 1}: ${price.toFixed(2)}
//             </Text>
//           ))}

//           <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Buy/Sell Recommendation:</Text>
//           <Text style={{ fontSize: 16 }}>{predictions.recommendation}</Text>

//           <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Model Errors (RMSE):</Text>
//           <Text style={{ fontSize: 16 }}>ARIMA Error: {predictions.error_arima}</Text>
//           <Text style={{ fontSize: 16 }}>LSTM Error: {predictions.error_lstm}</Text>
//           <Text style={{ fontSize: 16 }}>Linear Regression Error: {predictions.error_lr}</Text>
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// export default StockPredictionApp;
























import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';

const StockPredictionApp = () => {
  const [company, setCompany] = useState('');
  const [predictions, setPredictions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPredictions = () => {
    if (company === '') {
      Alert.alert('Error', 'Please enter a company name');
      return;
    }

    setIsLoading(true);

    // Create form data
    const formData = new FormData();
    formData.append('nm', company);

    // Make POST request to Flask backend
    axios.post('http://192.168.182.218:5000/insertintotable', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      console.log('Response Data:', response.data);  // Debugging: log the entire response data
      setPredictions(response.data);  // Set the fetched predictions
      setIsLoading(false);
    })
    .catch(error => {
      console.error('Error fetching predictions:', error);
      Alert.alert('Error', 'Failed to fetch predictions. Please try again.');
      setIsLoading(false);
    });
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Stock Price Predictor</Text>

      <TextInput
        placeholder="Enter Company Name (Ticker Symbol)"
        value={company}
        onChangeText={text => setCompany(text)}
        style={{
          height: 50,
          borderColor: 'gray',
          borderWidth: 1,
          paddingHorizontal: 10,
          marginVertical: 10,
          borderRadius: 5,
        }}
      />

      <Button title="Get Predictions" onPress={fetchPredictions} />

      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

      {predictions && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Predicted Prices (Next 7 Days):</Text>
          {predictions.prices && predictions.prices.length > 0 ? (
            predictions.prices.map((price, index) => (
              <Text key={index} style={{ fontSize: 16 }}>
                Day {index + 1}: ${price.toFixed(2)}
              </Text>
            ))
          ) : (
            <Text style={{ fontSize: 16 }}>No price predictions available.</Text>
          )}

          {predictions.error_arima && (
            <Text style={{ fontSize: 16, color: 'red' }}>{predictions.error_arima}</Text>
          )}

          <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Buy/Sell Recommendation:</Text>
          <Text style={{ fontSize: 16 }}>{predictions.recommendation || 'No recommendation available.'}</Text>

          <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Model Errors (RMSE):</Text>
          <Text style={{ fontSize: 16 }}>ARIMA Error: {predictions.error_arima || 'No error data available.'}</Text>
          <Text style={{ fontSize: 16 }}>LSTM Error: {predictions.error_lstm || 'No error data available.'}</Text>
          <Text style={{ fontSize: 16 }}>Linear Regression Error: {predictions.error_lr || 'No error data available.'}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default StockPredictionApp;
