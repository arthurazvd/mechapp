import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { globalStyles, colors, spacing, typography } from '../styles/globalStyles';

interface PasswordInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  containerStyle?: object; // For the outermost wrapper
  contentStyle?: object; // For the View containing TextInput and icon
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChangeText,
  label,
  placeholderTextColor = colors.textHint,
  containerStyle,
  contentStyle,
  ...rest
}) => {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && <Text style={globalStyles.label}>{label}</Text>}
      <View style={[styles.container, contentStyle]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!mostrarSenha}
          style={styles.input}
          placeholderTextColor={placeholderTextColor}
          {...rest}
        />
        <TouchableOpacity
          onPress={() => setMostrarSenha(!mostrarSenha)}
          style={styles.iconButton}
        >
          <Feather
            name={mostrarSenha ? 'eye' : 'eye-off'}
            size={19} // This size is quite specific, could be a theme variable if reused
            color={colors.textLabel} // Was #888
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%', // Default to full width, parent can constrain
    // maxWidth: 400, // Let parent or containerStyle handle this
    marginBottom: spacing.small, // Default margin, was 2
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: spacing.small,
    height: 50, // Consistent with CustomInput, consider theme variable
    backgroundColor: colors.inputBackground, // Changed from #464646 to match CustomInput
  },
  input: {
    flex: 1, // Use flex to take available space
    height: '100%',
    // width: '87%', // Removed fixed width, using flex now
    borderRadius: spacing.small, // Match container's border radius for seamless look if needed
    paddingHorizontal: spacing.medium,
    backgroundColor: colors.inputBackground, // Ensure this matches container or is transparent
    color: colors.textHint,
    fontSize: typography.fontSizeText,
  },
  iconButton: {
    paddingHorizontal: spacing.medium, // Increased padding for better touch area
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
