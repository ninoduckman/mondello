import express from 'express';
import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '5723',
  database: 'test_app',
  port: '3306',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
}).promise()

const result = pool.query("SELECT * FROM users")