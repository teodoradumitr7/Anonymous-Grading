import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import Grade from './Grade';
import GradePage from './GradePage';


const Proiect = ({ item ,user}) => {
    const SERVER = 'http://localhost:8090';
    
    const fetchMeanProj = async (id) => {
        try {
          const response = await fetch(`${SERVER}/grades/${id}/mean`);
          if (!response.ok) {
            throw response;
          }
          setMedie(await response.json())
    
        } catch (err) {
          setMedie(0)
        }
      };

      const [medie, setMedie] = useState([]);
      useEffect(() => {
      fetchMeanProj(item.id)
      }, []);

      function medi(med){
        if(medie>0)
        return medie;
        else return"Nu au fost acordate note!"
      }


     /* function onclickId()
      { state={{ seeGrade:item, edit: true}}
    console.log(item.id)}*/
        
      
      //profesorul va avea acces la notele oferite proiectelor
      //studentul care a postat proiectul poate sa ofere note propriului proiect, sau poate sa ofere in functie de regula random aleasa
      //=daca id ul este divizibil cu 2
    return (
    <div className="proiect">
        <p><span className="category-bold">ID: </span>{item.id}</p>
        <p><span className="category-bold">Titlu: </span>{item.title}</p>
        <p><span className="category-bold">Descriere: </span>{item.description}</p>
        <p><span className="category-bold">Url: </span>{item.url}</p>
        <p><span className="category-bold">Video: </span>{item.video}</p>
        <p><span className="category-bold">Medie: </span>{medi(medie)}</p>
        {
            (user && user.username === item.username)||( user.id%2===0 && user.type===0)?
            <>
            <button className="newGrade"><Link to='/newGrade' state={{ addGrade:item, edit: true}}><i className="fas fa-edit"></i></Link></button>
            </> :
            <>
            </>
        }
      
        {/* to={{pathname:'/seeGrade' ,state:item}} */}
        {
            user && user.type === 1 && !(typeof medi(medie)==="string")?
            <>
            <button className="seeGrade"><Link to='/seeGrade' state={{id:item.id}} ><i className="fa fa-graduation-cap"></i></Link></button>
            </> :
            <>
            </>
        }
    </div>
  )
}

export default Proiect;