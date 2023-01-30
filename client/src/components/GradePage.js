import { Link, useNavigate,useLocation,useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import Grade from './Grade';
import Proiect from './Proiect';
  
const GradePage = ({project ,user}) => {
    const SERVER = 'http://localhost:8090';
    
    //const location = ;
    //const prjProp=location.state;
    //console.log(prjProp)
    const { state } = useLocation();

    
      const [grades, setGrades] = useState([]);
      useEffect(() => {
      fetchGrades(state.id)
      }, []);
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

    const fetchGrades = async (id) => {
        try {
          const response = await fetch(`${SERVER}/grades/${id}`);
          if (!response.ok) {
            throw response;
          }
          setGrades(await response.json())
         console.log(id);
        } catch (err) {
            console.log(err);
        }
      };
    
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
                <div className="proiecte-center">
                    <div className="proiecte-column">
                        {grades.map(e => <Grade key={e.id} grade={e}
                        />)}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default GradePage