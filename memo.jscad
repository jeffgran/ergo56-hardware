// stuff I wrote that I might want to refer to again
  

  // hardcore rotation baby.
  // var rotate_everything = function() {
  //   // we want to rotate from the bottom right so center it
  //   everything = everything.translate([-br_corner[0], -br_corner[1]]);


  //   bottom_right_to_top_right_vector = [
  //     (tr_corner[0] - br_corner[0]),
  //     (tr_corner[1] - br_corner[1]),
  //     0
  //   ];

  //   bottom_right_to_bottom_left_vector = [
  //     (bl_corner[0] - br_corner[0]),
  //     (bl_corner[1] - br_corner[1]),
  //     0
  //   ];

  //   var front_to_back_tilt = 10;
  //   // rotate(rotationCenter, rotationAxis, degrees);
  //   everything = everything.rotate([0, 0, 0], bottom_right_to_bottom_left_vector, -front_to_back_tilt);


  //   var tr_vec = new CSG.Vector3D(tr_corner[0]-br_corner[0], tr_corner[1]-br_corner[1], 0);
  //   var rot_matrix = CSG.Matrix4x4.rotation([0, 0, 0], bottom_right_to_bottom_left_vector, -front_to_back_tilt);
  //   var new_tr_location = tr_vec.transform(rot_matrix);

  //   var new_angle = atan(new_tr_location.x/new_tr_location.y)


  //   everything = everything.rotateZ(new_angle);
  //   return everything;
  // }












  
  // var thumb_plate_old = function() {

  //   var bl_corner1 = [-20, 0]; // bottom left
  //   var br_corner1 = [40.1, 0]; // bottom right
  //   var tr_corner1 = [40.1, 25]; // top right
  //   var tl_corner1 = [-20, 25]; // top left

  //   var corners1 = [
  //     bl_corner1,
  //     br_corner1,
  //     tr_corner1,
  //     tl_corner1
  //   ];
    
  //   var keyplate1 = new Keyplate(corners1);
    
  //   keyplate1.add_grid({
  //     key: one,
  //     rows: 1,
  //     columns: 2,
  //   })
    
  //   var tilt = 20; //edit me

  //   var extra_y = (1 / cos(tilt)) * 19.05;
  //   var leftedge = cube({size: 200}).translate([-200, -100, -100]).setColor([1,1,1]);
  //   var topedge = cube({size: 200}).translate([0, 82, 0]).setColor([1,1,1]);;
    
  //   p1 = keyplate1.get_plate({'keycaps': render_keys}).translate([-2,0,0]).rotateZ(-tilt);


  //   var bl_corner2 = [-20, 0]; // bottom left
  //   var br_corner2 = [40.1, 0]; // bottom right
  //   var tr_corner2 = [40.1, 28]; // top right
  //   var tl_corner2 = [-20, 28]; // top left

  //   var corners2 = [
  //     bl_corner2,
  //     br_corner2,
  //     tr_corner2,
  //     tl_corner2
  //   ];
    
  //   var keyplate2 = new Keyplate(corners2);
    
  //   keyplate2.add_grid({
  //     key: one,
  //     rows: 1,
  //     columns: 2,
  //     translation: [0,0.35,0]
  //   })
    
  //   p2 = keyplate2.get_plate({'keycaps': render_keys})
    
  //   p2.properties.left_edge_for_extrusion = new CSG.Polygon.createFromPoints(square([1.5, 28]).vertices()).translate([-2,0,0]);
  //   p2 = p2.subtract(leftedge.translate([-2,0,0])).rotateX(50).rotateZ(-tilt).translate([0,extra_y+6.5,0]);


  //   the_piece = union.apply(this, [p1,p2]).rotateY(50).subtract(leftedge).translate([114.3, -25, 0]);
  //   newpiece = the_piece.properties.left_edge_for_extrusion.extrude(new CSG.Vector3D(0,100,0)).subtract(topedge).setColor([1,1,1]);

  //   the_piece = union.apply(this, [the_piece, newpiece]);
  //   return the_piece
  // }










CAG.prototype.vertices = function() {
  var verts = [];
  this.sides.map(function(side){
    verts.push([side.vertex0.pos.x, side.vertex0.pos.y, 0]);
  });
  return verts;
};
