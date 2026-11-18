import { User } from './entities/User';
import { AppDataSource } from './data-source';

async function main() {
  await AppDataSource.initialize();

  const info = await AppDataSource.query(
    'SELECT current_database() AS db, version() AS version',
  );
  console.log(info[0]);

  const meta = AppDataSource.getMetadata(User);
  console.log('table', meta.tableName);

  for (const column of meta.columns) {
    console.log(column.propertyName, '->', column.databaseName);
  }

  await AppDataSource.destroy();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
