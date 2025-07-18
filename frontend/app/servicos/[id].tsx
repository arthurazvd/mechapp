import React, { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "react-native";
import { BackButton } from "../../components/BackButton";
import { globalStyles } from "../../styles/globalStyles";
import { BottomNavigation } from "../../components/BottomNavigation";
import { View, Text, StatusBar } from "react-native";
import InfoView from "../../components/InfoView";
import CustomButton from "../../components/CustomButton";

// API
import { servico } from "../../api/index";

const VisualizarServico = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tempo, setTempo] = useState("");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecomax] = useState("");

  useEffect(() => {
    const fetchServico = async () => {
      const data = await servico.consultar_servico(id);

      setNome(data.nome);
      setDescricao(data.descricao);
      setTempo(data.tempo);
      setPrecoMin(data.preco_min);
      setPrecomax(data.preco_max);
    };
    fetchServico();
  });

  const insets = useSafeAreaInsets();

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
          <Text style={globalStyles.title}>{nome}</Text>
          <InfoView label="Descrição" value={descricao} />
          <InfoView label="Tempo estimado" value={tempo} />
          <InfoView label="Preço Mínimo" value={precoMin} />
          <InfoView label="Preço Máximo" value={precoMax} />
          <CustomButton
            style={{ width: "80%", maxWidth: 400, height: 50, marginTop: 20 }}
            title="Editar"
            onPress={() => router.push(`/servicos/editar/${id}`)}
          />
        </View>
        <BottomNavigation />
      </View>
    </>
  );
};

export default VisualizarServico;
