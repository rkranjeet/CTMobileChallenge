import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { normalizeX, normalizeY } from '../utils/normalize';
import Pdf from 'react-native-pdf';
import { COLORS, STRINGS } from '../constants';
import OtpInputs from 'react-native-otp-inputs';

const { width } = Dimensions.get('window');

const Otp = () => {
  const source = {
    uri: 'bundle-assets://pdfs/Sample-PDF.pdf',
  };

  const [otp, setOtp] = useState('');
  return (
    <View style={styles.container}>
      <View style={{ marginTop: normalizeX(30) }}>
        <Text style={styles.stepText}>{STRINGS.STEP_2}</Text>
      </View>
      <View style={{ marginTop: normalizeX(15) }}>
        <Text style={styles.detailsText}>{STRINGS.PLS_ENTER_OTP}</Text>
      </View>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        // showsVerticalScrollIndicator
        showsHorizontalScrollIndicator
        style={styles.pdf}
      />
      <View style={styles.otpBottomTray}>
        <View>
          <Text style={styles.enterOtpText}>{STRINGS.ENTER_OTP}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'red',
            marginTop: normalizeX(15),
          }}
        >
          <OtpInputs
            handleChange={code => setOtp(code)}
            numberOfInputs={4}
            autofillFromClipboard={false}
            inputContainerStyles={{
              width: normalizeX(48),
              height: normalizeY(48),
              backgroundColor: COLORS.WHITE,
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: normalizeX(9),
              opacity: 0.5,
              borderRadius: normalizeX(4),
            }}
            style={{
              flexDirection: 'row',
              //marginTop: normalizeY(15),
            }}
            inputStyles={{
              fontWeight: '700',
              fontSize: 20,
              lineHeight: 24,
              color: COLORS.BLACK,
            }}
          />
          <View
            style={{
              width: 48,
              height: 48,
              backgroundColor: 'black',
              alignSelf: 'center',
            }}
          ></View>
        </View>
      </View>
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: normalizeX(30),
  },
  pdf: {
    marginTop: normalizeX(10),
    width: normalizeX(300),
    height: normalizeY(350),
  },
  stepText: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
    color: COLORS.BLACK,
  },
  detailsText: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.BLACK,
  },
  otpBottomTray: {
    marginTop: 20,
    flexGrow: 1,
    left: normalizeX(-30),
    width: width,
    height: normalizeY(193),
    backgroundColor: COLORS.BLUE,
    paddingHorizontal: normalizeX(20),
    paddingVertical: normalizeY(30),
  },
  enterOtpText: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
    color: COLORS.WHITE,
  },
});
