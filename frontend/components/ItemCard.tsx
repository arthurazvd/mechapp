import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = {
  nome: string;
  descricao: string;
  quantidade: number;
  onAdd: () => void;
  onRemove: () => void;
  onAgendar?: () => void;
  multiplo?: boolean;
};

export const ItemCard = ({
  nome,
  descricao,
  quantidade,
  onAdd,
  onRemove,
  onAgendar,
  multiplo = false,
}: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.buttonBox}>
        {multiplo ? (
          <>
            <TouchableOpacity
              style={[styles.removeButton, styles.removeButtonMultiplo]}
              onPress={onRemove}
            >
              <Feather name="minus" size={16} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={onAdd}>
              <Feather name="plus" size={16} color="#fff" />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.agendarButton} onPress={onAgendar}>
            <Feather name="calendar" size={16} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.descricao}>{descricao}</Text>
      </View>

      {multiplo && quantidade > 0 && (
        <View style={styles.quantidadeBox}>
          <Text style={styles.quantidadeText}>{quantidade}</Text>
        </View>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 8,
    marginBottom: 3,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  buttonBox: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 12,
  },
  addButton: {
    backgroundColor: '#00A100',
    padding: 8,
    borderRadius: 6,
  },
  removeButton: {
    backgroundColor: '#A10000',
    padding: 8,
    borderRadius: 6,
  },
  removeButtonMultiplo: {
    marginBottom: 8,
  },
  agendarButton: {
    backgroundColor: '#A10000',
    padding: 8,
    borderRadius: 6,
  },
  infoBox: {
    flex: 1,
  },
  nome: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  descricao: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 4,
  },
  quantidadeBox: {
    backgroundColor: '#333',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 10,
  },
  quantidadeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
