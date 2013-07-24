include <keyplate.scad>;
$res = 0.5;


keys_wide = 2;
keys_tall = 1;
tilt = 25;

offset_x = 6;
extra_y1 = (1 - cos(tilt));


//offset_y1 = extra_y - 0.66 - 0.25 + 0;
offset_y1 = - 0.33 - 0.5;
tilted_keys1 = ["dcs_r2", keys_wide, keys_tall, 1, 1, offset_x, offset_y1, -tilt];

extra_y2 = (keys_tall / cos(tilt));
offset_y2 = extra_y2 - 0.33 - 0.5;
tilted_keys2 = ["dcs_r2", keys_wide, keys_tall, 1, 1, offset_x, offset_y2, -tilt];

// for each element of top-level array:
// [0] key type
// [1] x (number of columns)
// [2] y (number of rows)
// [3] x size multiplier (in "key" units, not mm)
// [4] y size multiplier (in "key" units, not mm)
// [5] translate x (in "key" units, not mm)
// [6] translate y (in "key" units, not mm)
// [7] z rotation

keys = [
    ["dcs_r2", 2, 3, 1, 1, 0, 0, 0], // Esc, ~, RShift, QAZ
    ["dcs_r2", 1, 4, 1, 1, 2, -0.66, 0], // WSX
    ["dcs_r2", 1, 4, 1, 1, 3, -0.33, 0], // EDC
    ["dcs_r2", 2, 3, 1, 1, 4, (-0.33 + 1), 0], // RFV, TGB
    ["dcs_r2", 2, 1, 1, 1.5, 4, (-0.33 - 0.5), 0], // ->, Bsp, Meta
    tilted_keys1, // Meta, Spc
    tilted_keys2, // NumLyr, SymLyr
    ["dcs_r2", 1, 1, 1, 1.25, 6, (-0.33 - 0.5 + (2 * extra_y2) - (2 * extra_y1)), 0], // Alt
    ["dcs_r2", 1, 1, 1, 1, 6, (1.25 -0.33 - 0.5 + (2 * extra_y2) - (2 * extra_y1)), 0], // 6
];


base = [
    [-10, -10], // bottom left
    [175, -40], // bottom right
    [135, 85], // top right
    [-10, 70] // top left
];

keyplate( keys, base );
    
