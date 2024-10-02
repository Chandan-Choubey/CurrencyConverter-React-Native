/* eslint-disable prettier/prettier */
import React from 'react';
import type {PropsWithChildren} from 'react';

import {StyleSheet, Text, View} from 'react-native';

type CurrencyButtonProps = PropsWithChildren<{
  name: string;
  value: number;
  flag: string;
  symbol: string;
}>;

const CurrencyButton = (props: CurrencyButtonProps): JSX.Element => {
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.flag}>{props.flag}</Text>
      <Text style={styles.country}>{props.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flag: {
    fontSize: 28,
    color: '#ffffff',
    marginBottom: 4,
  },
  country: {
    fontSize: 14,
    color: '#2d3436',
  },
});
export default CurrencyButton;
