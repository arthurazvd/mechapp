import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomInput } from '../../components/CustomInput';
import { ExpandingTextArea } from '../../components/ExpandingTextArea';
import { CustomButton } from '../../components/CustomButton';
import { ImagePickerInput } from '../../components/ImagePickerInput';
import { BackButton } from '../../components/BackButton';

import { globalStyles } from '../../styles/globalStyles';
import { pecStyles } from './styles';
import { formatarPreco } from '../../utils/formatters';

const CadastrarPecas = () => {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [fabricante, setFabricante] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState<string | null>(null);

  const insets = useSafeAreaInsets();

  const handlePrecoChange = (text: string) => {
    const precoFormatado = formatarPreco(text);
    setPreco(precoFormatado);
  };

  const handleCadastrar = () => {
    console.log({
      nome,
      descricao,
      fabricante,
      quantidade,
      preco,
    });

    router.back(); 
  };

  return (
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
        <Text style={globalStyles.title}>Cadastrar Peça</Text>

        <CustomInput
          label="Nome"
          placeholder="Digite o nome do peciço"
          placeholderTextColor="#868686"
          onChangeText={setNome}
          contentStyle={{ width: '80%', maxWidth: 400 }}
        />

        <ExpandingTextArea
          label="Descrição"
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Digite a descrição do serviço..."
          placeholderTextColor="#868686"
          containerStyle={{ alignItems: 'center' }}
          inputStyle={{ maxWidth: 400, width: '100%' }}
        />

        <CustomInput
          label="Fabricante"
          placeholder="Digite o fabricante"
          placeholderTextColor="#868686"
          value={fabricante}
          onChangeText={setFabricante}
          contentStyle={{ width: '80%', maxWidth: 400 }}
        />

        <View style={pecStyles.precoInput}>
          <CustomInput
            label="Quantidade"
            placeholder="0"
            placeholderTextColor="#868686"
            keyboardType="numeric"
            onlyNumbers={true}
            onChangeText={setQuantidade}
            value={quantidade}
            contentStyle={{ width: '100%', maxWidth: 200 }}
            style={{ width: '49%' }}
          />
          <CustomInput
            label="Preço"
            placeholder="R$ 0,00"
            placeholderTextColor="#868686"
            keyboardType="numeric"
            onChangeText={handlePrecoChange}
            value={preco}
            contentStyle={{ width: '100%', maxWidth: 200 }}
            style={{ width: '49%' }}
          />
        </View>

        <ImagePickerInput imagem={imagem} setImagem={setImagem} />

        <View style={pecStyles.crudButtons}>
          <CustomButton
            style={{ width: '39%', maxWidth: 193, height: 50 }}
            title="Cadastrar"
            onPress={() => router.back()}
          />
          <CustomButton
            style={{ width: '39%', maxWidth: 193, height: 50 }}
            title="Cancelar"
            onPress={() => router.back()}
          />
        </View>
      </View>
    </View>
  );
};

export default CadastrarPecas;
