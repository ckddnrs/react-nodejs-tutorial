import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


class Customer extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell>{this.props.Number}</TableCell>
                <TableCell>{this.props.Birthday}</TableCell>
                <TableCell>{this.props.Month}</TableCell>
                <TableCell>{this.props.Sex}</TableCell>
            </TableRow>
        )
    }
}

export default Customer;