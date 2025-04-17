"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// typeorm-test.ts
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var AppDataSource = new typeorm_1.DataSource({
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
    .then(function () {
    console.log('✅ Connection to MySQL successful!');
})
    .catch(function (error) {
    console.error('❌ Failed to connect to MySQL:');
    console.error(error);
});
