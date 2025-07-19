// React
import React, { useState, useEffect } from "react";
import { View, StatusBar, Image, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";

// Componentes
import { BackButton } from "../../components/BackButton";
import { BottomNavigation } from "../../components/BottomNavigation";
import { AgendamentoCard } from "../../components/AgendamentoCard";

// Styles
import { globalStyles } from "../../styles/globalStyles";

// API
import { agendamento } from "../../api/index";

interface AgendamentosOrganizados {
  pendente_list: agendamento.Agendamento[];
  historic_list: agendamento.Agendamento[];
}

const TelaAgendamento = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Usuário do sistema
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario_atual")!)
  );

  const [possuiAgendamentos, setPossuiAgendamentos] = useState(false);

  // Para as oficinas de um mecanico
  const [oficinas, setOficina] = useState<agendamento.Agendamento[]>([]);
  const fetchOficinasAgendamentos = async () => {
    console.log("Recuperando agendamentos de oficinas...");
  };

  // Para um cliente comum
  const [agendamentos_historico, setAgendamentosHistoricos] = useState<
    agendamento.Agendamento[]
  >([]);
  const [agendamentos_pendentes, setAgendamentsPendentes] = useState<
    agendamento.Agendamento[]
  >([]);

  const organizarAgendamentos = (
    agendamentos: agendamento.Agendamento[]
  ): AgendamentosOrganizados => {
    // Separar agendamentos pendentes
    const pendente_list = agendamentos
      .filter((agendamento) => agendamento.status === "PENDENTE")
      .sort((a, b) => {
        return new Date(b.data).getTime() - new Date(a.data).getTime();
      });

    // Separar outros agendamentos (histórico)
    const outrosAgendamentos = agendamentos.filter(
      (agendamento) => agendamento.status !== "PENDENTE"
    );

    // Definir ordem de prioridade dos status
    const statusOrder = {
      CONFIRMADO: 1,
      CONCLUIDO: 2,
      CANCELADO: 3,
      PENDENTE: 4,
    };

    const historic_list = outrosAgendamentos.sort((a, b) => {
      // Primeiro critério: ordem de status (CONFIRMADO > CONCLUIDO > CANCELADO)
      const statusDiff = statusOrder[a.status] - statusOrder[b.status];
      if (statusDiff !== 0) {
        return statusDiff;
      }

      // Segundo critério: ordem de data (mais recente para ma'is antigo)
      return new Date(b.data).getTime() - new Date(a.data).getTime();
    });

    return {
      pendente_list,
      historic_list,
    };
  };

  const fetchAgendamentos = async () => {
    const data = await agendamento.listar_agendamentos(usuario.id);

    if (data.length <= 0) {
      return;
    }

    const { pendente_list, historic_list } = organizarAgendamentos(data);

    setAgendamentsPendentes(pendente_list);
    setAgendamentosHistoricos(historic_list);
    setPossuiAgendamentos(true);
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

        <ScrollView
          style={styles.telaServicos}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <Text style={styles.userTitle}>
            Bem vindo de volta, {usuario.nome}
          </Text>

          {possuiAgendamentos ? (
            <>
              <View style={globalStyles.homeButtons}>
                {usuario.tipo == "CLIENTE" ? (
                  <>
                    <Text style={styles.title}>Agendamentos Pendentes</Text>
                    {agendamentos_pendentes.length > 0 ? (
                      agendamentos_pendentes.map((item) => (
                        <AgendamentoCard
                          key={item.id}
                          servico={item.servico.nome}
                          oficina={item.servico.oficina.nome}
                          data={item.data}
                          status={item.status}
                          onPress={() => router.push(`agendamento/${item.id}`)}
                        />
                      ))
                    ) : (
                      <Text style={styles.normalText}>
                        Sem agendamentos pendentes
                      </Text>
                    )}
                  </>
                ) : (
                  oficinas.map((item) => <h1 key={item.id}>Teste</h1>)
                )}
              </View>
              <View style={globalStyles.homeButtons}>
                <Text style={styles.title}>Histórico de Agendamentos</Text>
                {agendamentos_historico.map((item) => (
                  <AgendamentoCard
                    key={item.id}
                    servico={item.servico.nome}
                    oficina={item.servico.oficina.nome}
                    data={item.data}
                    status={item.status}
                    onPress={() => router.push(`agendamento/${item.id}`)}
                  />
                ))}
              </View>
            </>
          ) : (
            <Text style={styles.normalText}>Não possui agendamentos. </Text>
          )}
        </ScrollView>

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
  normalText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    margin: 5,
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
  telaServicos: {
    // justifyContent: "flex-start",
    width: "100%",
    paddingTop: 30,
    height: "83%",
  },
});

export default TelaAgendamento;
