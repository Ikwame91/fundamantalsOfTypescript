
const ENCRYPTION_PREFIX = "encrypted_";

export function encryptPin(pin: string): string {
  if (pin.length !== 4 || !/^\d+$/.test(pin)) {
    throw new Error("PIN must be a 4-digit numeric string");
  }
  const reversedPin = pin.split("").reverse().join("");
  return `${ENCRYPTION_PREFIX}${reversedPin}`;
}


export function decryptPin(encryptedPin: string): string{
    if(!encryptedPin.startsWith(ENCRYPTION_PREFIX)){
        throw new Error("Invalid encrypted PIN format");
    }
    const reversedPin = encryptedPin.substring(ENCRYPTION_PREFIX.length);
    return reversedPin.split("").reverse().join("");
}