import React from 'react';
import SQLite from 'react-native-sqlite-storage';

const tableName = 'member_list';
SQLite.enablePromise(true);

const useDatabase = () => {
  const openDB = async () => {
    console.log('openDB called');
    let db = await SQLite.openDatabase({
      name: 'member.db',
      location: 'default',
    });
    console.log({db: db.openSuccess()});
  };
  const createTable = () => {};
  return {openDB, createTable};
};

export default useDatabase;
