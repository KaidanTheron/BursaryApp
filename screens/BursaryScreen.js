import { View, Text, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import back from 'react-native-vector-icons/AntDesign'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { db } from '../database'

export default function AdminScreen() {
  const ViewBursaries = () => {
    const [bursaries, setBursaries] = useState([]);
  
    useEffect(() => {
      fetchDataFromDatabase();
    }, []);
  
    const fetchDataFromDatabase = () => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM bursaries',
          [],
          (tx, results) => {
            const data = [];
            for (let i = 0; i < results.rows.length; i++) {
              data.push(results.rows.item(i));
            }
            setBursaries(data);
          },
          (error) => {
            console.error('Error fetching bursary records:', error);
          }
        );
      });
    };
  
    const renderItem = ({ item }) => (
      <View>
        <Text>{`Name: ${item.name}`}</Text>
      </View>
    );
  
    return (
      <View>
        <FlatList
          data={bursaries}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  };
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white " >
      <SafeAreaView  className="flex ">
      <View className="flex-row justify-start">
          <TouchableOpacity  onPress={()=> navigation.goBack()}
          className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            
          </TouchableOpacity>
        </View>
        
        <Text>Current bursaries</Text>
        <ViewBursaries/>
        </SafeAreaView>
    </View>
  )
}