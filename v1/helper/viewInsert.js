const Visit = require('../../db/models').visit;
const Count = require('../../db/models').count;
const Sequelize = require('sequelize');
module.exports = {
    insertView(doc, UserId){
        for (var i in doc){
            val = doc[i];
            Visit.create({
                bid:val.dataValues.id,
                uid: UserId
            })
            Count.update({ 
                count: Sequelize.literal('count + 1')
            }, 
            { 
                where: { 
                    id: val.dataValues.id 
                } 
            });
        } 
    }
};