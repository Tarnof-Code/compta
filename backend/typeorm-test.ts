// typeorm-test.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'sql7.freesqldatabase.com',
  port: 3306,
  username: 'sql7771986',
  password: '1eiLip91Rh',
  database: 'sql7771986',
  synchronize: false,
  logging: true,
  entities: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('✅ Connection to MySQL successful!');
  })
  .catch((error) => {
    console.error('❌ Failed to connect to MySQL:');
    console.error(error);
  });
