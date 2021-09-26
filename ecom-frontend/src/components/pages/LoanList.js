import React, { Component } from "react";
import { Link } from "react-router-dom";
import ApiService from "../services/ApiService";

class LoanList extends Component {
    constructor(props) {
        super(props);
        this.api = new ApiService(props.token, props.userid, 'loans');
        this.retrieveLoan = this.retrieveLoan.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveLoan = this.setActiveLoan.bind(this);
        this.removeAllLoan = this.removeAllLoan.bind(this);

        this.state = {
            loans: [],
            currentLoan: null,
            currentIndex: -1
        };
    }

    componentDidMount() {
        this.retrieveLoan();
    }

    retrieveLoan() {
        this.api.getAll()
            .then(resp => {
                this.setState({
                    loans: resp
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveLoan();
        this.setState({
            currentLoan: null,
            currentIndex: -1
        });
    }

    setActiveLoan(loan, index) {
        this.setState({
            currentLoan: loan,
            currentIndex: index
        });
    }

    removeAllLoan() {
        this.api.deleteAll()
            .then(response => {
                console.log(response);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { loans, currentLoan, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>Loan List</h4>

                    <ul className="list-group">
                        {loans &&
                        loans.map((loan, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveLoan(loan, index)}
                                key={index}
                            >
                                {loan.id}
                            </li>
                        ))}
                    </ul>

                    <Link
                        to={"/addLoan"}
                        className={"m-3 btn btn-sm btn-success"}
                    >
                        Add
                    </Link>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllLoan}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentLoan ? (
                        <div>
                            <h4>Loans</h4>
                            <div>
                                <label>
                                    <strong>Number:</strong>
                                </label>{" "}
                                {currentLoan.id}
                            </div>
                            <div>
                                <label>
                                    <strong>Branch Name:</strong>
                                </label>{" "}
                                {currentLoan.branchName}
                            </div>
                            <div>
                                <label>
                                    <strong>Amount:</strong>
                                </label>{" "}
                                {currentLoan.amount}
                            </div>

                            <Link
                                to={"/loan/" + currentLoan.id}
                                className="m-3 btn btn-sm btn-dark"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Loan...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default LoanList;