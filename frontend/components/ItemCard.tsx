import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, typography } from '../styles/globalStyles';

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
              style={[styles.actionButton, styles.removeButton, styles.removeButtonMultiplo]}
              onPress={onRemove}
            >
              <Feather name="minus" size={16} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.addButton]} onPress={onAdd}>
              <Feather name="plus" size={16} color={colors.white} />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={[styles.actionButton, styles.agendarButton]} onPress={onAgendar}>
            <Feather name="calendar" size={16} color={colors.white} />
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
    backgroundColor: colors.surface,
    padding: spacing.medium,
    borderRadius: spacing.small,
    marginBottom: spacing.small / 2, 
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  buttonBox: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: spacing.medium, 
  },
  actionButton: { 
    padding: spacing.small,
    borderRadius: spacing.small / 2 + 2, 
  },
  addButton: {
    backgroundColor: colors.success,
  },
  removeButton: {
    backgroundColor: colors.error,
  },
  removeButtonMultiplo: {
    marginBottom: spacing.small,
  },
  agendarButton: {
    backgroundColor: colors.primary, 
  },
  infoBox: {
    flex: 1,
  },
  nome: {
    color: colors.textPrimary,
    fontSize: typography.fontSizeText,
    fontWeight: typography.fontWeightBold,
  },
  descricao: {
    color: colors.textHint, 
    fontSize: typography.fontSizeLabel,
    marginTop: spacing.small / 2,
  },
  quantidadeBox: {
    backgroundColor: colors.inputBackground, 
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.small / 2,
    borderRadius: spacing.small / 2 + 2, 
    marginLeft: spacing.small,
  },
  quantidadeText: {
    color: colors.textPrimary,
    fontWeight: typography.fontWeightBold,
    fontSize: typography.fontSizeLabel,
  },
});
