import React from "react";
import {connect} from "react-redux";
import Task from "./Task";
import 'bootstrap/dist/css/bootstrap.css';

function Column(props) {

    const { status } = props;

    return (
        <div className="col-sm">
            <h3>{status}</h3>
            {props.tasks.filter(task => task.status === status).map(el =>
                    <Task key={el.id}
                          task={el}
                          modalAdd={props.modalAdd}
                          setModalAdd={props.setModalAdd}
                    />
                )
            }
        </div>
    );
}

const mapStateToProps = (state) => ({
    tasks: state.tasks
});

export default connect(mapStateToProps, null) (Column);