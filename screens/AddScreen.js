import { View, Text, TouchableOpacity, Image, TextInput, FlatList, Button } from 'react-native'
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
  await fetch("http://10.0.0.108:3000/api/test", {
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
    return (<View>
      <Text>{`Bursor: ${data.bursor}`}</Text>
      <Text>{`Bursary Name: ${data.bName}`}</Text>
      <Text>{`Details: ${data.detail}`}</Text>
      <Text>{`Criteria: ${data.criteria}`}</Text>
      <Text>{`Level: ${data.level}`}</Text>
      <Text>{`Begin Date: ${data.bDate}`}</Text>
      <Text>{`End Date: ${data.eDate}`}</Text>
      <Button title='Verify' onPress={() => addBursary(data.bursor, data.bName, data.detail, data.criteria, data.level, data.bDate, data.eDate)}/>
    </View>);
  }

  //addBursary('TEST', 'TEST FUND', 'allowance', 'Computer Science', 'Bachelors', '2024-01-01', '2024-12-30')
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white " >
      <SafeAreaView  className="flex ">
        <View className="flex-row justify-start">
          <TouchableOpacity  onPress={()=> navigation.goBack()}
          className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            
          </TouchableOpacity>
        </View>
        
        <Text>Add new bursary</Text>

        <View className="form space-y-2">
            {sheetJSON.length == 0 ? 
              (<View>
                <TouchableOpacity onPress={async () => setSheetJSON(await readSpreadsheet())}>
                  <Text>Choose File</Text>
                </TouchableOpacity>
              </View>) : 
              (<SafeAreaView>
                <FlatList
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
}