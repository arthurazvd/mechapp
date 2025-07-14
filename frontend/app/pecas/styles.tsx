import { StyleSheet } from 'react-native';
import { globalStyles, colors, spacing, typography } from '../../styles/globalStyles';

export const pecStyles = StyleSheet.create({

  
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

  viewPecas: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    gap: spacing.large, 
    width: '90%', 
    maxWidth: 500, 
    alignSelf: 'center',
    paddingVertical: spacing.medium, 
    paddingHorizontal: spacing.medium, 
    backgroundColor: colors.surface, 
    borderRadius: spacing.medium,
    marginBottom: spacing.large,
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  pecaImageVisualizar: {
    width: 120, 
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
