import React, { useState } from "react";
import { View, Text, Image, StatusBar } from "react-native";
import { useRootNavigationState, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CustomInput } from "../../components/CustomInput";
import { ExpandingTextArea } from "../../components/ExpandingTextArea";
import { CustomButton } from "../../components/CustomButton";
import { ImagePickerInput } from "../../components/ImagePickerInput";
import { BackButton } from "../../components/BackButton";
import { BottomNavigation } from "../../components/BottomNavigation";

import { globalStyles } from "../../styles/globalStyles";
import { pecStyles } from "../../styles/pecStyles";
import { formatarPreco } from "../../utils/formatters";

// API
import { oficina, usuario } from "../../api";

const CadastrarOficina = () => {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");

  const insets = useSafeAreaInsets();

  const handleCadastroPeca = async () => {
    if (!nome || !cnpj || !endereco) {
      alert("Preencha todos os campos.");
      return;
    }

    const proprietario = JSON.parse(localStorage.getItem("usuario_atual")!);
    const data = await oficina.criar_oficina(proprietario.id, {
      nome,
      cnpj,
      endereco,
    });

    alert(data.mensagem);
    if (data.error) {
      return;
    }

    return router.replace("/agendamento/servicos");
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
            source={require("../../assets/logo-nome.png")}
            style={{ width: 100, height: 190 }}
            resizeMode="contain"
          />
        </View>

        <View style={globalStyles.crudBottom}>
          <Text style={globalStyles.title}>Cadastrar Oficina</Text>

          <CustomInput
            label="Nome"
            value={nome}
            onChangeText={setNome}
            placeholder="Digite o Nome da Oficina"
            placeholderTextColor="#868686"
            contentStyle={{ width: "80%", maxWidth: 400 }}
          />

          <CustomInput
            label="CNPJ"
            value={cnpj}
            onChangeText={setCnpj}
            placeholder="Digite o CNPJ da Oficina"
            placeholderTextColor="#868686"
            contentStyle={{ width: "80%", maxWidth: 400 }}
          />

          <CustomInput
            label="Endereço"
            value={endereco}
            onChangeText={setEndereco}
            placeholder="Digite o Endereço da Oficina"
            placeholderTextColor="#868686"
            contentStyle={{ width: "80%", maxWidth: 400 }}
          />

          <View style={pecStyles.crudButtons}>
            <CustomButton
              style={{
                width: "39%",
                maxWidth: 193,
                height: 50,
                backgroundColor: "#868686",
              }}
              title="Cancelar"
              onPress={() => router.back()}
            />
            <CustomButton
              style={{ width: "39%", maxWidth: 193, height: 50 }}
              title="Cadastrar"
              onPress={handleCadastroPeca}
            />
          </View>
        </View>
        <BottomNavigation />
      </View>
    </>
  );
};

export default CadastrarOficina;
