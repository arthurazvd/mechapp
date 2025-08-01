import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BottomNavigation } from "../../components/BottomNavigation";
import { BackButton } from "../../components/BackButton";
import { globalStyles } from "../../styles/globalStyles";
import { cliStyles } from "../../styles/cliStyles";
import { useRouter } from "expo-router";

// API
import { oficina } from "../../api";

const ListaOficinas = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario_atual")!)
  );

  const [oficinas, setOficinas] = useState([
    {
      id: "",
      nome: "",
      endereco: "",
      proprietario: {},
    },
  ]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    const fetchPecas = async () => {
      var data = [
        {
          id: "",
          nome: "",
          endereco: "",
          proprietario: {},
        },
      ];

      if (usuario.tipo === "MECANICO") {
        data = await oficina.listar_oficinas(usuario.id);
      } else {
        data = await oficina.listar_oficinas();
      }
      setOficinas(data);
    };
    fetchPecas();
  }, []);

  const resolveEditor = (item: any) => {
    if (usuario.tipo === "MECANICO") {
      router.push(`oficina/editar/${item.id}`);
    } else {
      router.push(`oficina/${item.id}`);
    }
  };

  const oficinasFiltradas = oficinas.filter((peca) =>
    peca.nome.toLowerCase().includes(busca.toLowerCase())
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
            source={require("../../assets/logo-nome.png")}
            style={{ width: 100, height: 190 }}
            resizeMode="contain"
          />
        </View>

        <View style={cliStyles.searchContainer}>
          <TextInput
            placeholder="Buscar oficina..."
            placeholderTextColor="#aaa"
            value={busca}
            onChangeText={setBusca}
            style={cliStyles.searchInput}
          />
          {usuario.tipo == "MECANICO" ? (
            <TouchableOpacity
              style={cliStyles.filterButton}
              onPress={() => router.push("oficina/cadastrar")}
            >
              <Feather name="plus" size={20} color="#fff" />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>

        <FlatList
          data={oficinasFiltradas}
          keyExtractor={(item) => item.id}
          contentContainerStyle={cliStyles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={cliStyles.card}
              onPress={() => resolveEditor(item)}
            >
              <View style={cliStyles.placeholderImage}>
                <Feather name="map-pin" size={24} color="#888" />
              </View>

              <TouchableOpacity
                style={cliStyles.cardInfo}
                onPress={() => resolveEditor(item)}
              >
                <Text style={cliStyles.cardTitle}>{item.nome}</Text>
                <Text style={cliStyles.cardSubtitle}>{item.endereco}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />

        <BottomNavigation activeRoute="oficinas" />
      </View>
    </>
  );
};

export default ListaOficinas;
