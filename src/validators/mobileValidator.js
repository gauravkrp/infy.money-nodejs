// export default function mobileValidator(number) {
//   const isnum = /^\d+$/.test(number);
//   if (!number) return "Mobile Number can't be empty";
//   if (!isnum) return 'Please enter a valid number.';
//   if (number.length !== 10) return 'Mobile Number should be 10 characters long.';
//   return '';
// }

const isValidMobile = phoneNumber => {
  const isnum = /^\d{10}$/.test(phoneNumber);
  return isnum;
};

module.exports = isValidMobile;
