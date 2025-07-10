import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
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

const servicosMock = [
  {
    id: '1',
    nome: 'Troca de óleo',
    descricao: 'Troca de óleo com filtro incluso.',
  },
  {
    id: '2',
    nome: 'Alinhamento',
    descricao: 'Alinhamento completo das rodas.',
  },
  {
    id: '3',
    nome: 'Pintura',
    descricao: 'Pintura de para-choques e laterais.',
  },
];

const ListaServicos = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [busca, setBusca] = useState('');

  const servicosFiltrados = servicosMock.filter((servico) =>
    servico.nome.toLowerCase().includes(busca.toLowerCase())
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
            placeholder="Buscar serviço..."
            placeholderTextColor="#aaa"
            value={busca}
            onChangeText={setBusca}
            style={cliStyles.searchInput}
          />
          <TouchableOpacity
            style={cliStyles.filterButton}
            onPress={() => router.push('servicos/cadastrar')} 
          >
            <Feather name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={servicosFiltrados}
          keyExtractor={(item) => item.id}
          contentContainerStyle={cliStyles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={cliStyles.card}
              onPress={() => router.push(`servicos/visualizar`)} 
            >
              <View style={cliStyles.placeholderImage}>
                <Feather name="tool" size={24} color="#888" />
              </View>

              <TouchableOpacity
                style={cliStyles.cardInfo}
                onPress={() => router.push(`servicos/visualizar`)} 
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

export default ListaServicos;
