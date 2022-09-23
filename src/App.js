import {useState, useEffect} from 'react';
import {FaPlus, FaTrashAlt, FaCheck} from 'react-icons/fa';
import {getFirestore, collection, getDocs} from 'firebase/firestore/lite';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function App({firebaseApp}) {
  const [tasks, setTasks] = useState([]);

  /**
   *
   * @param newTask
   */
  const onAddTask = (newTask) => {
    setTasks(currentState => [...currentState, newTask]);
  };

  /**
   *
   * @param taskId
   */
  const onDoneTask = (taskId) => {
    setTasks(currentState => currentState.filter(task => task.id !== taskId));
  };

  /**
   *
   * @returns {(function(): Promise<DocumentData[]|undefined>)|*}
   */
  const getTasks = async function() {

    let t      = [];
    const db   = getFirestore(firebaseApp);
    const col  = collection(db, 'tasks');
    const snap = await getDocs(col);
    const list = snap.docs.map(doc => doc.data());

    let i = 0;
    await list.forEach((doc) => {
      t[i++] = {
        id:          doc.id,
        name:        doc.data().name,
      };
    });

    // setTasks(t);

    return t;
  };

  useEffect(() => {

    getTasks();

    // getTasks().then((res) => {
    //   console.log(res);
    // });
  });

  return (
    <div className="container">
      <div className="content">
        <h1>Todo ReactJS</h1>

        <Form onSubmit={onAddTask}/>

        <hr/>

        <Tasks tasks={tasks}
               onDoneTask={onDoneTask}/>
      </div>
    </div>
  );
}

/**
 *
 *
 * @param onSubmit
 * @returns {JSX.Element}
 * @constructor
 */
function Form({onSubmit}) {
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

/**
 *
 * @param tasks
 * @param searchTaskName
 * @param onDoneTask
 * @param onChangeCompletedTask
 * @returns {JSX.Element}
 * @constructor
 */
function Tasks({tasks, onRemoveTask: onDoneTask, onChangeCompletedTask}) {
  return (
    <ul className="tasks">
      {tasks.map(task => (
        <Task
          {...task}
          key={task.id}
          onDone={onDoneTask}
        />
      ))}
    </ul>
  );
}

/**
 *
 * @param id
 * @param name
 * @param completed
 * @param onDone
 * @returns {JSX.Element}
 * @constructor
 */
function Task({id, name, completed, onDone}) {
  return (
    <li className="">

      <span className="task__name">
        #{id}&nbsp;-&nbsp;
      </span>

      <span className="task__name">
        {name}
      </span>

      <button type="button" onClick={() => onDone(id)}>
        <FaCheck size={16}/>
      </button>
    </li>
  );
}
