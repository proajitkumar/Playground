import {enablePromise, openDatabase} from 'react-native-sqlite-storage';

const tableName = 'member_list';
const memberDBName = 'member.db';
enablePromise(true);

export default class Database {
  static instance = null;
  static database = null;

  static getInstance() {
    if (Database.instance == null) {
      Database.instance = new Database();
    }
    openDatabase({name: memberDBName, location: 'default'}).then(db => {
      Database.database = db;
      console.log({openDatabase: db});
    });

    return this.instance;
  }

  async createTable() {
    try {
      const db = Database.database;
      console.log({createTableDb: db});
      const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
            value TEXT NOT NULL
            );`;
      await db.executeSql(query);
    } catch (error) {
      console.log({createTableError: error});
    }
  }

  async saveMembers(members) {
    try {
      const db = Database.database;
      console.log({saveMembersDb: db});
      const insertQuery =
        `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
        members.map(i => `(${i.id}, '${i.value}')`).join(',');
      return db.executeSql(insertQuery);
    } catch (error) {
      console.log({saveMembersError: error});
    }
  }

  async getMembers() {
    try {
      const db = Database.database;
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
      console.error({getMembersError: error});
      throw Error('Failed to get members !!!');
    }
  }
}
