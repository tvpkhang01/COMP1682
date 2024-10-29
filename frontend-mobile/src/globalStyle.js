import { StyleSheet } from 'react-native';

export const colors = {
  black2: '#222',
  black3: '#333',
  black4: '#444',
  white: '#fff',
  darkWhite: '#f5f5f5d2',
  red: '#f03a0d',
  darkRed: '#d2320a',
  blackTr02: 'rgba(0, 0, 0, 0.2)',
  blackTr03: 'rgba(0, 0, 0, 0.3)',
  blackTr04: 'rgba(0, 0, 0, 0.4)',
  blackTr05: 'rgba(0, 0, 0, 0.5)',
  whiteTr02: 'rgba(180, 180, 180, 0.2)',
  whiteTr03: 'rgba(180, 180, 180, 0.3)',
  whiteTr04: 'rgba(180, 180, 180, 0.4)',
  whiteTr05: 'rgba(180, 180, 180, 0.5)',
};

export const globalStyles = StyleSheet.create({
  app: {
    flex: 1,
    minHeight: '100%',
  },
  container: {
    maxWidth: 1920,
    width: '100%',
    paddingHorizontal: 16,
  },
  textLight: {
    color: colors.black3,
  },
  textDark: {
    color: colors.darkWhite,
  },
  backgroundLight: {
    backgroundColor: colors.white,
  },
  backgroundDark: {
    backgroundColor: colors.black2,
  },
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});