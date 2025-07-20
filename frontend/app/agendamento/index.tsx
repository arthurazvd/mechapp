// React
import React, { useState, useEffect } from "react";
import {
  View,
  StatusBar,
  Image,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

// Componentes
import { BackButton } from "../../components/BackButton";
import { BottomNavigation } from "../../components/BottomNavigation";
import { AgendamentoCard } from "../../components/AgendamentoCard";
import CustomButton from "../../components/CustomButton";
import HorizontalRule from "../../components/HorizontalRule";

// Styles
import { globalStyles } from "../../styles/globalStyles";

// API
import { agendamento, oficina } from "../../api/index";

interface AgendamentosOrganizados {
  oficina?: string;
  pendente_list: agendamento.Agendamento[];
  historic_list: agendamento.Agendamento[];
}

const TelaAgendamento = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [usuario, setUsuario] = useState(() => {
    const data = localStorage.getItem("usuario_atual");
    return data ? JSON.parse(data) : null;
  });

  const [loading, setLoading] = useState(true);
  const [possuiAgendamentos, setPossuiAgendamentos] = useState(false);

  // Para mecânico
  const [oficinas, setOficina] = useState<oficina.Oficina[]>([]);
  const [oficinaAgendamentos, setOficinaAgendamentos] = useState<
    AgendamentosOrganizados[]
  >([]);

  // Para cliente
  const [agendamentos_historico, setAgendamentosHistoricos] = useState<
    agendamento.Agendamento[]
  >([]);
  const [agendamentos_pendentes, setAgendamentsPendentes] = useState<
    agendamento.Agendamento[]
  >([]);

  const organizarAgendamentos = (
    agendamentos: agendamento.Agendamento[]
  ): AgendamentosOrganizados => {
    const pendente_list = agendamentos
      .filter((a) => a.status === "PENDENTE")
      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

    const outros = agendamentos.filter((a) => a.status !== "PENDENTE");

    const statusOrder = {
      CONFIRMADO: 1,
      CONCLUIDO: 2,
      CANCELADO: 3,
      PENDENTE: 4,
    };

    const historic_list = outros.sort((a, b) => {
      const statusDiff = statusOrder[a.status] - statusOrder[b.status];
      if (statusDiff !== 0) return statusDiff;
      return new Date(b.data).getTime() - new Date(a.data).getTime();
    });

    return { pendente_list, historic_list };
  };

  const fetchOficinasAgendamentos = async () => {
    try {
      const data = await oficina.listar_oficinas(usuario.id);
      if (data.length === 0) return;

      setOficina(data);
      setPossuiAgendamentos(true);

      const todasAgendas: AgendamentosOrganizados[] = [];

      for (const ofi of data) {
        const agendamentos = await agendamento.listar_agendamentos(
          undefined,
          ofi.id
        );

        if (agendamentos.length > 0) {
          const { pendente_list, historic_list } =
            organizarAgendamentos(agendamentos);
          todasAgendas.push({
            oficina: ofi.nome,
            pendente_list,
            historic_list,
          });
        } else {
          todasAgendas.push({
            oficina: ofi.nome,
            pendente_list: [],
            historic_list: [],
          });
        }
      }
      setOficinaAgendamentos(todasAgendas);
    } catch (error) {
      console.error("Erro ao carregar oficinas:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAgendamentos = async () => {
    try {
      const data = await agendamento.listar_agendamentos(usuario.id);
      if (data.length === 0) return;

      const { pendente_list, historic_list } = organizarAgendamentos(data);
      setAgendamentsPendentes(pendente_list);
      setAgendamentosHistoricos(historic_list);
      setPossuiAgendamentos(true);
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!usuario) return;

    if (usuario.tipo === "MECANICO") {
      fetchOficinasAgendamentos();
    } else {
      fetchAgendamentos();
    }
  }, []);

  if (loading) {
    return (
      <View
        style={[
          globalStyles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Carregando...</Text>
      </View>
    );
  }

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

          {usuario.tipo === "MECANICO" ? (
            <View style={{ alignItems: "center", marginVertical: 10 }}>
              <CustomButton
                style={{
                  width: "100%",
                  maxWidth: 200,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                title="Criar Nova Oficina"
                onPress={() => router.push("oficina/cadastrar")}
              />
            </View>
          ) : null}

          {possuiAgendamentos ? (
            usuario.tipo === "CLIENTE" ? (
              <>
                <View style={globalStyles.homeButtons}>
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
                </View>
                <View style={globalStyles.homeButtons}>
                  <Text style={styles.title}>Histórico de Agendamentos</Text>
                  {agendamentos_historico.length > 0 ? (
                    agendamentos_historico.map((item) => (
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
                      Sem agendamentos no histórico
                    </Text>
                  )}
                </View>
              </>
            ) : (
              oficinaAgendamentos.map((item) => (
                <View key={item.oficina}>
                  <HorizontalRule />
                  <Text style={styles.title}>{item.oficina}</Text>
                  <View style={globalStyles.homeButtons}>
                    <Text style={styles.oficinaTitle}>
                      Agendamentos Pendentes
                    </Text>
                    {item.pendente_list.length > 0 ? (
                      item.pendente_list.map((ag) => (
                        <AgendamentoCard
                          key={ag.id}
                          servico={ag.servico.nome}
                          oficina={ag.servico.oficina.nome}
                          data={ag.data}
                          status={ag.status}
                          onPress={() => router.push(`agendamento/${ag.id}`)}
                        />
                      ))
                    ) : (
                      <Text style={styles.normalText}>Sem pendentes</Text>
                    )}
                  </View>
                  <View style={globalStyles.homeButtons}>
                    <Text style={styles.oficinaTitle}>
                      Histórico de Agendamentos
                    </Text>
                    {item.historic_list.length > 0 ? (
                      item.historic_list.map((ag) => (
                        <AgendamentoCard
                          key={ag.id}
                          servico={ag.servico.nome}
                          oficina={ag.servico.oficina.nome}
                          data={ag.data}
                          status={ag.status}
                          onPress={() => router.push(`agendamento/${ag.id}`)}
                        />
                      ))
                    ) : (
                      <Text style={styles.normalText}>Sem histórico</Text>
                    )}
                  </View>
                </View>
              ))
            )
          ) : (
            <Text style={styles.normalText}>Não possui agendamentos.</Text>
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
  oficinaTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 5,
    color: "white",
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
    width: "100%",
    paddingTop: 30,
    height: "83%",
  },
});

export default TelaAgendamento;
