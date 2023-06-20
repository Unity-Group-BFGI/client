import $ from 'jquery';
const editBasicQuiz = (headers = {}, query = "", data = {}, before = () => {},success = () => {},error = () => {}) => {
    try{
        window['basic-edit-quiz-prefetch'] = $.ajax({
            url: process.env.REACT_APP_CLIENT_PUT_API_EDIT_QUIZ+query,
            data: {
                "action": "edit-basic-quiz",
                ...data
            },
            method: "PUT",
            dataType: "json",
            headers: headers,
            beforeSend: function(){
                if(window['basic-edit-quiz-prefetch'] != null){
                    window['basic-edit-quiz-prefetch'].abort();
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

export default editBasicQuiz;