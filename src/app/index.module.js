import { routerConfig } from './index.route';
import { MainController } from './main/main.controller';

angular.module('codeChallenge', ['uiGmapgoogle-maps','xml','ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'toastr'])
  .config(routerConfig)
  .controller('MainController', MainController)
