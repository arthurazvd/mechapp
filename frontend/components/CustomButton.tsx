import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, typography } from '../styles/globalStyles';

interface Props {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: ViewStyle; // Allow passing text style overrides
}

export const CustomButton: React.FC<Props> = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: spacing.small,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.medium, // Default padding
    paddingHorizontal: spacing.large, // Default padding
  },
  text: {
    color: colors.textPrimary,
    fontWeight: typography.fontWeightBold,
    fontSize: typography.fontSizeText, // Default font size for button text
  },
});

export default CustomButton;
