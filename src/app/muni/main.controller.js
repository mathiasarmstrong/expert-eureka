let _MapService, _BusService, _$timeout;
export default class MainController {
  constructor (MapService, BusService, $timeout) {
    'ngInject';
    [_MapService, _BusService, _$timeout] = arguments;
    this.allMuni = {};
    this.colors = {};
    this.chosenRoute = '';
    _MapService.createMap();
    this.getMyLocation();
    _BusService.getRoutes().then(()=> $timeout(()=>this.getBuses()));
  }
  getMyLocation(){
    navigator.geolocation.getCurrentPosition((position)=>{
      _MapService.createDot({_lon:position.coords.longitude, _lat:position.coords.latitude, _routeTag:'your location'}, 'green', '7px');
    })
  }
  getBuses(){
    _.each(_BusService.getLocations(), (routeAjaxCall)=>{
      routeAjaxCall.then(buses => this.addBusDot(_.flatten(buses)))
    })
    _$timeout(()=> this.getBuses(), 13000)
  }
  addBusDot(buses){
    
    _.each(buses, (bus)=>{
      this.allMuni[bus._id] = bus;
      bus._routeTag  = `Route ${bus._routeTag}`
      this.colors[bus._routeTag] = this.colors[bus._routeTag] || randomColor();
      if (bus._secsSinceReport <600) _MapService.createDot(bus, this.colors[bus._routeTag])
    })
    this.routes = _(this.allMuni).map(bus => bus._routeTag).uniq().value()
  } 
  filterRoutes(chosenRoute){
    _MapService.filterDots(chosenRoute, this.allMuni)
  }
}