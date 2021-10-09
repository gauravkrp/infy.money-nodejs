# Express (Node) App


# try locally
Clone the repository

Install dependencies - `npm install` or `yarn install`

Start app - `npm run start` or `yarn start`

Set your env variables

See Procfile for heroku deployment 

## Deployed on heroku - https://infy-money-nodejs.herokuapp.com/api

## API endpoints for testing
1. https://infy-money-nodejs.herokuapp.com/api/consent/9999999999 - to Raise Consent
2. https://infy-money-nodejs.herokuapp.com/api/users/mobile/9999999999/profile - to fetch user's profile
3. https://infy-money-nodejs.herokuapp.com/api/users/mobile/9999999999 - to fetch users entire data document
4. https://infy-money-nodejs.herokuapp.com/api/users/mobile/9999999999/fi_data_summary - to fetch data summary (excluding transaction)
5. https://infy-money-nodejs.herokuapp.com/api/users/mobile/9999999999/fi_data/DEPOSIT - to fetch user's DEPOSIT data only
