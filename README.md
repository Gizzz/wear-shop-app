# wear-shop-app
Simple e-shop written on React and inspired by Google's Polymer demo project. Design and and behavior are reverse-engineered from [the original](https://shop.polymer-project.org/)

## Installation and usage
Install all dependencies:
```
npm i
```

Build assets with webpack:
```
npm run build:prod
```

App now is ready to start:
```
npm start
```

## Versions and branches

Versions:  
- v1 - uses react component's state feature to manage its state. It has v1.0.0 tag and can be found in `react-component-state` branch.  
- v2 - uses redux to manage its state. It has v2.0.0 tag and can be found in `redux-integration` branch.  

`master` branch contains most recent version of the app (yep, no `dev`, right to the `master`). It could be less stable then versioned branches.
