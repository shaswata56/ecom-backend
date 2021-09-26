import React, { Component } from "react";
import "./compact.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ApiService from "../services/ApiService";
import {withRouter} from "react-router-dom";

class Branch extends Component {
    constructor(props) {
        super(props);
        this.add = props.add;
        this.api = new ApiService(props.token, props.userid, 'branch')
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeAssets = this.onChangeAssets.bind(this);
        this.updateBranch = this.updateBranch.bind(this);
        this.addBranch = this.addBranch.bind(this);
        this.deleteBranch = this.deleteBranch.bind(this);

        this.state = {
            currentBranch: {
                id: null,
                name: "",
                city: "",
                assets: 0
            },
            message: "",
        };
    }

    componentDidMount() {
        if(!this.add) {
            console.log('!this.add');
            this.api.getOne(this.props.match.params.id)
                .then(resp => {
                    this.setState({
                        currentBranch: resp
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
                currentBranch: {
                    ...prevState.currentBranch,
                    name: name
                }
            };
        });
    }

    onChangeAssets(e) {
        const assets = e.target.value;

        this.setState(prevState => ({
            currentBranch: {
                ...prevState.currentBranch,
                assets: assets
            }
        }));
    }

    onChangeCity(e) {
        const city = e.target.value;

        this.setState(prevState => ({
            currentBranch: {
                ...prevState.currentBranch,
                city: city
            }
        }));
    }

    updateBranch() {
        let data = {
            name: this.state.currentBranch.name,
            city: this.state.currentBranch.city,
            assets: this.state.currentBranch.assets,
        };

        this.api.updateOne(data, this.state.currentBranch.id)
            .then(response => {
                console.log(response);
                this.setState(response);
            })
            .catch(e => {
                console.log(e);
            });
    }

    addBranch() {
        console.log(this.state);
        let data = {
            name: this.state.currentBranch.name,
            city: this.state.currentBranch.city,
            assets: this.state.currentBranch.assets,
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

    deleteBranch() {
        this.api.deleteOne(this.state.currentBranch.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/branches');
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentBranch } = this.state;

        return (
            <div>
                {currentBranch ? (
                    <div className="edit-form">
                        <h4>Branch</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="name"
                                    className="form-control"
                                    id="name"
                                    value={currentBranch.name}
                                    onChange={this.onChangeName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    value={currentBranch.city}
                                    onChange={this.onChangeCity}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="assets">Assets</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="assets"
                                    value={currentBranch.assets}
                                    onChange={this.onChangeAssets}
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
                                onClick={this.addBranch}
                            >
                                Save
                            </button>
                        ) : (
                            <div>
                                <button
                                    className="btn btn-danger"
                                    onClick={this.deleteBranch}
                                >
                                    Delete
                                </button>
                                {"\u00a0\u00a0"}
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={this.updateBranch}
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
                        <p>Please click on a Branch...</p>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(Branch);