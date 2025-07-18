import React, { useState } from "react";
import { View, Text, Image, StatusBar } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CustomInput } from "../../../components/CustomInput";
import { ExpandingTextArea } from "../../../components/ExpandingTextArea";
import { CustomButton } from "../../../components/CustomButton";
import { BackButton } from "../../../components/BackButton";
import { BottomNavigation } from "../../../components/BottomNavigation";

import { globalStyles } from "../../../styles/globalStyles";
import { servStyles } from "../../../styles/servStyles";

// API
import { servico } from "../../../api";

const CadastrarServico = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tempo, setTempo] = useState("");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecomax] = useState("");

  const handleCadastrar = async () => {
    if (!nome || !descricao || !tempo || !precoMin || !precoMax) {
      alert("Preencha todos os campos.");
    }

    const data = await servico.criar_servico({
      nome,
      descricao,
      tempo: Number(tempo),
      preco_min: Number(precoMin),
      preco_max: Number(precoMax),
      oficina_id: id,
    });

    alert(data.mensagem);
    if (data.error) {
      return;
    }

    router.push(`servicos/${data.servico_id}`);
  };

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
            style={{ width: 100 }}
            resizeMode="contain"
          />
        </View>

        <View style={globalStyles.crudBottom}>
          <Text style={globalStyles.title}>Cadastrar Serviço</Text>
          <CustomInput
            label="Nome"
            placeholder="Digite o nome do serviço"
            placeholderTextColor="#868686"
            onChangeText={setNome}
            value={nome}
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
              onChangeText={setPrecomax}
              value={precoMax}
              contentStyle={{ width: "100%", maxWidth: 200 }}
              style={{ width: "49%" }}
            />
          </View>
          <View style={servStyles.crudButtons}>
            <CustomButton
              style={{
                width: "39%",
                maxWidth: 193,
                height: 50,
                backgroundColor: "#868686",
              }}
              title="Cancelar"
              onPress={handleCadastrar}
            />
            <CustomButton
              style={{ width: "39%", maxWidth: 193, height: 50 }}
              title="Cadastrar"
              onPress={handleCadastrar}
            />
          </View>
        </View>
        <BottomNavigation />
      </View>
    </>
  );
};

export default CadastrarServico;
