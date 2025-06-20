import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Checkbox } from 'expo-checkbox';

import { CustomInput } from '../../components/CustomInput';
import { ExpandingTextArea } from '../../components/ExpandingTextArea';
import { CustomButton } from '../../components/CustomButton';

import { globalStyles } from '../../styles/globalStyles';
import { servStyles } from './styles';
import { formatarPreco } from '../../utils/formatters';


const CadastrarServico = () => {
    const router = useRouter();

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [tempoEstimado, setTempoEstimado] = useState('');
    const [precoMin, setPrecoMin] = useState('');
    const [precoMax, setPrecoMax] = useState('');
    const [checked, setChecked] = useState(false);


    const handlePrecoMinChange = (text: string) => {
      const precoFormatado = formatarPreco(text);
      setPrecoMin(precoFormatado);
    };

    const handlePrecoMaxChange = (text: string) => {
      const precoFormatado = formatarPreco(text);
      setPrecoMax(precoFormatado);
    };

    const handleCadastrar = () => {
        console.log({
        nome,
        descricao,
        categoria,
        tempoEstimado,
        precoMin,
        precoMax
        });
    router.back(); 
    };


  return (
    <View style={globalStyles.container}>
        <View style={servStyles.initialTop}>
            <Image source={require('../../assets/logo-nome.png')} style={{ width: 100, height: 190 }}
  resizeMode="contain"/>
        </View>
              
        <View style={servStyles.initialBottom}>
            <Text style={globalStyles.title}>Cadastrar Serviço</Text>
            <CustomInput
                label="Nome"
                placeholder="Digite o nome do serviço"
                onChangeText={setNome}
                contentStyle={{ width: '80%', maxWidth: 400 }}
            />
            <ExpandingTextArea
                label="Descrição"
                value={descricao}
                onChangeText={setDescricao}
                placeholder="Digite a descrição do serviço..."
                containerStyle={{ alignItems: 'center' }}
                inputStyle={{ maxWidth: 400, width: '100%' }}
            />

            <View style={servStyles.pickerContainer}>
                <Text style={globalStyles.label}>Categoria</Text>
                <Picker
                selectedValue={categoria}
                onValueChange={(itemValue) => setCategoria(itemValue)}
                style={servStyles.picker}
                dropdownIconColor="#868686"
                >
                <Picker.Item label="Selecione uma categoria" value="" />
                <Picker.Item label="Mecânica" value="mecanica" />
                <Picker.Item label="Elétrica" value="eletrica" />
                <Picker.Item label="Estética" value="estetica" />
                </Picker>
            </View>
            <CustomInput
                label="Tempo estimado"
                placeholder="Digite o tempo"
                keyboardType='numeric'
                onlyNumbers={true}
                value={tempoEstimado}
                onChangeText={setTempoEstimado}
                contentStyle={{ width: '80%', maxWidth: 400 }}
            />
            <View style={servStyles.precoInput}>
                <CustomInput
                    label="Preço Min"
                    placeholder="R$ 0,00"
                    keyboardType='numeric'
                    onChangeText={handlePrecoMinChange}
                    value={precoMin}
                    contentStyle={{width: '100%', maxWidth: 200 }}
                    style={{ width: '49%' }}
                />
                <CustomInput
                    label="Preço Max"
                    placeholder="R$ 0,00"
                    keyboardType='numeric'
                    onChangeText={handlePrecoMaxChange}
                    value={precoMax}
                    contentStyle={{ width: '100%', maxWidth: 200 }}
                    style={{ width: '49%' }}
                />
            </View>
            <View style={servStyles.checkboxContainer}>
                    <Checkbox
                        color={'#4CAF50'}
                        value={checked}
                        onValueChange={(val) => setChecked(val)}
                        style={servStyles.checkbox}
                    />
                    <Text style={globalStyles.label}>Preço somente por orçamento</Text>
                </View>
            <View style={servStyles.crudButtons}>
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


export default CadastrarServico;