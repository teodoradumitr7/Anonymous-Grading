import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AddGradeForm = ({ item, addGrade }) => {
    const [grade, setGrade] = useState('');
    const [description, setDescriere] = useState('');
    const [projectId,setProjectId]=useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const add = (e) => {
      e.preventDefault();
      const response = addGrade({ grade, description,projectId});
      
      response.then((j) => setError(String(j.message)))
        .catch(() => navigate('/')); 
    };


    function verifica(input){
      if(input>10 || input<1)
      {
        setError("Se accepta note intre 1 si 10")
      }
      else{
        setGrade(input)
      }
    }
    return (
    <>
    {
      <div id="post">
        <h1>Nota Noua</h1>
        <div id="form-container">
            <div id="notaContainer">
                <label htmlFor="nota">Nota:</label>
                <input type="number" id="nota" min="1" max="10" onChange={(e) => verifica(e.target.value)}/>
            </div>
            <div id="descriereContainer">
                <label htmlFor="descriere">Descriere</label>
                <input type="text" id="descriere" onChange={(e) => setDescriere(e.target.value)}/>
            </div>
            <div id="notaContainer">
                <label htmlFor="Id">ID:</label>
                <input type="text" id="nota" onChange={(e) => setProjectId(e.target.value)}/>
            </div>
            {error && <div className="errorSquare">{error}</div>}
            <div id="buttons">
                <button type='submit' onClick={add}>Adauga Nota</button>
                <button onClick={() => navigate('/')}>Pagina Principala</button>
            </div>
        </div>
      </div>
    }
    </>
  )
};
export default AddGradeForm



// return (
//   <>
//   {
//     edit ? 
//     <div id="post">
//       <h1>Editare Nota</h1>
//       <div id="form-container">
//           <div id="notaContainer">
//               <label htmlFor="nota">Nota:</label>
//               <input type="text" id="nota" onChange={(e) => setGrade(e.target.value)} value={grade}/>
//           </div>
//           <div id="descriereContainer">
//               <label htmlFor="descriere">Descriere:</label>
//               <input type="text" id="descriere" onChange={(e) => setDescriere(e.target.value)} value={description}/>
//           </div>
//           {/* {error && <div className="errorSquare">{error}</div>} */}
//           <div id="buttons">
//               <button type='submit' onClick={edt}>Editeaza Nota</button>
//               <button onClick={() => navigate('/')}>Pagina Principala</button>
//           </div>
//       </div>
//     </div>
//     :
//     <div id="post">
//       <h1>Nota Noua</h1>
//       <div id="form-container">
//           <div id="notaContainer">
//               <label htmlFor="nota">Nota:</label>
//               <input type="text" id="nota" onChange={(e) => setGrade(e.target.value)}/>
//           </div>
//           <div id="descriereContainer">
//               <label htmlFor="descriere">Descriere</label>
//               <input type="text" id="descriere" onChange={(e) => setDescriere(e.target.value)}/>
//           </div>
//           {/* {error && <div className="errorSquare">{error}</div>} */}
//           <div id="buttons">
//               <button type='submit' onClick={add}>Adauga Nota</button>
//               <button onClick={() => navigate('/')}>Pagina Principala</button>
//           </div>
//       </div>
//     </div>
//   }
//   </>
// )
// };

