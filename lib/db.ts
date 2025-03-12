import { drizzle } from 'drizzle-orm/expo-sqlite';
import { migrate } from 'drizzle-orm/expo-sqlite/migrator';
import * as SQLite from 'expo-sqlite';

import * as schema from '../db/schema';
import migrations from '../drizzle/migrations';

const expo = SQLite.openDatabaseSync('random_picker_mobile.db');
export const db = drizzle(expo, { schema });

(async () => {
  await migrate(db, migrations);
})();
