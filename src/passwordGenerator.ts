export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSpecialChars: boolean;
}

export const DEFAULT_PASSWORD_OPTIONS: PasswordOptions = {
  length: 12,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSpecialChars: true,
};

export const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  specialChars: '!@#$%^&*()_+~`|}{[]\\:;?><,./-=',
};

export function generatePassword(
  options: Partial<PasswordOptions> = {}
): string {
  const mergedOptions: PasswordOptions = {
    ...DEFAULT_PASSWORD_OPTIONS,
    ...options,
  };

  const {
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSpecialChars,
  } = mergedOptions;

  if (length <= 0) {
    throw new Error('Password length must be greater than 0');
  }

  if (
    !includeUppercase &&
    !includeLowercase &&
    !includeNumbers &&
    !includeSpecialChars
  ) {
    throw new Error('At least one character type must be selected');
  }

  let charPool = '';
  if (includeUppercase) charPool += CHAR_SETS.uppercase;
  if (includeLowercase) charPool += CHAR_SETS.lowercase;
  if (includeNumbers) charPool += CHAR_SETS.numbers;
  if (includeSpecialChars) charPool += CHAR_SETS.specialChars;

  let password = '';
  let hasRequiredChars = false;

  while (!hasRequiredChars) {
    password = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      password += charPool.charAt(randomIndex);
    }

    hasRequiredChars = true;

    if (includeUppercase && !containsCharFrom(password, CHAR_SETS.uppercase)) {
      hasRequiredChars = false;
    }

    if (includeLowercase && !containsCharFrom(password, CHAR_SETS.lowercase)) {
      hasRequiredChars = false;
    }

    if (includeNumbers && !containsCharFrom(password, CHAR_SETS.numbers)) {
      hasRequiredChars = false;
    }

    if (
      includeSpecialChars &&
      !containsCharFrom(password, CHAR_SETS.specialChars)
    ) {
      hasRequiredChars = false;
    }
  }

  return password;
}

export function containsCharFrom(str: string, charSet: string): boolean {
  for (let i = 0; i < str.length; i++) {
    if (charSet.includes(str.charAt(i))) {
      return true;
    }
  }
  return false;
}

export function calculatePasswordStrength(password: string): number {
  if (!password) return 0;

  let score = 0;

  score += Math.min(password.length * 4, 40);

  if (containsCharFrom(password, CHAR_SETS.lowercase)) score += 10;
  if (containsCharFrom(password, CHAR_SETS.uppercase)) score += 15;
  if (containsCharFrom(password, CHAR_SETS.numbers)) score += 15;
  if (containsCharFrom(password, CHAR_SETS.specialChars)) score += 20;

  return Math.min(score, 100);
}
