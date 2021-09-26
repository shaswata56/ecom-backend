import React, { Component } from "react";
import "./compact.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ApiService from "../services/ApiService";
import {withRouter} from "react-router-dom";

class Depositor extends Component {
    constructor(props) {
        super(props);
        this.add = props.add;
        this.api = new ApiService(props.token, props.userid, 'depositor')
        this.onChangeName = this.onChangeName.bind(this);
        this.updateDepositor = this.updateDepositor.bind(this);
        this.addDepositor = this.addDepositor.bind(this);
        this.deleteDepositor = this.deleteDepositor.bind(this);

        this.state = {
            currentDepositor: {
                id: null,
                name: "",
                accountNumber: "",
            },
            message: "",
        };
    }

    componentDidMount() {
        if(!this.add) {
            this.api.getOne(this.props.match.params.id)
                .then(resp => {
                    this.setState({
                        currentDepositor: resp
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
                currentDepositor: {
                    ...prevState.currentDepositor,
                    name: name
                }
            };
        });
    }

    updateDepositor() {
        let data = {
            name: this.state.currentDepositor.name,
            loanNo: this.state.currentDepositor.loanNo,
        };

        this.api.updateOne(data, this.state.currentDepositor.id)
            .then(response => {
                console.log(response);
                this.setState(response);
            })
            .catch(e => {
                console.log(e);
            });
    }

    addDepositor() {
        let data = {
            name: this.state.currentDepositor.name,
            loanNo: this.state.currentDepositor.loanNo,
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

    deleteDepositor() {
        this.api.deleteOne(this.state.currentDepositor.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/borrowers')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentDepositor } = this.state;

        return (
            <div>
                {currentDepositor ? (
                    <div className="edit-form">
                        <h4>Depositor</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="name"
                                    className="form-control"
                                    id="name"
                                    value={currentDepositor.name}
                                    onChange={this.onChangeName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">Account No</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    value={currentDepositor.accountNumber}
                                    disabled={true}
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
                                onClick={this.addDepositor}
                            >
                                Save
                            </button>
                        ) : (
                            <div>
                                <button
                                    className="btn btn-danger"
                                    onClick={this.deleteDepositor}
                                >
                                    Delete
                                </button>
                                {"\u00a0\u00a0"}
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={this.updateDepositor}
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
                        <p>Please click on a Depositor...</p>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(Depositor);