/**
 * Masks sensitive identification numbers like Aadhaar.
 * Example: 1234 5678 9012 -> XXXX XXXX 9012
 */
export const maskIdNumber = (idNumber: string, idType: string): string => {
  if (!idNumber) return '';
  
  if (idType === 'Aadhaar') {
    // Aadhaar is 12 digits, often formatted with spaces
    const clean = idNumber.replace(/\s/g, '');
    if (clean.length === 12) {
      return `XXXX XXXX ${clean.slice(-4)}`;
    }
  }
  
  // Default masking for other types: show only last 4
  if (idNumber.length > 4) {
    return `${'X'.repeat(idNumber.length - 4)}${idNumber.slice(-4)}`;
  }
  
  return idNumber;
};

/**
 * Validates if a string is a valid Aadhaar number (12 digits).
 */
export const isValidAadhaar = (aadhaar: string): boolean => {
  const clean = aadhaar.replace(/\s/g, '');
  return /^\d{12}$/.test(clean);
};
