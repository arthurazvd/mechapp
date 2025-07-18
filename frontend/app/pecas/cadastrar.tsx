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
import { peca } from "../../api";

const CadastrarPecas = () => {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState(0);
  const [preco, setPreco] = useState(0);
  const [precoFormatado, setPrecoFormatado] = useState("");
  const [imagem, setImagem] = useState<string | null>(null);

  const insets = useSafeAreaInsets();

  const handlePrecoChange = (text: string) => {
    const { precoFormatado, precoReal } = formatarPreco(text);
    setPrecoFormatado(precoFormatado);
    setPreco(precoReal);
  };

  const handleQuantidadeChange = (text: string) => {
    setQuantidade(Number(text));
  };

  const handleCadastroPeca = async () => {
    if (!nome || !descricao || !quantidade || !preco) {
      alert("Preencha todos os campos.");
      return;
    }

    const data = await peca.criar_peca({
      nome,
      descricao,
      quantidade,
      preco,
      imagem,
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
          <Text style={globalStyles.title}>Cadastrar Peça</Text>

          <CustomInput
            label="Nome"
            value={nome}
            onChangeText={setNome}
            placeholder="Digite o nome da peça"
            placeholderTextColor="#868686"
            contentStyle={{ width: "80%", maxWidth: 400 }}
          />

          <ExpandingTextArea
            label="Descrição"
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Digite a descrição da peça..."
            placeholderTextColor="#868686"
            containerStyle={{ alignItems: "center" }}
            inputStyle={{ maxWidth: 400, width: "100%" }}
          />

          <View style={pecStyles.precoInput}>
            <CustomInput
              label="Quantidade"
              value={String(quantidade)}
              onChangeText={handleQuantidadeChange}
              placeholder="0"
              placeholderTextColor="#868686"
              keyboardType="numeric"
              onlyNumbers={true}
              contentStyle={{ width: "100%", maxWidth: 200 }}
              style={{ width: "49%" }}
            />
            <CustomInput
              label="Preço"
              value={precoFormatado}
              onChangeText={handlePrecoChange}
              placeholder="R$ 0,00"
              placeholderTextColor="#868686"
              keyboardType="numeric"
              contentStyle={{ width: "100%", maxWidth: 200 }}
              style={{ width: "49%" }}
            />
          </View>

          <ImagePickerInput imagem={imagem} setImagem={setImagem} />

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

export default CadastrarPecas;
