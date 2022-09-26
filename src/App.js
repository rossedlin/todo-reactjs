import {Component, useState, useEffect, useCallback} from 'react';
import {getFirestore, collection, query, where, doc, setDoc, getDocs} from 'firebase/firestore/lite';
import Form from './components/Form';
import Task from './components/Task';

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
  }

  componentDidMount() {
    this.getData().then((res) => {
      this.setState({tasks: res});
    });
  }

  /**
   *
   * @param event
   */
  async onAddTask(event) {
    event.preventDefault();

    const db   = getFirestore(this.props.firebaseApp);

    // Add a new document in collection "cities"
    await setDoc(doc(db, "cities", "LA"), {
      name:    "Los Angeles",
      state:   "CA",
      country: "USA"
    });
  }

  /**
   *
   * @param taskId
   */
  onDoneTask(taskId) {
    //setTasks(currentState => currentState.filter(task => task.id !== taskId));
  };

  /**
   *
   * @returns {Promise<*[]>}
   */
  async getData() {

    let t      = [];
    const db   = getFirestore(this.props.firebaseApp);
    const col  = collection(db, 'tasks');
    // const q = query(collection(db, "tasks"), where("completed", "==", null));
    const snap = await getDocs(col);

    let i = 0;
    await snap.docs.forEach((doc) => {
      t[i++] = {
        id:   doc.id,
        name: doc.data().name,
      };
    });

    console.log(t);

    return t;
  };

  /**
   *
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div className="container">
        <div className="content">
          <h1>Todo ReactJS</h1>

          <Form onSubmit={this.onAddTask}/>

          <hr/>

          <ul className="tasks">
            {this.state.tasks && this.state.tasks.map(task => (
              <Task key={task.id} name={task.name} onDone={this.onDoneTask}/>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
