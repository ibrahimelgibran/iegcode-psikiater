import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'

const algorithm = 'aes-256-cbc'

// Generate key and IV (for example purposes only)
const key = randomBytes(32) // Replace with securely managed key
const iv = randomBytes(16) // Replace with securely managed IV

const encryptPassword = (password: string): string => {
  const cipher = createCipheriv(algorithm, key, iv)
  let encrypted = cipher.update(password, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

const decryptPassword = (encryptedPassword: string): string => {
  const decipher = createDecipheriv(algorithm, key, iv)
  let decrypted = decipher.update(encryptedPassword, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

export { encryptPassword, decryptPassword }
