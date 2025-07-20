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
import { oficina } from "../../api";

const VisualizarOficina = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");
  const [proprietario, setProprietario] = useState({
    id: "",
    nome: "",
    email: "",
    telefone: "",
  });
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario_atual")!)
  );

  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchPeca = async () => {
      const data = await oficina.consultar_oficina(id);

      // Dados não foram enviados.
      if (Object.keys(data).length === 0) {
        alert("Não existe uma oficina com esse identificador.");
        return;
      }

      // Alterando setters
      setNome(data.nome);
      setCnpj(data.cnpj);
      setProprietario(data.proprietario);
      setEndereco(data.endereco);
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
          </View>

          <InfoView label="Endereço" value={endereco} />
          <InfoView label="CNPJ" value={cnpj} />
          <InfoView label="Proprietário" value={proprietario.nome} />
          <InfoView
            label="Telefone do Proprietario"
            value={proprietario.telefone}
          />
          {usuario.tipo == "BARBEIRO" ? (
            <CustomButton
              style={{ width: "80%", maxWidth: 400, height: 50, marginTop: 20 }}
              title="Editar"
              onPress={() => router.push(`/oficina/editar/${id}`)}
            />
          ) : null}
        </View>
        <BottomNavigation activeRoute="oficinas" />
      </View>
    </>
  );
};

export default VisualizarOficina;
