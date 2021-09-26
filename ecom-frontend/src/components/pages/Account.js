import React, { Component } from "react";
import "./compact.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ApiService from "../services/ApiService";
import {withRouter} from "react-router-dom";

class Account extends Component {
    constructor(props) {
        super(props);
        this.api = new ApiService(props.token, props.userid, 'account');
        this.onChangeBranchName = this.onChangeBranchName.bind(this);
        this.onChangeBalance = this.onChangeBalance.bind(this);
        this.updateAccount = this.updateAccount.bind(this);
        this.addAccount = this.addAccount.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.add = props.add;

        this.state = {
            currentAccount: {
                id: null,
                branchName: "",
                balance: ""
            },
            message: ""
        };
    }

    componentDidMount() {
        if(!this.add) {
            this.api.getOne(this.props.match.params.id)
                .then(resp => {
                    this.setState({
                        currentAccount: resp
                    });
                    console.log(resp);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    onChangeBalance(e) {
        const balance = e.target.value;

        this.setState(prevState => ({
            currentAccount: {
                ...prevState.currentAccount,
                balance: balance
            }
        }));
    }

    onChangeBranchName(e) {
        const branchName = e.target.value;

        this.setState(prevState => ({
            currentAccount: {
                ...prevState.currentAccount,
                branchName: branchName
            }
        }));
    }

    updateAccount() {
        let data = {
            id: this.state.currentAccount.id,
            branchName: this.state.currentAccount.branchName,
            balance: this.state.currentAccount.balance,
        };

        this.api.updateOne(data, this.state.currentAccount.id)
            .then(response => {
                this.setState(response);
            })
            .catch(e => {
                console.log(e);
            });
    }

    addAccount() {
        let data = {
            branchName: this.state.currentAccount.branchName,
            balance: this.state.currentAccount.balance,
        };

        this.api.addOne(data)
            .then(response => {
                this.setState(response);
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteAccount() {
        this.api.deleteOne(this.state.currentAccount.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/loans')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentAccount } = this.state;

        return (
            <div>
                {currentAccount ? (
                    <div className="edit-form">
                        <h4>Account</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="number">Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="number"
                                    value={currentAccount.id}
                                    disabled={true}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="branchName">Branch Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="branchName"
                                    value={currentAccount.branchName}
                                    onChange={this.onChangeBranchName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="balance">Balance</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="balance"
                                    value={currentAccount.balance}
                                    onChange={this.onChangeBalance}
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
                                onClick={this.addAccount}
                            >
                                Save
                            </button>
                        ) : (
                            <div>
                                <button
                                    className="btn btn-danger"
                                    onClick={this.deleteAccount}
                                >
                                    Delete
                                </button>
                                {"\u00a0\u00a0"}
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={this.updateAccount}
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
                        <p>Please click on a Account...</p>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(Account);