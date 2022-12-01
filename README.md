## How to use
You should run the [backend application](https://github.com/gabrielkf/ContactsList) before running this one.
After installing dependencies with yarn or npm:
```bash
yarn install
npm install
```

In the project directory, you can run one of the following scripts.
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

This will start the application (which requires the backend to be running previously).
It will accept new contacts (performing some basic validation) and sort them by name alphabetically.
Errors will be displayed on toast messages (very broad messages)
