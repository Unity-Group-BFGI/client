import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { set_current_editable_id, set_current_tab } from "../../../../includes/Store/slice/Storage.slice";

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { LoadEditorDark, LoadEditorLight } from "../../../../templates/Components/Editor";


const QuizEditQuestions = () => {
    const [content,setContent] = useState(<>Loading...</>);
    const {CURRENT_QUIZ, IS_QUIZ_LOADING } = useSelector(state => state.storage);
    useEffect(() => {
        if(CURRENT_QUIZ && !IS_QUIZ_LOADING){
            if(
                CURRENT_QUIZ.category === "reading" || 
                CURRENT_QUIZ.category === "listening"
            ){
                setContent(< QuestionsTabHandler />);
            } else {
                setContent(<>Loading...</>);
            }
        } else {
            setContent(<>Loading...</>);
        }
    },[CURRENT_QUIZ, IS_QUIZ_LOADING]);

    return (<>{content}</>)
};

const QuestionsTabHandler = () => {
    const dispatch                          = useDispatch();
    const { CURRENT_TAB } = useSelector(state => state.storage);
    const [tabContent,setTabContent]        = useState(<>Loading...</>);
    

    useEffect(() => {
        if(CURRENT_TAB === "list-questions"){
            setTabContent(<QuestionsList />);
        } else if(CURRENT_TAB === "add-question") {
            setTabContent(<AddQuestion />);
        } else {
            dispatch(set_current_editable_id("not-selected"));
            dispatch(set_current_tab("list-questions"));
        }
    },[CURRENT_TAB]);

    return (<>{tabContent}</>);
};

// Questions list
const QuestionsList = () => {
    const dispatch                          = useDispatch();
    const { CURRENT_EDITABLE_ID, CURRENT_QUIZ, IS_QUIZ_LOADING } = useSelector( state => state.storage );
    const [passages,setPassages]            = useState([]);
    const [cquestions,setCQuestions]        = useState([]);
    const [questions,setQuestions]          = useState([]);
    const [loading,setLoading]              = useState(true);

    // set current passage
    const selectPassage = (id) => {
        if(id !== "not-selected"){
            dispatch(set_current_editable_id(id));
            setCQuestions(questions.filter(q => q._passageId === id));
        } else {
            dispatch(set_current_editable_id("not-selected"));
            setCQuestions([]);
        }
    };

    // add question
    const addQuestion = () => {
        dispatch(set_current_tab("add-question"));
    };

    useEffect(() => {
        if(CURRENT_QUIZ && !IS_QUIZ_LOADING){
            setPassages(CURRENT_QUIZ.passages);
            setQuestions(CURRENT_QUIZ.questions);
        }
    },[CURRENT_QUIZ,IS_QUIZ_LOADING]);
    
    return (<>
        {!IS_QUIZ_LOADING && passages && passages.length <= 0 && <>
            <div className="card">
                <div className="card-header d-flex flex-row align-items-center">
                    <h3 className="card-title">0 Passages</h3>         
                </div>
                <div className="card-body">

                </div>
            </div>
        </>}

        {!IS_QUIZ_LOADING && passages && passages.length > 0 && <>
            <div className="card bg-transparent mb-4">
                <div className="card-header d-flex flex-row align-items-center border-0">
                    <h3 className="card-title">List of Questions</h3>
                    <Form.Select style={{maxWidth: "200px",fontSize: "12px"}} onChange={(event) => selectPassage(event.target.value)} value={CURRENT_EDITABLE_ID}>
                        <option value="not-selected"> --SELECT PASSAGE-- </option>
                        {passages && passages.length > 0 && passages.map((p,index) => { return (<option key={index} value={p._id}>{p.title}</option>) } )}
                    </Form.Select>          
                </div>
            </div>

            {(CURRENT_EDITABLE_ID === "not-selected") && <>
                <div className="card">
                    <div className="card-body">                       
                        <svg width="100" height="45" viewBox="0 0 100 45" fill="#E3FCF7" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5366 8C5.61282 8 0 13.6073 0 20.5244C0 27.4145 5.59098 33.0487 12.4878 33.0487C19.3846 33.0487 24.9756 38.6343 24.9756 45.5244C24.9756 52.4145 30.5666 58 37.4634 58H87.4634C94.3872 58 100 52.3927 100 45.4756V20.5244C100 13.6073 94.3872 8 87.4634 8H62.439C55.5422 8 49.9512 13.6099 49.9512 20.5C49.9512 27.3632 44.3821 32.9513 37.5122 32.9513C30.6423 32.9513 25.0732 27.3632 25.0732 20.5C25.0732 13.6099 19.4334 8 12.5366 8Z"></path>
                        </svg>
                        <div className="text-center pt-10 mb-20">
                            <h2 className="fs-2 fw-bold mb-7">Choose Passage</h2>
                            <p className="text-gray-400 fs-6 fw-semibold mb-10">
                                There are no customers added yet. <br />Kickstart your CRM by adding a your first customer
                            </p>
                            <Form.Select className="m-auto" style={{maxWidth: "200px",fontSize: "12px"}} onChange={(event) => selectPassage(event.target.value)} value={CURRENT_EDITABLE_ID}>
                                <option value="not-selected"> --SELECT PASSAGE-- </option>
                                {passages && passages.length > 0 && passages.map((p,index) => { return (<option key={index} value={p._id}>{p.title}</option>) } )}
                            </Form.Select>    
                        </div> 
                    </div>
                </div>    
            </>}


            {(CURRENT_EDITABLE_ID !== "not-selected") && <>
                <div className="card">
                    <div className="card-body">
                        {cquestions && cquestions.length <= 0 && <>
                            <svg width="100" height="45" viewBox="0 0 100 45" fill="#E3FCF7" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5366 8C5.61282 8 0 13.6073 0 20.5244C0 27.4145 5.59098 33.0487 12.4878 33.0487C19.3846 33.0487 24.9756 38.6343 24.9756 45.5244C24.9756 52.4145 30.5666 58 37.4634 58H87.4634C94.3872 58 100 52.3927 100 45.4756V20.5244C100 13.6073 94.3872 8 87.4634 8H62.439C55.5422 8 49.9512 13.6099 49.9512 20.5C49.9512 27.3632 44.3821 32.9513 37.5122 32.9513C30.6423 32.9513 25.0732 27.3632 25.0732 20.5C25.0732 13.6099 19.4334 8 12.5366 8Z"></path>
                            </svg>
                            <div className="text-center pt-10 mb-20">
                                <h2 className="fs-2 fw-bold mb-7">0 Questions found</h2>
                                <p className="text-gray-400 fs-6 fw-semibold mb-10">
                                    There are no customers added yet. <br />Kickstart your CRM by adding a your first customer
                                </p>
                                <button className="btn btn-primary" onClick={addQuestion}>
                                    <i className="fa fa-thin fa-plus"></i> Add First Question
                                </button>
                            </div> 
                        </>}




                    </div>
                </div>
            </>}

        </>}
    </>)
};


// Add Question
const AddQuestion = () => {
    const dispatch                          = useDispatch();
    const { CURRENT_EDITABLE_ID, CURRENT_QUIZ, IS_QUIZ_LOADING } = useSelector( state => state.storage );
    const [title,setTitle]                  = useState('Unnamed Question');
    const [type,setType]                    = useState("fillup");
    const [editableTitle,setEditableTitle]  = useState(false);
    const options = [
        { value: 'fillup', label: 'Fillup', icon: <MoreHorizOutlinedIcon /> },
        { value: 'radio', label: 'Single choice', icon: <RadioButtonCheckedIcon />  },
        { value: 'checkboxes', label: 'Multiple choice', icon: <CheckBoxIcon /> },
        { value: 'select', label: 'Drop-down', icon: <ExpandCircleDownOutlinedIcon /> },
    ];

    const listQuestions = () => {
        dispatch(set_current_tab("list-questions"));
    };

    function renderValue(option) {
        if (!option) {
          return null;
        }

        return (
          <React.Fragment>
            <ListItemDecorator>
              {options.find((o) => o.value === option.value)?.icon}
            </ListItemDecorator>
            {option.label}
          </React.Fragment>
        );
    }

    const setQuestionType = (ev,v) => {
        setType(v);
    }

    const setEditableTitleFn = (b) => {
        if(b){
            setEditableTitle(true);         
        } else {
            setEditableTitle(false);
            if(title.length <= 0){
                setTitle("Unnamed question");
            }
        }
    }
    
    

    useEffect(() => {
        if(CURRENT_EDITABLE_ID === "not-selected"){
            dispatch(set_current_tab("list-questions"));
        }
    },[]);

    return (<>
        <div className="card card-transparent mb-6">
            <div className="card-header border-0">
                <h4 className="card-title">Add Question</h4>
                <button type="button" className="btn btn-light-primary btn-sm align-self-center" onClick={listQuestions}>
                    <i className="fa fa-chevron-left"></i> List Questions
                </button>
            </div>
        </div>
        

        <div className="card">
            <div className="card-header align-items-center">

                
                <FloatingLabel
                    label="Question title (optional)"
                    className={editableTitle? "" : "d-none"}
                    onBlur={() => setEditableTitleFn(false)}
                >
                    <Form.Control type="text" id="question-title" placeholder="Question title" value={title} onChange={(event) => setTitle(event.target.value)} />
                </FloatingLabel>

                <h3 className={editableTitle? "d-none" : "card-title editable cursor-pointer"} onClick={() => setEditableTitleFn(true)}>{title}</h3>


                <Select
                    value={type}
                    slotProps={{
                        listbox: {
                            sx: {
                                '--ListItemDecorator-size': '44px',
                            },
                        },
                    }}
                    sx={{
                        '--ListItemDecorator-size': '44px',
                        minWidth: 240,
                        fontSize: "16px",
                        height: "50px"
                    }}
                    renderValue={renderValue}
                    onChange={(event,value) => setQuestionType(event,value)}
            
                >
                    {options.map((option, index) => (                         
                        <Option key={index} value={option.value} label={option.label}>
                            <ListItemDecorator>
                                {option.icon}
                            </ListItemDecorator>
                            {option.label}
                        </Option>
                    ))}
                </Select>

            </div>
            <div className="card-body">
                {type === "fillup" && <QuestionTypeFillup />}        
                {type === "radio" && <QuestionTypeSingleRadio />}      
            </div>
        </div>




    </>);
};


// fillup question
const QuestionTypeFillup = () => {
    const { THEME } = useSelector( state => state.theme );
    const [content,setContent] = useState("Question content");
    const [loading,setLoading] = useState(true);
    const [contentEditor,setContentEditor] = useState(<LoadEditorLight html={content} setHtml={setContent} setLoading={setLoading}  />);
    

    useEffect(() => {
        if(THEME === "light"){
            setContentEditor(<LoadEditorLight html={content} setHtml={setContent} setLoading={setLoading}  />); 
        } else if(THEME === "dark"){
            setContentEditor(<LoadEditorDark html={content} setHtml={setContent} setLoading={setLoading}  />);
        } else {
            setContentEditor(<LoadEditorLight html={content} setHtml={setContent} setLoading={setLoading}  />);
        }
        
    },[THEME]);

    return (<>
    <div className="row">
        <div className="col-12 mb-4">
            {contentEditor}
        </div>
        <div className="col-12">
            
        </div>
    </div>
    </>);
};


// single [Radio]
const QuestionTypeSingleRadio = () => {
    const { THEME } = useSelector( state => state.theme );
    const [content,setContent] = useState("Question content");
    const [loading,setLoading] = useState(true);
    const [contentEditor,setContentEditor] = useState(<LoadEditorLight html={content} setHtml={setContent} setLoading={setLoading}  />);

    useEffect(() => {
        if(THEME === "light"){
            setContentEditor(<LoadEditorLight html={content} setHtml={setContent} setLoading={setLoading}  />); 
        } else if(THEME === "dark"){
            setContentEditor(<LoadEditorDark html={content} setHtml={setContent} setLoading={setLoading}  />);
        } else {
            setContentEditor(<LoadEditorLight html={content} setHtml={setContent} setLoading={setLoading}  />);
        }
        
    },[THEME]);

    return (<>
        <div className="row">
            <div className="col-12 mb-4">
                {contentEditor}
            </div>
            <div className="col-12">
                
            </div>
        </div>
    </>);
};




// EXPORTS
export default QuizEditQuestions;

