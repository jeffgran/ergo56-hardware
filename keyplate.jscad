include("dcs.jscad");


// module keyfunc( keytype, x = 1, y = 1 ) {
//     //echo(keytype);
//     if(keytype == "dcs_r2") {
//         dcs_r2( x, y );
//     }

//     if(keytype == "switch_cutout") {
//         switch_cutout( x, y );
//     }

//     // not implemented...
//     if(keytype == "dsa") {
//         dsa();
//     }
// }

// // x and y are multipliers for 1.5x, 2x keys etc.
// // all "keys" in the matrix will be the same
// module matrix( keytype, rows, columns, x, y ) {
//     union(){
//         for(r = [0:rows-1]){
//             for(c = [0:columns-1]){
//                 translate( [keydist*c, keydist*r] ){
//                     keyfunc( keytype, x, y );
//                 }
//             }
//         }
//     }    
// }


Keyplate = function() {
  var all_keys;
  var all_cutouts;

  this.keys = function(){
    return all_keys;
  }

  this.cutouts = function(){
    return all_cutouts;
  }
  
  this.add_grid = function(options){
    var key = options['key'];
    var cutout = key.properties.cutout_shape;

    
    var keys = make_grid(key, options);
    if (all_keys !== undefined) {
      all_keys = union.apply(this, [all_keys, keys]);
    } else {
      all_keys = keys;
    }
    
    var cutouts = make_grid(cutout, options);
    if (all_cutouts !== undefined) {
      all_cutouts = union.apply(this, [all_cutouts, cutouts]);
    } else {
      all_cutouts = cutouts;
    }
    
  }

  // private
  var make_grid = function(obj, options) {
    var key = options['key'];
    var rows = options['rows'];
    var columns = options['columns'];
    var translation = options['translation'];
    var rotation = options['rotation'];
    
    var objs = [];
    for (i = 0; i < rows; i++) {
      for (j = 0; j < columns; j++) {
        objs.push(obj.translate([key.properties.width * i, key.properties.height * j, 0]));
      }
    }
    
    var the_grid = union.apply(this, objs);

    if (rotation)
      the_grid = the_grid.rotateZ(rotation);
    
    the_grid.keywise_translate = function(xyz, keydist) {
      return this.translate([
        xyz[0] * key.properties.keydist,
        xyz[1] * key.properties.keydist,
        xyz[2] * key.properties.keydist
      ]);
    }
    
    if (translation)
      the_grid = the_grid.keywise_translate(translation, key.keydist);
    
    return the_grid;
  }
}
