let _$log;
export default class MapSevice {
	constructor($log) {
		'ngInject';
    [_$log] =arguments;
	}
	createMap(){
		let width = 960,
    height = 900,
    scale0 = 1;
    
    this.muni ={};
    this.path = d3.geo.path();
    this.projection = d3.geo.mercator();
    this.zoom = d3.behavior.zoom()
      .translate([0, 150])
      .scale(scale0)
      .scaleExtent([0.95*scale0, 8 * scale0])
      .on("zoom", ()=>this.zoomed());

    let svg = d3.select("#map").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append('g');

    this.g = svg.append('g')
    svg.call(this.zoom)    
      .call(this.zoom.event)    
    
    d3.json("app/main/sf.json",(error, sf)=>{
      if (error) return _$log.error(error);
      let featureCollection = topojson.feature(sf, sf.objects.neighborhoods);
      let bounds = d3.geo.bounds(featureCollection);
      let centerX = d3.sum(bounds, function(d) {return d[0];}) / 2,
      centerY = (d3.sum(bounds, function(d) {return d[1];}) )/ 2;
      this.projection.scale(270000)
      .center([centerX, centerY]);
      this.path.projection(this.projection);

      this.g.selectAll("g")
        .data(topojson.feature(sf, sf.objects.arteries).features)
        .enter().append("path")
        .attr('class','artery')
        .attr("d", this.path);

      this.g.selectAll("g")
        .data(topojson.feature(sf, sf.objects.neighborhoods).features)
        .enter().append("path")
        .attr('class','neighborhood')
        .attr("d", this.path);

      this.g.selectAll("g")
        .data(topojson.feature(sf, sf.objects.freeways).features)
        .enter().append("path")
        .attr('class','neighborhood')
        .attr("d", this.path);
      this.g.selectAll("g")
        .data(topojson.feature(sf, sf.objects.streets).features)
        .enter().append("path")
        .attr('class','neighborhood')
        .attr("d", this.path);
    });
  }
  createDot(dotItem, color="red", size='3px'){
    let id = `b${dotItem._id}`
    let latlon = [dotItem._lon, dotItem._lat]
    if(this.g.selectAll(`circle#${id}`)[0].length>0){
      this.g.selectAll(`circle#${id}`)
      .transition().duration(13000)
      .attr("cx",()=>{ return this.projection(latlon)[0]; })
      .attr("cy",()=>{ return this.projection(latlon)[1]; })      
    }else{
      this.g.selectAll('g')
      .data([latlon]).enter()
      .append("circle")
      .attr("cx",(d)=>{ return this.projection(d)[0]; })
      .attr("cy",(d)=>{ return this.projection(d)[1]; })
      .attr("r", size)
      .attr('id', id)
      .attr("fill", color)
      .attr('title', dotItem._routeTag)
    }
    $(`circle#${id}[title]`).tipsy({
      arrowWidth: 10, 
      attr: 'data-tipsy', 
      cls: null, 
      duration: 300, 
      offset: 3, 
      position: 'top-center', 
      trigger: 'hover', 
      onShow: null, 
      onHide: null 
    })
  }
  zoomed(){
    this.g.attr("transform","translate("+ 
      d3.event.translate.join(",")+")scale("+d3.event.scale+")");
    this.g.selectAll("circle")
      .attr("d", this.path.projection(this.projection));
    this.g.selectAll("path")  
      .attr("d", this.path.projection(this.projection));
  }
  filterDots(dotstoshow, allDots){
    _(allDots).map((dot)=> `#b${dot._id}`)
    .each(dotId => this.g.selectAll(dotId).attr('opacity', 1).attr('data-tipsy-disabled', null))

    _(allDots).filter((dot)=>dotstoshow && dot._routeTag !== dotstoshow)
    .map( dot => `#b${dot._id}`)
    .each(dotId => this.g.selectAll(dotId).attr('opacity', 0).attr('data-tipsy-disabled', true))
  }
}