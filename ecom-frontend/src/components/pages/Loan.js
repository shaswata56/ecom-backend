import React, { Component } from "react";
import "./compact.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ApiService from "../services/ApiService";
import {withRouter} from "react-router-dom";

class Loan extends Component {
    constructor(props) {
        super(props);
        this.api = new ApiService(props.token, props.userid, 'loan');
        this.onChangeBranchName = this.onChangeBranchName.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.updateLoan = this.updateLoan.bind(this);
        this.addLoan = this.addLoan.bind(this);
        this.deleteLoan = this.deleteLoan.bind(this);
        this.add = props.add;

        this.state = {
            currentLoan: {
                id: null,
                branchName: "",
                amount: ""
            },
            message: ""
        };
    }

    componentDidMount() {
        if(!this.add) {
            this.api.getOne(this.props.match.params.id)
                .then(resp => {
                    this.setState({
                        currentLoan: resp
                    });
                    console.log(resp);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    onChangeAmount(e) {
        const amount = e.target.value;

        this.setState(prevState => ({
            currentLoan: {
                ...prevState.currentLoan,
                amount: amount
            }
        }));
    }

    onChangeBranchName(e) {
        const branchName = e.target.value;

        this.setState(prevState => ({
            currentLoan: {
                ...prevState.currentLoan,
                branchName: branchName
            }
        }));
    }

    updateLoan() {
        let data = {
            id: this.state.currentLoan.id,
            branchName: this.state.currentLoan.branchName,
            amount: this.state.currentLoan.amount,
        };

        this.api.updateOne(data, this.state.currentLoan.id)
            .then(response => {
                this.setState(response);
            })
            .catch(e => {
                console.log(e);
            });
    }

    addLoan() {
        let data = {
            branchName: this.state.currentLoan.branchName,
            amount: this.state.currentLoan.amount,
        };

        this.api.addOne(data)
            .then(response => {
                this.setState(response);
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteLoan() {
        this.api.deleteOne(this.state.currentLoan.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/loans')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentLoan } = this.state;

        return (
            <div>
                {currentLoan ? (
                    <div className="edit-form">
                        <h4>Loan</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="number">Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="number"
                                    value={currentLoan.id}
                                    disabled={true}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="branchName">Branch Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="branchName"
                                    value={currentLoan.branchName}
                                    onChange={this.onChangeBranchName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="amount">Amount</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="amount"
                                    value={currentLoan.amount}
                                    onChange={this.onChangeAmount}
                                />
                            </div>
                        </form>

                        <div>
                            <br />
                        </div>

                        {this.add ? (
                            <button
                                type="submit"
                                className="btn btn-success"
                                onClick={this.addLoan}
                            >
                                Save
                            </button>
                        ) : (
                            <div>
                                <button
                                    className="btn btn-danger"
                                    onClick={this.deleteLoan}
                                >
                                    Delete
                                </button>
                                {"\u00a0\u00a0"}
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={this.updateLoan}
                                >
                                    Update
                                </button>
                            </div>
                        )}

                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Loan...</p>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(Loan);