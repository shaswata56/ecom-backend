import React, { Component } from "react";
import "./compact.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ApiService from "../services/ApiService";
import {withRouter} from "react-router-dom";

class Query extends Component {
    constructor(props) {
        super(props);
        this.loan = props.loan;
        if (this.loan) {
            this.api = new ApiService(props.token, props.userid, 'createLoan');
            this.type = 'Loan';
            this.actype = 'Loan';
        } else {
            this.api = new ApiService(props.token, props.userid, 'createAccount');
            this.type = 'Account';
            this.actype = 'Deposit';
        }
        this.onChangeCustomerName = this.onChangeCustomerName.bind(this);
        this.onChangeCustomerStreet = this.onChangeCustomerStreet.bind(this);
        this.onChangeCustomerCity = this.onChangeCustomerCity.bind(this);
        this.onChangeBranchName = this.onChangeBranchName.bind(this);
        this.onChangeBalance = this.onChangeBalance.bind(this);
        this.addAccount = this.addAccount.bind(this);

        this.state = {
            cities: [],
            branches: [],
            currentAccount: {
                id: null,
                customerName: "",
                customerStreet: "",
                customerCity: "",
                branchName: "",
                balance: ""
            },
            message: ""
        };
    }

    componentDidMount() {
        this.setState({
            cities: [
                {name: 'Dhaka', branches: ['Mohammadpur', 'Dhanmondi', 'Shyamoli', 'Adabor', 'Farmgate', 'Uttara', 'Mirpur']},
                {name: 'Sylhet', branches: ['Amberkhana', 'SUST', 'Sunamganj', 'Habiganj']},
                {name: 'Chittagong', branches: ['Agrabad', 'EPZ', 'Fatikchhari', 'Halishahar', 'Hathhazari', 'Jubilee-Road', 'Lohagara']},
                {name: 'Rajshahi', branches: ['Rajshahi', 'Bogra', 'Dinajpur', 'Kurigram', 'Lalmonirhat', 'Rangpur']},
                {name: 'Khulna', branches: ['Khulna', 'Bagerhat', 'Chuadanga', 'Jessore', 'Jhenaidah', 'Magura', 'Kushtia']},
                {name: 'Barishal', branches: ['Barishal', 'Barguna', 'Bhola', 'Jhalokati', 'Patuakhali', 'Pirojpur']}
            ]
        })
    }

    onChangeCustomerName(e) {
        const name = e.target.value;

        this.setState(prevState => ({
            currentAccount: {
                ...prevState.currentAccount,
                customerName: name
            }
        }));
    }

    onChangeCustomerStreet(e) {
        const street = e.target.value;

        this.setState(prevState => ({
            currentAccount: {
                ...prevState.currentAccount,
                customerStreet: street
            }
        }));
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

    onChangeCustomerCity(e) {
        const cityName = e.target.value;

        this.setState(prevState => ({
            currentAccount: {
                ...prevState.currentAccount,
                customerCity: cityName
            }
        }));

        this.setState({branches : this.state.cities.find(city => city.name === cityName).branches});
    }

    addAccount() {
        let data = {
            customerName: this.state.currentAccount.customerName,
            customerStreet: this.state.currentAccount.customerStreet,
            customerCity: this.state.currentAccount.customerCity,
            branchName: this.state.currentAccount.branchName,
            balance: this.state.currentAccount.balance,
        };

        this.api.addOne(data)
            .then(response => {
                this.setState(response);
                this.props.history.push('/');
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
                        <h4>Create {this.type}</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="customerName">Customer Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="customerName"
                                    value={currentAccount.customerName}
                                    onChange={this.onChangeCustomerName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="customerStreet">Customer Street</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="customerStreet"
                                    value={currentAccount.customerStreet}
                                    onChange={this.onChangeCustomerStreet}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="customerCity">Customer City</label>
                                <select
                                    className="form-control"
                                    id="customerCity"
                                    value={currentAccount.customerCity}
                                    onClick={this.onChangeCustomerCity}
                                    onChange={this.onChangeCustomerCity}
                                >
                                    {this.state.cities.map((e, key) => {
                                        return <option key={key}>{e.name}</option>
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="branchName">Branch Name</label>
                                <select
                                    className="form-control"
                                    id="branchName"
                                    value={currentAccount.branchName}
                                    onClick={this.onChangeBranchName}
                                    onChange={this.onChangeBranchName}
                                >
                                    {this.state.branches.map((e, key) => {
                                        return <option key={key}>{e}</option>;
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="balance">{this.actype} Amount</label>
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

                        <button
                            type="submit"
                            className="btn btn-success"
                            onClick={this.addAccount}
                        >
                            Create
                        </button>

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

export default withRouter(Query);