export default function generateRandomHexString(length) {
  if (length < 1) return;

  const chars = "0123456789abcdef";
  const output = [];

  for (let i = 0; i < length; i++)
    output.push(chars.charAt(Math.floor(Math.random() * chars.length)));

  return output.join("");
}
