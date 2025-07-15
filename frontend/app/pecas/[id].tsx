import React, { useState, useEffect } from "react";
import { View, Text, Image, StatusBar } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { InfoView } from "../../components/InfoView";
import { CustomButton } from "../../components/CustomButton";
import { BackButton } from "../../components/BackButton";
import { BottomNavigation } from "../../components/BottomNavigation";

import { globalStyles } from "../../styles/globalStyles";
import { pecStyles } from "../../styles/pecStyles";

// API
import { peca } from "../../api";

const VisualizarPeca = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [loading, setLoading] = useState(true);
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchPeca = async () => {
      const data = await peca.consultar_peca(id);

      // Dados não foram enviados.
      if (Object.keys(data).length === 0) {
        alert("Não existe uma peça com esse identificador.");
        return;
      }

      // Alterando setters
      setNome(data.nome);
      setDescricao(data.descricao);
      setQuantidade(data.quantidade);
      setPreco(`R$${data.preco}`);
    };

    fetchPeca();
    setLoading(false);
  }, [id]);

  if (loading) {
    return <h1>Carregando informações...</h1>;
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
        <View style={globalStyles.crudBottom}>
          <View style={pecStyles.viewPecas}>
            <Text style={[globalStyles.title, { flex: 1, flexWrap: "wrap" }]}>
              {nome}
            </Text>
            <Image
              source={require("../../assets/pneu.jpg")}
              style={{ width: 150, height: 150, borderRadius: 8 }}
              resizeMode="cover"
            />
          </View>

          <InfoView label="Descrição" value={descricao} />
          <InfoView label="Quantidade" value={quantidade} />
          <InfoView label="Preço" value={preco} />

          <CustomButton
            style={{ width: "80%", maxWidth: 400, height: 50, marginTop: 20 }}
            title="Editar"
            onPress={() => router.push("/pecas/editar")}
          />
        </View>
        <BottomNavigation />
      </View>
    </>
  );
};

export default VisualizarPeca;
