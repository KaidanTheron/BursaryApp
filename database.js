import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';

const db = SQLite.openDatabase('BursaryApp.db');

db.transaction((tx) => {
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ADMIN(id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT)',
        [],
        (tx, results) => {
            console.log('ADMIN table created successfully.');
            tx.executeSql('INSERT INTO ADMIN (email, password) VALUES (?, ?)',
            ['admin@gmail.com', 'admin123']);
        },
        (error) => {
            console.error('Error creating ADMIN table: ', error);
        }
    );
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS BURSARIES(id INTEGER PRIMARY KEY AUTOINCREMENT, bursor TEXT, name TEXT, detail TEXT, criteria TEXT, level TEXT, BEGINDATE TEXT, ENDDATE TEXT)',
        [],
        (tx, results) => {
            console.log('BURSARIES table created successfully.')
        },
        (error) => {
            console.error('Error creating BURSARIES table: ', error);
        }
    );
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS STUDENTS(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT, criteria TEXT, level TEXT)',
        [],
        (tx, results) => {
            console.log('STUDENTS table created successfully.')
        },
        (error) => {
            console.error('Error creating STUDENTS table: ', error);
        }
    );
});

// uncomment this to delete all records from tables
db.transaction((tx) => {
    tx.executeSql('DELETE FROM ADMIN');
    tx.executeSql('DELETE FROM BURSARIES');
    tx.executeSql('DELETE FROM STUDENTS');
});

// uncomment this to populate database with data
db.transaction((tx) => {
    // ADMIN
    tx.executeSql('INSERT INTO ADMIN (email, password) VALUES (?, ?)',
    ['admin@gmail.com', 'admin123']);

    // BURSARIES
    tx.executeSql('INSERT INTO BURSARIES (bursor, name, detail, criteria, level, BEGINDATE, ENDDATE) VALUES (?, ?, ?, ?, ?, ?, ?)',
    ['NSFAS', 'NSFAS AID', 'Allowance and tution coverage', 'Computer Science', 'Bachelors', '2024-01-01', '2024-12-30']);
    tx.executeSql('INSERT INTO BURSARIES (bursor, name, detail, criteria, level, BEGINDATE, ENDDATE) VALUES (?, ?, ?, ?, ?, ?, ?)',
    ['WITS', 'WITS INITIATIVE', 'Allowance and tution coverage', 'Commerce', 'Honours', '2024-01-01', '2024-12-30']);
    tx.executeSql('INSERT INTO BURSARIES (bursor, name, detail, criteria, level, BEGINDATE, ENDDATE) VALUES (?, ?, ?, ?, ?, ?, ?)',
    ['WITS', 'WITS ECO', 'Allowance and tution coverage', 'Humanities', 'Bachelors', '2024-01-01', '2024-12-30']);


    // STUDENTS
    tx.executeSql('INSERT INTO STUDENTS (name, email, password, criteria, level) VALUES (?, ?, ?, ?, ?)',
    ['Kaidan', 'kaidan13th@gmail.com', '123', 'Computer Science', 'Bachelors']);
    tx.executeSql('INSERT INTO STUDENTS (name, email, password, criteria, level) VALUES (?, ?, ?, ?, ?)',
    ['Taku', 'kaidan13th@gmail.com', '123', 'Commerce', 'Honours']);
});

export { db };