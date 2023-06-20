import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import { createQuizModal } from "../../../../includes/Store/slice/modals.slice";
import { appendIeltsMyQuizzes } from "../../../../includes/Store/slice/Quiz.slice";
import addQuizz from "../../../../includes/Apis/ielts-lms/addQuiz";

import { ListeningSvg, ReadingSvg, SpeakingSvg, WritingSvg } from '../../../../includes/Constents/Svgs.contents';

const CreateQuizModal = () => {
    const dispatch = useDispatch();
    const { CREATE_QUIZ_MODAL } = useSelector(state => state.modals);
    const { WIDTH }             = useSelector(state => state.theme);
    const { AUTH_TOKENS }       = useSelector(state=> state.auth);
    

    // quiz modal stepper
    const [step,setStep] = useState(1);
    // quiz items states
    const [quizItems,setQuizItems] = useState({
        "title"         : "",
        "description"   : "",
        "category"      : "reading",
        "time"          : {
                "timer"     : true,
                "hh"        : 0,
                "mm"        : 0,
                "ss"        : 0        
        },
        "status"        : "published" 
    });
    // quiz form validation
    const [validated, setValidated] = useState(false);

    // handling close modal
    const handleClose = () => {
        if(step !== 3){
            dispatch(createQuizModal(false));
            setQuizItems({
                "title"         : "",
                "description"   : "",
                "category"      : "reading",
                "time"          : {
                    "timer"         : true,    
                    "hh"            : 0,
                    "mm"            : 0,
                    "ss"            : 0
                },
                "status"        : "published"            
            });
            setValidated(false);
            setStep(1);
        }
    };

    // check validation on keyup ot other events
    const checkFormValidity = () => {
        const form = document.querySelector('#create-quiz-form');
        if(form && form.checkValidity() === false){
            setValidated(true);
        }
    };

    // append quiz to list of quizzes
    const appendQuizToContext = (quiz) => {
        dispatch(appendIeltsMyQuizzes(quiz));
    };

    const changeTime = (n,t = 0) => {
        if(t > -1 && t <= 60){
            setQuizItems({
                ...quizItems,
                time: {
                    ...quizItems.time,
                    timer : quizItems.category === "reading" || quizItems.category === "listening"? true : false,
                    [n]: t
                } 
            });  
        }    
    }

    // on submit from handler
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            setValidated(true);
            
            addQuizz({
                // headers
                "authorization": "Bearer "+AUTH_TOKENS.accessToken,
                "token": "sitetoken "+process.env.REACT_APP_SITE_TOKEN
            },"",
            quizItems,() => { }, (res) => {
                if(res.status){
                    if(res.hasJson){
                        appendQuizToContext(res.json.quiz);
                    }
                }
            }, (err) => {
                console.warn(err);
            });

        }    
    };

    return (
        <Modal
            show={CREATE_QUIZ_MODAL}
            size="lg"
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            fullscreen={WIDTH <= 400? true : false}
            centered>
            <Form
                id="create-quiz-form"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                style={{display:"contents"}}
            >
                <Modal.Header className="p-3" closeButton>
                    <Modal.Title>Create Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {step === 1 && <div className="d-flex flex-column">
                        <p className="w-100">Choose Category: <b>{quizItems.category}</b>
                        </p>
                        <div
                            className={WIDTH > 450
                            ? "d-flex flex-center flex-shrink flex-row"
                            : "d-flex flex-center flex-shrink flex-column"}>

                            <label
                                htmlFor="reading"
                                className={quizItems.category === "reading"
                                ? "cursor-pointer d-flex flex-center w-100px h-100px flex-shrink-0 rounded bg-succe" +
                                    "ss m-4"
                                : "cursor-pointer d-flex flex-center w-100px h-100px flex-shrink-0 rounded bg-light" +
                                    "-success m-4"}>
                                <input
                                    type="radio"
                                    className="label-active"
                                    name="category"
                                    id="reading"
                                    style={{
                                    display: "none"
                                }}
                                    checked={quizItems.category === "reading"}
                                    onChange={(event) => setQuizItems({
                                    ...quizItems,
                                    category: event.target.id
                                })}/>
                                <span className="svg-icon svg-icon-primary svg-icon-4x svg-icon-lg-3x">
                                    <ReadingSvg fill={"#ccc"} />
                                </span>
                            </label>
                            <label
                                htmlFor="listening"
                                className={quizItems.category === "listening"
                                ? "cursor-pointer d-flex flex-center w-100px h-100px flex-shrink-0 rounded bg-prima" +
                                    "ry m-4"
                                : "cursor-pointer d-flex flex-center w-100px h-100px flex-shrink-0 rounded bg-light" +
                                    "-primary m-4"}>
                                <input
                                    type="radio"
                                    className="label-active"
                                    name="category"
                                    id="listening"
                                    style={{
                                    display: "none"
                                }}
                                    checked={quizItems.category === "listening"}
                                    onChange={(event) => setQuizItems({
                                    ...quizItems,
                                    category: event.target.id
                                })}/>
                                <span className="svg-icon svg-icon-primary svg-icon-4x svg-icon-lg-3x">
                                    <ListeningSvg fill={"#ccc"} />
                                </span>
                            </label>
                            <label
                                htmlFor="writing"
                                className={quizItems.category === "writing"
                                ? "cursor-pointer d-flex flex-center w-100px h-100px flex-shrink-0 rounded bg-warni" +
                                    "ng m-4"
                                : "cursor-pointer d-flex flex-center w-100px h-100px flex-shrink-0 rounded bg-light" +
                                    "-warning m-4"}>
                                <input
                                    type="radio"
                                    className="label-active"
                                    name="category"
                                    id="writing"
                                    style={{
                                    display: "none"
                                }}
                                    checked={quizItems.category === "writing"}
                                    onChange={(event) => setQuizItems({
                                    ...quizItems,
                                    category: event.target.id
                                })}/>
                                <span className="svg-icon svg-icon-primary svg-icon-4x svg-icon-lg-3x">
                                    <WritingSvg fill={"#ccc"} />
                                </span>
                            </label>
                            <label
                                htmlFor="speaking"
                                className={quizItems.category === "speaking"
                                ? "cursor-pointer d-flex flex-center w-100px h-100px flex-shrink-0 rounded bg-dange" +
                                    "r m-4"
                                : "cursor-pointer d-flex flex-center w-100px h-100px flex-shrink-0 rounded bg-light" +
                                    "-danger m-4"}>
                                <input
                                    type="radio"
                                    className="label-active"
                                    name="category"
                                    id="speaking"
                                    style={{
                                    display: "none"
                                }}
                                    checked={quizItems.category === "speaking"}
                                    onChange={(event) => setQuizItems({
                                    ...quizItems,
                                    category: event.target.id
                                })}/>
                                <span className="svg-icon svg-icon-primary svg-icon-4x svg-icon-lg-3x">
                                    <SpeakingSvg fill={"#ccc"} />
                                </span>
                            </label>
                        </div>
                    </div>}
                    {step === 2 && <div className="bs-hidden">

                        <FloatingLabel
                            className="mb-2 validate-label"
                            controlId="floatingInput"
                            label="Add title">
                            <Form.Control
                                size="small"
                                type="text"
                                required
                                placeholder="Add title"
                                value={quizItems.title}
                                className="form-control-solid"
                                onKeyUp={checkFormValidity}
                                onChange={(event) => setQuizItems({
                                ...quizItems,
                                title: event.target.value
                            })}/>
                            <Form.Control.Feedback type="invalid">Please add quiz title</Form.Control.Feedback>
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="floatingTextarea2"
                            label="Short description (Optional)">
                            <Form.Control
                                as="textarea"
                                placeholder="Short description (Optional)"
                                style={{
                                height: '100px'
                            }}
                                value={quizItems.description}
                                className="form-control-solid"
                                onChange={(event) => setQuizItems({
                                ...quizItems,
                                description: event.target.value
                            })}/>
                        </FloatingLabel>

                        {(quizItems.category === "reading" || quizItems.category === "listening") && 
                        <div className="row mt-4 b-1px-dashed p-4">
                            <label className="form-label mb-3">Quiz time (hh:mm)</label>
                            <div className="position-relative col-6 w-120px">

                                <button
                                    type="button"
                                    className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 start-0 mx-3"
                                    onClick={() => changeTime("hh", + quizItems.hh - 1)}>

                                    <span className="svg-icon svg-icon-1">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <rect
                                                opacity="0.3"
                                                x="2"
                                                y="2"
                                                width="20"
                                                height="20"
                                                rx="5"
                                                fill="currentColor"></rect>
                                            <rect x="6.0104" y="10.9247" width="12" height="2" rx="1" fill="currentColor"></rect>
                                        </svg>
                                    </span>

                                </button>

                                <input
                                    type="number"
                                    className="no-valdiations form-control form-control-solid border-0 text-center"
                                    placeholder="HH"
                                    name="hh"
                                    value={quizItems.hh}
                                    min="0"
                                    max="60"
                                    onChange={(event) => changeTime("hh", + event.target.value)}/>

                                <button
                                    type="button"
                                    className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 end-0 mx-3"
                                    onClick={() => changeTime("hh", + quizItems.hh + 1)}>

                                    <span className="svg-icon svg-icon-1">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <rect
                                                opacity="0.3"
                                                x="2"
                                                y="2"
                                                width="20"
                                                height="20"
                                                rx="5"
                                                fill="currentColor"></rect>
                                            <rect
                                                x="10.8891"
                                                y="17.8033"
                                                width="12"
                                                height="2"
                                                rx="1"
                                                transform="rotate(-90 10.8891 17.8033)"
                                                fill="currentColor"></rect>
                                            <rect x="6.01041" y="10.9247" width="12" height="2" rx="1" fill="currentColor"></rect>
                                        </svg>
                                    </span>

                                </button>

                            </div>

                            <div className="position-relative col-6 w-120px">

                                <button
                                    type="button"
                                    className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 start-0 mx-3"
                                    onClick={() => changeTime("mm", + quizItems.mm - 1)}>

                                    <span className="svg-icon svg-icon-1">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <rect
                                                opacity="0.3"
                                                x="2"
                                                y="2"
                                                width="20"
                                                height="20"
                                                rx="5"
                                                fill="currentColor"></rect>
                                            <rect x="6.0104" y="10.9247" width="12" height="2" rx="1" fill="currentColor"></rect>
                                        </svg>
                                    </span>

                                </button>

                                <input
                                    type="number"
                                    className="no-valdiations form-control form-control-solid border-0 text-center"
                                    placeholder="MM"
                                    name="hh"
                                    value={quizItems.mm}
                                    min="0"
                                    max="60"
                                    onChange={(event) => changeTime("mm", + event.target.value)}/>

                                <button
                                    type="button"
                                    className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 end-0 mx-3"
                                    onClick={() => changeTime("mm", + quizItems.mm + 1)}>

                                    <span className="svg-icon svg-icon-1">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <rect
                                                opacity="0.3"
                                                x="2"
                                                y="2"
                                                width="20"
                                                height="20"
                                                rx="5"
                                                fill="currentColor"></rect>
                                            <rect
                                                x="10.8891"
                                                y="17.8033"
                                                width="12"
                                                height="2"
                                                rx="1"
                                                transform="rotate(-90 10.8891 17.8033)"
                                                fill="currentColor"></rect>
                                            <rect x="6.01041" y="10.9247" width="12" height="2" rx="1" fill="currentColor"></rect>
                                        </svg>
                                    </span>

                                </button>

                            </div>

                        </div>}

                    </div>}
                    {step === 3 && <div className="d-flex align-items-center justify-center">

                        <Spinner animation="border" variant="primary"/>

                    </div>}

                </Modal.Body>
                {step !== 3 && <Modal.Footer className="flex flex-stack">

                    {step === 2 && <Button
                        variant="primary"
                        className="btn-sm btn-light-primary pull-left"
                        onClick={() => setStep(1)}>Change category
                    </Button>}
                    <div></div>
                    {step === 2 && <Button variant="primary" className="btn-sm pull-left" type="submit">Add Quiz</Button>}
                    {step === 1 && <Button
                        variant="primary"
                        className="btn-sm btn-light-primary pull-right"
                        onClick={() => setStep(2)}>Next
                    </Button>}

                </Modal.Footer>}
            </Form>
        </Modal>
    );
};

export default CreateQuizModal;