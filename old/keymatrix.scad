include <dcs.scad>;
include <switch_cutout.scad>;

module keyfunc( keytype, x = 1, y = 1 ) {
    //echo(keytype);
    if(keytype == "dcs_r2") {
        dcs_r2( x, y );
    }

    if(keytype == "switch_cutout") {
        switch_cutout( x, y );
    }

    // not implemented...
    if(keytype == "dsa") {
        dsa();
    }
}

// x and y are multipliers for 1.5x, 2x keys etc.
// all "keys" in the matrix will be the same
module matrix( keytype, rows, columns, x, y ) {
    union(){
        for(r = [0:rows-1]){
            for(c = [0:columns-1]){
                translate( [keydist*c, keydist*r] ){
                    keyfunc( keytype, x, y );
                }
            }
        }
    }    
}

