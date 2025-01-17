import { useSelector } from "react-redux";
import EmployeeProfile from "./Employee-Profile-Page";

const ProfilePage = () => {
    const { user } = useSelector(state => state.login);

    return (
        <div>
            {
                (user?.role === 'employee' || user?.role === 'hr') &&
                <EmployeeProfile />
            }
            {
                (user?.role === 'admin') && <div >{user?.role.toUpperCase()} Profile</div>
            }
        </div>
    );
}


export default ProfilePage;