import React, { Component } from "react";
import { Link } from "react-router-dom";
import ApiService from "../services/ApiService";

class BranchList extends Component {
    constructor(props) {
        super(props);
        this.api = new ApiService(props.token, props.userid, 'branches')
        this.retrieveBranch = this.retrieveBranch.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveBranch = this.setActiveBranch.bind(this);
        this.removeAllBranch = this.removeAllBranch.bind(this);

        this.state = {
            branches: [],
            currentBranch: null,
            currentIndex: -1
        };
    }

    componentDidMount() {
        this.retrieveBranch();
    }

    retrieveBranch() {
        this.api.getAll()
            .then(resp => {
                console.log(resp);
                this.setState({
                    branches: resp
                });
            }).catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveBranch();
        this.setState({
            currentBranch: null,
            currentIndex: -1
        });
    }

    setActiveBranch(branch, index) {
        this.setState({
            currentBranch: branch,
            currentIndex: index
        });
    }

    removeAllBranch() {
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
        const { branches, currentBranch, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>Branch List</h4>

                    <ul className="list-group">
                        {branches &&
                        branches.map((branch, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveBranch(branch, index)}
                                key={index}
                            >
                                {branch.name}
                            </li>
                        ))}
                    </ul>

                    <Link
                        to={"/addBranch"}
                        className={"m-3 btn btn-sm btn-success"}
                    >
                        Add
                    </Link>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllBranch}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentBranch ? (
                        <div>
                            <h4>Branches</h4>
                            <div>
                                <label>
                                    <strong>Name:</strong>
                                </label>{" "}
                                {currentBranch.name}
                            </div>
                            <div>
                                <label>
                                    <strong>City:</strong>
                                </label>{" "}
                                {currentBranch.city}
                            </div>
                            <div>
                                <label>
                                    <strong>Assets:</strong>
                                </label>{" "}
                                {currentBranch.assets}
                            </div>

                            <Link
                                to={"/branch/" + currentBranch.id}
                                className="m-3 btn btn-sm btn-dark"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Branch...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default BranchList;