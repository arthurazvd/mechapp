import React, { useState } from 'react';
import { View, Text,} from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import CustomButton from '../../components/CustomButton';
import InfoView from '../../components/InfoView';
import { servStyles } from './styles';
import { formatarPreco } from '../../utils/formatters';
import { Image } from 'react-native';

const VisualizarServico = ({ navigation }: any) => {
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

    const handleVisualizar = () => {
        console.log({
        nome,
        descricao,
        categoria,
        tempoEstimado,
        precoMin,
        precoMax
        });
        navigation.goBack();
    };


  return (
    <View style={globalStyles.container}>
        <View style={servStyles.initialTop}>
            <Image source={require('../../assets/logo-nome.png')} style={{ width: 100, height: 190 }}
  resizeMode="contain"/>
        </View>
              
        <View style={servStyles.initialBottom}>
            <Text style={globalStyles.title}>Troca de Oléo</Text>
            <InfoView label="Descrição" value="Substituição do óleo do motor por um novo, garantindo a lubrificação adequada das peças internas e o bom desempenho do veículo. Inclui verificação e, se necessário, troca do filtro de óleo. Recomendado conforme a quilometragem ou tempo de uso." />
            <InfoView label="Categoria" value="Mecânica" />
            <InfoView label="Tempo estimado" value="30 minutos" />
            <InfoView label="Preço" value="R$ 100,00 - R$ 200,00" />
            <CustomButton 
                style={{width: '80%', maxWidth: 400, height: 50, marginTop: 20}} 
                title="Editar" 
                onPress={handleVisualizar} />

        </View>
    </View>
  );
};


export default VisualizarServico;