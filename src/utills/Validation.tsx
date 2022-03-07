export const isEmptyField = (text: string) => {
  if (text && text.length > 0) {
    return false;
  }
  return true;
};