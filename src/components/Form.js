import {useState, useEffect} from 'react';
import {FaPlus} from 'react-icons/fa';

/**
 *
 *
 * @param onSubmit
 * @returns {JSX.Element}
 * @constructor
 */
export default function Form({onSubmit}) {
  const [taskName, setTaskName] = useState('');
  const [id, setId]             = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!!taskName) {
      const newTask = {
        id:   id,
        name: taskName,
      };

      setId(id + 1);

      onSubmit(newTask);
      setTaskName('');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input className="input"
             type="text"
             value={taskName}
             placeholder="Task name..."
             onChange={event => setTaskName(event.target.value)}/>

      <button type="submit"
              disabled={taskName === ''}>
        <FaPlus size={12}/>
        Add
      </button>
    </form>
  );
}
