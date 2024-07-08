import CryptoES from "crypto-es";

export const encodeSek = (sek: string, passPhrase: string, salt: string) => {
  try {
    return CryptoES.AES.encrypt(sek, passPhrase + salt).toString();
  } catch (error) {
    console.log("1", error);
  }
};

export const decodeSek = (
  encryptedSek: string,
  passPhrase: string,
  salt: string
) => {
  return CryptoES.AES.decrypt(encryptedSek, passPhrase + salt).toString(
    CryptoES.enc.Utf8
  );
};
