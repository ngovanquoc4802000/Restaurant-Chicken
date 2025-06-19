import crypto from 'crypto';

const generateStrongSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

console.log('Generated JWT_SECRET:', generateStrongSecret());
console.log('Generated JWT_REFRESH:', generateStrongSecret());