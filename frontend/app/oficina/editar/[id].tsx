import React, { useEffect, useState } from "react";
import { View, Text, Image, StatusBar } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CustomInput } from "../../../components/CustomInput";
import { ExpandingTextArea } from "../../../components/ExpandingTextArea";
import { CustomButton } from "../../../components/CustomButton";
import { ImagePickerInput } from "../../../components/ImagePickerInput";
import { BackButton } from "../../../components/BackButton";
import { BottomNavigation } from "../../../components/BottomNavigation";

import { globalStyles } from "../../../styles/globalStyles";
import { pecStyles } from "../../../styles/pecStyles";
import { formatarPreco } from "../../../utils/formatters";

// API
import { oficina } from "../../../api";

const EditarPecas = () => {
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

  const insets = useSafeAreaInsets();

  // Carregando as informações da peça
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

  const handleAlteracaoOficina = async () => {
    const data = await oficina.alterar_oficina({ nome, endereco, cnpj }, id);

    alert(data.mensagem);
    if (data.error) {
      return;
    }

    router.replace(`/oficina/${id}`);
  };

  const handleRemocaoOficina = async () => {
    const data = await oficina.remover_oficina(id);

    alert(data.mensagem);
    if (data.error) {
      return;
    }

    alert("Oficina removida!");
    router.replace("/agendamento/servicos");
  };

  if (loading) {
    return <h1>Carregando informações da oficina...</h1>;
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
            source={require("../../../assets/logo-nome.png")}
            style={{ width: 100, height: 190 }}
            resizeMode="contain"
          />
        </View>

        <View style={globalStyles.crudBottom}>
          <Text style={globalStyles.title}>Editar Oficicna</Text>
          <CustomInput
            label="Nome"
            value={nome}
            placeholder="Digite o nome da oficina"
            onChangeText={setNome}
            contentStyle={{ width: "80%", maxWidth: 400 }}
          />
          <CustomInput
            label="CNPJ"
            value={cnpj}
            placeholder="Digite o cnpj da oficina"
            onChangeText={setCnpj}
            contentStyle={{ width: "80%", maxWidth: 400 }}
          />
          <CustomInput
            label="Endereço"
            value={endereco}
            placeholder="Digite o endereço da oficina"
            onChangeText={setEndereco}
            contentStyle={{ width: "80%", maxWidth: 400 }}
          />

          <View style={pecStyles.crudButtons}>
            <CustomButton
              style={{
                width: "25%",
                maxWidth: 127,
                height: 50,
                backgroundColor: "#868686",
              }}
              title="Cancelar"
              onPress={() => router.back()}
            />
            <CustomButton
              style={{
                width: "25%",
                maxWidth: 127,
                height: 50,
                backgroundColor: "#868686",
              }}
              title="Deletar"
              onPress={handleRemocaoOficina}
            />
            <CustomButton
              style={{ width: "25%", maxWidth: 127, height: 50 }}
              title="Salvar"
              onPress={handleAlteracaoOficina}
            />
          </View>
        </View>
        <BottomNavigation activeRoute="oficinas" />
      </View>
    </>
  );
};

export default EditarPecas;
