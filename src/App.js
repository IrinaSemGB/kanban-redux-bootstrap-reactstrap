import React, {useState} from 'react';
import {connect} from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';
import Column from "./Colomn";

function App(props) {

    const [modalAdd, setModalAdd] = useState(false);
    const toggleAdd = () => setModalAdd(!modalAdd);

  return (
    <div>

        <div className="container">
            <h1>Kanban Board</h1>
            <button onClick={toggleAdd} type="button" className="btn btn-success btn-sm"> Create New Task </button>
            <hr/>

            <div className="row">
                {props.statuses.map((el, index) =>
                    <Column key={index}
                            status={el}
                            modalAdd={modalAdd}
                            setModalAdd={setModalAdd}
                    />)
                }
            </div>
        </div>

    </div>
  );
}

const mapStateToProps = (state) => ({
    tasks: state.tasks,
    statuses: state.statuses
});

export default connect(mapStateToProps, null) (App);
