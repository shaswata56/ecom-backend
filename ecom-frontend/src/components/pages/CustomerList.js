import React, { Component } from "react";
import { Link } from "react-router-dom";
import ApiService from "../services/ApiService";

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.api = new ApiService(props.token, props.userid, 'customers')
        this.retrieveCustomer = this.retrieveCustomer.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveCustomer = this.setActiveCustomer.bind(this);
        this.removeAllCustomer = this.removeAllCustomer.bind(this);

        this.state = {
            customers: [],
            currentCustomer: null,
            currentIndex: -1
        };
    }

    componentDidMount() {
        this.retrieveCustomer();
    }

    retrieveCustomer() {
        this.api.getAll()
            .then(resp => {
                console.log(resp);
                this.setState({
                    customers: resp
                });
            }).catch(e => {
            console.log(e);
        });
    }

    refreshList() {
        this.retrieveCustomer();
        this.setState({
            currentCustomer: null,
            currentIndex: -1
        });
    }

    setActiveCustomer(customer, index) {
        this.setState({
            currentCustomer: customer,
            currentIndex: index
        });
    }

    removeAllCustomer() {
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
        const { customers, currentCustomer, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>Customer List</h4>

                    <ul className="list-group">
                        {customers &&
                        customers.map((customer, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveCustomer(customer, index)}
                                key={index}
                            >
                                {customer.name}
                            </li>
                        ))}
                    </ul>

                    <Link
                        to={"/addCustomer"}
                        className={"m-3 btn btn-sm btn-success"}
                    >
                        Add
                    </Link>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllCustomer}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentCustomer ? (
                        <div>
                            <h4>Customers</h4>
                            <div>
                                <label>
                                    <strong>Name:</strong>
                                </label>{" "}
                                {currentCustomer.name}
                            </div>
                            <div>
                                <label>
                                    <strong>Street:</strong>
                                </label>{" "}
                                {currentCustomer.street}
                            </div>
                            <div>
                                <label>
                                    <strong>City:</strong>
                                </label>{" "}
                                {currentCustomer.city}
                            </div>

                            <Link
                                to={"/customer/" + currentCustomer.id}
                                className="m-3 btn btn-sm btn-dark"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Customer...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default CustomerList;