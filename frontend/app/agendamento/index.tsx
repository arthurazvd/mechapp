import React, { useState, useEffect } from "react";
import { View, StatusBar, Image, Text } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

import { BackButton } from "../../components/BackButton";
import { BottomNavigation } from "../../components/BottomNavigation";
import { AgendamentoCard } from "../../components/AgendamentoCard";

import { globalStyles } from "../../styles/globalStyles";

const TelaAgendamento = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Usuário do sistema
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario_atual")!)
  );

  // Para as oficinas de um mecanico
  const [oficinas, setOficina] = useState([
    {
      id: "",
      agendamentos: "",
    },
  ]);
  const fetchOficinasAgendamentos = async () => {
    console.log("Recuperando agendamentos de oficinas...");
  };

  // Para um cliente comum
  const [agendamento, setAgendamentos] = useState({});
  const fetchAgendamentos = async () => {
    console.log("Recuperando agendamentos...");
  };

  // Verificar se o usuário é um Mecanico
  useEffect(() => {
    if (usuario.tipo == "MECANICO") {
      fetchOficinasAgendamentos();
    } else {
      fetchAgendamentos();
    }
  }, [usuario]);

  return (
    <>
      <StatusBar backgroundColor="#A10000" barStyle="light-content" />
      <View
        style={[
          globalStyles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <View style={globalStyles.crudTop}>
          <BackButton />
          <Image
            source={require("../../assets/logo-nome.png")}
            style={{ width: 100, height: 190 }}
            resizeMode="contain"
          />
        </View>

        <View style={globalStyles.telaServicos}>
          <Text style={styles.userTitle}>
            Bem vindo de volta, {usuario.nome}
          </Text>
          <View style={globalStyles.homeButtons}>
            {usuario.tipo == "CLIENTE" ? (
              <>
                <Text style={styles.title}>Agendamentos Pendentes</Text>
                <AgendamentoCard
                  servico="Troca de óleo"
                  oficina="Oficina Premium"
                  status="pendente"
                  onPress={() => router.push("agendamento/detalhes")}
                />
              </>
            ) : (
              oficinas.map((item) => <h1>Teste</h1>)
            )}
          </View>

          <View style={globalStyles.homeButtons}>
            <Text style={styles.title}>Histórico de Agendamentos</Text>

            <AgendamentoCard
              servico="Troca de óleo"
              oficina="Oficina Premium"
              status="pendente"
              onPress={() => router.push("agendamento/detalhes")}
            />
          </View>
        </View>
        <BottomNavigation activeRoute="home" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    color: "white",
    paddingBottom: 5,
  },
  userTitle: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    paddingTop: 25,
    color: "white",
    paddingBottom: 5,
  },
});

export default TelaAgendamento;
