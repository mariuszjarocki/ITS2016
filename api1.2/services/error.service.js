var logger=require('./logger.service');

exports.handler = function(err, req, res, next) {    
        logger.log(err.message,req);
        res.json({error:{msg:err.message}});
    }
    
exports.parseErrors=function(err){
    if(err){
        var errors=[];
        err.forEach(function(val,key){
          errors.push({msg:val.message});  
        })
        return errors;
    }
}
