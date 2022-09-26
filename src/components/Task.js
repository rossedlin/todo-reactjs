import {FaCheck} from 'react-icons/fa';

/**
 *
 * @param id
 * @param name
 * @param onDone
 * @returns {JSX.Element}
 * @constructor
 */
export default function Task({id, name, onDone}) {
  return (
    <li key={id}>

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
