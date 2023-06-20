import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { route_update, set_sub_child } from "../../../../includes/Store/slice/Route.slice";
import { sidebar } from "../../../../includes/Store/slice/Theme.slice";
import { set_current_quiz, set_is_quiz_loading, set_current_tab } from "../../../../includes/Store/slice/Storage.slice";



import getQuiz from "../../../../includes/Apis/ielts-lms/getQuiz";
import { ReadingRoutes, ListeningRoutes, WritingRoutes, SpeakingRoutes } from "../../../../includes/Constents/DashboardSecondaryMenuItems.constens";
import { IeltsLmsRoutes } from "../../../../includes/Constents/DashboardSecondaryMenuItems.constens";
import { ListeningSvg, ReadingSvg, SpeakingSvg, WritingSvg } from '../../../../includes/Constents/Svgs.contents';

import Placeholder from 'react-bootstrap/Placeholder';
import QuizBasicDetailsEdit from "./QuizBasicDetailsEdit";
import QuizEditPassages from "./QuizEditPassages";
import QuizEditQuestions from "./QuizEditQuestions";


const EditQuiz = () => {
    const { id }    = useParams(); 
    const dispatch  = useDispatch();
    const parent    = "ielts-lms";
    const child     = "ielts-lms-edit-quiz";
    const title     = "Edit Quiz | Ielts Lms"

    const { HAS_DYNAMIC_ROUTES, DYNAMIC_ROUTES, SUB_CHILD }    = useSelector( state => state.route );
    const { API_LOADING }                   = useSelector( state => state.api );
    const { AUTH_TOKENS }                   = useSelector( state => state.auth );
    const { WIDTH }                         = useSelector( state => state.theme );
    const { CURRENT_QUIZ, IS_QUIZ_LOADING } = useSelector( state => state.storage );
    const [apiLoaded,setApiLoaded]          = useState(false);    

    // set api response
    const setApiQuizResponse = (res) => {
        if(res.status){
            if(res.hasJson){
                dispatch(set_current_quiz(res.json.quiz));
                dispatch(set_is_quiz_loading(false));
            } 
        }
    };

    // load api
    const loadRoute = () => {
        dispatch(set_is_quiz_loading(true));
        getQuiz(
            {
                "authorization": "Bearer "+AUTH_TOKENS.accessToken,
                "refresh-token": "Refresh "+AUTH_TOKENS.refreshToken,
                "token": "sitetoken "+process.env.REACT_APP_SITE_TOKEN
            },
            "/"+id,
            {},() => {
                // before
                dispatch(set_is_quiz_loading(true));
                dispatch(route_update({
                    HAS_DYNAMIC_ROUTES: true,
                    DYNAMIC_ROUTES_LOADING: true
                }));
            },(res) => {
                setApiQuizResponse(res);
            },(err) => {
                // error
                console.warn("[HANDLE ERRORS] Quiz load error",err.statusText);
            
            }
        );
    };

    // switch subchild for dynamic routing
    const switchSubChild = (sc) => {
        if(sc){ dispatch(set_sub_child(sc)); }
    }

    useEffect(() => {
        let tmpCr = IeltsLmsRoutes.length > 0 && IeltsLmsRoutes.filter((item) => {
            return (item.child === child)
        });

        if(tmpCr.length === 1) {
            window.document.title = title;
            dispatch(route_update({
                PARENT: parent,
                CHILD: child,
                CURRENT_ROUTE: tmpCr[0],
                HAS_DYNAMIC_ROUTES: tmpCr[0].dynamicRoute,
                DYNAMIC_ROUTES_LOADING: tmpCr[0].dynamicRoute
            }));

            WIDTH < 991 && dispatch(sidebar(false));

            if(!API_LOADING && !apiLoaded){
                loadRoute();
            }
        }

        
    },[API_LOADING,IeltsLmsRoutes]);

    useEffect(() => {
        if(!IS_QUIZ_LOADING){
            if(CURRENT_QUIZ.category === "reading"){

                if(ReadingRoutes.length > 0){
                    dispatch(route_update({
                        DYNAMIC_ROUTES: ReadingRoutes,
                        DYNAMIC_ROUTES_LOADING: false,
                        SUB_CHILD: ReadingRoutes[0].slug
                    }));
                    dispatch(set_current_tab("list"));
                    
                }

                setApiLoaded(true);
            } else if(CURRENT_QUIZ.category === "listening"){
                if(ListeningRoutes.length > 0){
                    dispatch(route_update({
                        DYNAMIC_ROUTES: ListeningRoutes,
                        DYNAMIC_ROUTES_LOADING: false,
                        SUB_CHILD: ListeningRoutes[0].slug
                    }));
                    dispatch(set_current_tab("list"));
                    
                }
                setApiLoaded(true);
            } else if(CURRENT_QUIZ.category === "writing"){
                if(WritingRoutes.length > 0){
                    dispatch(route_update({
                        DYNAMIC_ROUTES: WritingRoutes,
                        DYNAMIC_ROUTES_LOADING: false,
                        SUB_CHILD: WritingRoutes[0].slug
                    }));
                    dispatch(set_current_tab("list"));
                    
                }
                setApiLoaded(true);
            } else if(CURRENT_QUIZ.category === "speaking"){
                if(SpeakingRoutes.length > 0){
                    dispatch(route_update({
                        DYNAMIC_ROUTES: SpeakingRoutes,
                        DYNAMIC_ROUTES_LOADING: false,
                        SUB_CHILD: SpeakingRoutes[0].slug
                    }));
                    dispatch(set_current_tab("list"));
                    
                }
                setApiLoaded(true);
            } else {
                
                dispatch(route_update({
                    DYNAMIC_ROUTES: [],
                    DYNAMIC_ROUTES_LOADING: true,
                    SUB_CHILD: null
                }));
                dispatch(set_current_tab(null));
                setApiLoaded(true);
            }
        }
    },[IS_QUIZ_LOADING]);

    useEffect(() => {
        dispatch(set_current_tab("list"));
    },[SUB_CHILD]);


    return (<>
        <div className="card mb-9">
            <div className="card-body pt-9 pb-0">
                { /*--begin::Details--*/ }
                <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
                    { /*--begin::Image--*/ }
                    <div className="d-flex flex-center flex-shrink-0 bg-light rounded w-100px h-55px w-lg-55px h-lg-55px me-7 mb-4">
                        {!apiLoaded? <>
                            <Placeholder as="div" animation="glow" style={{width: "100%", height: "100%"}}>
                                <Placeholder xs={12} style={{width: "100%", height: "100%", borderRadius: "7px"}} />
                            </Placeholder>
                        </> :
                        <span className="mw-30px mw-lg-45px ">
                            {CURRENT_QUIZ.category && <>
                                {CURRENT_QUIZ.category === "reading" && <ReadingSvg width={"35"} height={"35"} fill={"#ccc"} />}
                                {CURRENT_QUIZ.category === "listening" && <ListeningSvg width={"35"} height={"35"} fill={"#ccc"} />}
                                {CURRENT_QUIZ.category === "writing" && <WritingSvg width={"35"} height={"35"} fill={"#ccc"} />}
                                {CURRENT_QUIZ.category === "speaking" && <SpeakingSvg width={"35"} height={"35"} fill={"#ccc"} />}
                            </>}
                        </span>}
                       
                    </div>
                    { /*--end::Image--*/ }
                    { /*--begin::Wrapper--*/ }
                    <div className="flex-grow-1">
                        { /*--begin::Head--*/ }
                        <div className="d-flex justify-content-between align-items-start flex-wrap mb-2" style={{flexDirection: "column"}}>
                        { /*--begin::Details--*/ }
                        <div className="d-flex flex-column">
                            { /*--begin::Status--*/ }
                            <div className="d-flex align-items-center mb-1">
                                <a href="#" className="text-gray-800 text-hover-primary fs-2 fw-bold me-3">
                                    { !apiLoaded? <>
                                        <Placeholder as="div" animation="glow" size="lg" style={{width: "100%", height: "100%"}}>
                                            <Placeholder xs={12} style={{width: "200px", minHeight: "23px"}} />
                                        </Placeholder>
                                    </> : CURRENT_QUIZ.title }
                                </a>                       
                            </div>
                            { /*--end::Status--*/ }
                            { /*--begin::Description--*/ }
                            <div className="d-flex flex-wrap fw-semibold mb-4 fs-5 text-gray-400">
                                { !apiLoaded? <>
                                    <Placeholder as="div" animation="glow" size="lg" style={{width: "100%", height: "100%"}}>
                                        <Placeholder xs={12} style={{width: "200px", minHeight: "18px"}} />
                                    </Placeholder>  
                                </> : CURRENT_QUIZ.description }
                            </div>
                            { /*--end::Description--*/ }
                        </div>
                        { /*--end::Details--*/ }
                        { /*--begin::Actions--*/ }
                        
                        { /*--end::Actions--*/ }
                        </div>
                        { /*--end::Head--*/ }
                        { /*--begin::Info--*/ }
                        { /*--end::Info--*/ }
                    </div>
                    { /*--end::Wrapper--*/ }
                </div>
                { /*--end::Details--*/ }

                
                <div className="separator"></div>
                { /*--begin::Nav--*/ }
                <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold">
                    { /*--begin::Nav item--*/ }

                    {
                        !apiLoaded && HAS_DYNAMIC_ROUTES && <>
                            <li className="nav-item mr-2">
                                <Placeholder as="p" animation="glow" size="lg" style={{width: "100%", height: "100%", marginTop: "10px"}}>
                                    <Placeholder xs={12} style={{width: "100px", minHeight: "23px"}} />
                                </Placeholder>
                            </li>
                            <li className="nav-item  mr-2">
                                <Placeholder as="p" animation="glow" size="lg" style={{width: "100%", height: "100%", marginTop: "10px"}}>
                                    <Placeholder xs={12} style={{width: "100px", minHeight: "23px"}} />
                                </Placeholder>
                            </li>
                            <li className="nav-item mr-2">
                                <Placeholder as="p" animation="glow" size="lg" style={{width: "100%", height: "100%", marginTop: "10px"}}>
                                    <Placeholder xs={12} style={{width: "100px", minHeight: "23px"}} />
                                </Placeholder>
                            </li>
                        </>
                    }

                    {
                        apiLoaded && HAS_DYNAMIC_ROUTES && DYNAMIC_ROUTES && DYNAMIC_ROUTES.length > 0 && DYNAMIC_ROUTES.map((sm,index) => {
                            return (<li className="nav-item" key={index}>
                                <a className={SUB_CHILD === sm.slug? "nav-link text-active-primary py-5 me-6 active" : "nav-link text-active-primary py-5 me-6"} type="button" 
                                    onClick={() => switchSubChild(sm.slug)}
                                >
                                    {sm.subChildHeading}
                                </a>
                            </li>)
                        })
                    }
                    { /*--end::Nav item--*/ }
                </ul>
                { /*--end::Nav--*/ }
            </div>
        </div>
        <EditQuizBlocks subChild={SUB_CHILD} />
    </>);
};



// tabs handler
const EditQuizBlocks = ({subChild}) => {
    const [content,setContent] = useState(<>Loading...</>);

    useEffect(() => {
       
        if(subChild === "ielts-lms-edit-quiz-basic"){
            // edit quiz basic detials [title,description, time, status]
            setContent(<QuizBasicDetailsEdit />);
        } else if(subChild === "ielts-lms-edit-quiz-passages") {
            // [reading,listening] passages
            setContent(<QuizEditPassages />);
        } else if(subChild === "ielts-lms-edit-quiz-questions") {
            // [reading,listening] questions
            setContent(<QuizEditQuestions />);
        } else if(subChild === "ielts-lms-edit-quiz-writing-essay") {
            // [writing] essay
            setContent(<QuizEditPassages />);
        } else if(subChild === "ielts-lms-edit-quiz-sections") {
            // [speaking] section
            setContent(<QuizEditPassages />);
        } else if(subChild === "ielts-lms-edit-quiz-speaking-questions") {
            // [writing] questions
            setContent(<QuizEditQuestions />);
        } else {
            setContent(<> Loading...</>);
        }
    },[subChild]);

    return (<>{content}</>)
};


export default EditQuiz;