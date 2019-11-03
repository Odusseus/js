import React, { Component } from "react";
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import axios from 'axios';

const Table = styled.table`
border: 1px solid black;
`;

const Tr = styled.tr`
border: 1px solid black;
`;

const Td = styled.td`
border: 1px solid black;
`;

class App extends Component {
    constructor(props) {
        super(props);
        const student = this.props.Student;

        this.state = {
            count: 0,
            users: [],
            name: '',
            department: '',
            email: ''
        };

        this.deleteUser = this.deleteUser.bind(this);

    }

    componentDidMount() {
        axios.get('http://www.mocky.io/v2/5c451ec8320000ca10af1625')
            .then(res => {
                const users = res.data;
                this.setState({ users });
            })
    };

    handleChangeName = (e) => {
        this.setState({ name: e.target.value });
    };

    handleChangeDepartment = (e) => {
        this.setState({ department: e.target.value });
    };

    handleChangeEmail = (e) => {
        this.setState({ email: e.target.value });
    };

    addInput = () => {

        let maxId = 0;
        for (const user of this.state.users) {
            if (maxId <= user.id) {
                maxId = user.id + 1;
            }
        }

        let newUsers = this.state.users;
        let user = {
            "id": maxId,
            "name": this.state.name,
            "department": this.state.department,
            "email": this.state.email
        }

        newUsers.push(user);
        this.setState({ users: newUsers });
    };


    deleteUser = (id) => {
        let newUsers = [];
        for (const user of this.state.users) {
            if (user.id != id) {
                let newUser = user;
                newUsers.push(newUser);
            }
        }
        this.setState({ users: newUsers });
    }

    render() {
        return (
            <>

                <div>
                    <form>
                        <input onChange={this.handleChangeName} value={this.state.name} ></input>
                        <input onChange={this.handleChangeDepartment} value={this.state.department} ></input>
                        <input onChange={this.handleChangeEmail} value={this.state.email} ></input>
                    </form>
                    <button onClick={this.addInput}>Add</button>
                </div>

                <Table>
                    <tbody>
                        {
                            this.state.users.map(item =>
                                <TableRow key={item.id} id={item.id} data={item} deleteUser={this.deleteUser} />)}
                    </tbody>
                </Table>
            </>
        );
    }
}

const TableRow = ({ data, deleteUser, id }) => {
    return (
        <Tr>
            <Td>{data.id}</Td>
            <Td>{data.name}</Td>
            <Td>{data.department}</Td>
            <Td>{data.email}</Td>
            <Td><Delete id={data.id} deleteUser={deleteUser}>Delete</Delete></Td>
        </Tr>);
};

const Delete = ({ id, deleteUser }) => {
    return (
        <button onClick={() => deleteUser(id)}> Delete</button>
    );
};

export default App;