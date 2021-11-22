const crypto = require('crypto-js')

export const setItem = (name, item) => {
  const encoded = crypto.AES.encrypt(
    JSON.stringify(item),
    process.env.VUE_APP_SALT_KEY
  ).toString()
  localStorage.setItem(name, encoded)
}

export const getItem = (name) => {
  try {
    let res = ''
    const item = localStorage.getItem(name)
    if (item) {
      const decrypted = crypto.AES.decrypt(
        item,
        process.env.VUE_APP_SALT_KEY
      ).toString(crypto.enc.Utf8)
      res = decrypted ? JSON.parse(decrypted) : res
    }
    return res
  } catch {
    return null
  }
}
