import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Placeholder from 'react-bootstrap/Placeholder';

import { createQuizModal } from "../../../includes/Store/slice/modals.slice";



const HeaderActions = ({action}) => {
    const [ac,setAc] = useState(<></>);
    useEffect(() => {
        if(action === "my-quizz-actions"){
            setAc(<MyQuizzActions />);
        } else {
            setAc(<></>);
        }
    },[]);
    return (<>{ac}</>);
}


const MyQuizzActions = () => {
    const dispatch = useDispatch();
    const { API_LOADING } = useSelector(state => state.api);
    
    const showModalCreateQuiz = () => {
        dispatch(createQuizModal(true));
    };

    return (<>
        <div className="d-flex ms-3">
            {API_LOADING? <>
                <Placeholder.Button variant="primary" style={{width: "110px"}} xs={6} />
            </> : <>
                <button className="btn btn-primary" onClick={showModalCreateQuiz}>
                    <i className="fa fa-thin fa-plus"></i> Add Quiz
                </button>
            </>}
            
        </div>
    </>)
}

export default HeaderActions;