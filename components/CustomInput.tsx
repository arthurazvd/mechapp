import { TextInput, StyleSheet, TextInputProps, StyleProp, TextStyle } from 'react-native';

interface CustomInputProps extends TextInputProps {
  onlyNumbers?: boolean;
  inputStyle?: StyleProp<TextStyle>;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  onlyNumbers = false,
  value,
  onChangeText,
  inputStyle,
  ...rest
}) => {
  const handleChange = (text: string) => {
    const formatted = onlyNumbers ? text.replace(/[^0-9]/g, '') : text;
    onChangeText?.(formatted);
  };

  return (
    <TextInput
      value={value}
      onChangeText={handleChange}
      style={[styles.input, inputStyle]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 20,
    backgroundColor: '#242424',
    color: '#868686',
    width: '100%',
  },
});
