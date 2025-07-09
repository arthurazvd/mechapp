import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#A10000',
  secondary: '#007BFF', // Example, adjust as needed
  background: '#151515',
  surface: '#1e1e1e',
  inputBackground: '#242424',
  textPrimary: '#FFFFFF',
  textSecondary: '#E0E0E0',
  textHint: '#868686', // Used for placeholders and secondary info
  textLabel: '#888888',
  error: '#D00000', // Consistent with AgendamentoCard cancelado
  success: '#00A100', // Consistent with AgendamentoCard confirmado
  warning: '#FFA500', // Consistent with AgendamentoCard pendente
  black_transparent: '#000000aa', // For modal overlay
  white: '#FFFFFF',
  black: '#000000',
  gold: '#FFD700', // Used in cliStyles for rating
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
    color: colors.textHint, // Changed from #868686
  },

  initialTop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    height: 100, // This might need to be dynamic or a fixed large value
    borderBottomLeftRadius: 80,
  },

  initialBottom: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: spacing.small, // Changed from 10
  },

  crudTop: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    height: '7%', // Consider using a fixed DP value or flex for more predictability
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  crudBottom: {
    height: '83%', // Consider implications of percentage heights
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    fontSize: typography.fontSizeLabel,
    marginBottom: spacing.small / 2, // Changed from 6
    color: colors.textLabel, // Changed from #888
    textAlign: 'left',
  },

  title2: {
    fontSize: typography.fontSizeTitle2,
    textAlign: 'center',
    marginBottom: spacing.medium, // Changed from 20
    color: colors.textLabel, // Changed from #888
  },

  homeButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    rowGap: spacing.small, // Changed from 10
  },

  telaServicos: {
    justifyContent: 'flex-start',
    width: '100%',
    paddingTop: spacing.large, // Changed from 30
    height: '83%',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.black_transparent,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    position: 'relative',
    backgroundColor: colors.surface, // Changed from #1e1e1e
    padding: spacing.large,         // Changed from 25
    borderRadius: spacing.medium,   // Changed from 16
    width: '80%',
    alignItems: 'center',
    elevation: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  modalTitle: {
    color: colors.textPrimary, // Changed from #fff
    fontSize: spacing.medium,    // Changed from 16
    fontWeight: typography.fontWeightBold,
    marginBottom: spacing.medium, // Changed from 20
    textAlign: 'center',
  },

  modalButton: {
    backgroundColor: colors.primary, // Changed from #A10000
    paddingVertical: spacing.small + spacing.small / 2, // Changed from 12
    paddingHorizontal: spacing.large, // Changed from 24
    borderRadius: spacing.small,      // Changed from 8
    marginTop: spacing.medium,        // Changed from 20
    alignItems: 'center',
  },

  modalButtonText: {
    color: colors.textPrimary, // Changed from #fff
    fontWeight: typography.fontWeightBold,
    fontSize: typography.fontSizeText, // Changed from 15
  },

  closeButton: { // For modals
    position: 'absolute',
    top: spacing.small,
    right: spacing.small,
    padding: spacing.small,
    zIndex: 1,
  },

  closeButtonText: { // For modals
    fontSize: 18, // This can be a typography constant if used elsewhere
    fontWeight: typography.fontWeightBold,
    color: colors.error, // Changed from #ff0000 to a theme color
  },
});
