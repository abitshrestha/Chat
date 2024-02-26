const errorMiddleware=(err,req,res,next)=>{
    err.message=err.messasge || 'Internal Server Error';
    err.statusCode=err.statusCode || 500;

    res.statusCode(err.statusCode).json({
        success:false,
        message:err.message,
    });
}

export default errorMiddleware;