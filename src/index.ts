export * from './passwordGenerator';

if (require.main === module) {
  const {
    generatePassword,
    calculatePasswordStrength,
  } = require('./passwordGenerator');

  const password = generatePassword();
  const strength = calculatePasswordStrength(password);

  console.log('Generated Password:', password);
  console.log('Password Strength:', strength);

  const customPassword = generatePassword({
    length: 16,
    includeSpecialChars: true,
    includeNumbers: true,
    includeUppercase: true,
    includeLowercase: true,
  });

  const customStrength = calculatePasswordStrength(customPassword);

  console.log('\nCustom Password:', customPassword);
  console.log('Custom Password Strength:', customStrength);
}
