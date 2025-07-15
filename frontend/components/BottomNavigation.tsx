import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface BottomNavigationProps {
  activeRoute?: string;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeRoute,
}) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Feather name="search" size={22} color="#fff" />
        <Text style={styles.label}>Busca</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("oficina/listar")}
      >
        <MaterialIcons name="build" size={22} color="#fff" />
        <Text style={styles.label}>Oficinas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.homeButton}>
        <Feather name="home" size={24} color="#A10000" />
        <Text style={styles.homeLabel}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Feather name="list" size={22} color="#fff" />
        <Text style={styles.label}>Histórico</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <FontAwesome5 name="user-alt" size={20} color="#fff" />
        <Text style={styles.label}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#A10000",
    paddingHorizontal: 10,
    width: "100%",
    height: "10%",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    color: "#ccc",
    marginTop: 4,
  },
  homeButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  homeLabel: {
    fontSize: 12,
    color: "#A10000",
    marginTop: 4,
  },
});

export default BottomNavigation;
