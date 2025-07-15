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

import { globalStyles,spacing,colors } from '../../styles/globalStyles';
import { pecStyles } from '../../styles/pecStyles';
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

    // Estados
    const [nome, setNome] = useState('Pneu');
    const [descricao, setDescricao] = useState('Componente essencial para a segurança e desempenho do veículo...');
    const [quantidade, setQuantidade] = useState('16');
    const [fabricante, setFabricante] = useState('Michelin');
    const [precoFormatado, setPrecoFormatado] = useState('R$ 500,00');
    const [precoReal, setPrecoReal] = useState(500);
    const [imagem, setImagem] = useState<string | null>(null);
    const [imagemOriginal, setImagemOriginal] = useState<any>(null);

    // Busca dados da peça
useEffect(() => {
    const peca = getPecaDetails(pecaId);
    if (peca) {
        setNome(peca.nome);
        setDescricao(peca.descricao);
        setQuantidade(peca.quantidade);
        setFabricante(peca.fabricante);
        
        // Se a API retornar apenas 'preco', converta para os dois formatos
        const { precoFormatado, precoReal } = formatarPreco(peca.preco);
        setPrecoFormatado(precoFormatado);
        setPrecoReal(precoReal);
        
        setImagemOriginal(peca.imagem);
    } else {
        Alert.alert("Erro", "Peça não encontrada.", [
            { text: "OK", onPress: () => router.back() }
        ]);
    }
}, [pecaId]);
    // Formatação do preço
    const handlePrecoChange = (text: string) => {
        const { precoFormatado, precoReal } = formatarPreco(text);
        setPrecoFormatado(precoFormatado);
        setPrecoReal(precoReal);
    };

    // Salvar alterações
    const handleSalvar = () => {
        if (!nome || !descricao || !quantidade || !fabricante) {
            Alert.alert("Atenção", "Preencha todos os campos obrigatórios");
            return;
        }

        console.log("Dados salvos:", {
            nome,
            descricao,
            quantidade: Number(quantidade),
            fabricante,
            preco: precoReal,
            imagemUrl: imagem || imagemOriginal
        });

        router.back();
    };

    return (
      <>
  <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
  <View style={[globalStyles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
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
      <Text style={[globalStyles.title, styles.pageTitle]}>Editar Peça</Text>

      <View style={styles.formContainer}>
        <CustomInput
          label="Nome"
          value={nome}
          placeholder="Digite o nome da peça"
          onChangeText={setNome}
          contentStyle={{ width: '100%' }}
          style={styles.inputField}
        />

        <ExpandingTextArea
          label="Descrição"
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Digite a descrição da peça..."
          containerStyle={styles.inputField}
          inputStyle={{ width: '100%' }}
          minHeight={80}
        />

        <CustomInput
          label="Fabricante"
          placeholder="Digite o fabricante"
          value={fabricante}
          onChangeText={setFabricante}
          contentStyle={{ width: '100%' }}
          style={styles.inputField}
        />

        <View style={[pecStyles.precoInput, styles.row]}>
          <CustomInput
            label="Quantidade"
            placeholder="0"
            keyboardType='numeric'
            onlyNumbers={true}
            onChangeText={setQuantidade}
            value={quantidade}
            style={[styles.inputField, styles.inputHalf]}
          />
          <CustomInput
            label="Preço"
            placeholder="R$ 0,00"
            keyboardType='numeric'
            onChangeText={handlePrecoChange}
            value={precoFormatado}
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
            style={[styles.actionButton, styles.deleteButton]}
            textStyle={styles.deleteButtonText}
            title="Deletar"
            onPress={() => router.back()}
          />
          <CustomButton
            style={styles.actionButton}
            title="Salvar"
            onPress={handleSalvar}
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
    flex: 1,
    height: 50,
    marginHorizontal: spacing.small / 2,
  },
  cancelButton: {
    backgroundColor: colors.surface,
  },
  cancelButtonText: {
    color: colors.textSecondary,
  },
  deleteButton: {
    backgroundColor: '#B00020',
  },
  deleteButtonText: {
    color: colors.white,
  },
});


export default EditarPecaScreen;