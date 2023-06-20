import $ from 'jquery';
const addQuiz = (headers = {}, query = "", data = {}, before = () => {},success = () => {},error = () => {}) => {
    try{
        window['add-quiz-prefetch'] = $.ajax({
            url: process.env.REACT_APP_CLIENT_POST_API_ADD_QUIZ+query,
            data: {
                "action": "add-quiz",
                "parent": "ielts-lms",
                ...data
            },
            method: "POST",
            dataType: "json",
            headers: headers,
            beforeSend: function(){
                if(window['add-quiz-prefetch'] != null){
                    window['add-quiz-prefetch'].abort();
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

export default addQuiz;