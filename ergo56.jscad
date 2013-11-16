Ergo56 = function(options) {
  if (!options) options = {};

  var render_keys = options['keycaps'] || false;


  // edit me
  var bl_corner = [-10, -10]; // bottom left
  var br_corner = [170, -50]; // bottom right
  var tr_corner = [150, 85]; // top right
  var tl_corner = [-10, 70]; // top left

  var base_corners = [
    bl_corner,
    br_corner,
    tr_corner,
    tl_corner
  ];
  var base_shape = polygon(base_corners);

  var rim_thickness = 3;
  var rim_height = 16;
  var base_height = 13;


  
  var base = function(options) {
    var bottomplate = (options == undefined || options['bottomplate'] == undefined ? true : options['bottomplate'])
      
    var shape = base_shape.extrude({offset: [0, 0, base_height]}).translate([0, 0, -base_height]);

    shape = shape.subtract(shape.contract(rim_thickness, 1)).subtract(shape.contract(rim_thickness, 1).translate([0, 0, rim_thickness])).subtract(shape.contract(rim_thickness, 1).translate([0, 0, -rim_thickness]));

    return shape;
    
    if (bottomplate) {
      return shape;
    } else {
      shape = shape.subtract(shape.contract(rim_thickness, 1).translate([0, 0, -8]));
      return shape;
    }
  }

  var key_plate = function() {
    return base_shape.extrude({offset: [0, 0, 1.5]}).subtract(all_cutouts());
  }
  
  var toprim = function() {
    var shape = base_shape.extrude({offset: [0, 0, rim_height]});
    shape = shape.subtract(shape.contract(rim_thickness, 1).center([false, false, true]).scale([1, 1, 500]));
    return shape;
  }



  var layout = function() {
    var dcs = new DCS();
    var one = dcs.r2(1,1);
    var one_point_five_high = dcs.r2(1,1.5);
    var one_point_twofive = dcs.r2(1,1.25);


    var keylayout = [];
    var keyplate = new Keyplate();

    // Esc, ~, RShift, QAZ
    keyplate.add_grid({
      key: one,
      rows: 2,
      columns: 3
    })

    // WSX
    keyplate.add_grid({
      key: one,
      rows: 1,
      columns: 4,
      translation: [2, -0.66, 0]
    })
    // EDC
    keyplate.add_grid({
      key: one,
      rows: 1,
      columns: 3,
      translation: [3, (-0.33 + 1), 0]
    })
    // RFV, TGB
    keyplate.add_grid({
      key: one,
      rows: 2,
      columns: 3,
      translation: [4, (-0.33 + 1), 0]
    })
    // ->, Bsp, Meta
    keyplate.add_grid({
      key: one_point_five_high,
      rows: 3,
      columns: 1,
      translation: [3, (-0.33 - 0.5), 0]
    })

    // tilted thumb keys
    var keys_wide = 2;
    var keys_tall = 1;
    var tilt = 35; //edit me

    var extra_y1 = (1 - cos(tilt));
    var offset_y1 = - 0.33 - 0.5;
    keyplate.add_grid({
      key: one,
      rows: keys_wide,
      columns: keys_tall,
      translation: [6, offset_y1, 0],
      rotation: -tilt
    })

    var extra_y2 = (keys_tall / cos(tilt));
    var offset_y2 = extra_y2 - 0.33 - 0.5;
    keyplate.add_grid({
      key: one,
      rows: keys_wide,
      columns: keys_tall,
      translation: [6, offset_y2, 0],
      rotation: -tilt
    })

    // Alt
    keyplate.add_grid({
      key: one_point_twofive,
      rows: 1,
      columns: 1,
      translation: [6, (-0.33 - 0.5 + (2 * extra_y2) - (2 * extra_y1)), 0]
    })
    // 6
    keyplate.add_grid({
      key: one,
      rows: 1,
      columns: 1,
      translation: [6, (1.25 -0.33 - 0.5 + (2 * extra_y2) - (2 * extra_y1)), 0]
    })
    return keyplate
  }




  
  var all_keys = function() {
    // 5.6 is the height off the plate that the keycaps would sit
    return layout().keys().translate( [0, 0, 5.6] );
  }

  var all_cutouts = function() {
    return layout().cutouts();
  }
  


  



  var get_everything = function(){
    var arr = [];

    if (render_keys)
      arr.push(all_keys());

    arr.push(key_plate());
    arr.push(base({bottomplate: false}));
    //arr.push(toprim());
    
    var everything = union.apply(this, arr).translate([0, 0, base_height]);
    return everything;
  }



  

  // hardcore rotation baby.
  var rotate_everything = function() {
    // we want to rotate from the bottom right so center it
    everything = everything.translate([-br_corner[0], -br_corner[1]]);


    bottom_right_to_top_right_vector = [
      (tr_corner[0] - br_corner[0]),
      (tr_corner[1] - br_corner[1]),
      0
    ];

    bottom_right_to_bottom_left_vector = [
      (bl_corner[0] - br_corner[0]),
      (bl_corner[1] - br_corner[1]),
      0
    ];

    var front_to_back_tilt = 10;
    // rotate(rotationCenter, rotationAxis, degrees);
    everything = everything.rotate([0, 0, 0], bottom_right_to_bottom_left_vector, -front_to_back_tilt);


    var tr_vec = new CSG.Vector3D(tr_corner[0]-br_corner[0], tr_corner[1]-br_corner[1], 0);
    var rot_matrix = CSG.Matrix4x4.rotation([0, 0, 0], bottom_right_to_bottom_left_vector, -front_to_back_tilt);
    var new_tr_location = tr_vec.transform(rot_matrix);

    var new_angle = atan(new_tr_location.x/new_tr_location.y)


    everything = everything.rotateZ(new_angle);
    return everything;
  }

  
  this.render = function(){

    return get_everything();//.center([true, true, false]);
  }
}
