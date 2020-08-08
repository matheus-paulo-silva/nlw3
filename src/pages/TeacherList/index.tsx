import React, { useState, } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';




function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const[favorites, setFavorites] = useState<number[]>([]); //dizendo que é um array de numeros inteiros
    const [isFiltersVisible, setIsFilterVisible] = useState(false); //boleando armazenando se os filtros devem estar visíveis ou não

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(res => { //vai até o banco de dados, busca a lista de favorites e salva dentro do array do State
            if (res) {
                const favoritedTeacher = JSON.parse(res);
                const favoritedTeacherIds = favoritedTeacher.map((teacher: Teacher) => { //array de Ids de professores
                    return teacher.id;
                })

                setFavorites(favoritedTeacherIds);
                
            }
       });
    }

    useFocusEffect(() => {
        loadFavorites();
    });

    function handleToggleFilterVisible() { //setando o contratário do isfilterVisible
        setIsFilterVisible(!isFiltersVisible)
    }

    async function handleFiltersSubmit() {
        loadFavorites();

        const res = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });

        setIsFilterVisible(false);
        setTeachers(res.data);
    }

    return (
     <View style={styles.container}>
         <PageHeader 
            title="Proffys disponíveis" 
            headerRight={(
                <BorderlessButton onPress={handleToggleFilterVisible}>
                    <Feather name="filter" size={20} color="#FFF" />
                </BorderlessButton>
            )}
            >
            { isFiltersVisible && ( /* Se os filtros estiverem visíveis && só executa se for true */
                    <View style={styles.searchForm}> 
                    <Text style={styles.label}>Matéria</Text>
                    <TextInput 
                    style={styles.input}
                    value={subject}
                    onChangeText={text => setSubject(text)}
                    placeholder="Qual a matéria?"
                    placeholderTextColor="#c1bccc"
                    />
                    

                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                        <Text style={styles.label}>Dia da semana</Text>
                        <TextInput 
                            style={styles.input}
                            value={week_day}
                            onChangeText={text => setWeekDay(text)}
                            placeholder="Qual o dia?"
                            placeholderTextColor="#c1bccc"
                        />
                        </View>

                        <View style={styles.inputBlock}>
                        <Text style={styles.label}>Horário</Text>
                        <TextInput 
                            style={styles.input}
                            value={time}
                            onChangeText={text => setTime(text)}
                            placeholder="Qual horário?"
                            placeholderTextColor="#c1bccc"
                          />
                        </View>
                       </View>

                       <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                       </RectButton>
                    </View>
            )}        
         </PageHeader>

        <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 16,
        }}>
            {teachers.map((teacher: Teacher) => {
            return (<TeacherItem
                 key={teacher.id} 
                 teacher={teacher}
                 favorited={favorites.includes(teacher.id)} //pegando dos favoritos somente os teacher que possuem id
                 />
                )
            })}   
        </ScrollView>
     </View>
    );
}

export default TeacherList;