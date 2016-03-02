let _$http, _x2js, _$log;
let agencyUrl = 'http://webservices.nextbus.com/service/publicXMLFeed';
export default class BusService {
	constructor($http, x2js, $log) {
		'ngInject';
		[_$http, _x2js, _$log] = arguments
	}
	getRoutes(){
    return _$http.get(agencyUrl,{ 
      params:{
        command:'routeList', 
        a:'sf-muni'
      }
    }).then((data)=>{
      this.xmlRoutes =_x2js.xml_str2json(data.data).body.route;
    })
	}
	getLocations(){
    _$log.log('call started');
    return _.map(this.xmlRoutes, (route)=>{
      if (route._tag){
        return _$http.get(agencyUrl, {
          params:{
            command:'vehicleLocations', 
            a:'sf-muni',
            r:route._tag
          }
        }).then((data)=>{
          let routes = _(_x2js.xml_str2json(data.data).body).map( (v)=>{
            let item = v;
            if (!_.isArray(v) && !v._id){
              return null
            }else if(_.isArray(v)){
              return _.map(item, (bus)=>{
                if (bus._lon, bus._lat){
                  return bus;
                }else {
                  return null
                }
              })
            }else{
              return item;
            }
          }).compact().value();
          return routes;
        })
      }
    })
  }
}