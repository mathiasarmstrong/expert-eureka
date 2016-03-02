import { routerConfig } from './index.route';
import MainController from './main/main.controller';
import MapService from './map/map.service';
import BusService from './bus/bus.service';

angular.module('codeChallenge', ['uiGmapgoogle-maps','xml','ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'toastr'])
  .config(routerConfig)
  .controller('MainController', MainController)
  .service('BusService', BusService)
  .service('MapService', MapService)
