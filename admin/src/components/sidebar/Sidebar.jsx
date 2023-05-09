import './sidebar.scss'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const { dispatch } = useContext(AppContext)
    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">GMH</span>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">LISTS</p>
                    <Link to="/dishes" style={{ textDecoration: "none" }}>
                        <li>
                            <PersonOutlineIcon className="icon" />
                            <span>Dishes</span>
                        </li>
                    </Link>
                    <Link to="/suppliers" style={{ textDecoration: "none" }}>
                        <li>
                            <PersonOutlineIcon className="icon" />
                            <span>Suppliers</span>
                        </li>
                    </Link>
                    <p className="title">USER</p>
                    <li>
                        <ExitToAppIcon className="icon" />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                <div
                    className="colorOption"
                    onClick={() => dispatch({ type: "LIGHT" })}
                ></div>
                <div
                    className="colorOption"
                    onClick={() => dispatch({ type: "DARK" })}
                ></div>
            </div>
        </div>
    )
}

export default Sidebar