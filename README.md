# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## BlackJack Game

I've made option to player either a Single player or with a Dealer. This option can be selected in the main screen. This application is built using React with Redux and TypeScript.

## Directory Structure

All the TS code live in _/src/_ directory. _index.tsx_ is the entry point for the application, all other files are imported when they are necessary. I've added components & other files to their respective sub-directories. This allows us to manage the code easily.

## Redux Store

This application requires information exchange between components. Redux is used to solve this. I don't want to populate _props_ by sending all the information through it. Also, by using redux store the code is clean & reusable.

Redux store is configured in _/src/store/index.ts_ & imported into '_/index.tsx_'.

## Reducers

1. Game - Stores the game type (single or dealer)
2. HighScore - Stores the high score for the corresponding games. Highscore is evaluated as total number of cards that's on the table to win the game.

## Components

1. App - Root application
2. Button - Button component that's used all over the game
3. Card - To display a card
4. Container - Wrapper of the game
5. Dashboard - Provides option to choose between 2 game types
6. Dealer - Dealer game type
7. H4 - Renders _h4_ tag
8. H6 - Renders _h6_ tag
9. Header - Shows the high score of corresponding game type
10. SinglePlayer - Single player game type
