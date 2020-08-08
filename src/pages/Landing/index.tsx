import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import api from '../../services/api';


import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

import styles from './styles';

function Landing() {
    const { navigate } = useNavigation();
    const [totalConnections, setTotalConnections] = useState(0); //criando o state

    useEffect(() => {
        api.get('connections').then(res => { //chamadno a rota connections
            const { total } = res.data;

            setTotalConnections(total); //setando o totalConnections com a função criada no state
        })
    }, []) //recebe um função como primeiro parametro, segundo parametro é um array que recebe a variável que ao ser mudada será exibida em tela, caso seja exibida só uma vez deixar o array em branco

    function handleNavigateToGiveClassesPage() { //função que manda o usuário para a página de giveClasses
       navigate('GiveClasses');
    }

    function handleNavigateToStudyPages() {
        navigate('Study');
    }

    return (
     <View style={styles.container}>
            <Image source={landingImg} style={styles.banner}/>

            <Text style={styles.title}>
              Seja bem-vindo, {'\n'}
               <Text style={styles.titleBold}>O que deseja fazer?</Text>
            </Text>
        

        <View style={styles.buttonsContainer}>
            <RectButton 
            onPress={handleNavigateToStudyPages}
            style={[styles.button, styles.buttonPrimary]}>
                <Image source={studyIcon} />

                <Text style={styles.buttonText}>Estudar</Text>
            </RectButton>

            <RectButton 
            onPress={handleNavigateToGiveClassesPage} 
            style={[styles.button, styles.buttonSecondary]}
            >
                <Image source={giveClassesIcon} />
        
                <Text style={styles.buttonText}>Dar aulas</Text>
            </RectButton>
        </View>

        <Text style={styles.totalConnections}>
            Total de {totalConnections} conexões já realizadas {' '}
            <Image source={heartIcon} />
        </Text>
     </View>
    );
}

export default Landing;

