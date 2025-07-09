import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, typography } from '../styles/globalStyles';

type Status = 'pendente' | 'confirmado' | 'cancelado' | 'concluido';

type Props = {
  servico: string;
  oficina: string;
  status: Status;
  onPress: () => void;
};

export const AgendamentoCard = ({ servico, oficina, status, onPress }: Props) => {
  const statusInfo = {
    pendente: { label: 'Pendente', color: colors.warning, icon: 'clock' },
    confirmado: { label: 'Confirmado', color: colors.success, icon: 'check-circle' },
    cancelado: { label: 'Cancelado', color: colors.error, icon: 'x-circle' },
    concluido: { label: 'Concluído', color: colors.secondary, icon: 'check' },
  };

  const { label, color, icon } = statusInfo[status];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.infoBox}>
        <Text style={styles.servico}>{servico}</Text>
        <Text style={styles.oficina}>{oficina}</Text>
      </View>

      <View style={styles.statusBox}>
        <Feather name={icon as any} size={18} color={color} />
        <Text style={[styles.statusText, { color }]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    padding: spacing.medium,
    borderRadius: spacing.small,
    marginBottom: spacing.small,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  infoBox: {
    flex: 1,
  },
  servico: {
    color: colors.textPrimary,
    fontSize: typography.fontSizeText, // Adjusted for consistency
    fontWeight: typography.fontWeightBold,
  },
  oficina: {
    color: colors.textHint, // Was #aaa, now using theme color
    fontSize: typography.fontSizeLabel, // Adjusted for consistency
    marginTop: spacing.small / 2,
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.small / 2,
  },
  statusText: {
    fontSize: typography.fontSizeLabel,
    fontWeight: typography.fontWeightBold,
    marginLeft: spacing.small / 2,
  },
});
