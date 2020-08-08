import React, { useState } from 'react'; //userEffect para carregar sempre que o usuário entre na tela
import { View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect} from '@react-navigation/native';


import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';


import styles from './styles';





function Favorites() {
    const[favorites, setFavorites] = useState([]); 
    
    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(res => { //vai até o banco de dados, busca a lista de favorites e salva dentro do array do State
            if (res) {
                const favoritedTeachers = JSON.parse(res);

                setFavorites(favoritedTeachers);
                
            }
       });
    }

    useFocusEffect(() => { //useFocusEffect será executado toda vez que a tela entrar em foco
      loadFavorites();
    }); 

    
    return(
    <View style={styles.container}>
         <PageHeader title="Meus Proffys favoritos"/>

         <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 16,
        }}>
          {favorites.map((teacher: Teacher) =>{
              return(
                  <TeacherItem
                    key={teacher.id}
                    teacher={teacher}
                    favorited={true} 
                  />
              )
          })}
        </ScrollView>
        
     </View>
    );
}

export default Favorites;