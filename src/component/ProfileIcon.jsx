import { useEffect,useState } from "react";
import { Link,useNavigate } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';

import {useDispatch,useSelector} from "react-redux";
import { AuthenticateUser } from "../redux/actions/AuthenticateActions";
import { logOutUser } from "../redux/actions/logOutAction";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ProfileIcon = () => {
    const navigate = useNavigate();
    const privateAxios = useAxiosPrivate();
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleProfile = () => {
        setAnchorEl(null);
        navigate('/profile');
    }

    const handleLogOut = () => {
        setAnchorEl(null);
        dispatch(logOutUser());
    }

    const {user} = useSelector(state => state.login);

    useEffect(()=>{

        dispatch(AuthenticateUser({privateAxios,accessToken:user?.accessToken}));

    },[])

    return <div>
        {user?._id?
            <>
                <Tooltip title="open menu">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                    >
                        <Avatar alt="Remy Sharp" src={''}>
                            {user?.username[0]}
                        </Avatar>
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                        },
                        '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                        },
                    },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    {(user?.role === 'admin' || user?.role === 'hr') &&<MenuItem onClick={()=>navigate('/dashboard')}>
                        <Avatar /> Dashboard
                    </MenuItem>}
                    {(user?.role === 'hr' || user?.role === 'employee') &&<MenuItem onClick={handleProfile}>
                        <Avatar /> Profile
                    </MenuItem>}
                    <Divider />
                    <MenuItem onClick={handleLogOut}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </>:
            <Link to="connect-with-us">LogIn</Link>
        }
    </div>
}

export default ProfileIcon;