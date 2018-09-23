const Count = require('../../db/models').count;
const Like = require('../../db/models').like;
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


    likeViewCount:function(blogID, callback) {
        var count123 = {
            blogID:blogID,
        } ;
        Like.count({
            where: {bid:blogID},
            distinct: true,
            col: 'like.id'
          })
          .then(function(LikeCount) {
            count123.status = "Success";
            count123.likeCount = LikeCount;
            Count.findOne({
                where: {bid:blogID},
              })
              .then(function(doc) {
                
                count123.view = doc.dataValues.count;
                console.log(count123);
                callback(null, count123);
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
