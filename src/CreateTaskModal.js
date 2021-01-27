import React, {useState} from "react";
import {connect} from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Badge } from 'reactstrap';


function CreateTaskModal(props) {

    const { modalAdd, setModalAdd } = props;
    const toggleAdd = () => setModalAdd(!modalAdd);

    const initialNewTask = {
        id: Math.random(),
        name: 'Specify the name of the task',
        description: 'Add task description',
        status: props.statuses[0],
        priority: 3,
    };

    const [name, setName] = useState(initialNewTask.name);
    const [description, setDescription] = useState(initialNewTask.description);
    const [priority, setPriority] = useState(initialNewTask.priority);
    const [status, setStatus] = useState(initialNewTask.status);

    function createTaskHandler() {
        const newTask = {id: Math.random(), name: name, description: description, status: status, priority: priority};
        props.createTask(newTask);
        toggleAdd();
    }

    return (
        <div>
            <Modal isOpen={modalAdd}>
                <ModalHeader> Add New Task </ModalHeader>
                <ModalBody>

                    <label htmlFor="exampleFormControlSelect2"><h4><Badge color="link"> Name </Badge></h4></label>
                    <input value={name}
                           onChange={(event) => setName(event.target.value)}
                           className="form-control"
                           type="text"/>

                    <label htmlFor="exampleFormControlSelect2"><h4><Badge color="link"> Description </Badge></h4></label>
                    <input value={description}
                           onChange={(event) => setDescription(event.target.value)}
                           className="form-control"
                           type="text"/>

                    <label htmlFor="exampleFormControlSelect2"><h4><Badge color="link"> Status </Badge></h4></label>
                    <select value={status}
                            onChange={(event) => setStatus(event.target.value)}
                            className="form-control">
                            {props.statuses.map((el, index) => <option key={index} value={el}> {el} </option>)}
                    </select>

                    <label htmlFor="exampleFormControlSelect2"><h4><Badge color="link"> Priority </Badge></h4></label>
                    <select value={priority}
                            onChange={(event) => setPriority(event.target.value)}
                            className="form-control">
                            {props.priorities.map((el, index) => <option key={index}>{el}</option>)}
                    </select>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={createTaskHandler}> Create </Button>{' '}
                    <Button color="secondary" onClick={toggleAdd}> Cancel </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => ({
    statuses: state.statuses,
    priorities: state.priorities
});

const mapDispatchToProps = (dispatch) => ({
    createTask: (newTask) => dispatch({
        type: 'CREATE_TASK', payload: {
            newTask: newTask
        }
    })
});

export default connect(mapStateToProps, mapDispatchToProps) (CreateTaskModal);