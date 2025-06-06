import React from 'react';
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

interface CustomInputProps extends TextInputProps {
  onlyNumbers?: boolean;
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>; // Estilo da View externa (centralizadora)
  contentStyle?: StyleProp<ViewStyle>;   // NOVO: estilo da View interna (label + input)
  label?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  onlyNumbers = false,
  value,
  onChangeText,
  inputStyle,
  containerStyle,
  contentStyle,
  label,
  ...rest
}) => {
  const handleChange = (text: string) => {
    const formatted = onlyNumbers ? text.replace(/[^0-9]/g, '') : text;
    onChangeText?.(formatted);
  };

  return (
    <View style={[styles.outerContainer, containerStyle]}>
      <View style={[styles.innerContainer, contentStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}
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
    marginBottom: 16,
    width: '100%',
  },
  innerContainer: {
    maxWidth: 400,
    width: '100%',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#888',
    textAlign: 'left',
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
