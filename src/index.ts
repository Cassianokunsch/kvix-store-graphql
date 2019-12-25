import 'reflect-metadata';
import { createConnection } from 'typeorm';

createConnection()
  .then(async connection => {
    console.log('conectou');
  })
  .catch(error => console.log(error));
