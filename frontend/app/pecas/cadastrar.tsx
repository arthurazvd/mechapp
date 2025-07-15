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
  <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
  <View style={[globalStyles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
    <View style={globalStyles.crudTop}>
      <BackButton color={colors.white} />
      <Image
        source={require("../../assets/logo-nome.png")}
        style={styles.logoNome}
        resizeMode="contain"
      />
    </View>

    <ScrollView
      style={globalStyles.crudBottom}
      contentContainerStyle={styles.scrollContentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[globalStyles.title, styles.pageTitle]}>Cadastrar Nova Peça</Text>

      <View style={styles.formContainer}>
        <CustomInput
          label="Nome da Peça"
          value={nome}
          onChangeText={setNome}
          placeholder="Ex: Filtro de óleo"
          placeholderTextColor="#868686"
          contentStyle={{ width: "100%" }}
          style={styles.inputField}
        />

        <ExpandingTextArea
          label="Descrição"
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Detalhe o uso, marca, ou tipo da peça..."
          placeholderTextColor="#868686"
          containerStyle={styles.inputField}
          inputStyle={{ width: "100%" }}
          minHeight={80}
        />

        <View style={[pecStyles.precoInput, styles.row]}>
          <CustomInput
            label="Quantidade"
            value={String(quantidade)}
            onChangeText={handleQuantidadeChange}
            placeholder="0"
            placeholderTextColor="#868686"
            keyboardType="numeric"
            onlyNumbers={true}
            contentStyle={{ width: "100%" }}
            style={[styles.inputField, styles.inputHalf]}
          />

          <CustomInput
            label="Preço"
            value={precoFormatado}
            onChangeText={handlePrecoChange}
            placeholder="R$ 0,00"
            placeholderTextColor="#868686"
            keyboardType="numeric"
            contentStyle={{ width: "100%" }}
            style={[styles.inputField, styles.inputHalf]}
          />
        </View>

        <ImagePickerInput imagem={imagem} setImagem={setImagem} />

        <View style={[pecStyles.crudButtons, styles.buttonsRow]}>
          <CustomButton
            style={[styles.actionButton, styles.cancelButton]}
            textStyle={styles.cancelButtonText}
            title="Cancelar"
            onPress={() => router.back()}
          />
          <CustomButton
            style={styles.actionButton}
            title="Cadastrar"
            onPress={handleCadastroPeca}
          />
        </View>
      </View>
    </ScrollView>
    <BottomNavigation />
  </View>
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
  logoNome: {
  width: 100,
  height: 60,
  },
  formContainer: {
    width: '90%',
    maxWidth: 500,
  },
  inputField: {
    marginBottom: spacing.medium,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.medium,
  },
  inputHalf: {
    flex: 1,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.large,
  },
  actionButton: {
    width: "48%",
    height: 50,
  },
  cancelButton: {
    backgroundColor: colors.surface,
  },
  cancelButtonText: {
    color: colors.textSecondary,
  },

});

export default CadastrarPecaScreen;
