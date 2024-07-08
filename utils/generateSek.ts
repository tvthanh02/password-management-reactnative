import { getRandomBytesAsync } from "expo-random"; // Import hàm lấy random bytes từ expo-random

const getRandomBytes = async (length: number): Promise<Uint8Array> => {
  const randomBytes = await getRandomBytesAsync(length);
  return randomBytes;
};

const generateSek = async (length: number): Promise<string> => {
  try {
    const randomBytes = await getRandomBytes(length); // Lấy random bytes
    const hexString = Array.from(randomBytes) // Chuyển Uint8Array thành mảng số nguyên
      .map((byte) => byte.toString(16).padStart(2, "0")) // Chuyển từng byte thành chuỗi hex và đảm bảo có đủ 2 ký tự
      .join(""); // Nối các chuỗi hex lại thành một chuỗi duy nhất
    const sek = hexString.slice(0, length); // Cắt chuỗi theo độ dài mong muốn
    return sek;
  } catch (error) {
    console.error("Error generating unique ID:", error);
    throw error;
  }
};

export default generateSek;
