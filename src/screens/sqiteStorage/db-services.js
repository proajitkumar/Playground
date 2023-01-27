import {enablePromise, openDatabase} from 'react-native-sqlite-storage';

const tableName = 'member_list';
enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'member.db', location: 'default'});
};

export const createTable = async db => {
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
    value TEXT NOT NULL
    );`;
  await db.executeSql(query);
};

export const getMembers = async db => {
  try {
    const members = [];
    const results = await db.executeSql(
      `SELECT rowid as id, value FROM ${tableName}`,
    );
    results.forEach(result => {
      for (let i = 0; i < result.rows.length; i++) {
        members.push(result.rows.item(i));
      }
    });
    return members;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get members !!!');
  }
};

export const saveMembers = async (db, members) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
    members.map(i => `(${i.id}, '${i.value}')`).join(',');
  return db.executeSql(insertQuery);
};
