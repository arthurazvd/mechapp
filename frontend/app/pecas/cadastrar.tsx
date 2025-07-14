import React, { useState } from 'react';
import { View, Text, Image, StatusBar, ScrollView, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomInput } from '../../components/CustomInput';
import { ExpandingTextArea } from '../../components/ExpandingTextArea';
import { CustomButton } from '../../components/CustomButton';
import { ImagePickerInput } from '../../components/ImagePickerInput';
import { BackButton } from '../../components/BackButton';
import { BottomNavigation } from '../../components/BottomNavigation';

import { globalStyles, colors, spacing } from '../../styles/globalStyles';
import { pecStyles } from './styles';
import { formatarPreco } from '../../utils/formatters';

const CadastrarPecaScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [fabricante, setFabricante] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState<string | null>(null);

  const handlePrecoChange = (text: string) => {
    const precoFormatado = formatarPreco(text);
    setPreco(precoFormatado);
  };

  const handleCadastrarPeca = () => {
    if (!nome || !descricao || !quantidade || !fabricante || !preco) {
      Alert.alert("Erro", "Todos os campos são obrigatórios, exceto a imagem.");
      return;
    }
    console.log("Cadastrando Peça:", { nome, descricao, quantidade, fabricante, preco, imagem });
    Alert.alert("Sucesso", "Peça cadastrada!");
    router.back();
  };

  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={[globalStyles.container, { paddingTop: insets.top, paddingBottom: insets.bottom, justifyContent: 'space-between' }]}>
        <View style={{ flex: 1 }}>
          <View style={globalStyles.crudTop}>
            <BackButton color={colors.white} />
            <Image
              source={require('../../assets/logo-nome.png')}
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
                placeholder="Ex: Filtro de Ar Motor"
                value={nome}
                onChangeText={setNome}
                style={styles.inputField}
              />

              <ExpandingTextArea
                label="Descrição Detalhada"
                value={descricao}
                onChangeText={setDescricao}
                placeholder="Inclua detalhes como aplicação, material, etc."
                containerStyle={styles.inputField}
                minHeight={80}
              />

              <CustomInput
                label="Fabricante / Marca"
                placeholder="Ex: Bosch, Fram, etc."
                value={fabricante}
                onChangeText={setFabricante}
                style={styles.inputField}
              />

              <View style={[pecStyles.precoInput, styles.inputRowContainer]}>
                <CustomInput
                  label="Quantidade"
                  placeholder="0"
                  keyboardType="numeric"
                  onChangeText={setQuantidade}
                  value={quantidade}
                  style={styles.inputInRow}
                />
                <CustomInput
                  label="Preço Unitário"
                  placeholder="R$ 0,00"
                  keyboardType="numeric"
                  onChangeText={handlePrecoChange}
                  value={preco}
                  style={styles.inputInRow}
                />
              </View>

              <ImagePickerInput
                imagem={imagem}
                setImagem={setImagem}
                containerStyle={styles.inputField}
                buttonStyle={styles.imagePickerButton}
              />
            </View>
            <View style={[pecStyles.crudButtons, styles.actionButtonsContainer]}>
              <CustomButton
                style={[styles.actionButton, styles.cancelButton]}
                textStyle={styles.cancelButtonText}
                title="Cancelar"
                onPress={() => router.back()}
              />
              <CustomButton
                style={styles.actionButton}
                title="Cadastrar Peça"
                onPress={handleCadastrarPeca}
              />
            </View>
          </ScrollView>
        </View>
        <BottomNavigation />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  logoNome: {
    width: 100,
    height: 60,
  },
  scrollContentContainer: {
    paddingBottom: spacing.large,
    alignItems: 'center',
  },
  pageTitle: {
    marginBottom: spacing.large,
  },
  formContainer: {
    width: '90%',
    maxWidth: 500,
  },
  inputField: {
    marginBottom: spacing.medium,
  },
  inputRowContainer: {
    width: '100%',
    maxWidth: '100%',
    paddingHorizontal: 0,
  },
  inputInRow: {
    flex: 1,
  },
  imagePickerButton: {
    backgroundColor: colors.inputBackground,
    height: undefined,
    paddingVertical: spacing.large,
  },
  actionButtonsContainer: {
    width: '90%',
    maxWidth: 500,
    marginTop: spacing.large,
    paddingHorizontal: 0,
  },
  actionButton: {
    flex: 1,
    height: 50,
  },
  cancelButton: {
    backgroundColor: colors.surface,
    marginRight: spacing.small,
  },
  cancelButtonText: {
    color: colors.textSecondary,
  }
});

export default CadastrarPecaScreen;
