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
  containerStyle?: object; 
  contentStyle?: object; 
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
            size={19} 
            color={colors.textLabel} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%', 
    marginBottom: spacing.small, 
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: spacing.small,
    height: 50, 
    backgroundColor: colors.inputBackground, 
  },
  input: {
    flex: 1, 
    height: '100%',
    borderRadius: spacing.small, 
    paddingHorizontal: spacing.medium,
    backgroundColor: colors.inputBackground, 
    color: colors.textHint,
    fontSize: typography.fontSizeText,
  },
  iconButton: {
    paddingHorizontal: spacing.medium, 
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
