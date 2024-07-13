import CryptoES from "crypto-es";

export const encodeAES = (symmetrickey: string, plainText: string) => {
  try {
    return CryptoES.AES.encrypt(plainText, symmetrickey).toString();
  } catch (error) {
    console.log("1", error);
  }
};

export const decodeAES = (symmetrickey: string, cipherText: string) => {
  return CryptoES.AES.decrypt(cipherText, symmetrickey).toString(
    CryptoES.enc.Utf8
  );
};

export const hashSHA256 = (plainText: string) => {
  try {
    return CryptoES.SHA256(plainText).toString(CryptoES.enc.Hex);
  } catch (error) {
    console.log("1", error);
  }
};
