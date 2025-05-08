import {
  generatePassword,
  calculatePasswordStrength,
  containsCharFrom,
  CHAR_SETS,
  PasswordOptions,
} from './src/passwordGenerator';

describe('Password Generator', () => {
  test('generates password with default options', () => {
    const password = generatePassword();

    expect(password.length).toBe(12);

    expect(containsCharFrom(password, CHAR_SETS.uppercase)).toBe(true);
    expect(containsCharFrom(password, CHAR_SETS.lowercase)).toBe(true);
    expect(containsCharFrom(password, CHAR_SETS.numbers)).toBe(true);
    expect(containsCharFrom(password, CHAR_SETS.specialChars)).toBe(true);
  });

  test('generates password with custom length', () => {
    const customLength = 20;
    const password = generatePassword({ length: customLength });

    expect(password.length).toBe(customLength);
  });

  test('respects character set inclusion flags', () => {
    const options: PasswordOptions = {
      length: 15,
      includeUppercase: true,
      includeLowercase: false,
      includeNumbers: true,
      includeSpecialChars: false,
    };

    const password = generatePassword(options);

    expect(password.length).toBe(15);
    expect(containsCharFrom(password, CHAR_SETS.uppercase)).toBe(true);
    expect(containsCharFrom(password, CHAR_SETS.lowercase)).toBe(false);
    expect(containsCharFrom(password, CHAR_SETS.numbers)).toBe(true);
    expect(containsCharFrom(password, CHAR_SETS.specialChars)).toBe(false);
  });

  test('throws error for invalid length', () => {
    expect(() => {
      generatePassword({ length: 0 });
    }).toThrow('Password length must be greater than 0');

    expect(() => {
      generatePassword({ length: -5 });
    }).toThrow('Password length must be greater than 0');
  });

  test('throws error when no character sets are selected', () => {
    expect(() => {
      generatePassword({
        includeUppercase: false,
        includeLowercase: false,
        includeNumbers: false,
        includeSpecialChars: false,
      });
    }).toThrow('At least one character type must be selected');
  });

  test('calculates password strength correctly', () => {
    expect(calculatePasswordStrength('')).toBe(0);

    expect(calculatePasswordStrength('abc')).toBe(22);

    expect(calculatePasswordStrength('Abcdef')).toBe(39);

    expect(calculatePasswordStrength('Abcdef123')).toBe(54);

    expect(calculatePasswordStrength('Abc123!@#')).toBe(74);

    expect(
      calculatePasswordStrength(
        'Abcdef123!@#$%^&*()GHIJKLMNOP987654321abcdefghijklmnop'
      )
    ).toBe(100);
  });

  test('generates unique passwords across multiple calls', () => {
    const passwords = new Set<string>();
    const numPasswords = 100;

    for (let i = 0; i < numPasswords; i++) {
      passwords.add(generatePassword());
    }

    expect(passwords.size).toBeGreaterThanOrEqual(numPasswords * 0.98);
  });
  test('containsCharFrom correctly identifies character presence', () => {
    expect(containsCharFrom('hello', 'abcdefg')).toBe(true);
    expect(containsCharFrom('hello', 'xyz')).toBe(false);
    expect(containsCharFrom('Hello', 'ABCDEFG')).toBe(true);
    expect(containsCharFrom('123', '0123456789')).toBe(true);
    expect(containsCharFrom('abc', '0123456789')).toBe(false);
  });
});
