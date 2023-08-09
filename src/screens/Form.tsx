import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { emailValidator, normalizeX, normalizeY } from '../utils/normalize';
import CTTextInput from '../components/CTTextInput';
import { COLORS, DELAYS, SCREEN, STRINGS } from '../constants';
import {
  aadharValidator,
  dateValidator,
  panValidator,
} from '../utils/validators';

const Form = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [aadhar, setAdhar] = useState('');
  const [pan, setPan] = useState('');
  const [dob, setDob] = useState('');
  const [aadharValidated, setAadharValidated] = useState(false);
  const [panValidated, setPanvalidated] = useState(false);
  const [dobEnabled, setDobEnabled] = useState(false);
  const [continueDisabled, setContinueDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  //aadhar validation
  useEffect(() => {
    if (aadharValidator(aadhar) !== aadharValidated) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setAadharValidated(aadharValidator(aadhar));
      }, DELAYS.VALIDATION);
    }
  }, [aadhar, aadharValidated]);

  //pan validation
  useEffect(() => {
    if (panValidator(pan) !== panValidated) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setPanvalidated(panValidator(pan));
        setDobEnabled(true);
      }, DELAYS.VALIDATION);
    }
  }, [pan, panValidated]);

  //continue button validation
  useEffect(() => {
    if (
      name != '' &&
      emailValidator(email) &&
      aadharValidated &&
      panValidated &&
      dateValidator(dob)
    )
      setContinueDisabled(false);
    else if (continueDisabled == false) {
      setContinueDisabled(true);
    }
  }, [name, email, aadharValidated, panValidated, dob, continueDisabled]);

  const renderName = useCallback(() => {
    return (
      <View style={{ marginTop: normalizeY(15) }}>
        <CTTextInput
          label={STRINGS.SHOP_OWNER_NAME}
          placeholder={STRINGS.OWNER_NAME_PLACEHOLDER}
          placeholderTextColor={COLORS.PLACEHOLDER_GREY}
          value={name}
          onChangeText={(text: string) => setName(text)}
        />
      </View>
    );
  }, [name]);

  const renderEmail = useCallback(() => {
    return (
      <View style={{ marginTop: normalizeY(15) }}>
        <CTTextInput
          label={STRINGS.EMAIL}
          placeholder={STRINGS.EMAIL_PLACEHOLDER}
          placeholderTextColor={COLORS.PLACEHOLDER_GREY}
          value={email}
          onChangeText={(text: string) => setEmail(text)}
        />
      </View>
    );
  }, [email]);

  const renderAadhar = useCallback(() => {
    return (
      <View style={{ marginTop: normalizeY(15) }}>
        <CTTextInput
          label={STRINGS.AADHAR}
          placeholder={STRINGS.AADHAR_PLACEHOLDER}
          placeholderTextColor={COLORS.PLACEHOLDER_GREY}
          value={aadhar}
          onChangeText={(text: string) => setAdhar(text)}
          masked
          keyboardType={'numeric'}
          type={'custom'}
          options={{
            // the options for your mask if needed
            mask: '9999 9999 9999',
          }}
          validated={aadharValidated}
        />
      </View>
    );
  }, [aadhar, aadharValidated]);

  const renderPan = useCallback(() => {
    return (
      <View style={{ marginTop: normalizeY(15) }}>
        <CTTextInput
          label={STRINGS.PAN}
          placeholder={STRINGS.PAN_PLACEHOLDER}
          placeholderTextColor={COLORS.PLACEHOLDER_GREY}
          autoCapitalize={'characters'}
          value={pan}
          onChangeText={(text: string) => setPan(text)}
          masked
          type={'custom'}
          options={{
            // the options for your mask if needed
            mask: 'AAAAA9999A',
          }}
          validated={panValidated}
        />
      </View>
    );
  }, [pan, panValidated]);

  const renderDob = useCallback(() => {
    return dobEnabled ? (
      <View style={{ marginTop: normalizeY(15) }}>
        <CTTextInput
          label={STRINGS.DOB}
          placeholder={STRINGS.DOB_PLACEHOLDER}
          placeholderTextColor={COLORS.PLACEHOLDER_GREY}
          value={dob}
          onChangeText={(text: string) => setDob(text)}
          masked
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY',
          }}
        />
      </View>
    ) : null;
  }, [dob, dobEnabled]);

  const renderLoading = useCallback(() => {
    return loading ? (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLORS.BLUE} />
      </View>
    ) : null;
  }, [loading]);

  const renderContinueButton = useCallback(() => {
    return (
      <View style={{ position: 'absolute', bottom: normalizeY(10) }}>
        <TouchableOpacity
          disabled={continueDisabled}
          onPress={() => {
            navigation.navigate(SCREEN.OTP);
          }}
        >
          <View
            style={[
              styles.continue,
              continueDisabled
                ? styles.continueDisabled
                : styles.continueEnabled,
            ]}
          >
            <Text
              style={[
                styles.continueText,
                continueDisabled
                  ? styles.continueDisabledText
                  : styles.continueEnabledText,
              ]}
            >
              {'CONTINUE'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }, [continueDisabled, navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/ct_logo.jpeg')}
        style={styles.logo}
      />
      <View style={{ marginTop: normalizeY(15) }}>
        <Text style={styles.stepText}>{STRINGS.STEP_1}</Text>
      </View>
      <View style={{ marginTop: normalizeY(10) }}>
        <Text style={styles.detailsText}>{STRINGS.ENTER_DETAILS}</Text>
      </View>
      {renderName()}
      {renderEmail()}
      {renderAadhar()}
      {renderPan()}
      {renderDob()}
      {renderLoading()}
      {renderContinueButton()}
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: normalizeX(30),
  },
  logo: {
    marginTop: normalizeY(60),
    width: normalizeX(90),
    height: normalizeY(90),
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
  loading: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continue: {
    width: normalizeX(300),
    height: normalizeY(53),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalizeX(6),
  },
  continueText: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 21,
  },
  continueDisabledText: {
    color: COLORS.CONTINUE_GREY,
  },
  continueEnabledText: {
    color: COLORS.WHITE,
  },
  continueDisabled: {
    backgroundColor: COLORS.DISABLED_BUTTON,
  },
  continueEnabled: {
    backgroundColor: COLORS.BLUE,
  },
});
