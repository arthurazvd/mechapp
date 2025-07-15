import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './globalStyles';

export const servStyles = StyleSheet.create({
  crudButtons: {
    flexDirection: 'row',
    gap: spacing.small,
    width: '100%',
    justifyContent: 'center',
    marginTop: spacing.large,
  },

  precoInput: {
    flexDirection: 'row',
    gap: spacing.small,
    width: '100%',
    justifyContent: 'center',
  },

  pickerContainer: {
    width: '100%',
    marginBottom: spacing.medium,
  },
  
  picker: {
    backgroundColor: colors.inputBackground,
    borderRadius: spacing.small,
    borderWidth: 0,
    color: colors.textPrimary,
    width: '100%',
    height: 50,
    paddingHorizontal: spacing.medium,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.small,
    height: 50,
    width: '100%',
  },

  checkbox: {
    height: 20,
    width: 20,
  },
});
