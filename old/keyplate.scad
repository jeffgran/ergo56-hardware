include <keymatrix.scad>;

module keyplate( keys, base ) {
    union(){
        translate( [0, 0, 5.6] ) {
            for(m = keys) {
                translate([keydist * m[5], keydist * m[6]]){
                    rotate( [0, 0, m[7]] ) {
                        matrix(keytype = m[0], columns = m[1], rows = m[2], x = m[3], y = m[4] );
                    }
                }
            }
        }
        difference(){
            linear_extrude( height = 1.5 ) {
                polygon( base );
            }
            for(m = keys) {
                translate([keydist * m[5], keydist * m[6]]){
                    rotate( [0, 0, m[7]] ) {
                        matrix(keytype = "switch_cutout", columns = m[1], rows = m[2], x = m[3], y = m[4]);
                    }
                }
            }
        }
    }
    
}
