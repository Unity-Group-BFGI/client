import { BrowserRouter } from "react-router-dom";
import AppLayout from "./templates/Layouts/App.layout";
import Routes from "./Routes";

const App = () => {
    return (<AppLayout>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </AppLayout>)
};
export default App;


