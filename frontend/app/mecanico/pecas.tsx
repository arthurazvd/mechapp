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
import { peca } from "../../api";

const ListaPecas = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [pecas, setPecas] = useState([
    {
      id: "",
      nome: "",
      descricao: "",
    },
  ]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    const fetchPecas = async () => {
      const data = await peca.listar_pecas();
      setPecas(data);
    };
    fetchPecas();
  }, []);

  const pecasFiltradas = pecas.filter((peca) =>
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
            placeholder="Buscar peça..."
            placeholderTextColor="#aaa"
            value={busca}
            onChangeText={setBusca}
            style={cliStyles.searchInput}
          />
          <TouchableOpacity
            style={cliStyles.filterButton}
            onPress={() => router.push("pecas/cadastrar")}
          >
            <Feather name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={pecasFiltradas}
          keyExtractor={(item) => item.id}
          contentContainerStyle={cliStyles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={cliStyles.card}
              onPress={() => router.push(`pecas/${item.id}`)}
            >
              <View style={cliStyles.placeholderImage}>
                <Feather name="package" size={24} color="#888" />
              </View>

              <TouchableOpacity
                style={cliStyles.cardInfo}
                onPress={() => router.push(`pecas/${item.id}`)}
              >
                <Text style={cliStyles.cardTitle}>{item.nome}</Text>
                <Text style={cliStyles.cardSubtitle}>{item.descricao}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />

        <BottomNavigation />
      </View>
    </>
  );
};

export default ListaPecas;
