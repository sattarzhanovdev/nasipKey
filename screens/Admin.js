import React, { useState, useEffect } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { API } from '../api'; // Make sure your API file is correctly set up and imported
import AsyncStorage from '@react-native-async-storage/async-storage';

function Admin({navigation}) {
  const [users, setUsers] = useState(null);
  const [apartments, setApartments] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dep, setDep] = useState(null);

  useEffect(() => {
    API.getUsers()
      .then(res => {
        const result = Object.entries(res.data).map((item, id) => {
          return {
            ...item
          }
        });

        setUsers(result)

        const uniqueByApartment = Object.values(result.reduce((acc, item) => {
          const apartment = item["1"].apartment;
          acc[apartment] = item;
          return acc;
        }, {}));
        
        setApartments(uniqueByApartment); 
      });
  }, [dep]);

  // const handleBlock = (apartment) => {
  //   const apUsers = users?.filter(item => item["1"]["apartment"] === selectedUser)
  //   apUsers.forEach(item => {
  //     API.blockApartment(item['0'], {...item["1"], isBlocked: apartments.find(item => item['1'].apartment === selectedUser)["1"].isBlocked ? false : true})
  //   });
  //   setSelectedUser(apartment);
  //   setModalVisible(true);
  //   setDep(Math.random())
  // }

  // const handleModalResponse = (response) => {
  //   console.log(response);
  //   setModalVisible(false);
  // }

  const openApartment = (apartment) => {
    const result = users?.filter(item => item[1].apartment === apartment)
    const data = []
    for(let i = 0; i < result.length; i++){
      const res = users?.filter(item => item[1].apartment === apartment)[i]["1"]
      data.push(res)
    }
    const stringData = JSON.stringify(data)
    AsyncStorage.setItem('apartmentUsers', stringData)
    navigation.navigate('Apartment')
  }

  return (
    <View style={styles.view}>
      {
        apartments && apartments.map((item, index) => (
          <Pressable key={index} style={styles.button} onPress={() => openApartment(item['1'].apartment)}>
            <Text style={styles.btnText}>{item["1"].apartment}</Text>
          </Pressable>
        ))
      }
    </View>
  );
}

export default Admin;

const styles = StyleSheet.create({
  view: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },  
  button: {
    width: "50%",
    height: 50,
    backgroundColor: 'orangered',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black'
  },
  btnText: {
    color: 'white'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
