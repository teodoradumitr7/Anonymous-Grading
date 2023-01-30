import { useEffect, useState } from "react";
import { Route, Routes, Navigate,useParams } from 'react-router-dom';
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AdaugaProiect from "./components/AdaugaProiect";
import AddGradeForm from "./components/AddGrade";
import GradePage from "./components/GradePage";

const App = () => {
  let user = localStorage.getItem('token');
  const [proiecte, setProiecte] = useState([]);
  const [users, setUsers] = useState([]);
  const[grades,setGrades]=useState([]);
  //const[project,setProject]=useState([]);
  const[gradesProj,setGradeProj]=useState([]);
  const SERVER = 'http://localhost:8090';
  const params = useParams();
  const { prjId } = params;

  const fetchUsers = async () => {
    try {
        const response = await fetch(`${SERVER}/users`);
        if (!response.ok) {
            throw response;
        }
        setUsers(await response.json());
    } catch (err) {
        console.log(err);
    }
  }

  const fetchProiecte = async () => {
    try {
      const response = await fetch(`${SERVER}/projects`);
      if (!response.ok) {
        throw response;
      }
      setProiecte(await response.json());
    } catch (err) {
      console.log(err);
    }
  }

  const fetchGrades = async () => {
    try {
      const response = await fetch(`${SERVER}/grades`);
      if (!response.ok) {
        throw response;
      }
      setGrades(await response.json());
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUsers();
    fetchProiecte();
    fetchGrades();
   // fetchProject(prjId);
    fetchGradesProj();
  }, []);

  if (users.length > 0 ) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === localStorage.getItem('token')) {
        user = users[i];
      }
    }
  }


  const addProject= async (project) => {
    try {
        const response = await fetch(`${SERVER}/projects`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project)
        });
        if (!response.ok) {
            throw response;
        }
        fetchProiecte();
    } catch (err) {
      return err.json();
    }
  };

  const editProject = async (id, project) => {
    try {
      const response = await fetch(`${SERVER}/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      });
      if (!response.ok) {
        throw response;
      }
      fetchProiecte();
    } catch (err) {
      return err.json();
    }
  };

  const addGrade= async (grade) => {
    try {
        const response = await fetch(`${SERVER}/grades`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(grade)
        });
        if (!response.ok) {
            throw response;
        }
        fetchGrades();
    } catch (err) {
      return err.json();
    }
  };


    const fetchGradesProj = async () => {
      try {
        const response = await fetch(`${SERVER}/grades/`);
        if (!response.ok) {
          throw response;
        }
        setGradeProj(await response.json());

      } catch (err) {
        return err.json();
      }
    };


    const fetchProject = async (id) => {
      try {
        const response = await fetch(`${SERVER}/projects/${id}`);
        if (!response.ok) {
          throw response;
        }
        console.log(id);
        return response;
      } catch (err) {
        return err.json();
      }
    };

  //aplicatia se deschide cu pagina de log in
  //daca nu are cont, un utilizator apasa pe register pentru a crea cont
  //apoi in functie de tipul utilizatorului, 0= student si 1=profesor
  //studentul poate sa adauge proiecte si note
  //profesorul poate sa vada notele
  return (
    <div className="App">
      {
        users.length ?
      <>
      <Routes>
      <Route path='/login' element={<Login />} />
        <Route path='/' element={
          <>
          {
            user ? 
            <Home user={user} users={users} proiecte={proiecte}/>
            :
            <Login/>
          }
          </>
        } />
        <Route path='/register' element={<Signup />} />
        
        {
          user && user.type===0?
          <>
          <Route path="/newProject" element={<AdaugaProiect user={user} addProject={addProject} editProject={editProject} />} />
          
          </>
          :
          <>
          <Route path="/newProject" element={<Navigate replace to ='/' />} />
      
          </>
        }

          <Route path="/newGrade" element={<AddGradeForm item={proiecte} addGrade={addGrade} />} />
        
        {user && user.type===1?
        <>
          <Route path="/seeGrade" element={<GradePage user={user}  project={proiecte}/>}/>
          </>:
            <>
            <Route path="/seeGrade" element={<Navigate replace to ='/' />} />
        
            </>
          }
          {/* user={user} grades={gradesProj} project={proiecte}  */}
       
      </Routes>
      </>
        :
        <>
        </>
      }
    </div>
  );
}

export default App;
