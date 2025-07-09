import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../styles/globalStyles';

export const cadStyles = StyleSheet.create({
  // container is likely covered by globalStyles.container, can be removed if not adding specific overrides
  // container: {
  //   flex: 1,
  //   backgroundColor: colors.background,
  //   justifyContent: 'center',
  // },

  initialTop: { // This style is used in cadastro/index and cadastro/escolher
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    // height: '17%', // Percentage heights can be tricky, consider fixed DP or flex
    paddingVertical: spacing.large, // Added padding for content within
    borderBottomLeftRadius: 80, // This is a very specific radius, ensure it's intended
  },

  // initialBottom is likely covered by globalStyles.initialBottom or ScrollView content container
  // initialBottom: {
  //   // height: '93%', // Usually flex: 1 or similar is better for content areas
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   paddingHorizontal: spacing.medium, // Added padding
  // },

  crudButtons: { // Used in pecas/cadastrar, servicos/cadastrar
    flexDirection: 'row',
    // columnGap: '2%', // 'gap' is preferred if available, or use margins
    gap: spacing.small,
    width: '100%',
    justifyContent: 'center',
    marginTop: spacing.large, // Was 25
    paddingHorizontal: spacing.medium, // Ensure buttons don't touch edges
  },

  precoInput: { // Used in pecas/cadastrar, servicos/cadastrar
    flexDirection: 'row',
    // columnGap: '2%',
    gap: spacing.small,
    width: '100%', // Inputs will take width from their `style` prop now
    maxWidth: 450, // Consistent max width
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: spacing.medium,
  },

  viewPecas: { // Used in pecas/visualizar
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.large, // Was 50
    width: '90%', // More flexible width
    maxWidth: 500,
    alignSelf: 'center',
    marginBottom: spacing.medium,
  }
});
