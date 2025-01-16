import { useSelector } from "react-redux";
import EmployeeProfile from "./Employee-Profile-Page";

const ProfilePage = () => {
    const { user } = useSelector(state => state.login);

    return (
        <div>
            {
                user?.role === 'employee'  && <div>
                    <EmployeeProfile />
                </div>
            }
            {
                (user?.role === 'admin' || user?.role === 'hr') && <div style={{ height: '100vh', marginTop: '100px' }}>{user?.role.toUpperCase()} Profile</div>
            }
        </div>
    );
}


export default ProfilePage;