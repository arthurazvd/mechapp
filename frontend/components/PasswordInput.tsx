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
import { globalStyles } from '../styles/globalStyles';


interface PasswordInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChangeText,
  label,
  ...rest
}) => {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <View style={styles.wrapper}>
      {label && <Text style={globalStyles.label}>{label}</Text>}
      <View style={styles.container}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!mostrarSenha}
          style={styles.input}
          {...rest}
        />
        <TouchableOpacity
          onPress={() => setMostrarSenha(!mostrarSenha)}
          style={styles.iconButton}
        >
          <Feather
            name={mostrarSenha ? 'eye' : 'eye-off'}
            size={19}
            color="#888"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '80%',
    maxWidth: 400,
    marginBottom: 2,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    height: 50,
    backgroundColor: '#464646',
  },
  input: {
    height: '100%',
    width: '87%',
    borderRadius: 8,
    paddingHorizontal: 20,
    backgroundColor: '#242424',
    color: '#868686',
  },
  iconButton: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
