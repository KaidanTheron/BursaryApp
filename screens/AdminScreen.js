import { View, Text, TouchableOpacity,Dimensions,StyleSheet, Image, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import back from 'react-native-vector-icons/AntDesign'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'

export default function AdminScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white justify-center" >
      <SafeAreaView  className="flex ">
        <SafeAreaView>

          <View style={styles.container}>

          </View>

        <View className="flex-row justify-start">
          <TouchableOpacity  
          className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4 ">
            
          </TouchableOpacity>
        </View>

            <Text style={styles.titleStyle}>
                Admin Page
            </Text>
            <TouchableOpacity className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[5rem] px-4 rounded ml-4 mt-4 h-14 mr-4" onPress={()=> navigation.navigate("Add")}>
                 <Text style={{color:'white',fontSize: 20,fontWeight: '800',}}>ADD BURSARY</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[5rem] px-4 rounded ml-4 mt-4 h-14 mr-4" onPress={()=> navigation.navigate("Bursaries")}>
                 <Text style={{color:'white',fontSize: 20,fontWeight: '800',}}>VIEW BURSARIES</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[5rem] px-4 rounded ml-4 mt-4 h-14 mr-4 content-center">
                 <Text style={{color:'white',fontSize: 20,fontWeight: '800',}}>VIEW STUDENTS</Text>
            </TouchableOpacity>
        </SafeAreaView>
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
    height: 100,
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
    fontSize: 60,
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
})