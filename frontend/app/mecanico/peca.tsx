import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { BottomNavigation } from '../../components/BottomNavigation';
import { BackButton } from '../../components/BackButton';
import { globalStyles, colors } from '../../styles/globalStyles';
import { cliStyles } from '../../styles/cliStyles';
import { peca } from '../../api';

interface Peca {
  id: string;
  nome: string;
  descricao: string;
  quantidade: number;
  preco: number;
  imagem?: string;
}

const ListaPecas = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [busca, setBusca] = useState('');
  const [pecas, setPecas] = useState<Peca[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Dados mockados como fallback
  const pecasMock: Peca[] = [
    {
      id: 'peca-001',
      nome: 'Pastilha de Freio',
      descricao: 'Pastilha de freio dianteira para carros populares',
      quantidade: 50,
      preco: 89.90
    },
    {
      id: 'peca-002',
      nome: 'Disco de Freio',
      descricao: 'Disco de freio ventilado',
      quantidade: 30,
      preco: 199.90
    },
    // Adicione outras peças conforme necessário
  ];

  const carregarPecas = async () => {
    try {
      setLoading(true);
      const response = await peca.listar_pecas();
      console.log('Resposta da API:', response);

      // Se a API retornar dados válidos, usa eles, senão usa os mockados
      if (response && Array.isArray(response) && response.length > 0) {
        setPecas(response);
      } else {
        console.warn('Usando dados mockados - API não retornou resultados');
        setPecas(pecasMock);
      }
    } catch (error) {
      console.error('Erro ao carregar peças, usando dados mockados:', error);
      setPecas(pecasMock);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    carregarPecas();
  }, []);

  const pecasFiltradas = pecas.filter((peca) =>
    peca.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const handleRefresh = () => {
    setRefreshing(true);
    carregarPecas();
  };

  const renderItem = ({ item }: { item: Peca }) => (
    <TouchableOpacity
      style={cliStyles.card}
      onPress={() => router.push(`/pecas/visualizar/${item.id}`)}
    >
      {item.imagem ? (
        <Image 
          source={{ uri: `data:image/jpeg;base64,${item.imagem}` }} 
          style={cliStyles.cardImage}
          resizeMode="cover"
        />
      ) : (
        <View style={cliStyles.placeholderImage}>
          <Feather name="package" size={24} color="#888" />
        </View>
      )}

      <View style={cliStyles.cardInfo}>
        <Text style={cliStyles.cardTitle} numberOfLines={1}>{item.nome}</Text>
        <Text style={cliStyles.cardSubtitle} numberOfLines={2}>{item.descricao}</Text>
        <View style={cliStyles.cardDetails}>
          <Text style={cliStyles.detailText}>Qtd: {item.quantidade}</Text>
          <Text style={cliStyles.detailText}>
            Preço: {item.preco.toLocaleString('pt-BR', { 
              style: 'currency', 
              currency: 'BRL',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 16, color: colors.textSecondary }}>Carregando peças...</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar backgroundColor="#A10000" barStyle="light-content" />

      <View style={[
        globalStyles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom }
      ]}>
        {/* Cabeçalho */}
        <View style={globalStyles.crudTop}>
          <BackButton />
          <Image
            source={require('../../assets/logo-nome.png')}
            style={{ width: 100, height: 60 }}
            resizeMode="contain"
          />
        </View>

        {/* Barra de busca */}
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
            onPress={() => router.push('/pecas/cadastrar')}
          >
            <Feather name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Lista de peças */}
        <FlatList
          data={pecasFiltradas}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            cliStyles.listContent,
            pecasFiltradas.length === 0 && { flex: 1 }
          ]}
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={{ 
              flex: 1, 
              justifyContent: 'center', 
              alignItems: 'center',
              padding: 20
            }}>
              <Feather name="package" size={48} color="#888" />
              <Text style={{ 
                marginTop: 16,
                fontSize: 16,
                color: '#888'
              }}>
                {busca ? 'Nenhuma peça encontrada' : 'Nenhuma peça cadastrada'}
              </Text>
            </View>
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[colors.primary]}
            />
          }
        />

        <BottomNavigation />
      </View>
    </>
  );
};

export default ListaPecas;