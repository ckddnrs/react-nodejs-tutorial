import react, { Component } from 'react';
import './App.css';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Customer from './components/Customer';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {

  },

  progress: {
    margin: theme.spacing.unit * 2
  },

  table: {

  }

})


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0,
      searchKeyword: ''
    }
  }

  //서버에 접근해서 데이터 등을 받아오는 작업
  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()//어떤 api를 불러오는 작업 ,받아온데이터를 스테이트로 설정 customers라는 변수에 값을 넣어줌 
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }
  //api/customers 에 접근해서 body 것에 데이터를 넣어주는 것
  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  }

  render() {
    const filteredComponents = (data) => {
      return data.map((c) => {
        return <Customer key={c.id} Number={c.Number} Month={c.Month} Sex={c.Sex} FinalReportOwner={c.FinalReportOwner} />
      });
    }
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Month</TableCell>
              <TableCell>Sex</TableCell>
              <TableCell>FinalReportOwner</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.customers ?
              filteredComponents(this.state.customers) :
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>

    );
  }
}

export default withStyles(styles)(App);
