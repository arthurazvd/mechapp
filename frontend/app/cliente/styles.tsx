import { StyleSheet } from 'react-native';
import { colors, globalStyles, spacing, typography } from '../../styles/globalStyles';

export const cliStyles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    marginTop: spacing.large, // Was 25
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    gap: spacing.small, // Added gap instead of marginLeft for filterButton
  },
  searchInput: {
    flex: 1,
    backgroundColor: colors.surface, // Was #1e1e1e
    color: colors.textPrimary,       // Was #fff
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.medium - 3, // 13
    borderRadius: spacing.small,
    fontSize: typography.fontSizeText,
  },
  filterButton: {
    // marginLeft: spacing.small, // Replaced by gap in container
    backgroundColor: colors.primary,
    padding: spacing.small + 2, // 10
    borderRadius: spacing.small,
  },
  listContent: {
    paddingBottom: spacing.large, // Was 20
    paddingTop: spacing.large,    // Was 20
    width: '100%',
    alignSelf: 'center',
  },
  avaliarButton: { // This style seems specific, check usage
    marginTop: spacing.small,
    backgroundColor: colors.primary,
    paddingVertical: spacing.small,
    borderRadius: spacing.small / 2 + 2, // 6
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  avaliarText: { // Companion to avaliarButton
    color: colors.textPrimary,
    fontWeight: typography.fontWeightBold,
    fontSize: typography.fontSizeLabel,
  },
  // Modal styles (for filter modal in cliente/busca and info modal in cliente/oficina)
  // These are slightly different from globalStyles.modalOverlay and globalStyles.modalContent
  // because they often appear from bottom or have different padding/rounding.
  modalOverlay: { // Used in cliente/busca (slide from bottom), cliente/oficina (slide from bottom)
    flex: 1,
    backgroundColor: colors.black_transparent, // Consistent with global
    justifyContent: 'flex-end', // This makes it a bottom sheet style
  },
  modalContent: { // Used in cliente/busca, cliente/oficina
    backgroundColor: colors.surface,
    padding: spacing.large, // Was 20
    borderTopLeftRadius: spacing.medium, // Was 16
    borderTopRightRadius: spacing.medium,
    width: '100%',
    alignSelf: 'center', // Should be default for width 100% but good to have
    // alignItems: 'center', // Removed, let content dictate alignment or add per case
  },
  modalTitle: globalStyles.modalTitle, // Use global style
  modalInput: { // Used in cliente/busca
    backgroundColor: colors.inputBackground, // Was #242424
    color: colors.textPrimary,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small + 2, // 10
    borderRadius: spacing.small,
    marginBottom: spacing.medium,
    width: '100%',
    alignSelf: 'center',
    fontSize: typography.fontSizeText,
  },
  modalButton: globalStyles.modalButton, // Use global style
  modalButtonText: globalStyles.modalButtonText, // Use global style
  // Card styles for Oficina List (cliente/busca)
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    padding: spacing.medium, // Was 20
    borderRadius: spacing.small,
    marginBottom: spacing.medium,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    elevation: 2, // Add subtle shadow for cards
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: spacing.small,
    marginRight: spacing.medium, // Was 12
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSizeText + 1, // 16
    fontWeight: typography.fontWeightBold,
  },
  cardSubtitle: {
    color: colors.textHint, // Was #aaa
    marginTop: spacing.small / 2, // Was 4
    fontSize: typography.fontSizeLabel, // Was 13
  },
  cardRating: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50, // Give some space for rating
  },
  ratingText: {
    color: colors.gold, // Was #FFD700
    fontWeight: typography.fontWeightBold,
    marginTop: spacing.small / 4, // Was 2
    fontSize: typography.fontSizeLabel,
  },
  noRating: {
    color: colors.textLabel, // Was #888
    fontSize: typography.fontSizeLabel - 2, // 12
    textAlign: 'center', // Centered if it's the only thing
  },
  placeholderImage: {
    width: 60,
    height: 60,
    borderRadius: spacing.small,
    backgroundColor: colors.inputBackground, // Was #2e2e2e
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.medium,
  },
  // Styles for Oficina Details (cliente/oficina)
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xlarge, // Was 50
    width: '90%',
    alignSelf: 'center',
    padding: spacing.large, // Was 20
    backgroundColor: colors.surface,
    borderRadius: spacing.medium + 4, // 20
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  imageBox: { // Placeholder for image in Oficina Details
    width: 100,
    height: 100,
    borderRadius: spacing.medium - 4, // 12
    backgroundColor: colors.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.medium,
  },
  nome: { // Oficina name in details
    color: colors.textPrimary,
    fontSize: typography.fontSizeTitle2 - 1, // 19, was 17
    fontWeight: typography.fontWeightBold,
    marginBottom: spacing.small / 2,
  },
  descricao: { // Oficina description in details
    color: colors.textHint, // Was #aaa
    fontSize: typography.fontSizeLabel, // Was 14
    lineHeight: typography.fontSizeLabel + 6, // Add line height for readability
  },
  modalText: { // Text inside info modal (cliente/oficina)
    color: colors.textSecondary, // Was #ccc
    fontSize: typography.fontSizeText, // Was 14
    marginBottom: spacing.large, // Was 20
    lineHeight: typography.fontSizeText + 6,
    textAlign: 'center',
  },
  infoTextBox: {
    flex: 1,
  },
});
