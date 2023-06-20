import $ from 'jquery';
const verifyUser = (headers = {}, query = "", data = {}, before = () => {},success = () => {},error = () => {}) => {
    try{
        $.ajax({
            url: process.env.REACT_APP_CLIENT_GET_API_VERIFY+query,
            data: {
                ...data
            },
            method: "GET",
            dataType: "json",
            headers: headers,
            beforeSend: function(){
                before();
            },
            success: function(res){
                success(res);
            },
            error: function(err){
                error(err);
            }
        });
    } catch(err){
        error(err);
    }
    return;
};

export default verifyUser;