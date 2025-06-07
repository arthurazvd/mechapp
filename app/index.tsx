import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

import { CustomButton } from '../components/CustomButton';

import { globalStyles } from '../styles/globalStyles';

export default function Index() {
  const router = useRouter();

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.initialBottom}>
        <Text style={globalStyles.title}>Bem vindo ao MechApp</Text>
        <CustomButton 
          title="Cadastrar Peças"
          style={{ height: 50, width: '80%', maxWidth: 400, marginBottom: 5}}
          onPress={() => router.push('/pecas/cadastrar')}
        />
        <CustomButton 
          title="Editar Peças"
          style={{ height: 50, width: '80%', maxWidth: 400, marginBottom: 5}}
          onPress={() => router.push('/pecas/editar')}
        />
        <CustomButton 
          title="Visualizar Peças"
          style={{ height: 50, width: '80%', maxWidth: 400, marginBottom: 5}}
          onPress={() => router.push('/pecas/visualizar')}
        />
        <CustomButton 
          title="Cadastrar Serviço"
          style={{ height: 50, width: '80%', maxWidth: 400, marginBottom: 5}}
          onPress={() => router.push('/servicos/cadastrar')}
        />
        <CustomButton 
          title="Editar Serviço"
          style={{ height: 50, width: '80%', maxWidth: 400, marginBottom: 5}}
          onPress={() => router.push('/servicos/editar')}
        />
        <CustomButton 
          title="Visualizar Serviço"
          style={{ height: 50, width: '80%', maxWidth: 400, marginBottom: 5}}
          onPress={() => router.push('/servicos/visualizar')}
        />
      </View>
    </View>
  );
}
