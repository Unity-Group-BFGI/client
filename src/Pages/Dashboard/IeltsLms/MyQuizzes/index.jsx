import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import { route_update } from "../../../../includes/Store/slice/Route.slice";
import { sidebar } from "../../../../includes/Store/slice/Theme.slice";
import { createQuizModal } from "../../../../includes/Store/slice/modals.slice";
import { setIeltsMyQuizzes, setIeltsMyQuizzesPageConfig } from "../../../../includes/Store/slice/Quiz.slice";

import { IeltsLmsRoutes } from "../../../../includes/Constents/DashboardSecondaryMenuItems.constens";
import getQuizzes from "../../../../includes/Apis/ielts-lms/getQuizzes";

import IeltsMyQuizzesPreLoader from "../../../../templates/Components/Dashboard/ielts-lms/IeltsMyQuizzesPreLoader";
import CreateQuizModal from "../BasicQuiz/CreateQuiz.modal";
import { ListeningSvg, ReadingSvg, SpeakingSvg, WritingSvg } from '../../../../includes/Constents/Svgs.contents';


const MyQuizzes = () => {
    const parent    = "ielts-lms";
    const child     = "ielts-lms-my-quizzes";
    const title     = "My Quizzes | Ielts Lms"
    const dispatch                      = useDispatch();
    const [loading,setLoading]          = useState(true);
    const { API_LOADING }               = useSelector( state => state.api );
    const { AUTH_TOKENS }               = useSelector( state => state.auth );
    const { WIDTH }                     = useSelector( state => state.theme );
    const [searchParam,setSearchParam]  = useState("");
    const { IELTS_MY_QUIZZES, IELTS_MY_QUIZZES_PAGE_CONFIG }  = useSelector( state => state.quiz );
    const { pp, cp, tp }                = IELTS_MY_QUIZZES_PAGE_CONFIG;




    const showCreateQuizModal = () => {
        dispatch(createQuizModal(true));
    };

    const apiPreLoading = (b = false) => {
        setLoading(b);
    };

    const apiSetResponse = (res = {status: false}) => {
        
        if(res.status){
            if(res.hasJson){
                dispatch(setIeltsMyQuizzes(res.json.quizzes));
                apiPreLoading(false);
                dispatch(setIeltsMyQuizzesPageConfig({
                    cp: res.json.currentPage,
                    pp: res.json.perPageItems,
                    tp: res.json.totalPages
                }));
            } 
        } else {
            
        }
        apiPreLoading(false);
    }

    const apiGetIeltsMyQuizzes = (bloading = false, PP = pp, CP = cp, SP = searchParam) => {
        getQuizzes({
            "authorization": "Bearer "+AUTH_TOKENS.accessToken,
            "refresh-token": "Refresh "+AUTH_TOKENS.refreshToken,
            "token": "sitetoken "+process.env.REACT_APP_SITE_TOKEN
        },"",{
            perPageItems: PP,
            currentPage: CP,
            search: SP
        },() => {
            apiPreLoading(bloading);
        },(res) => {
            apiSetResponse(res);
        },(err) => {
            apiPreLoading(false);
        });
    };

    const apiFilterQuizzes = (type) => {
        if(type === "first"){
            apiGetIeltsMyQuizzes(false,pp, 1);
        } else if(type === "previous"){
            apiGetIeltsMyQuizzes(false,pp, cp - 1);
        } else if(type === "next"){
            apiGetIeltsMyQuizzes(false,pp, cp + 1);
        } else if(type === "last"){
            apiGetIeltsMyQuizzes(false,pp, tp);
        }
    }

    const apiSetSearchParams = (value) => {
        setSearchParam(value);
        //apiGetIeltsMyQuizzes(pageConfig.pp,pageConfig.cp,value);
    };

    const filterQuizz = () => {
        apiGetIeltsMyQuizzes(false,pp,cp,searchParam);
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
            if(!API_LOADING){

                if(IELTS_MY_QUIZZES.length <= 0 ) {
                    apiGetIeltsMyQuizzes(true);
                } else {
                    apiPreLoading(false);
                }
            }
        }

        
    },[API_LOADING,IeltsLmsRoutes]);

    return (<>

        <div className="card mb-4 p-0 bg-none">
            <div className="card-header border-bottom-0">
                <div className="card-title">
                    <h3 className="fw-bold m-0">
                        List of Quizzes
                    </h3>
                </div>
            </div>
        </div>

        {API_LOADING && <IeltsMyQuizzesPreLoader />}

        {!API_LOADING && loading && <IeltsMyQuizzesPreLoader />}

        {!API_LOADING && !loading && IELTS_MY_QUIZZES.length <= 0 && <div className="card">
            <div className="card-body bg-default">
                <svg width="100" height="45" viewBox="0 0 100 45" fill="#E3FCF7" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5366 8C5.61282 8 0 13.6073 0 20.5244C0 27.4145 5.59098 33.0487 12.4878 33.0487C19.3846 33.0487 24.9756 38.6343 24.9756 45.5244C24.9756 52.4145 30.5666 58 37.4634 58H87.4634C94.3872 58 100 52.3927 100 45.4756V20.5244C100 13.6073 94.3872 8 87.4634 8H62.439C55.5422 8 49.9512 13.6099 49.9512 20.5C49.9512 27.3632 44.3821 32.9513 37.5122 32.9513C30.6423 32.9513 25.0732 27.3632 25.0732 20.5C25.0732 13.6099 19.4334 8 12.5366 8Z"></path>
                </svg>
                <div className="text-center pt-10 mb-20">
                    <h2 className="fs-2 fw-bold mb-7">No Quizzes found</h2>
                    <p className="text-gray-400 fs-6 fw-semibold mb-10">
                        There are no customers added yet. <br />Kickstart your CRM by adding a your first customer
                    </p>
                    <button className="btn btn-primary" onClick={showCreateQuizModal}>
                        Create First Quiz
                    </button>
                </div>
            </div>
        </div>}

        {!API_LOADING && !loading && IELTS_MY_QUIZZES.length > 0 && <>
        <div className="card p-0 mb-4">
            <div className="card-header border-0">
                <div className="d-flex align-items-center position-relative my-1">               
                    
                    <input type="text" value={searchParam} className="form-control form-control-solid w-250px mr-2" placeholder="Search Quiz" onChange={(event) => apiSetSearchParams(event.target.value)} />
                    <button className="btn btn-light-info btn-icon d-flex" type="button" onClick={filterQuizz}>
                        {searchParam.length > 0? 
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor"></rect>
                                <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor"></path>
                            </svg>
                        :
                            <i className="fa fa-thin fa-light fa-arrows-rotate"></i>
                        }
                    </button>
                </div>
                
            </div>
        </div>
        <div className="card p-0 bg-transparent mb-6">
            <div className="card-body p-0">
                {
                    IELTS_MY_QUIZZES.map((mquiz,index) => {
                        return (
                            <div className="card__hover card mb-2" key={index}>
                                <div className="card-body p-3 d-flex flex-row align-items-center justify-spacetree-between">
                                    <div className="d-flex flex-stack">
                                        <div className="d-flex align-items-center">
                                            <input className="form-check-input me-3" type="checkbox" style={{borderRadius: '30px'}} />
                                            <div className="w30-px ml-6 mx-3 custom-img-box">
                                                { mquiz.category === "listening" && <ListeningSvg fill={"#ccc"} />}
                                                { mquiz.category === "reading" && <ReadingSvg fill={"#ccc"} />}
                                                { mquiz.category === "writing" && <WritingSvg fill={"#ccc"} />}
                                                { mquiz.category === "speaking" && <SpeakingSvg fill={"#ccc"} />}
                                            </div>
                                                                                        
                                            <div className="d-flex flex-column">
                                                <div className="fs-5 text-dark text-hover-primary fw-bold">{mquiz.title}</div>
                                                <div className="fs-6 fw-semibold text-gray-400">{mquiz.description}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-stack">
                                        <Link to={"/dashboard/ielts-lms/quiz/edit/"+mquiz._id} className="btn btn-sm btn-primary">Edit</Link>
                                    </div>                                     
                                </div>                                       
                            </div>
                        )
                    })
                }
            </div>
        </div>

        {tp > 1 && 
        <div className="card p-0">
            <div className="card-header border-0">
                <div className="card-toolbar">

                </div>
                <div className="card-toolbar">
                    <div className="dataTables_paginate paging_simple_numbers">
                        <ul className="pagination">

                            {/* begin::back to first */}
                            {tp > 1 && <>
                                <li className={cp <= 1? "paginate_button page-item previous disabled" : "paginate_button page-item previous"}>
                                    <button type="button" className="page-link" onClick={() => apiFilterQuizzes("first")}>
                                        <i className="previous"></i>
                                        <i className="previous"></i>
                                    </button>
                                </li>
                                <li className={cp <= 1? "paginate_button page-item previous disabled bg-light-primary" : "paginate_button page-item previous"}>
                                    <button type="button" className="page-link bg-light-primary" onClick={() => apiFilterQuizzes("previous")}>
                                        <i className="previous"></i>
                                    </button>
                                </li>
                                {/* end::back to first */}


                                <li className="paginate_button page-item d-flex flex-row justify-content-center align-items-center text-dark font-bold" style={{padding: "0 10px", fontWeight: "bold"}}>
                                    <span className="text-ligth">{cp}</span> / <span className="text-dark">{tp}</span>
                                </li>
                                

                                {/* begin::last */}
                                <li className={cp === tp? "paginate_button page-item bg-light-primary disabled" : "paginate_button page-item bg-light-primary"}>
                                    <button type="button" className="page-link" onClick={() => apiFilterQuizzes("next")}>
                                        <i className="next"></i>
                                    </button>
                                </li>
                                <li className={cp === tp? "paginate_button page-item next disabled": "paginate_button page-item next"}>
                                    <button type="button" className="page-link" onClick={() => apiFilterQuizzes("last")}>
                                        <i className="next"></i>
                                        <i className="next"></i>
                                    </button>
                                </li>
                                {/* end::last */}
                            </>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>}

        </>}

        <CreateQuizModal />
    </>);
};
export default MyQuizzes;