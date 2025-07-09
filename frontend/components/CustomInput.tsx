import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { globalStyles, colors, spacing, typography } from '../styles/globalStyles';

interface CustomInputProps extends TextInputProps {
  onlyNumbers?: boolean;
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>; // Style for the outermost View
  contentStyle?: StyleProp<ViewStyle>; // Style for the View wrapping label and TextInput
  label?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  onlyNumbers = false,
  value,
  onChangeText,
  inputStyle,
  // containerStyle, // Renamed to style in the original, let's stick to 'style' for the outer
  contentStyle,
  style, // This will be for the outermost container
  label,
  placeholderTextColor = colors.textHint, // Default placeholder color
  ...rest
}) => {
  const handleChange = (text: string) => {
    const formatted = onlyNumbers ? text.replace(/[^0-9]/g, '') : text;
    onChangeText?.(formatted);
  };

  return (
    <View style={[styles.outerContainer, style]}>
      <View style={[styles.innerContainer, contentStyle]}>
        {label && <Text style={globalStyles.label}>{label}</Text>}
        <TextInput
          value={value}
          onChangeText={handleChange}
          style={[styles.input, inputStyle]}
          placeholderTextColor={placeholderTextColor}
          {...rest}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    // alignItems: 'center', // Usually handled by parent or contentStyle if needed
    marginBottom: spacing.small, // Default margin
    width: '100%', // Default width, can be overridden by `style` prop
  },
  innerContainer: {
    // maxWidth: 400, // This can be applied via contentStyle if needed
    width: '100%',
  },
  input: {
    height: 50, // Consider making this more dynamic or part of theme
    borderRadius: spacing.small,
    paddingHorizontal: spacing.medium,
    backgroundColor: colors.inputBackground,
    color: colors.textHint, // Default text color for input
    width: '100%',
    fontSize: typography.fontSizeText,
  },
});
