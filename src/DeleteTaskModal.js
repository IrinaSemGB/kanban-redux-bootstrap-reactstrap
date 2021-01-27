import React from "react";
import {connect} from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


function DeleteTaskModal(props) {

    const { modalDel, setModalDel, task } = props;
    const toggleDel = () => setModalDel(!modalDel);

    function deleteButtonHandler(id) {
        props.deleteTask(id);
    }

    return (
        <div>

            <Modal isOpen={modalDel}>
                <ModalHeader>{task.name}</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this task?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => deleteButtonHandler(task.id)}> Delete </Button>{' '}
                    <Button color="secondary" onClick={toggleDel}> Cancel </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    deleteTask: (id) => dispatch({
        type: 'DELETE', payload: {
            id: id
        }
    }),

});

export default connect(null, mapDispatchToProps) (DeleteTaskModal);