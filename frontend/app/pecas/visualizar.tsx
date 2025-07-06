import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { InfoView } from '../../components/InfoView';
import { CustomButton } from '../../components/CustomButton';
import { BackButton } from '../../components/BackButton';

import { globalStyles } from '../../styles/globalStyles';
import { pecStyles } from './styles';


const VisualizarPeca = () => {
    const router = useRouter();

    const [nome] = useState('Pneu Michelin');
    const [descricao] = useState('Componente essencial para a segurança e desempenho do veículo, o pneu é responsável pelo contato direto com o solo, garantindo aderência, estabilidade e conforto na condução. Recomendado verificar periodicamente seu estado e calibragem para evitar desgastes irregulares e riscos de acidentes.');
    const [quantidade] = useState('16');
    const [fabricante] = useState('Michelin');
    const [preco] = useState('R$ 500,00');

  const insets = useSafeAreaInsets();

  const handleVisualizar = () => {
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
        <Image source={require('../../assets/logo-nome.png')} style={{ width: 100, height: 190 }} resizeMode="contain"/>
      </View>
      <View style={globalStyles.crudBottom}>
        <View style={pecStyles.viewPecas}>
          <Text style={[globalStyles.title, { flex: 1, flexWrap: 'wrap' }]}>{nome}</Text>
          <Image
            source={require('../../assets/pneu.jpg')}
            style={{ width: 150, height: 150, borderRadius: 8 }}
            resizeMode="cover"
          />
        </View>

        <InfoView label="Descrição" value={descricao} />
        <InfoView label="Fabricante" value={fabricante} />
        <InfoView label="Quantidade" value={quantidade} />
        <InfoView label="Preço" value={preco} />

        <CustomButton
          style={{ width: '80%', maxWidth: 400, height: 50, marginTop: 20 }}
          title="Editar"
          onPress={() => router.push('/pecas/editar')}
        />
      </View>
    </View>
  );
};

export default VisualizarPeca;