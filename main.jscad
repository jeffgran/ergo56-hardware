include("dcs.jscad");
include("keyplate.jscad");
include("ergo56.jscad");

include("ergo56body.jscad");

function main(){
  var leftside = new Ergo56({'keycaps': true})
  return leftside.render();
}
