import React, {useState} from "react";
import {connect} from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


function UpdateTaskModal(props) {

    const { modal, setModal, task } = props;
    const toggle = () => setModal(!modal);

    const [newName, setNewName] = useState(task.name);
    const [newDescription, setNewDescription] = useState(task.description);
    const [newPriority, setNewPriority] = useState(task.priority);
    const [newStatus, setNewStatus] = useState(task.status);

    function saveButtonHandler() {
        const updatedTask = {id: task.id, name: newName, description: newDescription, status: newStatus, priority: newPriority};
        props.updateTask(updatedTask);
        toggle();
    }

    return (
        <div>

            <Modal isOpen={modal}>
                <ModalHeader> Update task </ModalHeader>
                <ModalBody>
                    <label htmlFor="exampleFormControlSelect2"> Name </label>
                    <input value={newName}
                           onChange={(event) => setNewName(event.target.value)}
                           className="form-control"
                           type="text"/>

                    <label htmlFor="exampleFormControlSelect2"> Description </label>
                    <input value={newDescription}
                           onChange={(event) => setNewDescription(event.target.value)}
                           className="form-control"
                           type="text"/>

                    <label htmlFor="exampleFormControlSelect2"> Status </label>
                    <select value={newStatus}
                            onChange={(event) => setNewStatus(event.target.value)}
                            className="form-control">
                            {props.statuses.map((el, index) => <option key={index} value={el}> {el} </option>)}
                    </select>

                    <label htmlFor="exampleFormControlSelect2"> Priority </label>
                    <select value={newPriority}
                            onChange={(event) => setNewPriority(event.target.value)}
                            className="form-control">
                        {props.priorities.map((el, index) => <option key={index} value={el}>{el}</option>)}
                    </select>
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={saveButtonHandler}> Save </Button>{' '}
                    <Button color="secondary" onClick={toggle}> Cancel </Button>
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
    updateTask: (updatedTask) => dispatch({
        type: 'UPDATE_TASK', payload: {
            updatedTask: updatedTask
        }
    })
});

export default connect(mapStateToProps, mapDispatchToProps) (UpdateTaskModal);