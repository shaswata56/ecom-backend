import {BrowserRouter, Link, NavLink, Route} from "react-router-dom";
import CustomerList from "./CustomerList";
import LoanList from "./LoanList";
import BorrowerList from "./BorrowerList";
import Account from "./Account";
import DepositorList from "./DepositorList";
import Branch from "./Branch";
import './spa.css';
import BranchList from "./BranchList";
import AccountList from "./AccountList";
import Customer from "./Customer";
import Loan from "./Loan";
import Borrower from "./Borrower";
import Depositor from "./Depositor";
import Query from "./Query";
import React from "react";
import {QueryBuilder} from "smart-webcomponents-react/querybuilder";
import 'smart-webcomponents-react/source/styles/smart.default.css';

function Dashboard(props) {

    return (
        <BrowserRouter>
            <div>
                <h1>AYHAY Bank</h1>
                <ul className={"header"}>
                    <li><NavLink exact to={"/"}>Query</NavLink></li>
                    <li><NavLink to={"/branches"}>Branches</NavLink></li>
                    <li><NavLink to={"/customers"}>Customers</NavLink></li>
                    <li><NavLink to={"/loans"}>Loans</NavLink></li>
                    <li><NavLink to={"/borrowers"}>Borrowers</NavLink></li>
                    <li><NavLink to={"/accounts"}>Accounts</NavLink></li>
                    <li><NavLink to={"/depositors"}>Depositors</NavLink></li>
                </ul>
                <div className={"content"}>
                    <Route exact path={"/"}>
                        <div>
                            <Link to={"/createAccount"} className={"btn btn-success"}>
                                Create Account
                            </Link>
                            {"\u00a0\u00a0\u00a0\u00a0"}
                            <Link to={"/createLoan"} className={"btn btn-dark"}>
                                Create Loan
                            </Link>
                            <br/><br/>
                            <QueryBuilder allowDrag
                                          fields={[{
                                              label: 'Branch',
                                              dataField: 'branch',
                                              dataType: 'string'
                                          },
                                              {
                                                  label: 'Customer Name',
                                                  dataField: 'customer',
                                                  dataType: 'string'
                                              },
                                              {
                                                  label: 'Loan No',
                                                  dataField: 'loan',
                                                  dataType: 'string'
                                              },
                                              {
                                                  label: 'Account No',
                                                  dataField: 'account',
                                                  dataType: 'string'
                                              },
                                              {
                                                  label: 'Depositor No',
                                                  dataField: 'depositor',
                                                  dataType: 'string'
                                              },
                                              {
                                                  label: 'Amount',
                                                  dataField: 'amount',
                                                  dataType: 'number'
                                              }
                                          ]}
                                          id={"queryBuilder"}/>
                        </div>
                    </Route>
                    <Route path={"/createAccount"}>
                        <Query {...props}/>
                    </Route>
                    <Route path={"/createLoan"}>
                        <Query {...props} loan={true}/>
                    </Route>
                    <Route path={"/branches"}>
                        <BranchList {...props}/>
                    </Route>
                    <Route path={"/branch/:id"}>
                        <Branch {...props}/>
                    </Route>
                    <Route path={"/addBranch"}>
                        <Branch {...props} add={true}/>
                    </Route>
                    <Route path={"/customers"}>
                        <CustomerList {...props}/>
                    </Route>
                    <Route path={"/customer/:id"}>
                        <Customer {...props}/>
                    </Route>
                    <Route path={"/addCustomer"}>
                        <Customer {...props} add={true}/>
                    </Route>
                    <Route path={"/loans"}>
                        <LoanList {...props}/>
                    </Route>
                    <Route path={"/loan/:id"}>
                        <Loan {...props}/>
                    </Route>
                    <Route path={"/addLoan"}>
                        <Loan {...props} add={true}/>
                    </Route>
                    <Route path={"/borrowers"}>
                        <BorrowerList {...props}/>
                    </Route>
                    <Route path={"/borrower/:id"}>
                        <Borrower {...props}/>
                    </Route>
                    <Route path={"/addBorrower"}>
                        <Borrower {...props} add={true}/>
                    </Route>
                    <Route path={"/accounts"}>
                        <AccountList {...props}/>
                    </Route>
                    <Route path={"/account/:id"}>
                        <Account {...props}/>
                    </Route>
                    <Route path={"/addAccount"}>
                        <Account {...props} add={true}/>
                    </Route>
                    <Route path={"/depositors"}>
                        <DepositorList {...props}/>
                    </Route>
                    <Route path={"/depositor/:id"}>
                        <Depositor {...props}/>
                    </Route>
                    <Route path={"/addDepositor"}>
                        <Depositor {...props} add={true}/>
                    </Route>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default Dashboard;