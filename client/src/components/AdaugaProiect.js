import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdaugaProiect = ({ user, addProject, editProject }) => {
    const [title, setTitlu] = useState('');
    const [description, setDescriere] = useState('');
    const [url, setUrl] = useState('');
    const [video, setVideo] = useState('');
    const [username,setUsername]=useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const add = (e) => {
      e.preventDefault();
      const response = addProject({ title, description, url, video, username });
      
      response.then((j) => setError(String(j.message)))
        .catch(() => navigate('/')); 
    };

    const { proiectEditabil, edit } = useLocation().state;

    useEffect(() => {
      if (edit) {
        setTitlu(proiectEditabil.title);
        setDescriere(proiectEditabil.description);
        setUrl(proiectEditabil.url);
        setVideo(proiectEditabil.video);
     
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const edt = (e) => {
      e.preventDefault();
      const response = editProject(proiectEditabil.id, { title, description, url, video});
      response.then((j) => setError(String(j.message)))
        .catch(() => navigate('/')); 
    };

    return (
    <>
    {
      edit ? 
      <div id="post">
        <h1>Editare Proiect</h1>
        <div id="form-container">
            <div id="titluContainer">
                <label htmlFor="titlu">Titlu:</label>
                <input type="text" id="titlu" onChange={(e) => setTitlu(e.target.value)} value={title}/>
            </div>
            <div id="descriereContainer">
                <label htmlFor="descriere">Descriere:</label>
                <input type="text" id="descriere" onChange={(e) => setDescriere(e.target.value)} value={description}/>
            </div>
            <div id="urlContainer">
                <label htmlFor="url">Url:</label>
                <input type="text" id="url" onChange={(e) => setUrl(e.target.value)} value={url}/>
            </div>
            <div id="videoContainer">
                <label htmlFor="video">Video</label>
                <input type="text" id="video" onChange={(e) => setVideo(e.target.value)} value={video}/>
            </div>
            <div id="buttons">
                <button type='submit' onClick={edt}>Editeaza Proiect</button>
                <button onClick={() => navigate('/')}>Pagina Principala</button>
            </div>
        </div>
      </div>
      :
      <div id="post">
        <h1>Proiect Nou</h1>
        <div id="form-container">
            <div id="titluContainer">
                <label htmlFor="titlu">Titlu</label>
                <input type="text" id="titlu" onChange={(e) => setTitlu(e.target.value)}/>
            </div>
            <div id="descriereeContainer">
                <label htmlFor="descriere">Descriere</label>
                <input type="text" id="descriere" onChange={(e) => setDescriere(e.target.value)}/>
            </div>
            <div id="urlContainer">
                <label htmlFor="url">url:</label>
                <input type="text" id="url" onChange={(e) => setUrl(e.target.value)}/>
            </div>
            <div id="videoContainer">
                <label htmlFor="video">Video:</label>
                <input type="text" id="video" onChange={(e) => setVideo(e.target.value)}/>
            </div>
            <div id="usernameContainer">
                <label htmlFor="username">Username::</label>
                <input type="text" id="username" onChange={(e) => setUsername(e.target.value)}/>
            </div>
            {/* {error && <div className="errorSquare">{error}</div>} */}
            <div id="buttons">
                <button type='submit' onClick={add}>Adauga Proiect</button>
                <button onClick={() => navigate('/')}>Pagina Principala</button>
            </div>
        </div>
      </div>
    }
    </>
  )
};

export default AdaugaProiect