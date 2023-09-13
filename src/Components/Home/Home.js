import { useAuth } from "../Contexts/AuthContext";
import "./Home.css";


const Home = () => {
    const {logout} = useAuth();
    return (
        <div>
            <h1>Logged in Sucesscully</h1>
            <div className="logout-btn">
                <button onClick={logout}>LogOut</button>
            </div>
        </div>
    )
}

export default Home;