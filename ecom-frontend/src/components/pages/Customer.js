import React, { Component } from "react";
import "./compact.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ApiService from "../services/ApiService";
import {withRouter} from "react-router-dom";

class Customer extends Component {
    constructor(props) {
        super(props);
        this.add = props.add;
        this.api = new ApiService(props.token, props.userid, 'customer')
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeStreet = this.onChangeStreet.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);
        this.addCustomer = this.addCustomer.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);

        this.state = {
            currentCustomer: {
                id: null,
                name: "",
                street: "",
                city: ""
            },
            message: "",
        };
    }

    componentDidMount() {
        if(!this.add) {
            this.api.getOne(this.props.match.params.id)
                .then(resp => {
                    this.setState({
                        currentCustomer: resp
                    });
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    onChangeName(e) {
        const name = e.target.value;

        this.setState(function(prevState) {
            return {
                currentCustomer: {
                    ...prevState.currentCustomer,
                    name: name
                }
            };
        });
    }

    onChangeStreet(e) {
        const street = e.target.value;

        this.setState(prevState => ({
            currentCustomer: {
                ...prevState.currentCustomer,
                street: street
            }
        }));
    }

    onChangeCity(e) {
        const city = e.target.value;

        this.setState(prevState => ({
            currentCustomer: {
                ...prevState.currentCustomer,
                city: city
            }
        }));
    }

    updateCustomer() {
        let data = {
            name: this.state.currentCustomer.name,
            city: this.state.currentCustomer.city,
            street: this.state.currentCustomer.street,
        };

        this.api.updateOne(data, this.state.currentCustomer.id)
            .then(response => {
                console.log(response);
                this.setState(response);
            })
            .catch(e => {
                console.log(e);
            });
    }

    addCustomer() {
        let data = {
            name: this.state.currentCustomer.name,
            city: this.state.currentCustomer.city,
            street: this.state.currentCustomer.street,
        };

        this.api.addOne(data)
            .then(response => {
                console.log(response);
                this.setState(response);
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteCustomer() {
        this.api.deleteOne(this.state.currentCustomer.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/customers')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentCustomer } = this.state;

        return (
            <div>
                {currentCustomer ? (
                    <div className="edit-form">
                        <h4>Customer</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="name"
                                    className="form-control"
                                    id="name"
                                    value={currentCustomer.name}
                                    onChange={this.onChangeName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="street">Street</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="street"
                                    value={currentCustomer.street}
                                    onChange={this.onChangeStreet}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    value={currentCustomer.city}
                                    onChange={this.onChangeCity}
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
                                onClick={this.addCustomer}
                            >
                                Save
                            </button>
                        ) : (
                            <div>
                                <button
                                    className="btn btn-danger"
                                    onClick={this.deleteCustomer}
                                >
                                    Delete
                                </button>
                                {"\u00a0\u00a0"}
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={this.updateCustomer}
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
                        <p>Please click on a Customer...</p>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(Customer);