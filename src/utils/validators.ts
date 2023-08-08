import moment from 'moment';
export const aadharValidator = (aadhar: string) =>
  /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/.test(aadhar);

export const panValidator = (pan: string) =>
  /[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(pan);

export const dateValidator = (dateString: string) =>
  moment(dateString, 'DD/MM/YYYY').isValid();
