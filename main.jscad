include("dcs.jscad");
include("keyplate.jscad");
include("ergo56.jscad");

function main(){
  var leftside = new Ergo56({'keycaps': false})
  return leftside.render();
}
