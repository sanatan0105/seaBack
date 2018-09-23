const Fl = require('../../db/models').fl;
//https://stackoverflow.com/questions/42235886/express-res-send-is-not-returning-the-result-of-my-module-exported-function-that
//callback function
//this module will return like and view count
//need to call async with blogid and callback parameters
// 😁
// Function call sample code
// router.get('/test/:ID', function(req, res, next) {
//   LikeVeiwCount.likeViewCount(req.params.ID, function(error, count) {
//       if ( error ) {
//         next(error);
//       }
//       res.send(count);
//   });
// });



module.exports = {


    FLList:function(userId, callback) {
        var FLcountList = {} ;
        Fl.count({
            //i am following someone
            where: {who:userId},
            col: 'fl.id'
          })
          .then(function(followingCount) {
            FLcountList.followingCount = followingCount;
            Fl.count({
                where: {whom:userId},
                col: 'fl.id'
              })
              .then(function(followerCount) {
                FLcountList.followerCount = followerCount;
                console.log(FLcountList);
                callback(null, FLcountList);
              })
              .catch(err =>{
                callback(err);
              })
          })
          .catch(err =>{
            callback(err);
          })
    }

}
