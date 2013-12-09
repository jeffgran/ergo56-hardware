// DCS Row 2 key:
// actual length and width: 0.71875 inch (3/4 - 1/32)
// == 18.25625 mm
// 3/4 is 19.0500 mm (total space required per key)
// top is ~ 13mm wide x 14mm deep

// one 1x key actual space reserved for that key

DCS = function() {

  // this.width = function(){
  //   x * keydist;
  // }

  // this.height = function(){
  //   y * keydist;
  // }

  var self = this;

  var keydist = 19.05
  this.keydist = keydist;
  DCS.keydist = keydist;
  
  this.cutout_shape = function(x, y) {
    var main = CSG.cube({radius: [7, 7, 3]});
    var post1 = CSG.cube({radius: [7.9, 1.5, 3]}).translate([0, 4.9, 0]);
    var post2 = CSG.cube({radius: [7.9, 1.5, 3]}).translate([0, -4.9, 0]);
    var all = union.apply(this, [main, post1, post2]);
    return all.translate([(keydist*x)/2, (keydist*y)/2, 0]);
  }

  var dcs_keyshape = function( topwidth, botwidth, keyheight, x, y ) {
    
    var bottom = square({ size: [botwidth * x, botwidth * y], center: true });
    var BottomCSG = CSG.Polygon.createFromPoints(
      bottom.getOutlinePaths()[0].points
    );
    var top = square({ size: [topwidth * x, topwidth * y], center: true });
    var TopCSG = CSG.Polygon.createFromPoints(
      top.getOutlinePaths()[0].points
    );

    return BottomCSG.solidFromSlices({
      numslices: 2,
      callback: function(t, slice) {
        if(slice === 0){
          return this;
        } else {
          return TopCSG.translate([0, 0, keyheight]);
        }
      }
    });
  };


  
  var dcs_full_keycap = function (topwidth, botwidth, keyheight, x, y) {
    var outer = dcs_keyshape(topwidth, botwidth, keyheight, x, y).translate( [(botwidth * x) / 2, (botwidth * y) / 2, 0] );
    var inner = outer.contract(0.5, 1).translate([0, 0, -1]); // 1mm thick key cap
    var combined = outer.subtract(inner);
    combined.properties.width = self.keydist * x;
    combined.properties.height = self.keydist * y;
    combined.properties.x = x;
    combined.properties.y = y;
    
    combined.properties.keydist = DCS.keydist;
    combined.properties.cutout_shape = self.cutout_shape(x, y);
    
    return combined;
  };


  // // Example:
  // // new DCS.r2( x = 2 )      // 2x wide, 1x tall
  // // dcs_r2( y = 1.75 )   // 1.75x tall, 1x wide
  this.r2 = function (x, y) {
    return dcs_full_keycap( 14, 18.25625, 9, x, y );
  }

}
