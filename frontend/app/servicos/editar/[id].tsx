import React, { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, Text, StatusBar } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { Checkbox } from "expo-checkbox";
import { Image } from "react-native";
import { CustomInput } from "../../../components/CustomInput";
import { CustomButton } from "../../../components/CustomButton";
import { BackButton } from "../../../components/BackButton";
import { globalStyles } from "../../../styles/globalStyles";
import { servStyles } from "../../../styles/servStyles";
import { ExpandingTextArea } from "../../../components/ExpandingTextArea";
import { BottomNavigation } from "../../../components/BottomNavigation";

// API
import { servico } from "../../../api/index";

const EditarServico = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tempo, setTempo] = useState("");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [oficina, setOficina] = useState({
    id: "",
  });
  const [loading, setLoading] = useState(true);

  const insets = useSafeAreaInsets();

  const fetchServico = async () => {
    const data = await servico.consultar_servico(id);

    setNome(data.nome);
    setDescricao(data.descricao);
    setTempo(data.tempo);
    setPrecoMin(data.preco_min);
    setPrecoMax(data.preco_max);
    setOficina(data.oficina);

    setLoading(false);
  };

  useEffect(() => {
    fetchServico();
  }, []);

  const handleDeletar = async () => {
    const data = await servico.remover_servico(id);

    alert(data.mensagem);
    if (data.error) {
      return;
    }

    router.push(`servicos/listar/${oficina.id}`);
  };

  const handleSalvar = async () => {
    const data = await servico.alterar_servico(
      {
        nome,
        descricao,
        tempo: Number(tempo),
        preco_min: Number(precoMin),
        preco_max: Number(precoMax),
      },
      id
    );

    alert(data.mensagem);
    if (data.error) {
      return;
    }

    fetchServico();
  };

  if (loading) {
    return <h1>Carregando serviço...</h1>;
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
          <Text style={globalStyles.title}>Editar Serviço</Text>
          <CustomInput
            label="Nome"
            placeholder="Digite o nome do serviço"
            placeholderTextColor="#868686"
            value={nome}
            onChangeText={setNome}
            contentStyle={{ width: "80%", maxWidth: 400 }}
          />
          <ExpandingTextArea
            label="Descrição"
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Digite a descrição do serviço..."
            placeholderTextColor="#868686"
            containerStyle={{ alignItems: "center" }}
            inputStyle={{ maxWidth: 400, width: "100%" }}
          />
          <CustomInput
            label="Tempo estimado"
            placeholder="Digite o tempo"
            placeholderTextColor="#868686"
            keyboardType="numeric"
            onlyNumbers={true}
            value={tempo}
            onChangeText={setTempo}
            contentStyle={{ width: "80%", maxWidth: 400 }}
          />
          <View style={servStyles.precoInput}>
            <CustomInput
              label="Preço Min"
              placeholder="R$ 0,00"
              placeholderTextColor="#868686"
              keyboardType="numeric"
              onChangeText={setPrecoMin}
              value={precoMin}
              contentStyle={{ width: "100%", maxWidth: 200 }}
              style={{ width: "49%" }}
            />
            <CustomInput
              label="Preço Max"
              placeholder="R$ 0,00"
              placeholderTextColor="#868686"
              keyboardType="numeric"
              onChangeText={setPrecoMax}
              value={precoMax}
              contentStyle={{ width: "100%", maxWidth: 200 }}
              style={{ width: "49%" }}
            />
          </View>
          <View style={servStyles.crudButtons}>
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
              onPress={() => handleDeletar()}
            />
            <CustomButton
              style={{ width: "25%", maxWidth: 127, height: 50 }}
              title="Salvar"
              onPress={() => handleSalvar()}
            />
          </View>
        </View>
        <BottomNavigation />
      </View>
    </>
  );
};

export default EditarServico;
