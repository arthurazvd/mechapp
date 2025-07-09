import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../styles/globalStyles'; // Import theme

export const servStyles = StyleSheet.create({
  // container can likely be removed if globalStyles.container is sufficient
  // container: {
  //   flex: 1,
  //   backgroundColor: colors.background,
  //   justifyContent: 'center',
  // },

  crudButtons: { // Used in cadastrar, editar
    flexDirection: 'row',
    gap: spacing.small,
    width: '100%', // Will be constrained by parent in screen
    justifyContent: 'center',
    marginTop: spacing.large, // Was 25
    // paddingHorizontal applied in screen-specific styles (styles.actionButtonsContainer)
  },

  precoInput: { // Used in cadastrar, editar
    flexDirection: 'row',
    gap: spacing.small,
    width: '100%', // Will be constrained by parent in screen
    // maxWidth: 400, // Applied in screen-specific styles (styles.inputRowContainer)
    justifyContent: 'center',
    // paddingHorizontal applied in screen-specific styles
  },

  pickerContainer: { // Used in cadastrar, editar
    width: '100%', // Will be constrained by parent in screen
    // maxWidth: 400, // Applied in screen-specific styles (styles.inputField)
    marginBottom: spacing.medium, // Was 10
    // justifyContent: 'center', // Not always needed, depends on label position
  },
  
  picker: { // Style for the Picker component itself (platform differences apply)
    backgroundColor: colors.inputBackground, // Was #242424
    borderRadius: spacing.small, // Was 8
    borderWidth: 0, // Keep if no border is desired
    color: colors.textPrimary, // Was #868686 - this is for selected value text
    width: '100%',
    height: 50, // Standard height
    paddingHorizontal: spacing.medium, // Was 12
    // Note: Styling Picker items (dropdown/modal) is platform-specific and limited.
    // Consider using a custom Picker component for full control if needed.
  },

  checkboxContainer: { // Used in cadastrar, editar
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center', // Overridden in screen for left alignment
    gap: spacing.small, // Was 9
    // borderRadius: spacing.small, // Not needed if background is transparent
    // backgroundColor: colors.inputBackground, // Overridden in screen to transparent
    // paddingHorizontal: spacing.medium, // Overridden
    height: 50, // Keep consistent height
    width: '100%', // Will be constrained by parent
    // maxWidth: 400, // Applied in screen
    // marginTop: spacing.small, // Was 10, adjusted in screen
  },

  checkbox: { // Specific style for Checkbox component itself
    height: 20, // Keep as is or make theme variable
    width: 20,
    // color prop for Checkbox handles the checkmark color
  },
});
