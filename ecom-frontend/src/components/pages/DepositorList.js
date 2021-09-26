import React, { Component } from "react";
import { Link } from "react-router-dom";
import ApiService from "../services/ApiService";

class DepositorList extends Component {
    constructor(props) {
        super(props);
        this.api = new ApiService(props.token, props.userid, 'depositors');
        this.retrieveDepositor = this.retrieveDepositor.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveDepositor = this.setActiveDepositor.bind(this);
        this.removeAllDepositor = this.removeAllDepositor.bind(this);

        this.state = {
            depositors: [],
            currentDepositor: null,
            currentIndex: -1
        };
    }

    componentDidMount() {
        this.retrieveDepositor();
    }

    retrieveDepositor() {
        this.api.getAll()
            .then(resp => {
                console.log(resp);
                this.setState({
                    depositors: resp
                });
            }).catch(e => {
            console.log(e);
        });
    }

    refreshList() {
        this.retrieveDepositor();
        this.setState({
            currentDepositor: null,
            currentIndex: -1
        });
    }

    setActiveDepositor(depositor, index) {
        this.setState({
            currentDepositor: depositor,
            currentIndex: index
        });
    }

    removeAllDepositor() {
        this.api.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { depositors, currentDepositor, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>Depositor List</h4>

                    <ul className="list-group">
                        {depositors &&
                        depositors.map((depositor, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveDepositor(depositor, index)}
                                key={index}
                            >
                                {depositor.name}
                            </li>
                        ))}
                    </ul>

                    <Link
                        to={"/addDepositor"}
                        className={"m-3 btn btn-sm btn-success"}
                    >
                        Add
                    </Link>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllDepositor}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentDepositor ? (
                        <div>
                            <h4>Depositors</h4>
                            <div>
                                <label>
                                    <strong>Name:</strong>
                                </label>{" "}
                                {currentDepositor.name}
                            </div>
                            <div>
                                <label>
                                    <strong>Account No:</strong>
                                </label>{" "}
                                {currentDepositor.accountNumber}
                            </div>

                            <Link
                                to={"/depositor/" + currentDepositor.id}
                                className="m-3 btn btn-sm btn-dark"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Depositor...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default DepositorList;