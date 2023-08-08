import { Dimensions } from 'react-native';
import { WINDOW } from '../constants';

const { width, height } = Dimensions.get('window');
const ratioX = width / WINDOW.WIDTH;
const rationY = height / WINDOW.HEIGHT;

export const normalizeX = (value: number) => value * ratioX;

export const normalizeY = (value: number) => value * rationY;

export const emailValidator = (email: string) =>
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(
    email
  );
