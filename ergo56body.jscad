Floor = cube({size: 500}).translate([-250,-250,-500]);
BL_corner = [-2, -26]; // bottom left
BR_corner = [114.3, -26]; // bottom right
TR_corner = [114.3, 82]; // top right
TL_corner = [-2, 82]; // top left
Height = 22;
BottomEdge = polygon([
  BL_corner,
  BR_corner,
  [BR_corner[0], BR_corner[1]-200],
  [BL_corner[0], BL_corner[1]-200],
]).extrude({offset: [0,0,Height+50]}).translate([0,0,-20]);
Tilt = 30;
Ergo56Body = function() {
  
  this.render = function() {

    var base_corners = [
      BL_corner,
      BR_corner,
      TR_corner,
      TL_corner
    ];

    var base1 = polygon(base_corners).extrude({offset: [0,0,Height+10]}).translate([0,0,-10]);
    base1.properties.main_br_connector = new CSG.Connector([BR_corner[0], BR_corner[1], Height], [0,1,0], [0,0,1]);
    base1.properties.main_tr_connector = new CSG.Connector([TR_corner[0], TR_corner[1], Height], [0,1,0], [0,0,1]);
    base1.properties.main_tl_connector = new CSG.Connector([TL_corner[0], TL_corner[1], Height], [0,1,0], [0,0,1]);
    base1.properties.main_bl_connector = new CSG.Connector([BL_corner[0], BL_corner[1], Height], [0,1,0], [0,0,1]);

    var thumb1 = cube({size: [46, 63, 50]}).translate([0,-27,0]);
    thumb1.properties.thumb_bl_connector = new CSG.Connector([0, 0, thumb1.getBounds()[1].z], [0,1,0], [0,0,1]);
    thumb1.properties.thumb_tl_connector = new CSG.Connector([0, thumb1.getBounds()[1].y, thumb1.getBounds()[1].z], [0,1,0], [0,0,1]);
    thumb1.properties.thumb_tr_connector = new CSG.Connector([thumb1.getBounds()[1].x, thumb1.getBounds()[1].y, thumb1.getBounds()[1].z], [0,1,0], [0,0,1]);
    thumb1.properties.thumb_br_connector = new CSG.Connector([thumb1.getBounds()[1].x, thumb1.getBounds()[0].y, thumb1.getBounds()[1].z], [0,1,0], [0,0,1]);

    thumb1 = thumb1.connectTo(
      thumb1.properties.thumb_bl_connector,
      base1.properties.main_br_connector,
      false,
      50
    );
        
    var both = union.apply(this,[
      base1,
      thumb1
    ]);
    both.properties.thumb1 = thumb1;
    both.properties.bottom_edge = BottomEdge;
    both = both.center([true,true,false]).rotateY(-12);
    
    thumbpanel_fill = new CSG.Polygon.createFromPoints([
      both.properties.main_tr_connector.point,
      both.properties.thumb_tr_connector.point,
      both.properties.thumb_br_connector.point,
      both.properties.thumb_bl_connector.point
    ]);

    thumbpanel_hedron = thumbpanel_fill.extrude(new CSG.Vector3D(0,0,-50));
    thumbpanel_hedron2 = thumbpanel_fill.extrude(new CSG.Vector3D(-50,0,-50));
    thumbpanel_hedron3 = thumbpanel_fill.extrude(new CSG.Vector3D(0,-12.5,-50));

    var main_fill = new CSG.Polygon.createFromPoints([
      both.properties.main_tl_connector.point,
      both.properties.main_tr_connector.point,
      both.properties.main_br_connector.point,
      both.properties.main_bl_connector.point
    ]);

    main_hedron = main_fill.extrude(new CSG.Vector3D(0,0,-50));
    main_hedron.properties = both.properties

    thumbpoke_part = cube({size: [38, 19, 19]});
    thumbpoke_part.properties.thumbpoke_plate_connector = new CSG.Connector([0,0,0], [0,1,0], [0,0,1]);
    thumbpoke_part = thumbpoke_part.rotateX(-50).rotateZ(-Tilt).translate([0,32,0]);
    thumbpoke_part.properties.connector = new CSG.Connector([0,0,0], [0,1,0], [0,0,1]);
    thumbpoke_part = thumbpoke_part.connectTo(
      thumbpoke_part.properties.connector,
      both.properties.thumb_bl_connector,
      false,
      0
    );
    
    
    
    var ret = union.apply(this,[
      main_hedron,
      thumbpanel_hedron,
      thumbpanel_hedron2,
      thumbpanel_hedron3,
      thumbpoke_part
    ]);

    var thumb_endcut = cube({size: 100}).translate([-13,-50,-50]).rotateY(-38).rotateZ(-Tilt);
    thumb_endcut.properties.connector = new CSG.Connector([0,0,0], [0,1,0], [0,0,1]);

    thumb_endcut = thumb_endcut.connectTo(
      thumb_endcut.properties.connector,
      both.properties.thumb_br_connector,
      false,
      0
    )

    ret = ret.subtract(thumb_endcut);

    //outside angles
    var outside_angle1 = cube({size: 100})
      .translate([0,-100,0])
      .rotateZ(-19)
      .translate([0,19.05,0])
      .translate([
        both.properties.main_bl_connector.point.x,
        both.properties.main_bl_connector.point.y,
        0
      ])
    ret = ret.subtract(outside_angle1)

    var outside_angle2 = cube({size: 100})
      .rotateZ(28)
      .translate([0,(19.05 * 4)+2,0])
      .translate([
        both.properties.main_bl_connector.point.x,
        both.properties.main_bl_connector.point.y,
        0
      ])
    ret = ret.subtract(outside_angle2)

    ret.properties.outside_angle1 = outside_angle1
    ret.properties.outside_angle2 = outside_angle2
    
    var inside = ret.contract(1.5, 8).setColor([1,1,0]);
    ret = ret.subtract(inside);
    ret = ret.subtract(Floor);
    //return thumb1;
    return ret
  };

};
