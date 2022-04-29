### Client Contractor API

## How to run

1. In the repo root directory, run `npm install` to gather all dependencies.

  

1. Next, `npm run seed` will seed the local SQLite database. **Warning: This will drop the database if it exists**. The database lives in a local file `database.sqlite3`.

  

1. Then run `npm start` which should start both the server and the React client.

## Additional content

### Requirements

Node version used: 16.15.0

### Security
- Added helmet for protection on HTTP requests
- Added cors to prevent malicius cross domain requests
- Added a middleware to control admin access
- Transactions for DB modifications

### Styling

- EsLint and Prettier

## OBS

There's a JSON file that can be imported into Postman to test all the requests