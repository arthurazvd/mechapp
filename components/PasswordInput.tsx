import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface PasswordInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChangeText, ...rest }) => {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!mostrarSenha}
        style={styles.input}
        {...rest}
      />
        <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)} style={styles.iconButton}>
        <Feather name={mostrarSenha ? 'eye' : 'eye-off'} size={24} color="#888" />
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    width: '80%', 
    maxWidth: 400, 
    height: 50,
    backgroundColor: '#464646',
    paddingRight: 4
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 20,
    backgroundColor: '#242424',
    color: '#868686',
    width: '100%',
  },
  iconButton: {
    paddingHorizontal: 8,
  },
});
