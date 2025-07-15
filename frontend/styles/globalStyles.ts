import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#A10000',
  secondary: '#007BFF',
  background: '#151515',
  surface: '#1e1e1e',
  inputBackground: '#242424',
  textPrimary: '#FFFFFF',
  textSecondary: '#E0E0E0',
  textHint: '#868686',
  textLabel: '#888888',
  error: '#D00000', 
  success: '#00A100',
  warning: '#FFA500', 
  black_transparent: '#000000aa', 
  white: '#FFFFFF',
  black: '#000000',
  gold: '#FFD700', 
};

export const spacing = {
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
};

export const typography = {
  fontSizeLabel: 14,
  fontSizeText: 15,
  fontSizeLink: 20,
  fontSizeTitle2: 20,
  fontSizeTitle: 40,
  fontWeightBold: 'bold' as 'bold',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
  },

  title: {
    fontSize: typography.fontSizeTitle,
    fontWeight: typography.fontWeightBold,
    textAlign: 'center',
    marginBottom: spacing.medium,
    color: colors.textPrimary,
  },

  link: {
    fontSize: typography.fontSizeLink,
    fontWeight: typography.fontWeightBold,
    textAlign: 'center',
    color: colors.textPrimary,
  },

  text: {
    fontSize: typography.fontSizeText,
    textAlign: 'center',
    color: colors.textHint, 
  },

  initialTop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    height: 100, 
    borderBottomLeftRadius: 80,
  },

  initialBottom: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: spacing.small, 
  },

  crudTop: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    height: '7%', 
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  crudBottom: {
    height: '83%',
  },

  label: {
    fontSize: typography.fontSizeLabel,
    marginBottom: spacing.small / 2,
    color: colors.textLabel, 
    textAlign: 'left',
  },

  title2: {
    fontSize: typography.fontSizeTitle2,
    textAlign: 'center',
    marginBottom: spacing.medium, 
    color: colors.textLabel, 
  },

  homeButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    rowGap: spacing.small, 
  },

  telaServicos: {
    width: '100%',
    paddingTop: spacing.large, 
    height: '83%',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: colors.black_transparent,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    position: 'relative',
    backgroundColor: colors.surface, 
    padding: spacing.large,         
    borderRadius: spacing.medium,  
    width: '80%',
    alignItems: 'center',
    elevation: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  modalTitle: {
    color: colors.textPrimary,
    fontSize: spacing.medium,    
    fontWeight: typography.fontWeightBold,
    marginBottom: spacing.medium, 
    textAlign: 'center',
  },

  modalButton: {
    backgroundColor: colors.primary, 
    paddingVertical: spacing.small + spacing.small / 2, 
    paddingHorizontal: spacing.large, 
    borderRadius: spacing.small,      
    marginTop: spacing.medium,       
    alignItems: 'center',
  },

  modalButtonText: {
    color: colors.textPrimary, 
    fontWeight: typography.fontWeightBold,
    fontSize: typography.fontSizeText,
  },

  closeButton: { 
    position: 'absolute',
    top: spacing.small,
    right: spacing.small,
    padding: spacing.small,
    zIndex: 1,
  },

  closeButtonText: { 
    fontSize: 18,
    fontWeight: typography.fontWeightBold,
    color: colors.error, 
  },
});
