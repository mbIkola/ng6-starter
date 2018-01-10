const AppConstants = {
  appName: "Angular ES6 Sample",
  jwtKey: "id-token",
  api: 'http://localhost:3000/api/',

  GA_KEY: 'UA-112210287-1',

  auth: {
    google: {
      clientId: '304244419104-ije5j2hhi9u46ppcdnmqmdtnt85lpoje.apps.googleusercontent.com',
      scope: ['profile', 'email'],
    },
    github: {
      clientId: '417cc6dc0c68b762da6a'
    },
    linkedin: {
      clientId: '7788yce1ksfyve'
    },
    facebook: {
      scope: ['public_profile', 'email'],
      clientId: '148835312439723'
    }
  }
};

export default AppConstants;
