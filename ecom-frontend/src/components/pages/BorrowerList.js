import React, { Component } from "react";
import { Link } from "react-router-dom";
import ApiService from "../services/ApiService";

class BorrowerList extends Component {
    constructor(props) {
        super(props);
        this.api = new ApiService(props.token, props.userid, 'borrowers')
        this.retrieveBorrower = this.retrieveBorrower.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveBorrower = this.setActiveBorrower.bind(this);
        this.removeAllBorrower = this.removeAllBorrower.bind(this);

        this.state = {
            borrowers: [],
            currentBorrower: null,
            currentIndex: -1
        };
    }

    componentDidMount() {
        this.retrieveBorrower();
    }

    retrieveBorrower() {
        this.api.getAll()
            .then(resp => {
                console.log(resp);
                this.setState({
                    borrowers: resp
                });
            }).catch(e => {
            console.log(e);
        });
    }

    refreshList() {
        this.retrieveBorrower();
        this.setState({
            currentBorrower: null,
            currentIndex: -1
        });
    }

    setActiveBorrower(borrower, index) {
        this.setState({
            currentBorrower: borrower,
            currentIndex: index
        });
    }

    removeAllBorrower() {
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
        const { borrowers, currentBorrower, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>Borrower List</h4>

                    <ul className="list-group">
                        {borrowers &&
                        borrowers.map((borrower, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveBorrower(borrower, index)}
                                key={index}
                            >
                                {borrower.name}
                            </li>
                        ))}
                    </ul>

                    <Link
                        to={"/addBorrower"}
                        className={"m-3 btn btn-sm btn-success"}
                    >
                        Add
                    </Link>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllBorrower}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentBorrower ? (
                        <div>
                            <h4>Borrowers</h4>
                            <div>
                                <label>
                                    <strong>Name:</strong>
                                </label>{" "}
                                {currentBorrower.name}
                            </div>
                            <div>
                                <label>
                                    <strong>Loan No:</strong>
                                </label>{" "}
                                {currentBorrower.loanNumber}
                            </div>

                            <Link
                                to={"/borrower/" + currentBorrower.id}
                                className="m-3 btn btn-sm btn-dark"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Borrower...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default BorrowerList;