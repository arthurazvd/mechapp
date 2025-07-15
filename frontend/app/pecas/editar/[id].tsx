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
import { peca } from "../../../api";

const EditarPecas = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState(0);
  const [imagem, setImagem] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState(16);
  const [fabricante, setFabricante] = useState("");
  const [precoFormatado, setPrecoFormatado] = useState("");

  const insets = useSafeAreaInsets();

  const handlePrecoChange = (text: string) => {
    const { precoFormatado, precoReal } = formatarPreco(text);
    setPrecoFormatado(precoFormatado);
    setPreco(precoReal);
  };

  // Carregando as informações da peça
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
      setPrecoFormatado(`R$${data.preco}`);
      setPreco(data.preco);
    };

    fetchPeca();
    setLoading(false);
  }, [id]);

  const handleQuantidadeChange = (text: string) => {
    setQuantidade(Number(text));
  };

  const handleAlteracaoPeca = async () => {
    const data = await peca.alterar_peca(
      { nome, descricao, quantidade, preco, imagem },
      id
    );

    if (data.error) {
      alert(data.mensagem);
      return;
    }

    alert("Peça atualizada!");
    router.replace(`/pecas/editar/${id}`);
  };

  const handleRemocaoPeca = async () => {
    const data = await peca.remover_peca(id);

    if (data.error) {
      alert(data.mensagem);
      return;
    }

    alert("Peça removida!");
    router.replace("/agendamento/historico");
  };

  if (loading) {
    return <h1>Carregando informações da peça...</h1>;
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
          <Text style={globalStyles.title}>Editar Peça</Text>
          <CustomInput
            label="Nome"
            value={nome}
            placeholder="Digite o nome da peça"
            onChangeText={setNome}
            contentStyle={{ width: "80%", maxWidth: 400 }}
          />
          <ExpandingTextArea
            label="Descrição"
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Digite a descrição do peciço..."
            containerStyle={{ alignItems: "center" }}
            inputStyle={{ maxWidth: 400, width: "100%" }}
          />
          <View style={pecStyles.precoInput}>
            <CustomInput
              label="Quantidade"
              placeholder="0"
              keyboardType="numeric"
              onlyNumbers={true}
              onChangeText={handleQuantidadeChange}
              value={String(quantidade)}
              contentStyle={{ width: "100%", maxWidth: 200 }}
              style={{ width: "49%" }}
            />
            <CustomInput
              label="Preço"
              placeholder="R$ 0,00"
              keyboardType="numeric"
              onChangeText={handlePrecoChange}
              value={precoFormatado}
              contentStyle={{ width: "100%", maxWidth: 200 }}
              style={{ width: "49%" }}
            />
          </View>
          <ImagePickerInput imagem={imagem} setImagem={setImagem} />

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
              onPress={handleRemocaoPeca}
            />
            <CustomButton
              style={{ width: "25%", maxWidth: 127, height: 50 }}
              title="Salvar"
              onPress={handleAlteracaoPeca}
            />
          </View>
        </View>
        <BottomNavigation />
      </View>
    </>
  );
};

export default EditarPecas;
