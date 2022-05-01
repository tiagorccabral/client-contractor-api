### Client Contractor API

## How to run

1. In the repo root directory, run `npm install` to gather all dependencies.

  

1. Next, `npm run seed` will seed the local SQLite database. **Warning: This will drop the database if it exists**. The database lives in a local file `database.sqlite3`.

  

1. Then run `npm start` which should start both the server and the React client.


1. To run the tests use `npm run test`

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

### Testing

- Added a few test cases using Jest and Supertest

## OBS

- Use profile_id 1 as a admin for the admin endpoints (other users are not "admin")

- There's a JSON file that can be imported into Postman to test all the requests
