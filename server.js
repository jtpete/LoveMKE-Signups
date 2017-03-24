const express = require( "express" );
const path = require( "path" );
const request = require( "request" );
const bodyParser = require( "body-parser" );
const app = express();

const port = process.env.PORT || 3030;

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

app.use( "/", express.static( path.join( __dirname, "public" ) ) );

app.post( "/api/ccb", ( req, res ) => {
  var searchString = "";
  console.log(req.body);
  console.log(req.body.lName);
  if(req.body.lName){
    searchString += "&last_name=" + req.body.lName;
  }
  if(req.body.fName){
    searchString += "&first_name=" + req.body.fName;
  }
  if(req.body.phone){
    searchString += "&phone=" + req.body.phone;
  }
  if(req.body.email){
    searchString += "&email=" + req.body.email;
  }

  console.log("https://southbrook.ccbchurch.com/api.php?srv=individual_search" + searchString);
  let searchTerms = "https://southbrook.ccbchurch.com/api.php?srv=individual_search" + searchString;
    request.get(searchTerms, function(error, response, body){
      console.log("response=" + response);
      console.log("responseStatus=" + response.statusCode);
      console.log("responseBody=" + response.body);
      if(!error && response.statusCode == 200){
        console.log("body=" + body);
        res.send(body);
      }else{
        console.log(error);
      }
   });
} );

app.listen( port, () => {
  console.log( `App listening on port ${port}!` );
} );
