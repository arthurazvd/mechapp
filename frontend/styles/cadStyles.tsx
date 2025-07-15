import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './globalStyles';

export const cadStyles = StyleSheet.create({
  initialTop: { 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.large, 
    borderBottomLeftRadius: 80, 
  },

  crudButtons: { 
    flexDirection: 'row',
    gap: spacing.small,
    width: '100%',
    justifyContent: 'center',
    marginTop: spacing.large, 
    paddingHorizontal: spacing.medium, 
  },

  precoInput: { 
    flexDirection: 'row',
    gap: spacing.small,
    width: '100%', 
    maxWidth: 450, 
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: spacing.medium,
  },

  viewPecas: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.large, 
    width: '90%', 
    maxWidth: 500,
    alignSelf: 'center',
    marginBottom: spacing.medium,
  }
});
