import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

type Status = "PENDENTE" | "CONFIRMADO" | "CANCELADO" | "CONCLUIDO";

type Props = {
  servico: string;
  oficina: string;
  status: Status;
  onPress: () => void;
};

export const AgendamentoCard = ({
  servico,
  oficina,
  status,
  onPress,
}: Props) => {
  const statusInfo = {
    PENDENTE: { label: "Pendente", color: "#FFA500", icon: "clock" },
    CONFIRMADO: { label: "Confirmado", color: "#00A100", icon: "check-circle" },
    CANCELADO: { label: "Cancelado", color: "#D00000", icon: "x-circle" },
    CONCLUIDO: { label: "Concluído", color: "#007BFF", icon: "check" },
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
    flexDirection: "row",
    backgroundColor: "#1e1e1e",
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
  },
  infoBox: {
    flex: 1,
  },
  servico: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  oficina: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 4,
  },
  statusBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 6,
  },
});
