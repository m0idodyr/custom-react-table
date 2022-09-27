import * as React from "react";
import { Helmet } from "react-helmet-async";
import "./../TransactionsPage/TransactionsPage.css";
import data from "./backendData.json";

interface IProps {}

interface IState {
  sorter: string;
  sortedColumn1: boolean;
  sortedColumn2: boolean;
  sortedColumn3: boolean;
  sortedColumn4: boolean;
}

class TransactionsPage extends React.Component {
  render() {
    return (
      <div className="transactions-page-container">
        <Helmet>
          <title>{"Transactions | Capitally"}</title>
          <meta name="description" content="Capitally" />
        </Helmet>
        <TransactionsTable />
      </div>
    );
  }
}

export { TransactionsPage };

class TransactionsTable extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.sorterClick = this.sorterClick.bind(this);
    this.state = {
      sorter: "column-1",
      sortedColumn1: true,
      sortedColumn2: true,
      sortedColumn3: true,
      sortedColumn4: true,
    };
  }

  sorterClick = (a: string) => {
    switch (a) {
      case "column-1":
        this.setState((prevState) => ({
          sortedColumn1: !prevState.sortedColumn1,
          sortedColumn2: true,
          sortedColumn3: true,
          sortedColumn4: true,
        }));
        break;
      case "column-2":
        this.setState((prevState) => ({
          sortedColumn1: true,
          sortedColumn2: !prevState.sortedColumn2,
          sortedColumn3: true,
          sortedColumn4: true,
        }));
        break;
      case "column-3":
        this.setState((prevState) => ({
          sortedColumn1: true,
          sortedColumn2: true,
          sortedColumn3: !prevState.sortedColumn3,
          sortedColumn4: true,
        }));
        break;
      case "column-4":
        this.setState((prevState) => ({
          sortedColumn1: true,
          sortedColumn2: true,
          sortedColumn3: true,
          sortedColumn4: !prevState.sortedColumn4,
        }));
        break;
      default:
        /*document.getElementById('theadThTilCaret').style.visibility = 'hidden';
        document.getElementById('theadThAsCaret').style.visibility = 'hidden';
        document.getElementById('theadThPvaCaret').style.visibility = 'hidden';
        document.getElementById('theadThTunCaret').style.visibility = 'hidden';*/
        break;
    }

    this.setState({
      sorter: a,
    });
  };

  render() {
    return (
      <div className="transactions-table-wrapper">
        <ul className="transactions-table-header-wrapper">
          <li className="transactions-table-header-cell-1">
            <button
              type="button"
              className="transactions-table-header-cell-1-button"
              onClick={() => this.sorterClick("column-1")}
            >
              ID
              <span id="table-column-1-caret">
                {this.state.sortedColumn1 ? (
                  <div>&#9660;</div>
                ) : (
                  <div>&#9650;</div>
                )}
              </span>
            </button>
          </li>
          <li className="transactions-table-header-cell-2">
            <button
              type="button"
              className="transactions-table-header-cell-2-button"
              onClick={() => this.sorterClick("column-2")}
            >
              From
              <span id="table-column-2-caret">
                {this.state.sortedColumn2 ? (
                  <div>&#9660;</div>
                ) : (
                  <div>&#9650;</div>
                )}
              </span>
            </button>
          </li>
          <li className="transactions-table-header-cell-3">
            <button
              type="button"
              className="transactions-table-header-cell-3-button"
              onClick={() => this.sorterClick("column-3")}
            >
              To
              <span id="table-column-3-caret">
                {this.state.sortedColumn3 ? (
                  <div>&#9660;</div>
                ) : (
                  <div>&#9650;</div>
                )}
              </span>
            </button>
          </li>
          <li className="transactions-table-header-cell-4">
            <button
              type="button"
              className="transactions-table-header-cell-4-button"
              onClick={() => this.sorterClick("column-4")}
            >
              Fee
              <span id="table-column-4-caret">
                {this.state.sortedColumn4 ? (
                  <div>&#9660;</div>
                ) : (
                  <div>&#9650;</div>
                )}
              </span>
            </button>
          </li>
          <li className="transactions-table-header-cell-5">HMO</li>
        </ul>
        <TransactionsList
          sortBy={this.state.sorter}
          sortedColumn1={this.state.sortedColumn1}
          sortedColumn2={this.state.sortedColumn2}
          sortedColumn3={this.state.sortedColumn3}
          sortedColumn4={this.state.sortedColumn4}
        />
        <div className="transactions-table-footer"></div>
      </div>
    );
  }
}

class TransactionsList extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let items = [...data]
      .sort((a, b) => {
        if (this.props.sortBy === "column-1") {
          if (this.props.sortedColumn1 === false) {
            return a.id - b.id;
          } else {
            return b.id - a.id;
          }
        } else if (this.props.sortBy === "column-2") {
          if (this.props.sortedColumn2 === false) {
            return a.from.platform.localeCompare(b.from.platform);
          } else {
            return b.from.platform.localeCompare(a.from.platform);
          }
        } else if (this.props.sortBy === "column-3") {
          if (this.props.sortedColumn3 === false) {
            return a.to.platform.localeCompare(b.to.platform);
          } else {
            return b.to.platform.localeCompare(a.to.platform);
          }
        } else if (this.props.sortBy === "column-4") {
          if (this.props.sortedColumn4 === false) {
            return a.details.fee - b.details.fee;
          } else {
            return b.details.fee - a.details.fee;
          }
        } else {
          return 0;
        }
      })
      .map((order) => (
        <ul className="transactions-list-table-row noselect" key={order.id}>
          <li>
            <div className="transactions-list-column-1">{order.id}</div>
          </li>
          <li>
            <div className="transactions-list-column-2">
              {order.from.platform}
            </div>
          </li>
          <li>
            <div className="transactions-list-column-3">
              {order.to.platform}
            </div>
          </li>
          <li>
            <div className="transactions-list-column-4">
              {order.details.fee}
            </div>
          </li>
          <li>
            <div className="transactions-list-column-5">
              <input type="checkbox"></input>
            </div>
          </li>
        </ul>
      ));
    return <div className="transactions-list-body">{items}</div>;
  }
}
