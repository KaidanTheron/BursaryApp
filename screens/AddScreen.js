import { View, Text, TouchableOpacity, Image, TextInput, FlatList, Button, ScrollView, Dimensions, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import back from 'react-native-vector-icons/AntDesign'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { db } from '../database'
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system'
import * as XLSX from 'xlsx'

// import * as Network from 'expo-network'

// const student = {
//   email: 'tctembedza@gmail.com',
//   name: 'Taku'
// }
// const bursary = {
//   criteria:'Computer Science', 
//   level:'Bachelor\'s', 
//   bName:'Shaquille Oatmeal', 
//   bursor:'NSFAS', 
//   detail:'Allowance and tuition payment', 
//   sDate:'2024-01-01',
//   eDate: '2024-12-30'
// }

// find location of file through document picker
const pickDocument = async () => {
  const result = await DocumentPicker.getDocumentAsync({
    //type: '*/*', // You can specify the MIME type of the files you want to allow
  });

  return result.assets[0].uri;
};


// Put bursary and student strings together as content to email
function createContent(studentO, bursaryO) {
  return {
      email: studentO.email,
      subject: studentO.subject,
      subtitle: studentO.subtitle,
      content: bursaryO.content
  }
}

// Format student details, ready to send
function createStudentStringObject(student) {
  return {
    email: student.email,
    subject: `${student.name}, does this bursary interest you? `,
    subtitle: `Good day, ${student.name}, you are eligible to apply to the following bursary.`
  }
}

// Format bursary details, ready to send
function createBursaryStringObject(bursary) {
  return {
    content: `<h3>${bursary.bName} offered by ${bursary.bursor}</h3><br>
    Criteria: ${bursary.criteria}<br>
    Level: ${bursary.level}<br>
    
    << Additional Information >><br>
    ${bursary.detail}<br>

    ${bursary.sDate.length > 0 ? `Start Date of Bursary: ${bursary.sDate}` : `Starting date not specified`}<br>
    ${bursary.eDate.length > 0 ? `End Date of Bursary: ${bursary.eDate}` : `End date not specified`}`
  };
}

// perform request to NEXT server to send email using created content
async function sendEmail(content) {
  await fetch("http://10.0.0.111:3000/api/test", {
    method: 'POST',
    body: JSON.stringify(content)
  })
  .catch(function(error) {
    console.log("error: " + error.message);
  });
}

// add bursary to database and notify students
async function addBursary(bursor, bName, detail, criteria, level, bDate, eDate) {
  const bursary = {
    criteria: criteria, 
    level: level, 
    bName: bName, 
    bursor: bursor, 
    detail: detail, 
    sDate: String(bDate).trim(),
    eDate: String(eDate).trim()
  }

  console.log(bursary);

  const bursaryStringObject = createBursaryStringObject(bursary);

  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM BURSARIES',
    [],
    (tx, results) => {
        for (let i = 0; i < results.rows.length; i++) {
            console.log(results.rows.item(i).bursor);
        }
    });

    tx.executeSql('INSERT INTO BURSARIES (bursor, name, detail, criteria, level, BEGINDATE, ENDDATE) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [bursor, bName, detail, criteria, level, bDate, eDate],
    (tx, results) => {
      console.log('bursary added successfully');
    },
    (error) => {
      console.log('Error inserting bursary record:\n ', error);
    });

    tx.executeSql('SELECT * FROM BURSARIES',
    [],
    (tx, results) => {
        for (let i = 0; i < results.rows.length; i++) {
            console.log(results.rows.item(i).bursor);
        }
    });

    tx.executeSql('SELECT * FROM STUDENTS',
    [],
    (tx, results) => {
        for (let i = 0; i < results.rows.length; i++) {
            console.log(results.rows.item(i).name, ' ', results.rows.item(i).criteria, ' ', results.rows.item(i).level);
        }
    });
  });

  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM STUDENTS',
    [],
    (tx, results) => {
      for (let i = 0; i < results.rows.length; i++) {
        const sName = results.rows.item(i).name;
        const sEmail = results.rows.item(i).email;
        const sCriteria = results.rows.item(i).criteria;
        const sLevel = results.rows.item(i).level;

        const student = {
          email: sEmail,
          name: sName
        }
        console.log(student);

        if (sLevel == level && sCriteria == criteria) {
          sendEmail(createContent(createStudentStringObject(student), bursaryStringObject));
        }
      }
    }
  )}
);
}

// write function to read spreadsheet once selected here
async function readSpreadsheet() {
  const uri = await pickDocument();
  try {

    const fileContent = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    const workbook = XLSX.read(fileContent, { type: 'base64'});
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    //console.log(data[0]);
    return data;

  } catch (error) {
    console.log(error);
  };
}

export default function AddScreen() {

  const [sheetJSON, setSheetJSON] = useState([]);
  sheet = [
    {bDate: 45292, bName: "TEST FUND", bursor: "TEST", criteria: "Computer Science", detail: "allowance", eDate: 45656}
  ]
  

  //console.log(sheetJSON);

  const getSheetJSON = () => {
    console.log('Sheet: ', sheetJSON);
    return sheetJSON;
  }

  const renderItem = (item) => {
    const data = item.item;
    console.log('Item: ', data);
    return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
      <Text style={styles.titleStyle} >{`   ${data.bursor}`}</Text>
      <Text style={styles.textStyle}>{`   ${data.bName}`}</Text>
      <Text style={styles.textStyle}>{`  Details: ${data.detail}`}</Text>
      <Text style={styles.textStyle}>{`  Criteria: ${data.criteria}`}</Text>
      <Text style={styles.textStyle}>{`  Level: ${data.level}`}</Text>
      <Text style={styles.textStyle}>{`  Begin Date: ${data.bDate}`}</Text>
      <Text style={styles.textStyle}>{`  End Date: ${data.eDate}`}</Text>
      <Button title='Verify' onPress={() => addBursary(data.bursor, data.bName, data.detail, data.criteria, data.level, data.bDate, data.eDate)}/>
      </View>
    </View>);
  }

  //addBursary('TEST', 'TEST FUND', 'allowance', 'Computer Science', 'Bachelors', '2024-01-01', '2024-12-30')
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white " >
      <SafeAreaView  className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity  onPress={()=> navigation.goBack()}
          className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            
          </TouchableOpacity>
        </View>
        
        <Text className="text-xl font-bold text-center text-gray-700">Add new bursary</Text>

        <View className="form space-y-2">
            {sheetJSON.length == 0 ? 
              (<View>
                <TouchableOpacity onPress={async () => setSheetJSON(await readSpreadsheet())}>
                  <Text className="font-bold text-green-500">Choose File</Text>
                </TouchableOpacity>
              </View>) : 
              (<SafeAreaView>
                <FlatList className="mb-24"
                  data={getSheetJSON()}
                  //keyExtractor={(item, index) => index.toString()}
                  renderItem={(item) => renderItem(item)}
                />
              </SafeAreaView>)
            }
            
          </View>

        </SafeAreaView>
    </View>
  )
};

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