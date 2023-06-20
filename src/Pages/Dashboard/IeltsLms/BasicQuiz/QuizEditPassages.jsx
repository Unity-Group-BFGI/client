import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import $ from 'jquery';
import addPassage from "../../../../includes/Apis/ielts-lms/addPassage";
import { set_current_tab, set_current_editable_id, set_current_quiz } from "../../../../includes/Store/slice/Storage.slice";
import { LoadEditorDark, LoadEditorLight } from "../../../../templates/Components/Editor";
import Form from "react-bootstrap/Form";
import "../../../../assets/styles/jquery-ui-sortable.css";

import 'jquery-ui-bundle';


const QuizEditPassages = () => {
    const [content,setContent] = useState(<>Loading...</>);
    const {CURRENT_QUIZ, IS_QUIZ_LOADING } = useSelector(state => state.storage);
    useEffect(() => {
        if(CURRENT_QUIZ && !IS_QUIZ_LOADING){
            if(
                CURRENT_QUIZ.category === "reading" ||
                CURRENT_QUIZ.category === "listening" ||
                CURRENT_QUIZ.category === "writing" ||
                CURRENT_QUIZ.category === "speaking"
            ){
                setContent(<PassagesTabsHandler />);
            } else {
                setContent(<>Loading...</>);
            }
        } else {
            setContent(<>Loading...</>);
        }
    },[CURRENT_QUIZ, IS_QUIZ_LOADING]);

    return (<>{content}</>)
};




// other
const PassagesTabsHandler = () => {
    const dispatch                      = useDispatch();
    const { CURRENT_TAB }               = useSelector(state => state.storage);
    const [tabContent,setTabContent]    = useState(<ListPassages />);
    
    useEffect(() => {
        if(CURRENT_TAB === "list"){
            setTabContent(<ListPassages />);
        } else if(CURRENT_TAB === "add"){
            setTabContent(<AddPassages />);
        } else if(CURRENT_TAB === "edit"){
            setTabContent(<EditPassage />);
        } else {
            dispatch(set_current_tab("list"));
        }
    },[CURRENT_TAB]);
    return (<>{tabContent}</>)
};

const ListPassages = () => {
    const dispatch                                          = useDispatch();
    const { CURRENT_QUIZ, IS_QUIZ_LOADING }                 = useSelector(state => state.storage);
    const [placeholders, setPlaceholders]                   = useState({
        cardTitle: "",
        button: "",
        firstButton: "",
        subTitle: "",
        mainTitle: ""
    });
    const [orderChanged,setOrderChanged]                    = useState(false);
    const [passages,setPassages]                            = useState([]);
    const [oldOrder,setOldOrder]                            = useState([]);
    
    
    const resetOrder = () => {
        setPassages(oldOrder);
        setOrderChanged(false);
    };

    const saveOrder = () => {
        setOrderChanged(true);
        setOldOrder([]);
    };

    const editPassage = (i) => {
        dispatch(set_current_editable_id(i));
        dispatch(set_current_tab("edit"));
    };

    // add passage tab
    const addPassageTab = () => {
        dispatch(set_current_tab("add"));
    };

    useEffect(() => {
        if(CURRENT_QUIZ && !IS_QUIZ_LOADING){

            setPassages(CURRENT_QUIZ.passages);
            if(CURRENT_QUIZ.category === "reading"){
                setPlaceholders({
                    cardTitle: "List of Reading Passages",
                    button: "Add Passage",
                    firstButton: "Add First Passage",
                    mainTitle: "0 Passages found",
                    subHeading: <>There are no customers added yet. <br /> Kickstart your CRM by adding a your first customer</>
                });
            } else if(CURRENT_QUIZ.category === "listening") {
                setPlaceholders({
                    cardTitle: "List of Listening Passages",
                    button: "Add Passage",
                    firstButton: "Add First Passage",
                    mainTitle: "0 Passages found",
                    subHeading: <>There are no customers added yet. <br /> Kickstart your CRM by adding a your first customer</>
                });
            } else if(CURRENT_QUIZ.category === "writing"){
                setPlaceholders({
                    cardTitle: "List of Writing Essays",
                    button: "Add Essay",
                    firstButton: "Add First Essay",
                    mainTitle: "0 Essays found",
                    subHeading: <>There are no customers added yet. <br /> Kickstart your CRM by adding a your first customer</>
                });
            } else if(CURRENT_QUIZ.category === "speaking"){
                setPlaceholders({
                    cardTitle: "List of Speaking Sections",
                    button: "Add Section",
                    firstButton: "Add First Section",
                    mainTitle: "0 Sections found",
                    subHeading: <>There are no customers added yet. <br /> Kickstart your CRM by adding a your first customer</>
                });
            }

            /*
            window.jQuery = $;
            console.log('[jQuery] Sortable called');
            window.jQuery('#sortable').sortable({
                containment: ".jquery__list-container",
                forcePlaceholderSize: true,
                refreshPositions: true,
                handle: ".drag-handler",
                cursor: "move",
                placeholder: "ui-state-highlight",
                axis: "y",
                items: '.card-list',
                revert: "invalid",
                start: function () {
                    
                },        
                change: function () {
                    
                },
                stop: function() {
                    let changed = false;
                    let newItems = [];
                    document.querySelectorAll('#sortable li').forEach((li,index) => {
                        if(li.dataset.id !== passages[index].key) {
                            changed = true;                 
                        }    

                        for(let i=0; i<passages.length; i++){
                            if(passages[i].key === li.dataset.id){
                                newItems.push(passages[i]);
                                break;
                            }
                        }

                    });

                    if(changed){
                        setOrderChanged(changed); 
                        setOldOrder(passages); 
                        setPassages(passages);
                    }
                    
                }
            });
            */
        }
    },[CURRENT_QUIZ, IS_QUIZ_LOADING]);

    return (<>
        <div className={passages.length <= 0? "card" : "card bg-transparent"}>
            <div className="card-header border-0">
                <h3 className="card-title">
                    {placeholders.cardTitle}
                </h3>
                
                <button className="btn btn-sm btn-primary align-self-center" onClick={addPassageTab}>
                    <i className="fa fa-thin fa-plus"></i> {placeholders.button}
                </button>
                
            </div>
            {!IS_QUIZ_LOADING && passages.length <= 0 && 
            <div className="card-body">
                <svg width="100" height="45" viewBox="0 0 100 45" fill="#E3FCF7" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5366 8C5.61282 8 0 13.6073 0 20.5244C0 27.4145 5.59098 33.0487 12.4878 33.0487C19.3846 33.0487 24.9756 38.6343 24.9756 45.5244C24.9756 52.4145 30.5666 58 37.4634 58H87.4634C94.3872 58 100 52.3927 100 45.4756V20.5244C100 13.6073 94.3872 8 87.4634 8H62.439C55.5422 8 49.9512 13.6099 49.9512 20.5C49.9512 27.3632 44.3821 32.9513 37.5122 32.9513C30.6423 32.9513 25.0732 27.3632 25.0732 20.5C25.0732 13.6099 19.4334 8 12.5366 8Z"></path>
                </svg>
                <div className="text-center pt-10 mb-20">
                    <h2 className="fs-2 fw-bold mb-7">{placeholders.mainTitle}</h2>
                    <p className="text-gray-400 fs-6 fw-semibold mb-10">
                        {placeholders.subHeading}
                    </p>
                    <button className="btn btn-primary" onClick={addPassageTab}>
                        <i className="fa fa-thin fa-plus"></i> {placeholders.firstButton}
                    </button>
                </div> 
            </div>}

            {!IS_QUIZ_LOADING && passages.length > 0 &&     
            <div className="card-body jquery__list-container p-0 m-0">
                <ul id="sortable" className="p-4 m-0"> 
                    {passages.map((p,index) => {
                        return (<li key={index} className="card mb-3 card-list border-0" data-id={index}>
                            <div className="card-header">

                                <div className="card-title drag-handler cursor-drag">
                                    <div className="btn-light-primary btn-icon drag-icon mb-0 d-flex flex-row align-items-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.5 7C5.88071 7 7 5.88071 7 4.5C7 3.11929 5.88071 2 4.5 2C3.11929 2 2 3.11929 2 4.5C2 5.88071 3.11929 7 4.5 7Z" fill="currentColor"></path><path opacity="0.3" d="M14 4.5C14 5.9 12.9 7 11.5 7C10.1 7 9 5.9 9 4.5C9 3.1 10.1 2 11.5 2C12.9 2 14 3.1 14 4.5ZM18.5 2C17.1 2 16 3.1 16 4.5C16 5.9 17.1 7 18.5 7C19.9 7 21 5.9 21 4.5C21 3.1 19.9 2 18.5 2ZM4.5 9C3.1 9 2 10.1 2 11.5C2 12.9 3.1 14 4.5 14C5.9 14 7 12.9 7 11.5C7 10.1 5.9 9 4.5 9ZM11.5 9C10.1 9 9 10.1 9 11.5C9 12.9 10.1 14 11.5 14C12.9 14 14 12.9 14 11.5C14 10.1 12.9 9 11.5 9ZM18.5 9C17.1 9 16 10.1 16 11.5C16 12.9 17.1 14 18.5 14C19.9 14 21 12.9 21 11.5C21 10.1 19.9 9 18.5 9ZM4.5 16C3.1 16 2 17.1 2 18.5C2 19.9 3.1 21 4.5 21C5.9 21 7 19.9 7 18.5C7 17.1 5.9 16 4.5 16ZM11.5 16C10.1 16 9 17.1 9 18.5C9 19.9 10.1 21 11.5 21C12.9 21 14 19.9 14 18.5C14 17.1 12.9 16 11.5 16ZM18.5 16C17.1 16 16 17.1 16 18.5C16 19.9 17.1 21 18.5 21C19.9 21 21 19.9 21 18.5C21 17.1 19.9 16 18.5 16Z" fill="currentColor"></path>
                                        </svg>
                                        <h4 className="mx-2">{p.title}</h4>    
                                    </div>
                                    
                                </div>

                                <div className="card-title">
                                    <button className="btn btn-sm btn-light-primary btn-icon" onClick={() => editPassage(index)}>
                                        <i className="fa fa-edit"></i>
                                    </button>
                                </div> 

                            </div>
                            
                        </li>)
                    })}             
                </ul>                          
            </div>}

            {orderChanged && <div className="card-footer d-flex flex-row" style={{justifyContent: 'space-between'}}>
                <button className="btn btn-light-danger btn-sm" onClick={resetOrder}>
                    Reset order
                </button>
                <button className="btn btn-primary btn-sm">
                    Save order
                </button>
            </div>}

        </div>
    </>);
};







const AddPassages = () => {
    const dispatch                                              = useDispatch();
    const { CURRENT_QUIZ, IS_QUIZ_LOADING }                     = useSelector( state => state.storage );
    const { THEME }                                             = useSelector( state => state.theme );
    const { AUTH_TOKENS }                                       = useSelector( state => state.auth );
    // placeholders
    const [placeholders,setPlaceholders]                        = useState({
       cardTitle            : "",
       listButton           : "" ,
       title                : "",
       titlePlaceholder     : "",
       contentTitle         : "",
       timeTitle            : ""
    });

    // [section, essay, passage]
    const [title,setTitle]                                      = useState("");
    const [html,setHtml]                                        = useState("");
    const [hasSample,setHasSample]                              = useState(false);
    const [sampleAnswer,setSampleAnswer]                        = useState("");
    const [enableSampleAnswer,setEnableSampleAnswer]            = useState(false);
    const [status,setStatus]                                    = useState(true);
    const [statusText,setStatusText]                            = useState("Published");
    const [hasTime,setHasTime]                                  = useState(false);
    const [time,setTime]                                        = useState({
        timer: false,
        hh: 0,
        mm: 0,
        ss: 0
    });
    const [loading,setLoading]                                  = useState(true);
    const [htmlEditor,setHtmlEditor]                            = useState(<LoadEditorLight html={html} setHtml={setHtml} setLoading={setLoading} />);
    const [sampleAnswerHtmlEditor,setSampleAnswerHtmlEditor]    = useState(<LoadEditorLight html={sampleAnswer} setHtml={setSampleAnswer} setLoading={setLoading} />);



    // submit reading passage
    const submitPassage = (ev) => {
        ev.preventDefault();
        
        addPassage({
            // headers
            "authorization": "Bearer "+AUTH_TOKENS.accessToken,
            "token": "sitetoken "+process.env.REACT_APP_SITE_TOKEN
        },"/"+CURRENT_QUIZ._id,
        {
            title: title,
            content: html,
            sampleAnswer:{
                status: hasSample? enableSampleAnswer : false,
                content: hasSample? sampleAnswer : ""
            },
            time:{
                timer: hasTime? true : false,
                hh: hasTime? time.hh : 0,
                mm: hasTime? time.mm : 0,
                ss: hasTime? time.ss : 0
            },
            status: statusText
        },
        () => {

        },(res) => {
            console.log(res);
            if(res.status){ 
                if(res.hasJson){           
                    dispatch(set_current_quiz(res.json.quiz));
                    setListTab();
                }
            }
        },(err) => {

        });
        
            
    };

    // status update
    const statusUpdate = (check) => {
        setStatus(check);
        if(check){
            setStatusText("Published");
        } else {
            setStatusText("Pending");
        }
    };

    // set list tab
    const setListTab = () => {
        dispatch(set_current_tab("list"));
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


    useEffect(() => {
        setLoading(true);
        if(!IS_QUIZ_LOADING && CURRENT_QUIZ){
            if(CURRENT_QUIZ.category === "reading" || CURRENT_QUIZ.category === "listening"){
                setHasSample(false);
                setHasTime(false);

                let totalPassages = CURRENT_QUIZ.passages;
                if(totalPassages.length > 0){
                    let total = totalPassages.length + 1;
                    setTitle("Passage "+total);
                } else {
                    setTitle("Passage 1");
                }

                setPlaceholders({
                    cardTitle            : "Add Passage",
                    listButton           : "List Passages" ,
                    title                : "Title",
                    titlePlaceholder     : "Add Passage title",
                    contentTitle         : "Passage content",
                    timeTitle            : "Passage time"   
                });

                setHtml('<p>Passage content</p>');
                if(hasSample){
                    setSampleAnswer('<p>Sample answer</p>');
                }
                if(hasTime){
                    setTime({
                        timer: true,
                        hh: 0,
                        mm: 0,
                        ss: 0
                    });
                }
                
                setLoading(false);
            } else if(CURRENT_QUIZ.category === "writing"){
                setHasSample(true);
                setHasTime(true);
                let totalPassages = CURRENT_QUIZ.passages;
                if(totalPassages.length > 0){
                    let total = totalPassages.length + 1;
                    setTitle("Essay "+total);
                } else {
                    setTitle("Essay 1");
                }
                setPlaceholders({
                    cardTitle            : "Add Essay",
                    listButton           : "List Essays" ,
                    title                : "Title",
                    titlePlaceholder     : "Add Essay title",
                    contentTitle         : "Essay content",
                    timeTitle            : "Essay time"  
                });
                setHtml('<p>Essay content</p>');
                if(hasSample){
                    setSampleAnswer('<p>Sample answer</p>');
                }
                if(hasTime){
                    setTime({
                        timer: true,
                        hh: 0,
                        mm: 0,
                        ss: 0
                    });
                }
                setLoading(false);
            } else if(CURRENT_QUIZ.category === "speaking"){
                setHasSample(true);
                setHasTime(true);
                let totalPassages = CURRENT_QUIZ.passages;
                if(totalPassages.length > 0){
                    let total = totalPassages.length + 1;
                    setTitle("Section "+total);
                } else {
                    setTitle("Section 1");
                }
                setPlaceholders({
                    cardTitle            : "Add Section",
                    listButton           : "List Sections" ,
                    title                : "Title",
                    titlePlaceholder     : "Add Section title",
                    contentTitle         : "Section content",
                    timeTitle            : "Section time"  
                });
                setHtml('<p>Section content</p>');
                if(hasSample){ 
                    setSampleAnswer('<p>Sample answer</p>');
                }
                if(hasTime){
                    setTime({
                        timer: true,
                        hh: 0,
                        mm: 0,
                        ss: 0
                    });
                }
                setLoading(false);
            }
        }
    },[CURRENT_QUIZ, IS_QUIZ_LOADING]);

    useEffect(() => {
        if(THEME === "light"){
            setHtmlEditor(<LoadEditorLight html={html} setHtml={setHtml} setLoading={setLoading}  />);
            if(hasSample){
                setSampleAnswerHtmlEditor(<LoadEditorLight html={sampleAnswer} setHtml={setSampleAnswer} setLoading={setLoading} />);
            }
        } else if(THEME === "dark"){
            setHtmlEditor(<LoadEditorDark html={html} setHtml={setHtml} setLoading={setLoading} />);
            if(hasSample){
                setSampleAnswerHtmlEditor(<LoadEditorDark html={sampleAnswer} setHtml={setSampleAnswer} setLoading={setLoading} />);
            }
        } else {
            setHtmlEditor(<LoadEditorLight html={html} setHtml={setHtml} setLoading={setLoading} />);
            if(hasSample){
                setSampleAnswerHtmlEditor(<LoadEditorLight html={sampleAnswer} setHtml={setSampleAnswer} setLoading={setLoading} />);
            }
        }
        
    },[THEME,loading]);


    return (<>
        <div className="card">
            <div className="card-header">
                {!loading && <>
                    <h3 className="card-title">{placeholders.cardTitle}</h3>
                    <button className="btn btn-sm btn-light-primary align-self-center" onClick={setListTab}>
                        <i className="fa fa-thin fa-chevron-left"></i> {placeholders.listButton}
                    </button>
                </>}  
            </div>
            <Form onSubmit={(event) => submitPassage(event)}>   
                <div className="card-body">

                    {/* BEGIN::ROW */}
                    <div className="row mb-8">
                    
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3">{placeholders.title} (optional)</div>
                        </div>
                        
                        <div className="col-xl-9">
                            {!loading && <>
                                <input type="text" className="form-control form-control-solid" name="title" value={title} placeholder={placeholders.titlePlaceholder} onChange={(event) => setTitle(event.target.value)} />        
                            </>} 
                        </div>
                    
                    </div>
                    {/* END::ROW */}

                    {/* BEGIN::ROW */}
                    <div className="row mb-8">
                    
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3">{placeholders.contentTitle}</div>
                        </div>
                        
                        <div className="col-xl-9">
                            {!loading && htmlEditor}
                        </div>
                    
                    </div>
                    {/* END::ROW */}


                    {hasSample && <>            
                        {/* BEGIN::ROW */}
                        <div className="row mb-8">
                        
                            <div className="col-xl-3">
                                <div className="fs-6 fw-semibold mt-2 mb-3">
                                    <div className="form-check form-switch d-flex align-items-center">
                                        <input className="form-check-input" type="checkbox" id="status" name="status" checked={enableSampleAnswer} onChange={(event) => setEnableSampleAnswer(event.target.checked)} />
                                        <label className="form-check-label  fw-semibold text-gray-400 ms-3 d-flex flex-column" htmlFor="status">
                                            <span>Sample Answer </span>
                                            {enableSampleAnswer? 'Enabled' : 'Disabled'}  
                                        </label>
                                        
                                    </div>
                                    <div className="form-text">
                                        
                                    </div>
                                    
                                </div>
                            </div>
                            
                            <div className={enableSampleAnswer? "col-xl-9" : "d-none col-xl-9"}>
                                {!loading && sampleAnswerHtmlEditor}
                            </div>
                        
                        </div>
                        {/* END::ROW */}
                    </>}

                    {hasTime && <>
                        {/* BEGIN::ROW */}
                        <div className="row mb-8">
                        
                            <div className="col-xl-3">
                                <div className="fs-6 fw-semibold mt-2 mb-3">{placeholders.timeTitle}</div>
                            </div>
                            
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
                        
                        </div>
                        {/* END::ROW */}
                    </>}

                    {/* BEGIN::ROW */}
                    <div className="row mb-8">
                        
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3">Status</div>
                        </div>
                            
                        <div className="col-xl-9">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="status" name="status" checked={status} onChange={(event) => statusUpdate(event.target.checked)} />
                                <label className="form-check-label fw-semibold text-gray-400 ms-3 d-flex flex-column" htmlFor="status">
                                    {statusText}  
                                </label>                                 
                            </div>
                        </div>
                        
                    </div>
                    {/* END::ROW */}
                    
                    
                </div>
                <div className="card-footer p-4 d-flex flex-row justify-content-between">
                    <button className="btn btn-light-danger btn-sm pull-left float-left" type="button">Reset</button>
                    <button className="btn btn-light-primary btn-sm pull-right float-right" type="submit">Save</button>                       
                </div>
            </Form>
        </div>
    </>);
};

// edit passage by given passage and index
const EditPassage = () => {
    const dispatch                                              = useDispatch();    
    const { CURRENT_QUIZ , CURRENT_EDITABLE_ID, IS_QUIZ_LOADING }  = useSelector( state => state.storage);
    const { THEME }                                             = useSelector( state => state.theme );
    const { AUTH_TOKENS }                                       = useSelector( state => state.auth );

    // placeholders
    const [placeholders,setPlaceholders]                        = useState({
        cardTitle            : "",
        listButton           : "" ,
        title                : "",
        titlePlaceholder     : "",
        contentTitle         : "",
        timeTitle            : ""
    });

    // [passage,essay,sections]
    const [title,setTitle]                                      = useState("");
    const [html,setHtml]                                        = useState("");
    const [hasSample,setHasSample]                              = useState(false);
    const [sampleAnswer,setSampleAnswer]                        = useState("");
    const [htmlEditor,setHtmlEditor]                            = useState(<></>);
    const [sampleAnswerHtmlEditor,setSampleAnswerHtmlEditor]    = useState(<></>);
    const [enableSampleAnswer,setEnableSampleAnswer]            = useState(false);
    const [status,setStatus]                                    = useState(true);
    const [statusText,setStatusText]                            = useState("Published");
    const [hasTime,setHasTime]                                  = useState(false);
    const [time,setTime]                                        = useState({
        timer: false,
        hh: 0,
        mm: 0,
        ss: 0
    });
    const [loading,setLoading]                                  = useState(true);

    const editPassage = (ev) => {
        ev.preventDefault();
        
    };

    // status update
    const statusUpdate = (check) => {
        setStatus(check);
        if(check){
            setStatusText("Published");
        } else {
            setStatusText("Pending");
        }
    };

    // set list tab
    const setListTab = () => {
        dispatch(set_current_tab("list"));
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

    useEffect(() => {
        setLoading(true);
        if(!IS_QUIZ_LOADING && CURRENT_QUIZ){
            // set current passage
            let passage = CURRENT_QUIZ.passages[CURRENT_EDITABLE_ID];
            if(passage){
                if(CURRENT_QUIZ.category === "reading" || CURRENT_QUIZ.category === "listening"){
                    setHasSample(false);
                    setHasTime(false);

                    setPlaceholders({
                        cardTitle            : "Edit Passage",
                        listButton           : "List Passages" ,
                        title                : "Title",
                        titlePlaceholder     : "Add Passage title",
                        contentTitle         : "Passage content",
                        timeTitle            : "Passage time"  
                    });

                    if(hasTime){
                        setTime({
                            timer: true,
                            hh: 0,
                            mm: 0,
                            ss: 0
                        });
                    }

                    
                } else if(CURRENT_QUIZ.category === "writing"){
                    setHasSample(true);
                    setHasTime(true);
                    setPlaceholders({
                        cardTitle            : "Edit Essay",
                        listButton           : "List Essays" ,
                        title                : "Title",
                        titlePlaceholder     : "Add Essay title",
                        contentTitle         : "Essay content",
                        timeTitle            : "Essay time"  
                    });

                    if(hasTime){
                        setTime({
                            timer: true,
                            hh: passage.time.hh || 0,
                            mm: passage.time.mm || 0,
                            ss: passage.time.ss || 0
                        });
                    }

                    setSampleAnswer(passage.sampleAnswer.content);
                    // sample answer status
                    setEnableSampleAnswer(passage.sampleAnswer.status);
                    // set editor
                    console.info("sample answer status: ", passage.sampleAnswer.status);
                   
                } else if(CURRENT_QUIZ.category === "speaking"){
                    setHasSample(true);
                    setHasTime(true);
                    setPlaceholders({
                        cardTitle            : "Edit Section",
                        listButton           : "List Sections" ,
                        title                : "Title",
                        titlePlaceholder     : "Add Section title",
                        contentTitle         : "Section content",
                        timeTitle            : "Section time" 
                    });

                    
                    if(hasTime){
                        setTime({
                            timer: true,
                            hh: passage.time.hh || 0,
                            mm: passage.time.mm || 0,
                            ss: passage.time.ss || 0
                        });
                    }

                    setSampleAnswer(passage.sampleAnswer.content);
                    // sample answer status
                    setEnableSampleAnswer(passage.sampleAnswer.status);
                    // set editor
                    console.info("sample answer status: ", passage.sampleAnswer.status);
                    
                }

                // passage status
                if(passage.status === "published"){
                    setStatus(true);
                } else if(passage.status === "pending"){
                    setStatus(false);
                } else {
                    setStatusText("published");
                    setStatus(true);
                }

                // set title
                setTitle(passage.title);
                // set html content
                setHtml(passage.content);
                // set status
                setStatusText(passage.status);
                // sample answer content
                

                setLoading(false);

            } else {
                setLoading(true);
            }

        }
    },[CURRENT_QUIZ,IS_QUIZ_LOADING]);

    useEffect(() => {
        if(!loading){
            if(THEME === "light"){
                setHtmlEditor(<LoadEditorLight html={html} setHtml={setHtml} setLoading={setLoading}  />);
                if(hasSample){
                    setSampleAnswerHtmlEditor(<LoadEditorLight html={sampleAnswer} setHtml={setSampleAnswer} setLoading={setLoading} />);
                }
            } else if(THEME === "dark"){
                setHtmlEditor(<LoadEditorDark html={html} setHtml={setHtml} setLoading={setLoading} />);
                if(hasSample){
                    setSampleAnswerHtmlEditor(<LoadEditorDark html={sampleAnswer} setHtml={setSampleAnswer} setLoading={setLoading} />);
                }
            } else {
                setHtmlEditor(<LoadEditorLight html={html} setHtml={setHtml} setLoading={setLoading} />);
                if(hasSample){
                    setSampleAnswerHtmlEditor(<LoadEditorLight html={sampleAnswer} setHtml={setSampleAnswer} setLoading={setLoading} />);
                }
            }
        }
        
    },[THEME,loading]);


    return (<>
        <div className="card">
            <div className="card-header">
                {!loading && <>
                    <h3 className="card-title">{placeholders.cardTitle}</h3>
                    <button className="btn btn-sm btn-light-primary align-self-center" onClick={setListTab}>
                        <i className="fa fa-thin fa-chevron-left"></i> {placeholders.listButton}
                    </button>
                </>}  
            </div>
            <Form onSubmit={(event) => editPassage(event)}>   
                <div className="card-body">

                    {/* BEGIN::ROW */}
                    <div className="row mb-8">
                    
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3">{placeholders.title} (optional)</div>
                        </div>
                        
                        <div className="col-xl-9">
                            {!loading && <>
                                <input type="text" className="form-control form-control-solid" name="title" value={title} placeholder={placeholders.titlePlaceholder} onChange={(event) => setTitle(event.target.value)} />        
                            </>} 
                        </div>
                    
                    </div>
                    {/* END::ROW */}

                    {/* BEGIN::ROW */}
                    <div className="row mb-8">
                    
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3">{placeholders.contentTitle}</div>
                        </div>
                        
                        <div className="col-xl-9">
                            {!loading && htmlEditor}
                        </div>
                    
                    </div>
                    {/* END::ROW */}

                    {(hasSample) && <>
                        {/* BEGIN::ROW */}
                        <div className="row mb-8">
                        
                            <div className="col-xl-3">
                                <div className="fs-6 fw-semibold mt-2 mb-3">
                                    <div className="form-check form-switch d-flex align-items-center">
                                        <input className="form-check-input" type="checkbox" id="status" name="status" checked={enableSampleAnswer} onChange={(event) => setEnableSampleAnswer(event.target.checked)} />
                                        <label className="form-check-label  fw-semibold text-gray-400 ms-3 d-flex flex-column" htmlFor="status">
                                            <span>Sample Answer </span>
                                            {enableSampleAnswer? 'Enabled' : 'Disabled'}  
                                        </label>
                                        
                                    </div>
                                    <div className="form-text">
                                        
                                    </div>
                                    
                                </div>
                            </div>
                            
                            <div className={enableSampleAnswer? "col-xl-9" : "d-none col-xl-9"}>
                                {sampleAnswerHtmlEditor}
                            </div>
                        
                        </div>
                        {/* END::ROW */}
                    </>}            
                    
                    {hasTime && <>
                        {/* BEGIN::ROW */}
                        <div className="row mb-8">
                        
                            <div className="col-xl-3">
                                <div className="fs-6 fw-semibold mt-2 mb-3">{placeholders.timeTitle}</div>
                            </div>
                            
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
                        
                        </div>
                        {/* END::ROW */}
                    </>}

                    {/* BEGIN::ROW */}
                    <div className="row mb-8">
                    
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3">Status</div>
                        </div>
                        
                        <div className="col-xl-9">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="status" name="status" checked={status} onChange={(event) => statusUpdate(event.target.checked)} />
                                <label className="form-check-label fw-semibold text-gray-400 ms-3 d-flex flex-column" htmlFor="status">
                                    {statusText}  
                                </label>                                 
                            </div>
                        </div>
                    
                    </div>
                    {/* END::ROW */}
                    
                </div>
                <div className="card-footer p-4 d-flex flex-row justify-content-between">
                    <button className="btn btn-light-danger btn-sm pull-left float-left" type="button">Reset</button>
                    <button className="btn btn-light-primary btn-sm pull-right float-right" type="submit">Save</button>                       
                </div>
            </Form>
        </div>
    </>);
};


// EXPORTS
export default QuizEditPassages;









