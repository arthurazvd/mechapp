import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomNavigation } from '../../components/BottomNavigation';
import { BackButton } from '../../components/BackButton';
import { globalStyles } from '../../styles/globalStyles';
import { cliStyles } from '../../styles/cliStyles';
import { useRouter } from 'expo-router';

const pecasMock = [
  {
    id: '1',
    nome: 'Filtro de óleo',
    descricao: 'Compatível com motores 1.0 a 2.0.',
  },
  {
    id: '2',
    nome: 'Pastilha de freio',
    descricao: 'Conjunto dianteiro para veículos compactos.',
  },
  {
    id: '3',
    nome: 'Correia dentada',
    descricao: 'Recomendado trocar a cada 60.000km.',
  },
];

const ListaPecas = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [busca, setBusca] = useState('');

  const pecasFiltradas = pecasMock.filter((peca) =>
    peca.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <>
      <StatusBar backgroundColor="#A10000" barStyle="light-content" />

      <View
        style={[
          globalStyles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <View style={globalStyles.crudTop}>
          <BackButton />
          <Image
            source={require('../../assets/logo-nome.png')}
            style={{ width: 100, height: 190 }}
            resizeMode="contain"
          />
        </View>

        <View style={cliStyles.searchContainer}>
          <TextInput
            placeholder="Buscar peça..."
            placeholderTextColor="#aaa"
            value={busca}
            onChangeText={setBusca}
            style={cliStyles.searchInput}
          />
          <TouchableOpacity
            style={cliStyles.filterButton}
            onPress={() => router.push('pecas/cadastrar')} 
          >
            <Feather name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={pecasFiltradas}
          keyExtractor={(item) => item.id}
          contentContainerStyle={cliStyles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={cliStyles.card}
              onPress={() => router.push('pecas/visualizar')} 
            >
              <View style={cliStyles.placeholderImage}>
                <Feather name="package" size={24} color="#888" />
              </View>

              <TouchableOpacity
                style={cliStyles.cardInfo}
                onPress={() => router.push('pecas/visualizar')} 
              >
                <Text style={cliStyles.cardTitle}>{item.nome}</Text>
                <Text style={cliStyles.cardSubtitle}>{item.descricao}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />

        <BottomNavigation />
      </View>
    </>
  );
};

export default ListaPecas;
