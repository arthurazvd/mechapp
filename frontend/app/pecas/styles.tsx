import { StyleSheet } from 'react-native';
import { globalStyles, colors, spacing, typography } from '../../styles/globalStyles';

export const pecStyles = StyleSheet.create({
  // container can likely be removed if globalStyles.container is sufficient
  // container: {
  //   flex: 1,
  //   backgroundColor: colors.background,
  //   justifyContent: 'center',
  // },
  
  crudButtons: { // Used in cadastrar, editar
    flexDirection: 'row',
    // columnGap: '2%', // Use 'gap' or margins for spacing
    gap: spacing.small,
    width: '100%', // Will be constrained by parent in screen
    justifyContent: 'center',
    marginTop: spacing.large, // Was 25
    // paddingHorizontal applied in screen-specific styles if needed (styles.actionButtonsContainer)
  },

  precoInput: { // Used in cadastrar, editar
    flexDirection: 'row',
    // columnGap: '2%',
    gap: spacing.small,
    width: '100%', // Will be constrained by parent in screen
    // maxWidth: 400, // Applied in screen-specific styles (styles.inputRowContainer)
    justifyContent: 'center', // Fine as a default
    // paddingHorizontal applied in screen-specific styles
  },

  viewPecas: { // Used in visualizar
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    gap: spacing.large, // Was 50
    width: '90%', // Default width
    maxWidth: 500, // Max width for this specific layout
    alignSelf: 'center',
    paddingVertical: spacing.medium, // Add some vertical padding
    paddingHorizontal: spacing.medium, // Add some horizontal padding
    backgroundColor: colors.surface, // Give it a background like a card
    borderRadius: spacing.medium,
    marginBottom: spacing.large,
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  // Specific styles for VisualizarPeca might be better here or in the component itself if not reused
  pecaImageVisualizar: {
    width: 120, // Adjusted size
    height: 120,
    borderRadius: spacing.small,
  },
  nomePecaVisualizar: {
    ...globalStyles.title,
    fontSize: typography.fontSizeTitle2 + 2,
    textAlign: 'left',
    flex: 1,
    marginLeft: spacing.medium,
    color: colors.textPrimary,
  }


});
