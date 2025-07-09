import React, { useState } from 'react';
import { View, Text, Image, StatusBar, ScrollView, StyleSheet, Alert } from 'react-native'; // Added ScrollView, StyleSheet, Alert
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomInput } from '../../components/CustomInput';
import { ExpandingTextArea } from '../../components/ExpandingTextArea';
import { CustomButton } from '../../components/CustomButton';
import { ImagePickerInput } from '../../components/ImagePickerInput';
import { BackButton } from '../../components/BackButton';
import { BottomNavigation } from '../../components/BottomNavigation';

import { globalStyles, colors, spacing } from '../../styles/globalStyles'; // Import theme
import { pecStyles } from './styles'; // pecStyles for crudButtons and precoInput
import { formatarPreco } from '../../utils/formatters';

const CadastrarPecaScreen = () => { // Renamed component
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [fabricante, setFabricante] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState<string | null>(null);


  const handlePrecoChange = (text: string) => {
    const precoFormatado = formatarPreco(text); // Assuming formatarPreco returns string like "R$ 10,00"
    setPreco(precoFormatado);
  };

  const handleCadastrarPeca = () => {
    if (!nome || !descricao || !quantidade || !fabricante || !preco) {
      Alert.alert("Erro", "Todos os campos são obrigatórios, exceto a imagem.");
      return;
    }
    // Add more specific validations if needed (e.g., quantity > 0)
    console.log("Cadastrando Peça:", { nome, descricao, quantidade, fabricante, preco, imagem });
    Alert.alert("Sucesso", "Peça cadastrada!");
    router.back(); // Or navigate to pecas list
  };

  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={[globalStyles.container,{paddingTop: insets.top,paddingBottom: insets.bottom, justifyContent: 'space-between'}]}>
        <View style={{flex:1}}>
            <View style={globalStyles.crudTop}>
            <BackButton color={colors.white}/>
            <Image
                source={require('../../assets/logo-nome.png')}
                style={styles.logoNome}
                resizeMode="contain"
            />
            </View>

            <ScrollView
            style={globalStyles.crudBottom} // crudBottom has some justifyContent, might need adjustment for scroll
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
                    containerStyle={styles.inputField} // Use style for ExpandingTextArea's container
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
                    // onlyNumbers={true} // Ensure CustomInput handles this
                    onChangeText={setQuantidade}
                    value={quantidade}
                    style={styles.inputInRow}
                    />
                    <CustomInput
                    label="Preço Unitário"
                    placeholder="R$ 0,00"
                    keyboardType="numeric" // formatarPreco will handle formatting
                    onChangeText={handlePrecoChange}
                    value={preco}
                    style={styles.inputInRow}
                    />
                </View>

                <ImagePickerInput
                    imagem={imagem}
                    setImagem={setImagem}
                    containerStyle={styles.inputField}
                    buttonStyle={styles.imagePickerButton} // Custom style for the button part
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
        paddingBottom: spacing.large, // Space for the buttons at the end
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
    inputRowContainer: { // Overrides for pecStyles.precoInput for this screen
        width: '100%', // Take full width of formContainer
        maxWidth: '100%', // Override pecStyles
        paddingHorizontal: 0, // Reset padding if any from pecStyles
    },
    inputInRow: {
        flex: 1, // Make inputs in row share space
    },
    imagePickerButton: { // Style for the touchable part of ImagePickerInput
        backgroundColor: colors.inputBackground, // Match other inputs
        height: undefined, // Let padding define height
        paddingVertical: spacing.large,
    },
    actionButtonsContainer: { // Overrides for pecStyles.crudButtons
        width: '90%',
        maxWidth: 500,
        marginTop: spacing.large,
        paddingHorizontal: 0, // Reset padding if any from pecStyles
    },
    actionButton: {
        flex: 1, // Make buttons in row share space
        height: 50,
    },
    cancelButton: {
        backgroundColor: colors.surface, // Different color for cancel
        marginRight: spacing.small, // Add if 'gap' is not supported or for specific spacing
    },
    cancelButtonText: {
        color: colors.textSecondary,
    }
});

export default CadastrarPecaScreen; // Renamed export
