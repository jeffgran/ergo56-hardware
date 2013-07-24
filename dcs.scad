// DCS Row 2 key:
// actual length and width: 0.71875 inch (3/4 - 1/32)
// == 18.25625 mm
// 3/4 is 19.0500 mm (total space required per key)
// top is ~ 13mm wide x 14mm deep

// one 1x key actual space reserved for that key
keydist = 19.05;


module dcs_keyshape( topwidth, botwidth, keyheight, x, y ) {
    
    //scalemult = ((1 - (topwidth/botwidth)) / keyheight);
    // echo(scalemult);
    // linear_extrude( height = (keyheight), scale(h) = (1 - (h * scalemult)) ) {
    //     // echo([botwidth * x, botwidth * y]);
    //     square( size = [botwidth * x, botwidth * y], r = 1, center = true );
    // }

    hull(){
        linear_extrude(height = 0.01){
            square( size = [botwidth * x, botwidth * y], r = 1, center = true );
        }
        translate( [0, 0, keyheight - 0.02] ) {
            linear_extrude(height = 0.01){
                square( size = [topwidth * x, topwidth * y], r = 1, center = true );
            }
        }
    }
}

module dcs_full_keycap( topwidth, botwidth, keyheight, x, y ){
    translate( [(botwidth * x) / 2, (botwidth * y) / 2, 0] ) { // recenter
        difference(){
            dcs_keyshape( topwidth, botwidth, keyheight, x, y );
            scale( [0.9, 0.9, 0.9] ) { // totally inaccurate keycap thickness!
                dcs_keyshape( topwidth, botwidth, keyheight, x, y );
            }
        }
        
    }
}

// Example:
// dcs_r2( x = 2 )      // 2x wide, 1x tall
// dcs_r2( y = 1.75 )   // 1.75x tall, 1x wide
module dcs_r2( x = 1, y = 1 ) {
    dcs_full_keycap( topwidth = 14, botwidth = 18.25625, keyheight = 9, x = x, y = y );
}
