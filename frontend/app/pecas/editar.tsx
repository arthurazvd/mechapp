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

const EditarPecas = () => {
    const router = useRouter();

    const [nome, setNome] = useState('Pneu');
    const [descricao, setDescricao] = useState('Componente essencial para a segurança e desempenho do veículo, o pneu é responsável pelo contato direto com o solo, garantindo aderência, estabilidade e conforto na condução. Recomendado verificar periodicamente seu estado e calibragem para evitar desgastes irregulares e riscos de acidentes.');
    const [quantidade, setQuantidade] = useState('16');
    const [fabricante, setFabricante] = useState('Michelin');
    const [preco, setPreco] = useState('500');

    const insets = useSafeAreaInsets();

    const [imagem, setImagem] = useState<string | null>(null);

    const handlePrecoChange = (text: string) => {
      const precoFormatado = formatarPreco(text);
      setPreco(precoFormatado);
    };

    const handleEditar = () => {
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
            <Image source={require('../../assets/logo-nome.png')} style={{ width: 100, height: 190 }}
  resizeMode="contain"/>
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
                placeholder="Digite a descrição do peciço..."
                containerStyle={{ alignItems: 'center' }}
                inputStyle={{ maxWidth: 400, width: '100%' }}
            />

            <CustomInput
                label="Fabricante"
                placeholder="Digite o fabricante"
                keyboardType='numeric'
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
                    value={preco}
                    contentStyle={{ width: '100%', maxWidth: 200 }}
                    style={{ width: '49%' }}
                />
            </View>
            <ImagePickerInput imagem={imagem} setImagem={setImagem} />

            <View style={pecStyles.crudButtons}>
                <CustomButton 
                    style={{width: '25%', maxWidth: 127, height: 50}} 
                    title="Salvar" 
                    onPress={() => router.back()} />
                <CustomButton 
                    style={{width: '25%', maxWidth: 127, height: 50}} 
                    title="Deletar" 
                    onPress={() => router.back()} />
                <CustomButton 
                    style={{width: '25%', maxWidth: 127, height: 50}} 
                    title="Cancelar" 
                    onPress={() => router.back()} />
            </View>

        </View>
    </View>
  );
};


export default EditarPecas;