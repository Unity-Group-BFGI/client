import $ from 'jquery';
const getQuizzes = (headers = {}, query = "", data = {}, before = () => {},success = () => {},error = () => {}) => {
    try{
        window['get-ielts-my-quizzes-prefetch'] = $.ajax({
            url: process.env.REACT_APP_CLIENT_GET_API_GET_ALL_QUIZZES+query,
            data: {
                "action": "get-quizzes",
                "parent": "ielts-lms",
                ...data
            },
            method: "GET",
            dataType: "json",
            headers: headers,
            beforeSend: function(){
                if(window['get-ielts-my-quizzes-prefetch'] != null){
                    window['get-ielts-my-quizzes-prefetch'].abort();
                }
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

export default getQuizzes;