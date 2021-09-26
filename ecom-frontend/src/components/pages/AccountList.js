import React, { Component } from "react";
import { Link } from "react-router-dom";
import ApiService from "../services/ApiService";

class AccountList extends Component {
    constructor(props) {
        super(props);
        this.api = new ApiService(props.token, props.userid, 'accounts');
        this.retrieveAccount = this.retrieveAccount.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveAccount = this.setActiveAccount.bind(this);
        this.removeAllAccount = this.removeAllAccount.bind(this);

        this.state = {
            accounts: [],
            currentAccount: null,
            currentIndex: -1
        };
    }

    componentDidMount() {
        this.retrieveAccount();
    }

    retrieveAccount() {
        this.api.getAll()
            .then(resp => {
                this.setState({
                    accounts: resp
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveAccount();
        this.setState({
            currentAccount: null,
            currentIndex: -1
        });
    }

    setActiveAccount(account, index) {
        this.setState({
            currentAccount: account,
            currentIndex: index
        });
    }

    removeAllAccount() {
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
        const { accounts, currentAccount, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>Account List</h4>

                    <ul className="list-group">
                        {accounts &&
                        accounts.map((account, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveAccount(account, index)}
                                key={index}
                            >
                                {account.id}
                            </li>
                        ))}
                    </ul>

                    <Link
                        to={"/addAccount"}
                        className={"m-3 btn btn-sm btn-success"}
                    >
                        Add
                    </Link>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllAccount}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentAccount ? (
                        <div>
                            <h4>Accounts</h4>
                            <div>
                                <label>
                                    <strong>Number:</strong>
                                </label>{" "}
                                {currentAccount.id}
                            </div>
                            <div>
                                <label>
                                    <strong>Branch Name:</strong>
                                </label>{" "}
                                {currentAccount.branchName}
                            </div>
                            <div>
                                <label>
                                    <strong>Balance:</strong>
                                </label>{" "}
                                {currentAccount.balance}
                            </div>

                            <Link
                                to={"/account/" + currentAccount.id}
                                className="m-3 btn btn-sm btn-dark"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Account...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default AccountList;