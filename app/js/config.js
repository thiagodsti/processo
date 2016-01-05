/**
  NOTE 1: Third-Party-Components:
  -> How to add in paths:
  When you want to add any third party component, you should name it as below:
  -------- %name : 'locate/%component-%version' ----------
  Where %component-%version is your JS component.
  -> How to add require dependency in shim:
  This part will teach app which one load first.
  Add your component require dependency as below:
  -------- %name : ['dependence1', 'dependence2'] --------

  NOTE 2: Go to app/_module.js


*/
require.config({
  paths: {
    'angular': 'components/angular/angular.js',
    'angular-messages': 'components/angular-messages/angular-messages.js',
    'ui-grid' : 'components/angular-ui-grid/ui-grid.js'
    },
  shim: {
    'angular': {
      'exports': 'window.angular',
      'deps': ['jquery']
    },
    'angular-messages' : ['angular'],
    'ui-grid' : ['angular']
  },
  waitSeconds: 240

  });
