/**
 * -------------------
 * Constants
 * -------------------
 */

export const NUMBER_TO_ARABIC_NUMBER = {
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

export const NUMBER_TO_SECTION_NAME = {
  1: 'الأَوَّلُ',
  2: 'الثَّانِي',
  3: 'الثَّالِثُ',
  4: 'الرَّابِعُ',
  5: 'الخَامِسُ',
  6: 'السَّادِسُ',
  7: 'السَّابِعُ',
  8: 'الثَّامِنُ',
  9: 'التَّاسِعُ',
  10: 'العَاشِرُ',
  11: 'الحَادِيَ عَشَرَ',
  12: 'الثَّانِيَ عَشَرَ',
  13: 'الثَّالِثَ عَشَرَ',
  14: 'الرَّابِعَ عَشَرَ',
  15: 'الخَامِسَ عَشَرَ',
  16: 'السَّادِسَ عَشَرَ',
  17: 'السَّابِعَ عَشَرَ',
  18: 'الثَّامِنَ عَشَرَ',
  19: 'التَّاسِعَ عَشَرَ',
  20: 'العِشْرُونَ',
  21: 'الحَادِي وَالعِشْرُونَ',
  22: 'الثَّانِي وَالعِشْرُونَ',
  23: 'الثَّالِثُ وَالعِشْرُونَ',
  24: 'الرَّابِعُ وَالعِشْرُونَ',
  25: 'الخَامِسُ وَالعِشْرُونَ',
  26: 'السَّادِسُ وَالعِشْرُونَ',
  27: 'السَّابِعُ وَالعِشْرُونَ',
  28: 'الثَّامِنُ وَالعِشْرُونَ',
  29: 'التَّاسِعُ وَالعِشْرُونَ',
  30: 'الثَّلَاثونَ',
}

/**
 * -------------------
 * Methods
 * -------------------
 */

export const toArabicNumber = (number) => {
  return ('' + number).replace(/[0-9]/g, (match) => {
    return NUMBER_TO_ARABIC_NUMBER[match]
  })
}

export const toSectionName = (number) => {
  return ('' + number).replace(/[0-9]+/g, (match) => {
    return NUMBER_TO_SECTION_NAME[match]
  })
}
