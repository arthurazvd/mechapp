import React, { useState, useEffect } from 'react'; 
import { View, Text, Image, StatusBar, ScrollView, StyleSheet, Alert } from 'react-native'; 
import { useRouter, useLocalSearchParams } from 'expo-router'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons'; 

import { InfoView } from '../../components/InfoView';
import { CustomButton } from '../../components/CustomButton';
import { BackButton } from '../../components/BackButton';
import { BottomNavigation } from '../../components/BottomNavigation';

import { globalStyles, colors, spacing } from '../../styles/globalStyles'; 
import { pecStyles } from './styles'; 

const getPecaDetails = (pecaId?: string | string[]) => {
    if (pecaId === '1') { 
        return {
            id: '1',
            nome: 'Pneu Aro 15 Michelin Primacy 4',
            descricao: 'Componente essencial para a segurança e desempenho do veículo, o pneu Michelin Primacy 4 oferece excelente aderência em piso molhado e seco, além de durabilidade e conforto na condução. Ideal para carros de passeio.',
            quantidade: '16 unidades',
            fabricante: 'Michelin',
            preco: 'R$ 450,00',
            imagem: require('../../assets/pneu.jpg'), 
        };
    }
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


const VisualizarPecaScreen = () => { 
    const router = useRouter();
    const { pecaId } = useLocalSearchParams(); 
    const insets = useSafeAreaInsets();

    const [peca, setPeca] = useState(getPecaDetails(pecaId));

    useEffect(() => {
        const details = getPecaDetails(pecaId);
        setPeca(details);
        if (details.id === 'error') {
            Alert.alert("Erro", "Peça não encontrada.");
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
                style={globalStyles.crudBottom} 
                contentContainerStyle={styles.scrollContentContainer}
            >
            <View style={pecStyles.viewPecas}>
                {peca.imagem ? (
                    <Image
                    source={peca.imagem}
                    style={pecStyles.pecaImageVisualizar} 
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
                disabled={peca.id === 'error'} 
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
    },
    imagePlaceholder: {
        backgroundColor: colors.inputBackground,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default VisualizarPecaScreen; 