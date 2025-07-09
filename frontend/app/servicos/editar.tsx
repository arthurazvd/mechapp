import React, { useState } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Checkbox } from 'expo-checkbox';
import { Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomInput } from '../../components/CustomInput';
import { ExpandingTextArea } from '../../components/ExpandingTextArea';
import { CustomButton } from '../../components/CustomButton';
import { BackButton } from '../../components/BackButton';
import { BottomNavigation } from '../../components/BottomNavigation';

import { globalStyles } from '../../styles/globalStyles';
import { servStyles } from '../../styles/servStyles';
import { formatarPreco } from '../../utils/formatters';


const EditarServico = () => {
    const router = useRouter();

    const [nome, setNome] = useState('Troca de Oléo');
    const [descricao, setDescricao] = useState('Substituição do óleo do motor por um novo, garantindo a lubrificação adequada das peças internas e o bom desempenho do veículo. Inclui verificação e, se necessário, troca do filtro de óleo. Recomendado conforme a quilometragem ou tempo de uso.');
    const [categoria, setCategoria] = useState('mecanica');
    const [tempoEstimado, setTempoEstimado] = useState('1');
    const [precoMin, setPrecoMin] = useState('R$ 100,00');
    const [precoMax, setPrecoMax] = useState('R$ 200,00');
    const [checked, setChecked] = useState(false);

    const insets = useSafeAreaInsets();
    

    const handlePrecoMinChange = (text: string) => {
      const precoFormatado = formatarPreco(text);
      setPrecoMin(precoFormatado);
    };

    const handlePrecoMaxChange = (text: string) => {
      const precoFormatado = formatarPreco(text);
      setPrecoMax(precoFormatado);
    };

  return (
    <>
        <StatusBar backgroundColor="#A10000" barStyle="light-content" />
        <View style={[globalStyles.container,{paddingTop: insets.top,paddingBottom: insets.bottom,},]}>
            <View style={globalStyles.crudTop}>
                <BackButton />
                <Image source={require('../../assets/logo-nome.png')} style={{ width: 100, height: 190 }}
    resizeMode="contain"/>
            </View>
                
            <View style={globalStyles.crudBottom}>
                <Text style={globalStyles.title}>Editar Serviço</Text>
                <CustomInput
                    label="Nome"
                    placeholder="Digite o nome do serviço"
                    placeholderTextColor="#868686"
                    value={nome}
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
                    placeholderTextColor="#868686"
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
                        placeholderTextColor="#868686"
                        keyboardType='numeric'
                        onChangeText={handlePrecoMinChange}
                        value={precoMin}
                        contentStyle={{width: '100%', maxWidth: 200 }}
                        style={{ width: '49%' }}
                    />
                    <CustomInput
                        label="Preço Max"
                        placeholder="R$ 0,00"
                        placeholderTextColor="#868686"
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
                        onPress={() => router.back()} />
                </View>

            </View>
            <BottomNavigation />
        </View>
    </>
  );
};


export default EditarServico;