import React, {useState} from "react";
import {connect} from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';
import DeleteTaskModal from "./DeleteTaskModal";
import UpdateTaskModal from "./UpdateTaskModal";
import CreateTaskModal from "./CreateTaskModal";

function Task(props) {

    const task = props.task;

    const colorsMap = {
        Todo: 'danger',
        Progress: 'primary',
        Review: 'dark',
        Done: 'warning'
    };

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [modalDel, setModalDel] = useState(false);
    const toggleDel = () => setModalDel(!modalDel);

    function moveLeftHandler(id) {
        props.moveLeft(id);
    }

    function moveRightHandler(id) {
        props.moveRight(id);
    }

    function priorityDownHandler(id, currentPriority) {
        props.priorityDown(id, currentPriority);
    }

    function priorityUpHandler(id, currentPriority) {
        props.priorityUp(id, currentPriority);
    }

    return (
        <div className="card">
            <span className={`border border-${colorsMap[task.status]}`}>

                <div className="card-body">
                    <div className="card-title"><h6><strong>{task.name}</strong></h6></div>
                    <p className="card-text">{task.description}</p>
                </div>

                <hr/>

                <ul className="list-group list-group-flush">


                    <li className="list-group-item">
                        <div>priority:{' '}
                            <button type="button" className="btn btn-link text-dark" onClick={() => priorityDownHandler(task.id, task.priority)}> - </button>
                            <strong>{task.priority}</strong>
                            <button type="button" className="btn btn-link text-dark" onClick={() => priorityUpHandler(task.id, task.priority)}> + </button>
                        </div>
                    </li>


                    <li className="list-group-item">
                        <div className="btn-group">
                            <button onClick={toggle} type="button" className="btn btn-outline-secondary"> Update </button>
                            <UpdateTaskModal modal={modal}
                                             setModal={setModal}
                                             task={task}
                            />
                            <button onClick={toggleDel} type="button" className="btn btn btn-outline-secondary"> Delete </button>
                            <DeleteTaskModal modalDel={modalDel}
                                             setModalDel={setModalDel}
                                             task={task}
                            />
                            <CreateTaskModal modalAdd={props.modalAdd}
                                             setModalAdd={props.setModalAdd}
                            />
                        </div>
                    </li>


                    <li className="list-group-item">
                        <div className="card-body">
                            {task.status !== 'Todo' && <button type="button" className="btn btn-link" onClick={() => moveLeftHandler(task.id)}> Left </button>}
                            {task.status !== 'Done' && <button type="button" className="btn btn-link" onClick={() => moveRightHandler(task.id)}> Right </button>}
                        </div>
                    </li>
                </ul>

            </span>
        </div>
    );
}


const mapDispatchToProps = (dispatch) => ({
    moveLeft: (id) => dispatch({
        type: 'LEFT', payload: {
            id: id
        }
    }),

    moveRight: (id) => dispatch({
        type: 'RIGHT', payload: {
            id: id
        }
    }),

    priorityDown: (id, currentPriority) => dispatch({
        type: 'PRIORITY_DOWN', payload: {
            id: id,
            currentPriority: currentPriority
        }
    }),

    priorityUp: (id, currentPriority) => dispatch({
        type: 'PRIORITY_UP', payload: {
            id: id,
            currentPriority: currentPriority
        }
    }),
});

export default connect(null, mapDispatchToProps) (Task);