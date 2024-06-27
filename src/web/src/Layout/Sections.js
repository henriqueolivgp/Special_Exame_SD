import { SignUp } from "../Menus/TopTeams";
import { SignIn } from "../screens/SignIn";
import { TopTeams } from "../Menus/TopTeams";


const Sections = [

    {
        id: "top-teams",
        label: "Top Teams",
        to: "/",
        content: <TopTeams />
    },
    {
        id: "register",
        label: "Register",
        to: "register",
        content: <SignUp />
    },

    {
        id: "Login",
        label: "Login",
        to: "/login",
        content: <SignIn />
    }

];

export default Sections;