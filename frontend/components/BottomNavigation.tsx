import React, { useEffect, useState } from "react";
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
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario_atual")!)
  );

  // Função para verificar se a rota está ativa
  const isActive = (route: string) => activeRoute === route;

  if (usuario.tipo == "CLIENTE") {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, isActive("oficinas") && styles.activeButton]}
          onPress={() => router.replace("oficina/listar")}
        >
          <MaterialIcons
            name="build"
            size={22}
            color={isActive("oficinas") ? "#A10000" : "#fff"}
          />
          <Text
            style={[styles.label, isActive("oficinas") && styles.activeLabel]}
          >
            Oficinas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, isActive("home") && styles.activeButton]}
          onPress={() => router.replace("agendamento")}
        >
          <Feather
            name="home"
            size={24}
            color={isActive("home") ? "#A10000" : "#fff"}
          />
          <Text style={[styles.label, isActive("home") && styles.activeLabel]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, isActive("servicos") && styles.activeButton]}
          onPress={() => router.replace("servicos/oficinas")}
        >
          <Feather
            name="layers"
            size={22}
            color={isActive("servicos") ? "#A10000" : "#fff"}
          />
          <Text
            style={[styles.label, isActive("servicos") && styles.activeLabel]}
          >
            Serviços
          </Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, isActive("oficinas") && styles.activeButton]}
          onPress={() => router.replace("oficina/listar")}
        >
          <MaterialIcons
            name="build"
            size={22}
            color={isActive("oficinas") ? "#A10000" : "#fff"}
          />
          <Text
            style={[styles.label, isActive("oficinas") && styles.activeLabel]}
          >
            Oficinas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, isActive("home") && styles.activeButton]}
          onPress={() => router.replace("agendamento")}
        >
          <Feather
            name="home"
            size={24}
            color={isActive("home") ? "#A10000" : "#fff"}
          />
          <Text style={[styles.label, isActive("home") && styles.activeLabel]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, isActive("servicos") && styles.activeButton]}
          onPress={() => router.replace("servicos/oficinas")}
        >
          <Feather
            name="layers"
            size={22}
            color={isActive("servicos") ? "#A10000" : "#fff"}
          />
          <Text
            style={[styles.label, isActive("servicos") && styles.activeLabel]}
          >
            Serviços
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, isActive("pecas") && styles.activeButton]}
          onPress={() => router.replace("pecas/listar")}
        >
          <FontAwesome5
            name="box"
            size={20}
            color={isActive("pecas") ? "#A10000" : "#fff"}
          />
          <Text style={[styles.label, isActive("pecas") && styles.activeLabel]}>
            Peças
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
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
  activeButton: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  label: {
    fontSize: 12,
    color: "#ccc",
    marginTop: 4,
  },
  activeLabel: {
    color: "#A10000",
    fontWeight: "600",
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
  activeHomeButton: {
    backgroundColor: "#A10000",
  },
  homeLabel: {
    fontSize: 12,
    color: "#A10000",
    marginTop: 4,
  },
  activeHomeLabel: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default BottomNavigation;
