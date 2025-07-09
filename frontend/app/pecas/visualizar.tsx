import React, { useState, useEffect } from 'react'; // Added useEffect
import { View, Text, Image, StatusBar, ScrollView, StyleSheet, Alert } from 'react-native'; // Added ScrollView, StyleSheet, Alert
import { useRouter, useLocalSearchParams } from 'expo-router'; // Added useLocalSearchParams
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons'; // For placeholder icon

import { InfoView } from '../../components/InfoView';
import { CustomButton } from '../../components/CustomButton';
import { BackButton } from '../../components/BackButton';
import { BottomNavigation } from '../../components/BottomNavigation';

import { globalStyles, colors, spacing } from '../../styles/globalStyles'; // Import theme
import { pecStyles } from './styles'; // pecStyles for viewPecas and image/text styles

// Mock data fetching function - replace with actual API call
const getPecaDetails = (pecaId?: string | string[]) => {
    // In a real app, this would fetch from a DB or API
    if (pecaId === '1') { // Example ID
        return {
            id: '1',
            nome: 'Pneu Aro 15 Michelin Primacy 4',
            descricao: 'Componente essencial para a segurança e desempenho do veículo, o pneu Michelin Primacy 4 oferece excelente aderência em piso molhado e seco, além de durabilidade e conforto na condução. Ideal para carros de passeio.',
            quantidade: '16 unidades',
            fabricante: 'Michelin',
            preco: 'R$ 450,00',
            imagem: require('../../assets/pneu.jpg'), // Example local image
        };
    }
    // Return a default/error object or null if not found
    return {
        id: 'error',
        nome: 'Peça não encontrada',
        descricao: 'Não foi possível carregar os detalhes da peça.',
        quantidade: 'N/A',
        fabricante: 'N/A',
        preco: 'N/A',
        imagem: null,
    };
};


const VisualizarPecaScreen = () => { // Renamed component
    const router = useRouter();
    const { pecaId } = useLocalSearchParams(); // Get ID from route
    const insets = useSafeAreaInsets();

    // Initialize peca state with a default structure or null
    const [peca, setPeca] = useState(getPecaDetails(pecaId));

    // If pecaId changes or on initial load, fetch details
    useEffect(() => {
        const details = getPecaDetails(pecaId);
        setPeca(details);
        if (details.id === 'error') {
            Alert.alert("Erro", "Peça não encontrada.");
            // Optionally navigate back or show a more prominent error message
        }
    }, [pecaId]);


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
                style={globalStyles.crudBottom} // crudBottom has some justifyContent, might need adjustment for scroll
                contentContainerStyle={styles.scrollContentContainer}
            >
            <View style={pecStyles.viewPecas}>
                {peca.imagem ? (
                    <Image
                    source={peca.imagem}
                    style={pecStyles.pecaImageVisualizar} // Use style from pecStyles
                    resizeMode="cover"
                    />
                ) : (
                    <View style={[pecStyles.pecaImageVisualizar, styles.imagePlaceholder]}>
                        <Feather name="camera-off" size={40} color={colors.textLabel} />
                    </View>
                )}
                <Text style={pecStyles.nomePecaVisualizar}>{peca.nome}</Text>
            </View>

            <InfoView label="Descrição Detalhada" value={peca.descricao} containerStyle={styles.infoViewContainer} />
            <InfoView label="Fabricante / Marca" value={peca.fabricante} containerStyle={styles.infoViewContainer}/>
            <InfoView label="Quantidade em Estoque" value={peca.quantidade} containerStyle={styles.infoViewContainer}/>
            <InfoView label="Preço Unitário" value={peca.preco} containerStyle={styles.infoViewContainer}/>

            <CustomButton
                style={styles.editButton}
                title="Editar Peça"
                onPress={() => router.push({ pathname: '/pecas/editar', params: { pecaId: peca.id }})}
                disabled={peca.id === 'error'} // Disable if peca not found
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
        alignItems: 'center', // Center the content like InfoViews and Button
    },
    infoViewContainer: {
        width: '90%', // Ensure InfoViews take appropriate width
        maxWidth: 500,
        marginBottom: spacing.medium,
    },
    editButton: {
        width: '90%',
        maxWidth: 500,
        height: 50,
        marginTop: spacing.large,
    },
    imagePlaceholder: {
        backgroundColor: colors.inputBackground,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default VisualizarPecaScreen; // Renamed export