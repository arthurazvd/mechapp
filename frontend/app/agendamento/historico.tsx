import React from 'react'; // Removed useState as it's not used
import { View, StatusBar, Image, Text, FlatList, StyleSheet } from 'react-native'; // Added FlatList and StyleSheet
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackButton } from '../../components/BackButton';
import { BottomNavigation } from '../../components/BottomNavigation';
import { AgendamentoCard } from '../../components/AgendamentoCard';

import { globalStyles, colors, spacing } from '../../styles/globalStyles'; // Import theme

// Mock data for demonstration
const agendamentosHistorico = [
  { id: '1', servico: 'Troca de óleo e filtro', oficina: 'Oficina Premium Motors', status: 'concluido', data: '15/07/2024' },
  { id: '2', servico: 'Alinhamento e Balanceamento', oficina: 'Centro Automotivo Veloz', status: 'concluido', data: '02/06/2024' },
  { id: '3', servico: 'Revisão Completa (50.000km)', oficina: 'Mecânica Confiança', status: 'concluido', data: '10/04/2024'},
  { id: '4', servico: 'Troca de Pastilhas de Freio', oficina: 'Freios & Cia', status: 'cancelado', data: '20/03/2024' },
];

const TelaHistoricoAgendamentos = () => { // Renamed component
    const router = useRouter();
    const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View
        style={[
            globalStyles.container,
            {paddingTop: insets.top, paddingBottom: insets.bottom, justifyContent: 'space-between'}
        ]}
      >
        <View style={{flex:1}}>
            <View style={globalStyles.crudTop}>
            <BackButton color={colors.white}/>
            <Image source={require('../../assets/logo-nome.png')} style={styles.logoNome} resizeMode="contain"/>
            </View>
            <FlatList
                ListHeaderComponent={<Text style={[globalStyles.title, styles.pageTitle]}>Histórico de Agendamentos</Text>}
                data={agendamentosHistorico}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <AgendamentoCard
                    servico={item.servico}
                    oficina={`${item.oficina} - ${item.data}`} // Adding date to subtitle
                    status={item.status as "pendente" | "confirmado" | "cancelado" | "concluido"}
                    onPress={() => router.push({ pathname: 'agendamento/detalhes', params: { agendamentoId: item.id }})}
                    />
                )}
                contentContainerStyle={styles.listContentContainer}
                ItemSeparatorComponent={() => <View style={{height: spacing.small}} />}
            />
        </View>
        <BottomNavigation />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
    logoNome: {
        width: 100,
        height: 60, // Adjusted height
    },
    pageTitle: {
        marginTop: spacing.large,
        marginBottom: spacing.medium,
    },
    listContentContainer: {
        paddingHorizontal: spacing.medium, // Add horizontal padding to the list
        paddingBottom: spacing.large, // Ensure space at the bottom
    }
});

export default TelaHistoricoAgendamentos; // Renamed export