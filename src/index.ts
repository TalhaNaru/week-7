import { AppDataSource } from './data-source';
import { Task } from './entities/Task';

async function main() {
  await AppDataSource.initialize();

  for (const meta of AppDataSource.entityMetadatas) {
    console.log(`\n${meta.name} -> table "${meta.tableName}"`);

    for (const column of meta.columns) {
      console.log(`  column ${column.propertyName} -> ${column.databaseName}`);
    }

    for (const relation of meta.relations) {
      const target = relation.inverseEntityMetadata.name;
      console.log(
        `  relation ${relation.propertyName}: ${relation.relationType} ${target}`,
      );
    }
  }

  const status =
    AppDataSource.getMetadata(Task).findColumnWithPropertyName('status');
  console.log('\nstatus enum:', status?.enum, 'type name:', status?.enumName);

  await AppDataSource.destroy();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
