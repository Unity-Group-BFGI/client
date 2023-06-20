import $ from 'jquery';
const getQuiz = (headers = {}, query = "", data = {}, before = () => {},success = () => {},error = () => {}) => {

        try{
            window['get-quiz-prefetch'] = $.ajax({
                url: process.env.REACT_APP_CLIENT_GET_API_GET_QUIZ+query,
                data: {
                    "action": "get-quiz",
                    "parent": "ielts-lms",
                    ...data
                },
                method: "GET",
                dataType: "json",
                headers: headers,
                beforeSend: function(){
                    if(window['get-quiz-prefetch'] != null){
                        window['get-quiz-prefetch'].abort();
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

export default getQuiz;