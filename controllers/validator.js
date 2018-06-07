var expression= new RegExp('^([0-9]{3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$');

exports.validator=(req,res,next)=>{
    console.log(expression.exec(req.body.IpServer));
    if(expression.exec(req.body.IpServer)){
        req.task=req;
        next();
    }
    else{
        res.json('error');
    }
}