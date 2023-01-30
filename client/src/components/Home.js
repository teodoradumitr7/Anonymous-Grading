import { Link, useNavigate } from 'react-router-dom';
import Proiect from './Proiect';

const Home = ({ user, proiecte,  users }) => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    function tip(type)
    {
        if(type==0)
        {
            return "Cont student"
        }
        else{
            return "Cont profesor"
        }
    }

    const navigate = useNavigate();
    return (
    <div>
        <div id="account-info">
            <h2>Username: {user.username}</h2>
            <h2>Tip: {tip(user.type)}</h2>
            <button onClick={handleLogout}>Log Out</button>
        </div>
        <div className="lista-proiecte-center">
            <div className='lista-proiecte'>
                <div className="nav-center">
                    <nav>
                        <ul>
                            <li><Link to='/newProject' state={{ }}>Proiect Nou</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="proiecte-center">
                    <div className="proiecte-column">
                        {proiecte.map(e => <Proiect key={e.id} item={e} 
                        user={user}
                        />)}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home