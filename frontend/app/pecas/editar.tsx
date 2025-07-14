import React, { useState, useEffect } from 'react';
import { View, Text, Image, StatusBar, ScrollView, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
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

const getPecaDetails = (pecaId?: string | string[]) => {
    if (pecaId === '1') {
        return {
            nome: 'Pneu Aro 15 Michelin Primacy 4',
            descricao: 'Componente essencial para a segurança e desempenho do veículo, o pneu Michelin Primacy 4 oferece excelente aderência em piso molhado e seco, além de durabilidade e conforto na condução. Ideal para carros de passeio.',
            quantidade: '16',
            fabricante: 'Michelin',
            preco: 'R$ 450,00',
            imagem: require('../../assets/pneu.jpg'),
        };
    }
    return null;
};

const EditarPecaScreen = () => {
    const router = useRouter();
    const { pecaId } = useLocalSearchParams();
    const insets = useSafeAreaInsets();

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [fabricante, setFabricante] = useState('');
    const [preco, setPreco] = useState('');
    const [imagem, setImagem] = useState<string | null>(null);
    const [imagemOriginal, setImagemOriginal] = useState<any>(null);

    useEffect(() => {
        const peca = getPecaDetails(pecaId);
        if (peca) {
            setNome(peca.nome);
            setDescricao(peca.descricao);
            setQuantidade(peca.quantidade);
            setFabricante(peca.fabricante);
            setPreco(peca.preco);
            setImagemOriginal(peca.imagem);
        } else {
            Alert.alert("Erro", "Peça não encontrada.", [{ text: "OK", onPress: () => router.back() }]);
        }
    }, [pecaId]);

    const handlePrecoChange = (text: string) => {
      const precoFormatado = formatarPreco(text);
      setPreco(precoFormatado);
    };

    const handleSalvarPeca = () => {
        if (!nome || !descricao || !quantidade || !fabricante || !preco) {
          Alert.alert("Erro", "Todos os campos são obrigatórios.");
          return;
        }
        console.log("Salvando Peça:", { pecaId, nome, descricao, quantidade, fabricante, preco, novaImagem: imagem });
        Alert.alert("Sucesso", "Peça atualizada!");
        router.back();
    };

    const handleDeletarPeca = () => {
        Alert.alert(
            "Confirmar Exclusão",
            `Tem certeza que deseja deletar a peça "${nome}"? Esta ação não pode ser desfeita.`,
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Deletar", style: "destructive", onPress: () => {
                    console.log("Deletando Peça:", pecaId);
                    Alert.alert("Sucesso", "Peça deletada!");
                    router.replace('/pecas/visualizar');
                }}
            ]
        );
    };

  return (
    <>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <View style={[globalStyles.container,{paddingTop: insets.top,paddingBottom: insets.bottom, justifyContent: 'space-between'}]}>
            <View style={{flex:1}}>
                <View style={globalStyles.crudTop}>
                <BackButton color={colors.white}/>
                <Image source={require('../../assets/logo-nome.png')} style={styles.logoNome} resizeMode="contain"/>
                </View>

                <ScrollView
                    style={globalStyles.crudBottom}
                    contentContainerStyle={styles.scrollContentContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <Text style={[globalStyles.title, styles.pageTitle]}>Editar Peça</Text>
                    <View style={styles.formContainer}>
                        <CustomInput
                            label="Nome da Peça"
                            value={nome}
                            onChangeText={setNome}
                            style={styles.inputField}
                        />
                        <ExpandingTextArea
                            label="Descrição Detalhada"
                            value={descricao}
                            onChangeText={setDescricao}
                            containerStyle={styles.inputField}
                            minHeight={80}
                        />
                        <CustomInput
                            label="Fabricante / Marca"
                            value={fabricante}
                            onChangeText={setFabricante}
                            style={styles.inputField}
                        />
                        <View style={[pecStyles.precoInput, styles.inputRowContainer]}>
                            <CustomInput
                                label="Quantidade"
                                keyboardType='numeric'
                                onChangeText={setQuantidade}
                                value={quantidade}
                                style={styles.inputInRow}
                            />
                            <CustomInput
                                label="Preço Unitário"
                                keyboardType='numeric'
                                onChangeText={handlePrecoChange}
                                value={preco}
                                style={styles.inputInRow}
                            />
                        </View>
                        <ImagePickerInput
                            imagem={imagem || imagemOriginal}
                            setImagem={setImagem}
                            containerStyle={styles.inputField}
                            buttonStyle={styles.imagePickerButton}
                        />
                    </View>

                    <View style={[pecStyles.crudButtons, styles.actionButtonsContainer]}>
                        <CustomButton
                            style={[styles.actionButton, styles.deleteButton]}
                            textStyle={styles.deleteButtonText}
                            title="Deletar"
                            onPress={handleDeletarPeca} />
                        <CustomButton
                            style={styles.actionButton}
                            title="Salvar"
                            onPress={handleSalvarPeca} />
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
    deleteButton: {
        backgroundColor: colors.error,
        marginRight: spacing.small,
    },
    deleteButtonText: {
        color: colors.white,
    }
});

export default EditarPecaScreen;