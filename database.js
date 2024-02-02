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

export { db };