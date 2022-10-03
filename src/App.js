import {Component, useState} from 'react';
import {getFirestore, collection, query, where, doc, setDoc, addDoc, getDocs} from 'firebase/firestore';
import {FaCheck, FaPlus} from 'react-icons/fa';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default class App extends Component {

  /**
   *
   * @param props
   */
  constructor(props) {
    super(props);

    /**
     *
     * @type {firebase.User}
     */
    this.state = {tasks: []};

    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleCompleteTask = this.handleCompleteTask.bind(this);
  }

  /**
   *
   */
  componentDidMount() {
    this.getData().then((res) => {
      this.setState({tasks: res});
    });
  }

  /**
   *
   * @param name
   * @returns {Promise<void>}
   */
  async handleAddTask(name) {

    const db   = getFirestore(this.props.firebaseApp);

    await addDoc(collection(db, "tasks"), {
      name: name,
      completed: false,
    });

    this.getData().then((res) => {
      this.setState({tasks: res});
    });
  }

  /**
   *
   * @param id
   * @returns {Promise<void>}
   */
  async handleCompleteTask(id) {
    const db   = getFirestore(this.props.firebaseApp);

    await setDoc(doc(db, "tasks", id), {
      completed: true,
    }, {merge: true});

    this.getData().then((res) => {
      this.setState({tasks: res});
    });
  }

  /**
   *
   * @returns {Promise<*[]>}
   */
  async getData() {

    let t = [];

    const db   = getFirestore(this.props.firebaseApp);
    const q = query(collection(db, "tasks"), where("completed", "==", false));
    const snap = await getDocs(q);

    let i = 0;
    await snap.docs.forEach((doc) => {
      t[i++] = {
        id:   doc.id,
        name: doc.data().name,
      };
    });

    return t;
  };

  /**
   *
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2 col-xl-6 offset-xl-3">
            <div className={'text-center mt-3'}>
              <h1>Todo ReactJS</h1>
            </div>

            <hr/>

            <div className={'row mt-3'}>
              {this.state.tasks && this.state.tasks.map(task => (
                <Task key={task.id}
                      id={task.id}
                      name={task.name}
                      onComplete={this.handleCompleteTask}/>
              ))}
            </div>

            <div className={'mt-5'}>
              <Form handleAdd={this.handleAddTask}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 *
 * @param id
 * @param name
 * @param onComplete
 * @returns {JSX.Element}
 * @constructor
 */
function Task({id, name, onComplete}) {
  return (
    <div className={'col-12'} key={id}>
      <div className={'row mt-1 mb-1'}>
        <div className="col-10">
          {name}
        </div>

        <div className={'col-2 ms-auto'}>
          <button type="button"
                  className={'btn btn-sm btn-primary'}
                  onClick={() => onComplete(id)}>
            <FaCheck size={16}/>
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 *
 * @param handleAdd
 * @returns {JSX.Element}
 * @constructor
 */
function Form({handleAdd}) {

  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    handleAdd(name);
    setName('');
  };

  return (
    <form className="form" onSubmit={(e) => handleSubmit(e)}>
      <div className="row">
        <div className="col-8">
          <input className="form-control"
                 type="text"
                 value={name}
                 placeholder="Task name..."
                 onChange={(event) => {setName(event.target.value)}}/>
        </div>
        <div className="col-3 ms-auto">
          <button type="submit"
                  className={'btn btn-primary'}
                  disabled={name === ''}>
            <FaPlus size={12}/>&nbsp;Add
          </button>
        </div>
      </div>
    </form>
  );
}
