var alertTypeEnum={
        SUCCESS:0,
        ERROR:1,
};

var successEnum={
        SERVER_CONNECTION_SUCCESS:0
};

var errorEnum = {
        NO_ACCESS_ERROR: 0,
        DB_CONNECTION_ERROR: 1,
        INTERNAL_ERROR:2
};

module.exports.internalAlerts = {
                accessError: {
                        message: "Access denied.",
                        type: alertTypeEnum.ERROR,
                        id:errorEnum.NO_ACCESS_ERROR
                },
                dbConnectionError: {
                        message: "Problem with the database connection.",
                        type: alertTypeEnum.errorEnum,
                        id:errorEnum.DB_CONNECTION_ERROR
                },
                internalError:{
                        message:"Internal Server error.",
                        type:alertTypeEnum.ERROR,
                        id:errorEnum.INTERNAL_ERROR
                },
                connectionSuccess:{
                        message:"Server connection success.",
                        type:alertTypeEnum.SUCCESS,
                        id:successEnum.SERVER_CONNECTION_SUCCESS
                }
        };

