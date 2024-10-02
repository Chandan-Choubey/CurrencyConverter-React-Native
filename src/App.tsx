import React, {useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CurrencyButton from './components/CurrencyButton';
import Snackbar from 'react-native-snackbar';
import {currencyByRupee} from './constant';

function App(): React.JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  const buttonPressed = (targetValue: Currency) => {
    if (!inputValue) {
      return Snackbar.show({
        text: 'Please enter a value to convert',
        backgroundColor: '#EA7773',
        textColor: '#000000',
      });
    }
    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetValue.value;
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`;
      setResultValue(result);
      setTargetCurrency(targetValue.name);
    } else {
      return Snackbar.show({
        text: 'Invalid input. Please enter a number',
        backgroundColor: '#F4BE2C',
        textColor: '#000000',
      });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>Currency Converter</Text>
          <View style={styles.rupeesContainer}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput
              maxLength={14}
              value={inputValue}
              style={styles.inputAmountField}
              clearButtonMode="always"
              onChangeText={setInputValue}
              keyboardType="number-pad"
              placeholder="Enter amount in rupees"
              placeholderTextColor="#888"
            />
          </View>
          {resultValue && <Text style={styles.resultTxt}>{resultValue}</Text>}
        </View>

        <View style={styles.bottomContainer}>
          <FlatList
            numColumns={2}
            data={currencyByRupee}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <Pressable
                style={[
                  styles.button,
                  targetCurrency === item.name && styles.selected,
                ]}
                onPress={() => buttonPressed(item)}>
                <CurrencyButton {...item} />
              </Pressable>
            )}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  resultTxt: {
    fontSize: 32,
    color: '#2d3436',
    fontWeight: '800',
    marginTop: 20,
  },
  rupee: {
    marginRight: 8,
    fontSize: 22,
    color: '#2d3436',
    fontWeight: '800',
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputAmountField: {
    height: 40,
    width: 200,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderColor: '#ddd',
    color: '#333',
    fontSize: 18,
  },
  bottomContainer: {
    flex: 2,
    marginTop: 20,
  },
  button: {
    flex: 1,
    margin: 12,
    padding: 10,
    height: 90,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  selected: {
    backgroundColor: '#81ecec',
  },
});

export default App;
