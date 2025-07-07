import React, { useState } from 'react';
import { View, Text, } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CustomButton from '../../components/CustomButton';
import InfoView from '../../components/InfoView';
import { BackButton } from '../../components/BackButton';
import { BottomNavigation } from '../../components/BottomNavigation';

import { globalStyles } from '../../styles/globalStyles';

const VisualizarServico = () => {
    const router = useRouter();
    
    const [nome] = useState('Troca de Oléo');
    const [descricao] = useState('Substituição do óleo do motor por um novo, garantindo a lubrificação adequada das peças internas e o bom desempenho do veículo. Inclui verificação e, se necessário, troca do filtro de óleo. Recomendado conforme a quilometragem ou tempo de uso.');
    const [categoria] = useState('Mecânica');
    const [tempoEstimado] = useState('30 minutos');
    const [preco] = useState('R$ 100,00 - R$ 200,00');

    const insets = useSafeAreaInsets();

  return (
    <View style={[globalStyles.container,{paddingTop: insets.top,paddingBottom: insets.bottom,},]}>
        <View style={globalStyles.crudTop}>
          <BackButton />
          <Image source={require('../../assets/logo-nome.png')} style={{ width: 100, height: 190 }}
  resizeMode="contain"/>
        </View>
              
        <View style={globalStyles.crudBottom}>
            <Text style={globalStyles.title}>{nome}</Text>
            <InfoView label="Descrição" value={descricao} />
            <InfoView label="Categoria" value={categoria} />
            <InfoView label="Tempo estimado" value={tempoEstimado} />
            <InfoView label="Preço" value={preco} />
            <CustomButton 
                style={{width: '80%', maxWidth: 400, height: 50, marginTop: 20}} 
                title="Editar" 
                onPress={() => router.push('/servicos/editar')} />
        </View>
        <BottomNavigation />
    </View>
  );
};


export default VisualizarServico;