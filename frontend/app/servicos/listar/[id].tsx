import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Image,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomNavigation } from "../../../components/BottomNavigation";
import { BackButton } from "../../../components/BackButton";
import { globalStyles } from "../../../styles/globalStyles";
import { cliStyles } from "../../../styles/cliStyles";
import { useLocalSearchParams, useRouter } from "expo-router";

// API
import { servico } from "../../../api";

const ListaServicos = () => {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario_atual")!)
  );
  const [servicos, setServicos] = useState([
    {
      id: "",
      nome: "",
      descricao: "",
      tempo: 0,
      preco_min: 0,
      preco_max: 0,
      servico_id: "",
      oficina: "",
    },
  ]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    const fetchPecas = async () => {
      const data = await servico.listar_servicos(id);

      if (data.error) {
        console.log(data.mensagem);
        router.push(`servicos/escolher`);
        return;
      }

      console.log(data);
      setServicos(data);
    };
    fetchPecas();
  }, []);

  const oficinasFiltradas = servicos.filter((servico) =>
    servico.nome.toLowerCase().includes(busca.toLowerCase())
  );

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
            source={require("../../../assets/logo-nome.png")}
            style={{ width: 100, height: 190 }}
            resizeMode="contain"
          />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Escolha um Serviço</Text>
        </View>

        <View style={cliStyles.searchContainer}>
          <TextInput
            placeholder="Buscar Serviço da Oficina"
            placeholderTextColor="#aaa"
            value={busca}
            onChangeText={setBusca}
            style={cliStyles.searchInput}
          />
          {usuario.tipo == "MECANICO" ? (
            <TouchableOpacity
              style={cliStyles.filterButton}
              onPress={() => router.push(`servicos/cadastrar/${id}`)}
            >
              <Feather name="plus" size={20} color="#fff" />
            </TouchableOpacity>
          ) : null}
        </View>

        <FlatList
          data={oficinasFiltradas}
          keyExtractor={(item) => item.id}
          contentContainerStyle={cliStyles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={cliStyles.card}
              onPress={() => router.push(`servicos/${item.id}`)}
            >
              <View style={cliStyles.placeholderImage}>
                <Feather name="layers" size={24} color="#888" />
              </View>

              <TouchableOpacity
                style={cliStyles.cardInfo}
                onPress={() => router.push(`servicos/${item.id}`)}
              >
                <Text style={cliStyles.cardTitle}>{item.nome}</Text>
                <Text style={cliStyles.cardSubtitle}>{item.descricao}</Text>
                <Text style={cliStyles.cardSubtitle}>
                  Preços: R${item.preco_min} ~ R${item.preco_max}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />

        <BottomNavigation activeRoute="servicos" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    letterSpacing: 1,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    marginTop: 12,
  },
});

export default ListaServicos;
