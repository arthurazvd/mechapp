import React from 'react';
import { StyleSheet } from 'react-native';
import { View, StatusBar, Image, Text, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackButton } from '../../components/BackButton';
import { BottomNavigation } from '../../components/BottomNavigation';
import { globalStyles } from '../../styles/globalStyles';

const DetalhesAgendamento = () => {
  const insets = useSafeAreaInsets();

  const agendamento = {
    servico: 'Troca de óleo',
    descricao: 'Troca completa com filtro incluso e lubrificação.',
    status: 'Confirmado',
    preco: 120.0,
    pecas: [
      { id: '1', nome: 'Filtro de óleo', quantidade: 1 },
      { id: '2', nome: 'Óleo 5W30', quantidade: 4 },
    ],
  };

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

        <View style={globalStyles.telaServicos}>
          <Text style={globalStyles.title}>Detalhes do Agendamento</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Serviço</Text>
            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.value}>{agendamento.servico}</Text>
            <Text style={styles.label}>Descrição:</Text>
            <Text style={styles.value}>{agendamento.descricao}</Text>
            <Text style={styles.label}>Status:</Text>
            <Text style={[styles.value, { color: '#00A100' }]}>
              {agendamento.status}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preço estimado</Text>
            <Text style={styles.value}>R$ {agendamento.preco.toFixed(2)}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Peças incluídas</Text>
            <FlatList
              data={agendamento.pecas}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.pecaItem}>
                  <Text style={styles.value}>{item.nome}</Text>
                  <Text style={styles.quantidade}>x{item.quantidade}</Text>
                </View>
              )}
            />
          </View>
        </View>

        <BottomNavigation />
      </View>
    </>
  );
};

export default DetalhesAgendamento;

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: '90%',
    alignSelf: 'center',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  label: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 8,
  },
  value: {
    color: '#fff',
    fontSize: 14,
    marginTop: 2,
  },
  pecaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  quantidade: {
    color: '#ccc',
    fontSize: 14,
  },
});