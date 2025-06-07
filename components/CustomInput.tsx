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
import { globalStyles } from '../styles/globalStyles';


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
  containerStyle,
  contentStyle,
  style,
  label,
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
          {...rest}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  innerContainer: {
    maxWidth: 400,
    width: '100%',
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 20,
    backgroundColor: '#242424',
    color: '#868686',
    width: '100%',
  },
});
