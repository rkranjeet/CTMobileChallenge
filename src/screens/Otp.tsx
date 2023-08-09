import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { normalizeX, normalizeY } from '../utils/normalize';
import Pdf from 'react-native-pdf';
import { COLORS, SCREEN, STRINGS } from '../constants';
import OtpInputs from 'react-native-otp-inputs';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const { width } = Dimensions.get('window');
const source = {
  uri: 'bundle-assets://pdfs/Sample-PDF.pdf',
};

const Otp = ({ navigation }: any) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const onSendPress = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log(otp);
      navigation.navigate(SCREEN.SUCCESS);
    }, 1000);
  }, [navigation, otp]);

  const renderPdf = useCallback(() => {
    return (
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
    );
  }, []);

  const renderOtpBottomTray = useCallback(() => {
    return (
      <View style={styles.otpBottomTray}>
        <View>
          <Text style={styles.enterOtpText}>{STRINGS.ENTER_OTP}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: normalizeX(20),
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
              marginRight: normalizeX(10),
            }}
            style={{
              flexDirection: 'row',
            }}
            inputStyles={{
              fontWeight: '700',
              fontSize: 20,
              lineHeight: 24,
              color: COLORS.BLACK,
            }}
          />
          <TouchableOpacity
            onPress={onSendPress}
            disabled={loading}
            style={{
              width: normalizeY(48),
              height: normalizeY(48),
              borderRadius: normalizeY(24),
              backgroundColor: COLORS.WHITE,
              opacity: 0.9,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {!loading ? (
              <Image
                source={require('../assets/images/send_icon.png')}
                style={{ height: normalizeY(24), width: normalizeY(24) }}
              ></Image>
            ) : (
              <ActivityIndicator size="small" color={COLORS.BLUE} />
            )}
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: normalizeX(20) }}>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 12,
              lineHeight: 14,
              color: COLORS.SECONDARY_GREY,
            }}
          >
            {STRINGS.DIDNT_GET_CODE}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {}}
          style={{ marginTop: normalizeX(15) }}
        >
          <Text
            style={{
              fontWeight: '700',
              fontSize: 14,
              lineHeight: 16,
              color: COLORS.SECONDARY_GREY,
            }}
          >
            {STRINGS.RESEND}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }, [loading, onSendPress]);

  return (
    <View style={styles.container}>
      <View style={{ marginTop: normalizeX(30) }}>
        <Text style={styles.stepText}>{STRINGS.STEP_2}</Text>
      </View>
      <View style={{ marginTop: normalizeX(15) }}>
        <Text style={styles.detailsText}>{STRINGS.PLS_ENTER_OTP}</Text>
      </View>
      {renderPdf()}
      {renderOtpBottomTray()}
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
    height: normalizeY(400),
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
