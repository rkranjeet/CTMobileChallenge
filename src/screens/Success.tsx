import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../constants';
import { normalizeX, normalizeY } from '../utils/normalize';

const Success = () => {
  return (
    <View style={styles.container}>
      <View style={styles.fullScreen}>
        <View style={styles.outerRing}>
          <View style={styles.innerRing}>
            <Image
              source={require('../assets/images/success_tick.png')}
              style={{ width: normalizeX(46) }}
            ></Image>
          </View>
        </View>
        <View style={{ marginTop: normalizeY(20) }}>
          <Text style={{ fontWeight: '400', fontSize: 20, lineHeight: 24 }}>
            Onboarding Successfull
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreen: {
    flexGrow: 1,
    backgroundColor: COLORS.SUCCESS_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
  },
  outerRing: {
    width: normalizeY(114),
    height: normalizeY(114),
    borderRadius: normalizeY(57),
    backgroundColor: COLORS.SUCCESS_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerRing: {
    width: normalizeY(86),
    height: normalizeY(86),
    borderRadius: normalizeY(43),
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
