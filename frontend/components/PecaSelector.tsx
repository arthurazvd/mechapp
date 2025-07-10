import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = {
  nome: string;
  quantidade: number;
  onChangeNome: (text: string) => void;
  onAdd: () => void;
  onRemove: () => void;
  onAdicionar: () => void;
};

export const PecaSelector = ({
  nome,
  quantidade,
  onChangeNome,
  onAdd,
  onRemove,
  onAdicionar,
}: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar peça..."
        placeholderTextColor="#aaa"
        value={nome}
        onChangeText={onChangeNome}
        style={styles.input}
      />
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={onRemove}>
          <Feather name="minus" size={16} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.quantidade}>{quantidade}</Text>
        <TouchableOpacity style={styles.button} onPress={onAdd}>
          <Feather name="plus" size={16} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.adicionar} onPress={onAdicionar}>
          <Text style={styles.adicionarText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '90%',
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#242424',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 45,
    marginBottom: 8,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  button: {
    backgroundColor: '#A10000',
    padding: 10,
    borderRadius: 6,
  },
  quantidade: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 4,
  },
  adicionar: {
    backgroundColor: '#00A100',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 'auto',
  },
  adicionarText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
