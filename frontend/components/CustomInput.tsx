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
  containerStyle?: StyleProp<ViewStyle>; 
  contentStyle?: StyleProp<ViewStyle>;
  label?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  onlyNumbers = false,
  value,
  onChangeText,
  inputStyle,
  contentStyle,
  style, 
  label,
  placeholderTextColor = colors.textHint, 
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
    marginBottom: spacing.small, 
    width: '100%',
  },
  innerContainer: {
    width: '100%',
  },
  input: {
    height: 50,
    borderRadius: spacing.small,
    paddingHorizontal: spacing.medium,
    backgroundColor: colors.inputBackground,
    color: colors.textHint, 
    width: '100%',
    fontSize: typography.fontSizeText,
  },
});
