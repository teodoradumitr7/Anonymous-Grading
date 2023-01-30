import { Link } from 'react-router-dom';
const Grade = ({ grade}) => {

    return (
    <div className="proiect">
        <p><span className="category-bold">Proiect: </span>{grade.projectId}</p>
        <p><span className="category-bold">Nota: </span>{grade.grade}</p>
        <p><span className="category-bold">Descriere: </span>{grade.description}</p>
        
    </div>
  )
}

export default Grade;