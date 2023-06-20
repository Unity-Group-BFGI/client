import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from 'react-bootstrap/Form';
import editBasicQuiz from "../../../../includes/Apis/ielts-lms/editBasicQuiz";
import { appendIeltsMyQuizzes, setIeltsMyQuizzes } from "../../../../includes/Store/slice/Quiz.slice";
import { set_current_quiz, update_current_quiz } from "../../../../includes/Store/slice/Storage.slice";



const QuizBasicDetailsEdit = () => {
    const dispatch                              = useDispatch();
    const { AUTH_TOKENS }                       = useSelector(state=> state.auth);
    const { IELTS_MY_QUIZZES }                  = useSelector(state=> state.quiz);
    const { CURRENT_QUIZ, IS_QUIZ_LOADING }     = useSelector(state=> state.storage);
    const [title,setTitle]                      = useState("");
    const [titleValidation,setTitleValidation]  = useState("Missing Quiz title");
    const [description,setDescription]          = useState("");
    const [time,setTime]                        = useState({});
    const [category,setCategory]                = useState("");
    const [status,setStatus]                    = useState("");
    const [cb,setCb]                            = useState(false);
    const [validated, setValidated]             = useState(false);
    

    // load first quiz by id and set quiz
    useEffect(() => {
        if(CURRENT_QUIZ && !IS_QUIZ_LOADING){
            setTitle(CURRENT_QUIZ.title);
            setDescription(CURRENT_QUIZ.description);
            setCategory(CURRENT_QUIZ.category);
            
            if(CURRENT_QUIZ.status === "published"){
                setCb(true);
                setStatus(CURRENT_QUIZ.status);
            } else if(CURRENT_QUIZ.status === "pending"){
                setCb(false);
                setStatus(CURRENT_QUIZ.status);
            } else {
                setCb(false);
                setStatus("pending");
            }

            console.log("[QUIZ] ",CURRENT_QUIZ);

            if(CURRENT_QUIZ.category === "listening" || CURRENT_QUIZ.category === "reading"){
                setTime({
                    timer   : true,
                    hh      : CURRENT_QUIZ.time.hh || 0,
                    mm      : CURRENT_QUIZ.time.mm || 0,
                    ss      : CURRENT_QUIZ.time.ss || 0
                });
            } else {
                setTime({
                    timer   : false,
                    hr      : 0,
                    min     : 0,
                    ss      : 0
                });
            }

        }
    },[CURRENT_QUIZ,IS_QUIZ_LOADING]);

    // reset or discard changes
    const resetQuiz = () => {
        setTitle(CURRENT_QUIZ.title);
        setDescription(CURRENT_QUIZ.description);
        setStatus(CURRENT_QUIZ.status || false);
        if(CURRENT_QUIZ.category === "listening" || CURRENT_QUIZ.category === "reading"){
            setTime({
                timer   : true,
                hh      : CURRENT_QUIZ.time.hh || 0,
                mm      : CURRENT_QUIZ.time.mm || 0,
                ss      : CURRENT_QUIZ.time.ss || 0
            });
        } else {
            setTime({
                timer   : false,
                hh      : 0,
                mm      : 0,
                ss      : 0
            });
        }
    };

    // change quiz time [hh|mm]
    const changeTime = (n,t = 0) => {
        if(t > -1 && t <= 60){
            setTime({
                ...time,
                [n]: t
            });  
        }    
    }

    // change quiz publish status
    const changeQuizStatus = () => {
        if(cb){
            setCb(false);
            setStatus("pending");
        } else {
            setCb(true);
            setStatus("published");
        }
    }

    // submit basic details quiz edit
    const basicEditSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            setValidated(true);
           
            editBasicQuiz({
                // headers
                "authorization": "Bearer "+AUTH_TOKENS.accessToken,
                "token": "sitetoken "+process.env.REACT_APP_SITE_TOKEN
            },"/"+CURRENT_QUIZ._id,
            {
                title       : title,
                description : description, 
                status      : status,
                time        : time
            },
            () => {

            },(res) => {
                if(res.status){ 
                    if(res.hasJson){           
                        triggerSetQuiz(res.json.quiz);
                    }
                }
            },(err) => {

            });

           

        }   

        
    };

    // replace quiz with new quiz
    const triggerSetQuiz = (nqz) => {
        dispatch(update_current_quiz(nqz));
        let newQuizList = IELTS_MY_QUIZZES.filter(qz => qz._id !== nqz._id );
        dispatch(setIeltsMyQuizzes(newQuizList));
        dispatch(appendIeltsMyQuizzes(nqz));
        
    };

    return (<>

        <div className="card">
            {/*--begin::Card header--*/}
            <div className="card-header">
                {/*--begin::Card title--*/}
                <div className="card-title fs-3 fw-bold">Quiz basic (Edit)</div>
                {/*--end::Card title--*/}
            </div>
            {/*--end::Card header--*/}
            {/*--begin::Form--*/}
            <Form noValidate validated={validated} className="form" onSubmit={basicEditSubmit}>

                {/*--begin::Card body--*/}
                <div className="card-body p-9" onSubmit={(event) => basicEditSubmit(event)}>
                    
                    {/*--begin::Row--*/}
                    <div className="row mb-8">
                        {/*--begin::Col--*/}
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3">Quiz title*</div>
                        </div>
                        {/*--end::Col--*/}
                        {/*--begin::Col--*/}
                        <div className="col-xl-9 fv-row fv-plugins-icon-container">
                            <input required type="text" className="form-control form-control-solid" name="title" value={title || ""} onChange={(event) => setTitle(event.target.value)} />
                            <div className="fv-plugins-message-container invalid-feedback">{titleValidation || ""}</div>
                        </div>
                    </div>
                    {/*--end::Row--*/}
                    
                    {/*--begin::Row--*/}
                    <div className="row mb-8">
                        {/*--begin::Col--*/}
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3">Description</div>
                        </div>
                        {/*--end::Col--*/}
                        {/*--begin::Col--*/}
                        <div className="col-xl-9 fv-row fv-plugins-icon-container">
                            <textarea name="description" className="form-control form-control-solid h-100px no-validate" style={{height: "123px"}} value={description || ""} onChange={(event) => setDescription(event.target.value)}></textarea>
                            <div className="fv-plugins-message-container invalid-feedback"></div>
                        </div>
                        {/*--begin::Col--*/}
                    </div>
                    {/*--end::Row--*/}

                    {/*--begin::Row--*/}
                    {(category === "reading" || category === "listening") &&
                    <div className="row mb-8">
                        {/*--begin::Col--*/}
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3">Time</div>
                        </div>
                        {/*--end::Col--*/}
                        {/*--begin::Col--*/}
                        <div className="col-xl-9 fv-row fv-plugins-icon-container">
                            <div className="row">
                                <div className="position-relative col-6 w-120px" htmlFor="hh">
                                    
                                    <button type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 start-0 mx-3" onClick={(event) => changeTime('hh', +time.hh-1)}>
                                        
                                        <span className="svg-icon svg-icon-1">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor"></rect>
                                                <rect x="6.0104" y="10.9247" width="12" height="2" rx="1" fill="currentColor"></rect>
                                            </svg>
                                        </span>
                                                    
                                    </button>
                                    
                                    <input type="number" className="no-valdiations form-control form-control-solid border-0 text-center" placeholder="HH" name="hr" value={time.hh || 0} min="0" max="60" onChange={(event) => changeTime('hh',event.target.value)} />
                                    
                                    
                                    <button type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 end-0 mx-3" onClick={(event) => changeTime('hh', +time.hh+1)}>
                                        
                                        <span className="svg-icon svg-icon-1">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor"></rect>
                                                <rect x="10.8891" y="17.8033" width="12" height="2" rx="1" transform="rotate(-90 10.8891 17.8033)" fill="currentColor"></rect>
                                                <rect x="6.01041" y="10.9247" width="12" height="2" rx="1" fill="currentColor"></rect>
                                            </svg>
                                        </span>
                                                        
                                    </button>
                                
                                </div>

                                <div className="position-relative col-6 w-120px" htmlFor="mm">
                                
                                    <button type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 start-0 mx-3" onClick={(event) => changeTime('mm', +time.mm-1)}>
                                        
                                        <span className="svg-icon svg-icon-1">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor"></rect>
                                                <rect x="6.0104" y="10.9247" width="12" height="2" rx="1" fill="currentColor"></rect>
                                            </svg>
                                        </span>
                                                    
                                    </button>
                                    
                                    <input type="number" className="no-valdiations form-control form-control-solid border-0 text-center" placeholder="MM" name="min" value={time.mm || 0} min="0" max="60" onChange={(event) => changeTime('mm', event.target.value)} />
                                    
                                    
                                    <button type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 end-0 mx-3" onClick={(event) => changeTime('mm', +time.mm+1)}>
                                        
                                        <span className="svg-icon svg-icon-1">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor"></rect>
                                                <rect x="10.8891" y="17.8033" width="12" height="2" rx="1" transform="rotate(-90 10.8891 17.8033)" fill="currentColor"></rect>
                                                <rect x="6.01041" y="10.9247" width="12" height="2" rx="1" fill="currentColor"></rect>
                                            </svg>
                                        </span>
                                                        
                                    </button>
                                
                                </div>
                            </div>

                        </div>
                        {/*--begin::Col--*/}
                    </div>}                   
                    {/*--end::Row--*/}

                    
                    {/*--begin::Row--*/}
                    <div className="row">
                        {/*--begin::Col--*/}
                        <div className="col-xl-3">
                        <div className="fs-6 fw-semibold mt-2 mb-3">Status</div>
                        </div>
                        {/*--end::Col--*/}
                        {/*--begin::Col--*/}
                        <div className="col-xl-9">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="status" name="status" checked={status === "published"? true : false} onChange={changeQuizStatus} />
                                <label className="form-check-label  fw-semibold text-gray-400 ms-3" htmlFor="status">
                                    {status === "published" && "Published"}
                                    {status === "pending" && "Pending"}
                                </label>
                            </div>
                        </div>
                        {/*--end::Col--*/}
                    </div>
                    {/*--end::Row--*/}

                </div>
                {/*--end::Card body--*/}

                {/*--begin::Card footer--*/}
                <div className="card-footer d-flex justify-content-end py-6 px-9">
                    <button type="button" className="btn btn-light btn-active-light-primary me-2 btn-sm" onClick={resetQuiz}>Discard</button>
                    <button type="submit" className="btn btn-primary btn-sm">Save Changes</button>
                </div>
                {/*--end::Card footer--*/}
                
            </Form>
            {/*--end:Form--*/}
        </div>

    </>)
};

export default QuizBasicDetailsEdit;