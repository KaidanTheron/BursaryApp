import { View, Text, TouchableOpacity,Dimensions,StyleSheet, Image, TextInput, FlatList } from 'react-native'
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
  
    const renderItem = (item) => {
      const data = item.item;
      console.log('Item: ', data);
      return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
        <Text style={styles.titleStyle} >{`   ${data.bursor}`}</Text>
        <Text style={styles.textStyle}>{`   ${data.name}`}</Text>
        <Text style={styles.textStyle}>{`  Details: ${data.detail}`}</Text>
        <Text style={styles.textStyle}>{`  Criteria: ${data.criteria}`}</Text>
        <Text style={styles.textStyle}>{`  Level: ${data.level}`}</Text>
        <Text style={styles.textStyle}>{`  Begin Date: ${data.BEGINDATE}`}</Text>
        <Text style={styles.textStyle}>{`  End Date: ${data.ENDDATE}`}</Text>
        </View>
      </View>);
    }
  
    return (
      <View>
        <FlatList className="mb-20"
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
        
        <Text className="text-xl font-bold text-center text-gray-700">Current Bursaries</Text>
        <ViewBursaries/>
        </SafeAreaView>
    </View>
  )
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const offset = 40;
const radius = 20;
const styles = StyleSheet.create({
  container: {
    width: deviceWidth - 20,
    alignItems: 'center',
    marginTop: 25,
  },
  cardContainer: {
    width: deviceWidth - offset,
    backgroundColor: '#a29bfe',
    height: 200,
    borderRadius: radius,

    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 9,
  },
  imageStyle: {
    height: 130,
    width: deviceWidth - offset,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    opacity: 0.9,
    alignContent: 'center',
    alignSelf: 'center',
  },
  titleStyle: {
    fontSize: 40,
    fontWeight: '800',
  },
  textStyle: {
    fontSize: 15,
    fontWeight: '800',
  },
  categoryStyle: {
    fontWeight: '200',
  },
  infoStyle: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  iconLabelStyle: {
    flexDirection: 'row',
    marginTop: 10,
  },
});