import React, { useState } from "react";
import { View, Text, Image, StatusBar, StyleSheet, ScrollView, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";

import { CustomInput } from "../../components/CustomInput";
import { ExpandingTextArea } from "../../components/ExpandingTextArea";
import { CustomButton } from "../../components/CustomButton";
import { ImagePickerInput } from "../../components/ImagePickerInput";
import { BackButton } from "../../components/BackButton";
import { BottomNavigation } from "../../components/BottomNavigation";

import { globalStyles, colors, spacing } from "../../styles/globalStyles";
import { pecStyles } from "../../styles/pecStyles";
import { formatarPreco } from "../../utils/formatters";

// API
import { peca } from "../../api";

const CadastrarPecaScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState(0);
  const [preco, setPreco] = useState(0);
  const [precoFormatado, setPrecoFormatado] = useState("");
  const [imagem, setImagem] = useState<string | null>(null);

  const handlePrecoChange = (text: string) => {
    const { precoFormatado, precoReal } = formatarPreco(text);
    setPrecoFormatado(precoFormatado);
    setPreco(precoReal);
  };

  const handleQuantidadeChange = (text: string) => {
    setQuantidade(Number(text));
  };

  const pegarImagemComoBytes = async (uri: string | null): Promise<string | null> => {
    if (!uri) return null;
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64;
  };

  const handleCadastroPeca = async () => {
    if (!nome || !descricao || !quantidade || !preco) {
      Alert.alert("Erro", "Todos os campos são obrigatórios, exceto a imagem.");
      return;
    }

    try {
      const imagemBytes = await pegarImagemComoBytes(imagem);

      const data = await peca.criar_peca({
        nome,
        descricao,
        quantidade,
        preco,
        imagem: imagemBytes,
      });

      if (data.error) {
        Alert.alert("Erro", data.mensagem || "Erro ao cadastrar peça.");
        return;
      }

      Alert.alert("Sucesso", "Peça cadastrada com sucesso!");
      router.replace("/agendamento/historico");

    } catch (error) {
      console.error("Erro ao cadastrar peça:", error);
      Alert.alert("Erro", "Erro inesperado ao cadastrar a peça.");
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#A10000" barStyle="light-content" />
      <View style={[globalStyles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View style={globalStyles.crudTop}>
          <BackButton />
          <Image
            source={require("../../assets/logo-nome.png")}
            style={{ width: 100, height: 190 }}
            resizeMode="contain"
          />
        </View>

        <ScrollView
          style={globalStyles.crudBottom}
          contentContainerStyle={styles.scrollContentContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={[globalStyles.title, styles.pageTitle]}>Cadastrar Nova Peça</Text>

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
              style={{ width: "39%", maxWidth: 193, height: 50, backgroundColor: "#868686" }}
              title="Cancelar"
              onPress={() => router.back()}
            />
            <CustomButton
              style={{ width: "39%", maxWidth: 193, height: 50 }}
              title="Cadastrar"
              onPress={handleCadastroPeca}
            />
          </View>
        </ScrollView>
      </View>
      <BottomNavigation />
    </>
  );
};

const styles = StyleSheet.create({
  scrollContentContainer: {
    paddingBottom: spacing.large,
    alignItems: "center",
  },
  pageTitle: {
    marginBottom: spacing.large,
  },
});

export default CadastrarPecaScreen;
