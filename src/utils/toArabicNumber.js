export const EN_TO_AR_NUMBERS = {
  0: '٠',
  1: '١',
  2: '٢',
  3: '٣',
  4: '٤',
  5: '٥',
  6: '٦',
  7: '٧',
  8: '٨',
  9: '٩',
}

export const toArabicNumber = (number) => {
  return ('' + number).replace(/[0-9]/g, (match) => {
    return EN_TO_AR_NUMBERS[match]
  })
}
