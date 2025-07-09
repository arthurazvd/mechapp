import React, { useState, useEffect } from 'react'; // Added useEffect
import { View, Text, StatusBar, ScrollView, StyleSheet, Alert, Image } from 'react-native'; // Added ScrollView, StyleSheet, Alert
import { useRouter, useLocalSearchParams } from 'expo-router'; // Added useLocalSearchParams
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CustomButton from '../../components/CustomButton'; // Default import
import InfoView from '../../components/InfoView'; // Default import
import { BackButton } from '../../components/BackButton';
import { BottomNavigation } from '../../components/BottomNavigation';

import { globalStyles, colors, spacing } from '../../styles/globalStyles'; // Import theme

// Mock data fetching - replace with actual API call
const getServicoDetails = (servicoId?: string | string[]) => {
    if (servicoId === '1') { // Example ID
        return {
            id: '1',
            nome: 'Troca de Oléo Completa',
            descricao: 'Substituição do óleo do motor por um novo (Mobil Super 5W-30 Sintético), garantindo a lubrificação adequada das peças internas e o bom desempenho do veículo. Inclui verificação e troca do filtro de óleo (Tecfil). Recomendado a cada 10.000km ou 6 meses.',
            categoria: 'Mecânica Geral',
            tempoEstimado: '1 hora',
            preco: 'R$ 180,00 - R$ 250,00 (varia conforme veículo)',
            somenteOrcamento: false, // Added this field based on edit screen
        };
    }
    return { // Default for not found
        id: 'error',
        nome: 'Serviço Não Encontrado',
        descricao: 'Os detalhes deste serviço não puderam ser carregados.',
        categoria: 'N/A',
        tempoEstimado: 'N/A',
        preco: 'N/A',
        somenteOrcamento: true,
    };
};


const VisualizarServicoScreen = () => { // Renamed
    const router = useRouter();
    const { servicoId } = useLocalSearchParams();
    const insets = useSafeAreaInsets();

    const [servico, setServico] = useState(getServicoDetails(servicoId));

    useEffect(() => {
        const details = getServicoDetails(servicoId);
        setServico(details);
        if (details.id === 'error' && servicoId) { // Only show alert if an ID was given but not found
            Alert.alert("Erro", "Serviço não encontrado.");
        }
    }, [servicoId]);


  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={[globalStyles.container,{paddingTop: insets.top,paddingBottom: insets.bottom, justifyContent: 'space-between'}]}>
        <View style={{flex:1}}>
            <View style={globalStyles.crudTop}>
                <BackButton color={colors.white}/>
                <Image source={require('../../assets/logo-nome.png')} style={styles.logoNome} resizeMode="contain"/>
            </View>

            <ScrollView
                style={globalStyles.crudBottom}
                contentContainerStyle={styles.scrollContentContainer}
            >
                <Text style={[globalStyles.title, styles.pageTitle]}>{servico.nome}</Text>
                <InfoView label="Descrição Detalhada" value={servico.descricao} containerStyle={styles.infoViewContainer}/>
                <InfoView label="Categoria" value={servico.categoria} containerStyle={styles.infoViewContainer}/>
                <InfoView label="Tempo Estimado" value={servico.tempoEstimado} containerStyle={styles.infoViewContainer}/>
                <InfoView
                    label="Faixa de Preço"
                    value={servico.somenteOrcamento ? "Somente sob orçamento" : servico.preco}
                    containerStyle={styles.infoViewContainer}
                />
                <CustomButton
                    style={styles.editButton}
                    title="Editar Serviço"
                    onPress={() => router.push({pathname: '/servicos/editar', params: { servicoId: servico.id }})}
                    disabled={servico.id === 'error'}
                />
            </ScrollView>
        </View>
        <BottomNavigation />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
    logoNome: {
        width: 100,
        height: 60,
    },
    scrollContentContainer: {
        paddingBottom: spacing.large,
        alignItems: 'center',
    },
    pageTitle: {
        marginVertical: spacing.large, // Add vertical margin to title
    },
    infoViewContainer: {
        width: '90%',
        maxWidth: 500,
        marginBottom: spacing.medium,
    },
    editButton: {
        width: '90%',
        maxWidth: 500,
        height: 50,
        marginTop: spacing.large,
    }
});

export default VisualizarServicoScreen; // Renamed