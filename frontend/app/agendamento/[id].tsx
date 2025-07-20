import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { View, StatusBar, Image, Text, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

import { BackButton } from "../../components/BackButton";
import { BottomNavigation } from "../../components/BottomNavigation";
import { globalStyles } from "../../styles/globalStyles";
import CustomButton from "../../components/CustomButton";

// Styles
import { servStyles } from "../../styles/servStyles";

// API
import { agendamento as agendamento_api } from "../../api/index";

const DetalhesAgendamento = () => {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();

  const [statusColor, setStatusColor] = useState("#00A100");
  const [usuario, setUsuario] = useState(() => {
    const data = localStorage.getItem("usuario_atual");
    return data ? JSON.parse(data) : null;
  });

  const [agendamento, setAgendamento] = useState<agendamento_api.Agendamento>({
    id: "",
    data: "",
    status: "PENDENTE",
    cliente: {
      id: "",
      nome: "",
      email: "",
      senha: "",
      tipo: "",
      telefone: null,
    },
    servico: {
      id: "",
      nome: "",
      descricao: "",
      tempo: 0,
      preco_min: 0,
      preco_max: 0,
      oficina: {
        id: "",
        nome: "",
      },
    },
    pecas_do_agendamento: [],
  });

  // Recuperando dados
  useEffect(() => {
    const fetchAgendamento = async () => {
      const data = await agendamento_api.consultar_agendamento(id);
      setAgendamento(data);
    };
    fetchAgendamento();
  }, []);

  // Alterar cor de acordo com valor de status
  useEffect(() => {
    if (agendamento.status === "PENDENTE") {
      setStatusColor("#FFA500");
    } else if (agendamento.status === "CANCELADO") {
      setStatusColor("#D00000");
    } else if (agendamento.status === "CONFIRMADO") {
      setStatusColor("#00A100");
    } else if (agendamento.status === "CONCLUIDO") {
      setStatusColor("#007BFF");
    }
  }, [agendamento]);

  const handleEstado = async (estado: string) => {
    const data = await agendamento_api.alterar_agendamento(
      { status: estado },
      id
    );

    alert(data.mensagem);
    if (data.error) {
      return;
    }

    const fetchAgendamento = async () => {
      const data = await agendamento_api.consultar_agendamento(id);
      setAgendamento(data);
    };
    fetchAgendamento();
  };

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

        <ScrollView
          style={styles.telaServicos}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View style={globalStyles.telaServicos}>
            <Text style={globalStyles.title}>Agendamento</Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Serviço</Text>
              <Text style={styles.label}>Nome:</Text>
              <Text style={styles.value}>{agendamento.servico.nome}</Text>
              <Text style={styles.label}>Descrição:</Text>
              <Text style={styles.value}>{agendamento.servico.descricao}</Text>
              <Text style={styles.label}>Data:</Text>
              <Text style={styles.value}>{agendamento.data}</Text>
              <Text style={styles.label}>Status:</Text>
              <Text style={[styles.value, { color: statusColor }]}>
                {agendamento.status}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preço estimado</Text>
              <Text style={styles.value}>
                R${" "}
                {(
                  (agendamento.servico.preco_min +
                    agendamento.servico.preco_max) /
                  2
                ).toFixed(2)}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Peças incluídas</Text>
              <FlatList
                data={agendamento.pecas_do_agendamento}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.pecaItem}>
                    <Text style={styles.value}>{item.nome}</Text>
                    <Text style={styles.quantidade}>x{item.quantidade}</Text>
                  </View>
                )}
              />
            </View>

            {usuario.tipo === "CLIENTE" ? (
              <View style={servStyles.crudButtons}>
                <CustomButton
                  style={{
                    width: "100%",
                    maxWidth: 300,
                    height: 50,
                    backgroundColor: "#D00000",
                  }}
                  title="Cancelar"
                  onPress={() => handleEstado("CANCELADO")}
                />
              </View>
            ) : (
              <View style={servStyles.crudButtons}>
                <CustomButton
                  style={{
                    width: "30%",
                    maxWidth: 150,
                    height: 50,
                    backgroundColor: "#D00000",
                  }}
                  title="Cancelar"
                  onPress={() => handleEstado("CANCELADO")}
                />
                <CustomButton
                  style={{
                    width: "30%",
                    maxWidth: 150,
                    height: 50,
                    backgroundColor: "#00A100",
                  }}
                  title="Confirmar"
                  onPress={() => handleEstado("CONFIRMADO")}
                />
                <CustomButton
                  style={{
                    width: "30%",
                    maxWidth: 150,
                    height: 50,
                    backgroundColor: "#007BFF",
                  }}
                  title="Completar"
                  onPress={() => handleEstado("CONCLUIDO")}
                />
              </View>
            )}
          </View>
        </ScrollView>
        <BottomNavigation />
      </View>
    </>
  );
};

export default DetalhesAgendamento;

const styles = StyleSheet.create({
  section: {
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: "90%",
    alignSelf: "center",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  label: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 8,
  },
  value: {
    color: "#fff",
    fontSize: 14,
    marginTop: 2,
  },
  pecaItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  quantidade: {
    color: "#ccc",
    fontSize: 14,
  },
  telaServicos: {
    width: "100%",
    paddingTop: 30,
    height: "83%",
  },
});
