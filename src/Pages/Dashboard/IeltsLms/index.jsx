import { Outlet } from "react-router-dom";
import DashboardIeltsLmsLayout from "../../../templates/Layouts/DashboardIeltsLms.layout";
import FreeQuizzes from "./FreeQuizzes";
import MyQuizzes from "./MyQuizzes";
import EditQuiz from "./BasicQuiz/EditQuiz";


const IeltsLmsRoot = () => {
    return (<DashboardIeltsLmsLayout>
        <Outlet />
    </DashboardIeltsLmsLayout>);
};

export { 
    IeltsLmsRoot as DashboardIeltsLms,
    FreeQuizzes as DashboardIeltsLmsFreeQuizzes,
    MyQuizzes as DashboardIeltsLmsMyQuizzes,
    EditQuiz as DashboardIeltsLmsEditQuiz
    /* 
    
    */
}; 