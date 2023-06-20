import CommonLayout from "../../templates/Layouts/Common.layout";
import { useSelector } from "react-redux";

const Homepage = () => {
    const WIDTH = useSelector(state => state.theme.WIDTH);
    return (<CommonLayout>
        Homepage {WIDTH}
    </CommonLayout>)
};

export default Homepage;