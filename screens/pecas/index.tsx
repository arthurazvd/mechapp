import React, { useState } from 'react';
import { View, Text,} from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { CustomInput } from '../../components/CustomInput';
import { ExpandingTextArea } from '../../components/ExpandingTextArea';
import CustomButton from '../../components/CustomButton';
import ImagePickerInput from '../../components/ImagePickerInput';
import { pecStyles } from './styles';
import { Image } from 'react-native';
import { formatarPreco } from '../../utils/formatters';

const CadastrarPecas = ({ navigation }: any) => {
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

    const handleCadastrar = () => {
        console.log({
        nome,
        descricao,
        fabricante,
        quantidade,
        preco,
        });
        navigation.goBack();
    };


  return (
    <View style={globalStyles.container}>
        <View style={pecStyles.initialTop}>
            <Image source={require('../../assets/logo-nome.png')} style={{ width: 100, height: 190 }}
  resizeMode="contain"/>
        </View>
              
        <View style={pecStyles.initialBottom}>
            <Text style={globalStyles.title}>Cadastrar Peça</Text>
            <CustomInput
                label="Nome"
                placeholder="Digite o nome do peciço"
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
                    style={{width: '39%', maxWidth: 193, height: 50}} 
                    title="Cadastrar" 
                    onPress={handleCadastrar} />
                <CustomButton 
                    style={{width: '39%', maxWidth: 193, height: 50}} 
                    title="Cancelar" 
                    onPress={handleCadastrar} />
            </View>

        </View>
    </View>
  );
};


export default CadastrarPecas;