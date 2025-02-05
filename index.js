const { Client } = require('pg');

exports.handler = async (event) => {
  // Environment variables for connection details
  const client = new Client({
    user: process.env.PG_USER,   // PostgreSQL user
    host: process.env.PG_HOST,   // PostgreSQL host (e.g., your RDS endpoint)
    database: process.env.PG_DATABASE, // Database name
    password: process.env.PG_PASSWORD, // Password
    port: 5432, // Default PostgreSQL port
    ssl: {
      rejectUnauthorized: false, 
  // This is optional; it disables certificate validation
    },
  });

  try {
    // Connect to PostgreSQL
    await client.connect();

    // Query PostgreSQL
    //const rest = await client.query('CREATE DATABASE users;');
    //const res = await client.query('CREATE TABLE users ( id SERIAL PRIMARY KEY, first_name VARCHAR(50) NOT NULL);');
    //const res = await client.query('INSERT INTO users (first_name,id) VALUES (\'Walber\',1)');
    const res = await client.query('select * from  users;');
    console.log('PostgreSQL response:', res.rows);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Successful',
        data: res.rows[0] // Return the timestamp from the query
      }),
    };
  } catch (error) {
    console.error('Database connection error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error connecting to DB',
        error: error.message,
      }),
    };
  } finally {
    // Always close the client
    await client.end();
  }
};




