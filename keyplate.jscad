include("dcs.jscad");


Keyplate = function(vertices) {

  var plateshape = polygon(vertices);
  //if (arguments.length == 1 || undefined === tag) tag = '';
  
  var $plate = plateshape.extrude({offset: [0, 0, 1.5]});

  $plate.properties.shape = plateshape;
  $plate.properties.all_keys = null;
  $plate.properties.all_cutouts = null;


  var self = $plate;
  
  $plate.get_plate = function(opts) {
    var ret = $plate.subtract($plate.all_cutouts()).setColor([1,1,1]);

    if (opts['keycaps'] == true) {
      return union.apply(this, [ret, $plate.all_keys()]);
    } else {
      return ret;
    }
  }
  
  
  $plate.add_grid = function(options){
    var key = options['key'];
    var cutout = key.properties.cutout_shape;

    
    var keys = $plate.make_grid(key, options).translate([0,0,5.6]).setColor([0.6,0.75,1]);;
    if ($plate.properties.all_keys !== null) {
      $plate.properties.all_keys = union.apply(this, [$plate.properties.all_keys, keys]);
    } else {
      $plate.properties.all_keys = keys;
    }
    
    var cutouts = $plate.make_grid(cutout, options).setColor([0,0.75,0]);;
    if ($plate.properties.all_cutouts !== null) {
      $plate.properties.all_cutouts = union.apply(this, [$plate.properties.all_cutouts, cutouts]);
    } else {
      $plate.properties.all_cutouts = cutouts;
    }
    
  }

  $plate.add_rail = function(options) {
    var height = options['height'];
    var width = options['width'];
    var translation = options['translation']
    
    if (width) {
      poly = polygon([
        [0,-0.75],
        [(width*19.05),-0.75],
        [(width*19.05),0.75],
        [0,0.75]
      ])
    } else if (height) {
      poly = polygon([
        [-0.75,0],
        [-0.75,(height*19.05)],
        [0.75,(height*19.05)],
        [0.75, 0]
      ]);
    }
    rail = poly.extrude({offset: [0,0,-3]})
    if (translation) {
      rail = rail.translate([
        translation[0] * 19.05,
        translation[1] * 19.05,
        translation[2] * 19.05
      ]);
    }
    if ($plate.properties.all_rails !== undefined) {
      $plate.properties.all_rails = $plate.properties.all_rails.union(rail);
    } else {
      $plate.properties.all_rails = rail;
    }
  }

  
  // private
  $plate.make_grid = function(obj, options) {
    var key = options['key'];
    var rows = options['rows'];
    var columns = options['columns'];
    var translation = options['translation'];
    var rotation = options['rotation'];
    
    var objs = [];
    for (i = 0; i < columns; i++) {
      for (j = 0; j < rows; j++) {
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
  return $plate
}
