# Random Password Generator

A TypeScript implementation of a secure random password generator with configurable length and character sets.

## Features

- Generate passwords with customizable length
- Include/exclude uppercase letters, lowercase letters, numbers, and special characters
- Password strength calculation
- Comprehensive test suite
- TypeScript for improved code quality and developer experience

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/random-password-generator.git
cd random-password-generator
```

Install dependencies:

```bash
npm install
```

## Usage

### Basic Usage

```typescript
import { generatePassword } from 'random-password-generator';

// Generate password with default options (12 chars, all character types)
const password = generatePassword();
console.log(password); // e.g., "aB3$kL9!xY2@"
```

### Custom Options

```typescript
import {
  generatePassword,
  calculatePasswordStrength,
} from 'random-password-generator';

// Generate password with custom options
const password = generatePassword({
  length: 16,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSpecialChars: false, // No special characters
});

console.log(password); // e.g., "aB3kL9xY2dEfG7h"

// Calculate password strength (0-100)
const strength = calculatePasswordStrength(password);
console.log(`Password strength: ${strength}/100`);
```

## API Reference

### `generatePassword(options?: Partial<PasswordOptions>): string`

Generates a random password based on the provided options.

#### Parameters

- `options` (optional): An object containing the following properties:
  - `length` (number): Password length (default: 12)
  - `includeUppercase` (boolean): Include uppercase letters (default: true)
  - `includeLowercase` (boolean): Include lowercase letters (default: true)
  - `includeNumbers` (boolean): Include numbers (default: true)
  - `includeSpecialChars` (boolean): Include special characters (default: true)

#### Returns

- A randomly generated password string

#### Throws

- Error if the length is less than or equal to 0
- Error if no character sets are selected

### `calculatePasswordStrength(password: string): number`

Calculates the estimated strength of a password on a scale from 0 to 100.

#### Parameters

- `password` (string): The password to evaluate

#### Returns

- A number between 0 and 100 representing the password strength

## Running Tests

Run the test suite:

```bash
npm test
```

Run tests in watch mode during development:

```bash
npm run test:watch
```

## Build

Compile TypeScript to JavaScript:

```bash
npm run build
```

The compiled code will be in the `dist` directory.

## License

MIT

## Author

Stanzealot
