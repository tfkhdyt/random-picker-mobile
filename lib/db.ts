import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase;

export async function getDbInstance() {
  if (!db) {
    db = await SQLite.openDatabaseAsync('random_picker');
  }

  // `execAsync()` is useful for bulk queries when you want to execute altogether.
  // Note that `execAsync()` does not escape parameters and may lead to SQL injection.
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL UNIQUE
    );
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      group_id INTEGER NOT NULL,
      name VARCHAR(255) NOT NULL UNIQUE
    );
  `);

  return db;
}
