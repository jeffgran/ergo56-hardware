use <dcs.scad>;

module switch_cutout( x, y ){
    xoffset = (((keydist * x) - 14) / 2);
    yoffset = (((keydist * y) - 14) / 2);
    translate( [xoffset, yoffset, 0] ){
        union(r = 0){
            linear_extrude(height = 2){
                square( size = [14,14], r = 0.2 );
            }

            translate( [-0.8, 1, 0] ){
                cube( size = [15.6,3.5,2], r = 0 );
            }

            translate( [-0.8, 9.5, 0] ){
                cube( size = [15.6,3.5,2], r = 0 );
            }

        }
    }
}

