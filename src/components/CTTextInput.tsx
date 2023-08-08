import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { TextInputMask } from 'react-native-masked-text';
import { normalizeX, normalizeY } from '../utils/normalize';
import { COLORS } from '../constants';

const CTTextInput = ({
  label,
  masked = false,
  validated = false,
  ...rest
}: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        {masked ? (
          <TextInputMask {...rest} style={styles.textInput} />
        ) : (
          <TextInput {...rest} style={styles.textInput} />
        )}
        {validated ? (
          <View style={styles.validated}>
            <Image
              source={require('../assets/images/check_circle.png')}
              style={{ width: normalizeX(20) }}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default CTTextInput;

const styles = StyleSheet.create({
  container: {},
  label: {
    marginBottom: 2,
    color: COLORS.LABEL_GREY,
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 16.5,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: COLORS.BLACK,
    width: normalizeX(300),
    height: normalizeY(50),
    paddingVertical: normalizeX(5),
    paddingHorizontal: normalizeX(15),
    borderWidth: 1,
    borderColor: COLORS.INPUT_BORDER_GREY,
    borderRadius: normalizeX(6),
  },
  validated: {
    position: 'absolute',
    right: normalizeX(10),
  },
});
