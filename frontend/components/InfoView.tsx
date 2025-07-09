import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../styles/globalStyles';

interface InfoViewProps {
  label: string;
  value: string;
  containerStyle?: object;
}

export const InfoView = ({ label, value, containerStyle }: InfoViewProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.textLabel, // Was #CCC
    borderRadius: spacing.small,
    padding: spacing.medium,        // Was 10
    marginVertical: spacing.small,  // Was 6
    width: '90%',                   // Default width, can be overridden
    maxWidth: 500,                  // Increased maxWidth slightly
    alignSelf: 'center',
    backgroundColor: colors.surface, // Added a subtle background
  },
  label: {
    fontWeight: typography.fontWeightBold,
    color: colors.textLabel,        // Was #555
    marginBottom: spacing.small / 2, // Was 4
    fontSize: typography.fontSizeLabel,
  },
  value: {
    fontSize: typography.fontSizeText, // Was 16
    color: colors.textSecondary,       // Was rgb(231, 231, 231)
  },
});

export default InfoView;
