import React from 'react';
import { View, StatusBar, Image, Text, FlatList, StyleSheet } from 'react-native'; // Added FlatList, StyleSheet
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackButton } from '../../components/BackButton';
import { BottomNavigation } from '../../components/BottomNavigation';
import { AgendamentoCard } from '../../components/AgendamentoCard';

import { globalStyles, colors, spacing } from '../../styles/globalStyles'; // Import theme

// Mock data for current agendamentos
const agendamentosAtuais = [
  { id: '1', servico: 'Troca de óleo Agendada', oficina: 'Oficina Premium Motors', status: 'confirmado', data: '28/07/2024 às 10:00' },
  { id: '2', servico: 'Diagnóstico de Suspensão', oficina: 'Centro Automotivo Veloz', status: 'pendente', data: '30/07/2024 às 14:00' },
  // Add more mock agendamentos if needed
];


const TelaAgendamentosLista = () => { // Renamed component
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
                ListHeaderComponent={<Text style={[globalStyles.title, styles.pageTitle]}>Meus Agendamentos</Text>}
                data={agendamentosAtuais}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <AgendamentoCard
                    servico={item.servico}
                    oficina={`${item.oficina} - ${item.data}`}
                    status={item.status as "pendente" | "confirmado" | "cancelado" | "concluido"}
                    onPress={() => router.push({ pathname: 'agendamento/detalhes', params: { agendamentoId: item.id }})}
                    />
                )}
                contentContainerStyle={styles.listContentContainer}
                ItemSeparatorComponent={() => <View style={{height: spacing.small}} />}
                ListEmptyComponent={<Text style={styles.emptyListText}>Você não possui agendamentos.</Text>}
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
        paddingHorizontal: spacing.medium,
        paddingBottom: spacing.large,
    },
    emptyListText: {
        ...globalStyles.text,
        marginTop: spacing.large,
        fontSize: typography.fontSizeText, // Ensure typography is imported if used here
    }
});

export default TelaAgendamentosLista; // Renamed export