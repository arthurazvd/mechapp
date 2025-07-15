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

import { globalStyles } from '../../styles/globalStyles';
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
          <StatusBar backgroundColor="#A10000" barStyle="light-content" />
          <View style={[globalStyles.container,{paddingTop: insets.top,paddingBottom: insets.bottom,},]}>
              <View style={globalStyles.crudTop}>
                  <BackButton />
                  <Image 
                      source={require('../../assets/logo-nome.png')} 
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
                      contentStyle={{ width: '80%', maxWidth: 400 }}
                  />
                  <ExpandingTextArea
                      label="Descrição"
                      value={descricao}
                      onChangeText={setDescricao}
                      placeholder="Digite a descrição da peça..."
                      containerStyle={{ alignItems: 'center' }}
                      inputStyle={{ maxWidth: 400, width: '100%' }}
                  />

                  <CustomInput
                      label="Fabricante"
                      placeholder="Digite o fabricante"
                      value={fabricante}
                      onChangeText={setFabricante}
                      contentStyle={{ width: '80%', maxWidth: 400 }}
                  />
                  <View style={pecStyles.precoInput}>
                      <CustomInput
                          label="Quantidade"
                          placeholder="0"
                          keyboardType='numeric'
                          onlyNumbers={true}
                          onChangeText={setQuantidade}
                          value={quantidade}
                          contentStyle={{width: '100%', maxWidth: 200 }}
                          style={{ width: '49%' }}
                      />
                      <CustomInput
                          label="Preço"
                          placeholder="R$ 0,00"
                          keyboardType='numeric'
                          onChangeText={handlePrecoChange}
                          value={precoFormatado}
                          contentStyle={{ width: '100%', maxWidth: 200 }}
                          style={{ width: '49%' }}
                      />
                  </View>
                  <ImagePickerInput imagem={imagem} setImagem={setImagem} />

                  <View style={pecStyles.crudButtons}>
                      <CustomButton 
                          style={{width: '25%', maxWidth: 127, height: 50, backgroundColor: '#868686'}} 
                          title="Cancelar" 
                          onPress={() => router.back()} />                
                      <CustomButton 
                          style={{width: '25%', maxWidth: 127, height: 50, backgroundColor: '#868686'}} 
                          title="Deletar" 
                          onPress={() => router.back()} />
                      <CustomButton 
                          style={{width: '25%', maxWidth: 127, height: 50}} 
                          title="Salvar" 
                          onPress={handleSalvar} />
                  </View>
              </View>
              <BottomNavigation />
          </View>
      </>
    );
};

export default EditarPecaScreen;