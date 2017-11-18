var db = require("../models");
<<<<<<< HEAD
var isItemUnique = function(queryColumn,queryItem,queryTable) {
  if (queryColumn=="username"){
    return queryTable.count({ where: {username : queryItem } })
      .then(count => {
        if (count != 0) {
          return false;
        }
        return true;
    });
  }
  if (queryColumn=="OMDB_id"){
    return db.show.count({ where: {OMDB_id : queryItem } })
      .then(count => {
        console.log("COUNT COUNT COUNT: ",count);
        if (count != 0) {
          return false;
        }
       return true;
    });
  }
};
=======
>>>>>>> 1523024ab59369cc90f6ef843c9c9daae943ad3a

module.exports = function(app) {

  // Add a new user to the if not already exists
  app.post("/api/user", function(req, res) {
    // Check if user already exists
    db.user.findOrCreate({
      where: {
        username: req.body.username
      },
      defaults: {
        username: req.body.username,
        password: req.body.password
      }
    }).spread((user, created) => {
        plain:true

        if(created){
          console.log("USER ADDED TO DATABASE");
          res.redirect("/");     
        }
        else {
          console.log("USER ALREADY IN DATABASE");
          res.status(400).send('Username already exists!');
        }
    })
  });

  // Show the login/user selection page
  app.get("/", function(req,res){

    // Query users from database
    db.user.findAll({})
    .then(function(dbUsers){
      var userObj = {
        user:dbUsers
      }

      res.render("login", userObj);
    });  
  });

 //get the newest five of each category and GET to HdnlBars for User Homepage
  app.get("/user/:userid", function(req, res) {
    console.log("GET /user/userid");

    var currentID = req.params.userid;

    db.user_show.findAll({
      where:{
        userId:currentID,
        relation:"favorite"
      },
      limit:5,
      order:[
        ['createdAt','DESC']
      ],
      include:{
        model:db.show
      }
    }).then(function(dbUserFav){
      var favoritesArray = dbUserFav;

        db.user_show.findAll({
          where:{
            userId:currentID,
            relation:"watchList"
            },
            limit:5,
            order:[
              ['createdAt','DESC']
            ],
            include:{
              model:db.show
            }
        }).then(function(dbUserWatch){
          var watchlistArray = dbUserWatch;

          db.user.findById(currentID)
          .then(function(dbUser){
            var user = {
              user_id: currentID,
              username: dbUser.username,
              favorite: favoritesArray,
              watchList: watchlistArray
            }
            res.render("index", user);
          })
        })
      })
  });

  // Display all shows in the relation for user
  app.get("/rel/:userid/:relation", function(req, res) {
    console.log("GET /rel/:userid/:relation");

    var currentID = req.params.userid;
    var currentRelation = req.params.relation;
    console.log("RELATION, User Id Selected: " +currentRelation+" "+ currentID);

    db.user_show.findAll({
      where:{
        userId:currentID,
        relation:currentRelation
      },
      order:[
        ['createdAt','DESC']
      ],
      include:{
        model:db.show
      }
    }).then(function(dbOneRelation){
      var relationArray = dbOneRelation;
      db.user.findById(currentID)
      .then(function(dbUser){
        var user = {
          user_id: currentID,
          username: dbUser.username,
          relation: currentRelation,
          relationArray: relationArray
        }
        //res.json(user);
        res.render("relationship", user);
      })
    })
  });


 // Add new show if if not already exists
  app.post("/api_ShowLookup/:userID/:OMDB_ID/:title/:imgURL", function(req, res) {
<<<<<<< HEAD
    var imgBaseUrl = "https://image.tmdb.org/t/p/w185/";
    isItemUnique("OMDB_id",req.params.OMDB_ID,db.show).then(isUnique => {
      if(isUnique){
        console.log("SHOW IS UNIQUE : TRUE");
        db.show.create({
          title:req.params.title,
          OMDB_id:req.params.OMDB_ID,
          imgURL:imgBaseUrl+req.params.imgURL,
          contentURL:"https://content.jwplatform.com/players/V7gKg9PI-UbMgy82L.html"
        }).then(function(showCreate){
          console.log(showCreate);
          res.send(true);
          res.redirect("/user/"+req.params.userID);
        });
      } else {
        console.log("SHOW IS UNIQUE : FALSE");
        res.send(false);
=======
  console.log("POST /api_ShowLookup/:userID/:OMDB_ID/:title/:imgURL");
    var imgBaseUrl = "https://image.tmdb.org/t/p/w185/";

    db.show.findOrCreate({
      where: {
        OMDB_id: req.params.OMDB_ID
      },
      defaults: {
          title: req.params.title,
          OMDB_id: req.params.OMDB_ID,
          imgURL: imgBaseUrl+req.params.imgURL,
          contentURL: "blank"
>>>>>>> 1523024ab59369cc90f6ef843c9c9daae943ad3a
      }
    }).spread((show, created) => {
        plain:true

<<<<<<< HEAD
  app.post("/api_relation/:userID/:OMDB_ID/:relation", function(req, res) {
    //search for show_id by OMDBid in shows, then.... 
    console.log("RELATIONSHIP CHECK");
    db.show.findOne({
      where:{
        OMDB_id:req.params.OMDB_ID
      }
    }).then(function(dbShowIDLookUp){
      var currentShowID = dbShowIDLookUp.id;
      console.log("currentShowID: " + currentShowID);
      console.log("userID: " + req.params.userID);
      console.log("relation: " + req.params.relation);
      db.user_show.count({
        where:{
          userID : req.params.userID,
          relation: req.params.relation,
          showID: currentShowID
        } 
      }).then(function(count){
        console.log("RELATIONSHIP COUNT: " + count);
          if (count == 0){
            console.log("RELATION IS UNIQUE : TRUE")
            db.user_show.create({
              userID:req.params.userID,
              showID:dbShowIDLookUp.id,
              relation:req.params.relation
            }).then(function(relationCreate){
              console.log("CREATED RELATION");
              relationCreate.userId = req.params.userID;
              relationCreate.showId = currentShowID;
              relationCreate.save({fields: ['userId','showId']}).then(() => {
                  res.send(true);
                })
              //res.send(true);
            });
          }else{
            console.log("RELATION IS UNIQUE : FALSE");
            res.send(false);
          }
        });
    });
=======
        if(created){
          console.log("SHOW ADDED TO DATABASE");     
        }
        else {
          console.log("SHOW ALREADY IN DATABASE");
        }
      res.send(show);
    })
>>>>>>> 1523024ab59369cc90f6ef843c9c9daae943ad3a
  });

  // Adds a user_show row to database if not already exists
  app.post("/api_relation/:userID/:showID/:relation", function(req, res) {

    db.user_show.findOrCreate({
      where: {
        userID : req.params.userID,
        relation: req.params.relation,
        showID: req.params.showID      
      },
      defaults: {
        relation: req.params.relation        
      }
    })
    .spread((showUser, created) => {
        plain:true

        if(created){
          showUser.userId = req.params.userID,
          showUser.showId = req.params.showID,
          showUser.save({fields: ['userId', 'showId']}).then(() => {
            console.log("NEW USER_SHOW ADDED");
            res.send(true);
          })
        }
      else {
        console.log("EXISTING USER_SHOW");
        res.send(false);
      }
    })
});


  // app.delete("/api_relation/:userShowID", function(req, res) {
  //   //   db.Author.destroy({
  //   //     where: {
  //   //       id: req.params.id
  //   //     }
  //   //   }).then(function(dbAuthor) {
  //   //     res.json(dbAuthor);
  //   //   });
  //   // });

  // });
}