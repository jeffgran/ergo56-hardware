Ergo56 = function(options) {
  if (!options) options = {};

  var render_keys = options['keycaps'] || false;

  var rim_thickness = 1.5;
  var rim_height = 16;
  var base_height = 13;


  
  var base = function(options) {
    shape = shape.subtract(shape.contract(rim_thickness, 1)).subtract(shape.contract(rim_thickness, 1).translate([0, 0, rim_thickness])).subtract(shape.contract(rim_thickness, 1).translate([0, 0, -rim_thickness]));
    return shape;
  }
  
  var toprim = function() {
    var shape = base_shape.extrude({offset: [0, 0, rim_height]});
    shape = shape.subtract(shape.contract(rim_thickness, 1).center([false, false, true]).scale([1, 1, 500]));
    return shape;
  }


  var dcs = new DCS();
  var one = dcs.r2(1,1);
  var one_point_five_high = dcs.r2(1,1.5);
  var one_point_five_wide = dcs.r2(1.5,1);
  var two_high = dcs.r2(1,2);
  var two_wide = dcs.r2(2,1);
  var one_point_twofive = dcs.r2(1,1.25);
  var one_point_twofive_wide = dcs.r2(1.25,1);

  var fingers_plate = function() {
    
    // edit me
    var bl_corner = [-2, -26]; // bottom left
    var br_corner = [114.3, -26]; // bottom right
    var tr_corner = [114.3, 82]; // top right
    var tl_corner = [-2, 82]; // top left

    var base_corners = [
      bl_corner,
      br_corner,
      tr_corner,
      tl_corner
    ];
    
    var keyplate = Keyplate(base_corners);
    
    // keyplate.properties.bl_corner = CSG.Vector3D(bl_corner);
    // keyplate.properties.br_corner = CSG.Vector3D(br_corner);
    // keyplate.properties.tl_corner = CSG.Vector3D(tl_corner);
    // keyplate.properties.tr_corner = CSG.Vector3D(tr_corner);

    // Esc, ~, RShift, QAZ
    keyplate.add_grid({
      key: one,
      rows: 3,
      columns: 2,
      translation: [0, -0.25, 0]
    })
    

    // WSX
    keyplate.add_grid({
      key: one,
      rows: 4,
      columns: 1,
      translation: [2, (0 - 0.25), 0]
    })
    // EDC
    keyplate.add_grid({
      key: one,
      rows: 4,
      columns: 1,
      translation: [3, (0 + 0.25), 0]
    })
    // RFV
    keyplate.add_grid({
      key: one,
      rows: 3,
      columns: 1,
      translation: [4, 0.25, 0]
    })
    // TGB
    keyplate.add_grid({
      key: one,
      rows: 3,
      columns: 1,
      translation: [5, 0.25, 0]
    })

    // Thumb key Leftmost
    keyplate.add_grid({
      key: one_point_five_high,
      rows: 1,
      columns: 1,
      translation: [3, -1.25, 0]
    })
    // keyplate.add_grid({
    //   key: one_point_five_wide,
    //   rows: 1,
    //   columns: 1,
    //   translation: [2.5, -1, 0]
    // })
    
    // Thumb key middle
    keyplate.add_grid({
      key: one_point_five_high,
      rows: 1,
      columns: 1,
      translation: [4, -1.25, 0]
    })
    // Thumb key right
    keyplate.add_grid({
      key: one_point_five_high,
      rows: 1,
      columns: 1,
      translation: [5, -1.25, 0]
    })




    
    // extra inner keys
    // keyplate.add_grid({
    //   key: one,
    //   rows: 2,
    //   columns: 1,
    //   translation: [6, 1.5, 0]
    // })



    // top-left extra keys
    // keyplate.add_grid({
    //   key: one,
    //   rows: 1,
    //   columns: 2,
    //   translation: [0, 3.25, 0]
    // })

    //top-right extra key(s)
    keyplate.add_grid({
      key: two_wide,
      rows: 1,
      columns: 1,
      translation: [4, 3.25, 0]
    })

    
    
    
    // rails
    keyplate.add_rail({
      height: 5.5,
      translation: [1,-1.25,0]
    })
    keyplate.add_rail({
      height: 5.5,
      translation: [2,-1.25,0]
    })
    keyplate.add_rail({
      height: 5.6,
      translation: [3,-1.35,0]
    })
    keyplate.add_rail({
      height: 5.6,
      translation: [4,-1.35,0]
    })
    keyplate.add_rail({
      height: 4.6,
      translation: [5,-1.35,0]
    })
    keyplate.add_rail({
      height: 4.45,
      translation: [6,-0.35,0]
    })


    keyplate.add_rail({
      width: 3.1,
      translation: [-0.1,-0.25,0]
    })
    keyplate.add_rail({
      width: 3.1,
      translation: [-0.1,0.75,0]
    })
    keyplate.add_rail({
      width: 3.1,
      translation: [-0.1,1.75,0]
    })
    keyplate.add_rail({
      width: 3.1,
      translation: [-0.1,2.75,0]
    })

    keyplate.add_rail({
      width: 3,
      translation: [3,0.25,0]
    })
    keyplate.add_rail({
      width: 3,
      translation: [3,1.25,0]
    })
    keyplate.add_rail({
      width: 3,
      translation: [3,2.25,0]
    })
    keyplate.add_rail({
      width: 3,
      translation: [3,3.25,0]
    })
    

    return keyplate
  }
  

  var thumb_plate1 = function() {

    var bl_corner1 = [0, 0]; // bottom left
    var br_corner1 = [40.1, 0]; // bottom right
    var tr_corner1 = [40.1, 25]; // top right
    var tl_corner1 = [0, 25]; // top left
    
    var corners1 = [
      bl_corner1,
      br_corner1,
      tr_corner1,
      tl_corner1
    ];
    
    var keyplate = Keyplate(corners1);
    // keyplate.properties.bl_corner = CSG.Vector3D(bl_corner1);
    // keyplate.properties.br_corner = CSG.Vector3D(br_corner1);
    // keyplate.properties.tl_corner = CSG.Vector3D(tl_corner1);
    // keyplate.properties.tr_corner = CSG.Vector3D(tr_corner1);
    
    keyplate.add_grid({
      key: one,
      rows: 1,
      columns: 2,
    })



    return keyplate;
  }


  var get_everything = function(){
    var arr = [];

    arr.push(fingers_plate());
    arr.push(thumb_plate());

    
    var everything = union.apply(this, arr).translate([0, 0, base_height]);
    return everything;
  }




  
  this.render = function(){

    //return get_everything().center([true, true, false]).translate([0, 0, 30]);
    
    var body = new Ergo56Body();
    var bodyshape = body.render();

    var bodyplate = fingers_plate();
    bodyplate.properties.connector = new CSG.Connector([bodyplate.getBounds()[0].x, bodyplate.getBounds()[0].y, bodyplate.getBounds()[1].z], [0,1,0], [0,0,1]);

    bodyplate = bodyplate.connectTo(
      bodyplate.properties.connector,
      bodyshape.properties.main_bl_connector,
      false,
      0
    );
    

    var thumbplate_template = thumb_plate1();
    thumbplate = thumbplate_template.rotateZ(-Tilt).translate([-1,2,0]);
    thumbplate.properties.connector = new CSG.Connector([0, 0, thumbplate.getBounds()[1].z], [0,1,0], [0,0,1]);

    thumbplate = thumbplate.connectTo(
      thumbplate.properties.connector,
      bodyshape.properties.thumb_bl_connector,
      false,
      0
    )

    thumbplate2 = thumbplate_template.rotateX(90);
    thumbplate2.properties.connector = new CSG.Connector([0, 0, 0], [0,1,0], [0,0,1]);

    thumbplate2 = thumbplate2.connectTo(
      thumbplate2.properties.connector,
      bodyshape.properties.thumbpoke_plate_connector,
      false,
      0
    )

    // cutouts
    bodyshape = bodyshape.subtract(bodyplate.properties.all_cutouts);
    bodyshape = bodyshape.subtract(thumbplate.properties.all_cutouts).subtract(thumbplate2.properties.all_cutouts);

    // rails
    bodyshape = bodyshape.union(bodyplate.properties.all_rails.subtract(bodyshape.properties.outside_angle1).subtract(bodyshape.properties.outside_angle2));
    
    // color
    bodyshape = bodyshape.setColor([1,1,1]);

    // keycaps
    bodyshape = bodyshape.union(bodyplate.properties.all_keys);
    bodyshape = bodyshape.union(thumbplate.properties.all_keys).union(thumbplate2.properties.all_keys);
    
    
    return bodyshape.mirroredX();//.center([true,true,true])
  }
}
