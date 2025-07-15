import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, typography } from '../styles/globalStyles';

type Props = {
  nome: string;
  quantidade: number;
  onChangeNome: (text: string) => void;
  onAdd: () => void;
  onRemove: () => void;
  onAdicionar: () => void;
  containerStyle?: object;
};

export const PecaSelector = ({
  nome,
  quantidade,
  onChangeNome,
  onAdd,
  onRemove,
  onAdicionar,
  containerStyle,
}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        placeholder="Buscar peça..."
        placeholderTextColor={colors.textHint} 
        value={nome}
        onChangeText={onChangeNome}
        style={styles.input}
      />
      <View style={styles.controls}>
        <TouchableOpacity style={[styles.controlButton, styles.removeButton]} onPress={onRemove}>
          <Feather name="minus" size={16} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.quantidade}>{quantidade}</Text>
        <TouchableOpacity style={[styles.controlButton, styles.addButton]} onPress={onAdd}>
          <Feather name="plus" size={16} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.adicionarButton} onPress={onAdicionar}>
          <Text style={styles.adicionarButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.medium,
    width: '90%', 
    alignSelf: 'center',
  },
  input: {
    backgroundColor: colors.inputBackground,
    color: colors.textPrimary, 
    borderRadius: spacing.small,
    paddingHorizontal: spacing.medium,
    height: 45, 
    marginBottom: spacing.small,
    fontSize: typography.fontSizeText,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.small,
  },
  controlButton: { 
    padding: spacing.small + 2,
    borderRadius: spacing.small / 2 + 2, 
  },
  addButton:{
    backgroundColor: colors.primary,
  },
  removeButton:{
    backgroundColor: colors.primary, 
  },
  quantidade: {
    color: colors.textPrimary,
    fontSize: typography.fontSizeText, 
    marginHorizontal: spacing.small / 2,
    fontWeight: typography.fontWeightBold,
  },
  adicionarButton: {
    backgroundColor: colors.success,
    paddingVertical: spacing.small + 2, 
    paddingHorizontal: spacing.medium,
    borderRadius: spacing.small / 2 + 2, 
    marginLeft: 'auto',
  },
  adicionarButtonText: {
    color: colors.textPrimary,
    fontWeight: typography.fontWeightBold,
    fontSize: typography.fontSizeLabel,
  },
});
