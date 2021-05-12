import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row } from "./Row";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Box,
} from "@material-ui/core";
import { useStyle } from "../Common/CssStyles";

export function View(props) {
  const classes = useStyle();

  const [orders, setOrders] = useState([]);
  const [customerDetails, setCustomerDetails] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);

  useEffect(() => {
    axios.get("/orders").then((ord) => {
      setOrders(ord.data);
    });
  }, []);
  useEffect(() => {
    if (orders.length) {
      let getCustomerPerOrder = Promise.all(
        orders.map((order) =>
          axios.get(`/customers/${order.customer_id}`).then((cust) => cust.data)
        )
      );
      getCustomerPerOrder.then((customerList) =>
        setCustomerDetails(customerList)
      );

      let getEmployeePerOrder = Promise.all(
        orders.map((order) =>
          axios.get(`/employees/${order.employee_id}`).then((empl) => empl.data)
        )
      );
      getEmployeePerOrder.then((employeeList) =>
        setEmployeeDetails(employeeList)
      );
    }
  }, [orders]);

  function findCustomerForOrder(customerId) {
    let customerItem = customerDetails.find((item) => item.id === customerId);
    return (
      (customerItem &&
        customerItem.last_name + " " + customerItem.first_name) || (
        <div className={classes.splash}></div>
      )
    );
  }

  function findEmployeeForOrder(employeeId) {
    let employeeItem = employeeDetails.find((item) => item.id === employeeId);
    return (
      (employeeItem &&
        employeeItem.last_name + " " + employeeItem.first_name) || (
        <div className={classes.splash}></div>
      )
    );
  }

  function onClick(index) {
    setSelectedRowIndex(index);
  }

  function DisplayOrders(searchText) {
    let orderList = orders;
    if (searchText) {
      orderList = orderList.filter(function (order) {
        return (
          order.ship_name.toLowerCase().includes(searchText.toLowerCase()) ||
          order.ship_address.toLowerCase().includes(searchText.toLowerCase()) ||
          order.ship_city.toLowerCase().includes(searchText.toLowerCase())
        );
      });
    }
    return orderList.map((order) => (
      <Row
        key={order.id}
        order={order}
        findCustomerForOrder={findCustomerForOrder}
        findEmployeeForOrder={findEmployeeForOrder}
        selectedRowIndex={selectedRowIndex}
        onClick={() => onClick(order.id)}
      />
    ));
  }

  return (
    <Table aria-label="orders">
      <TableHead>
        <TableRow>
          <TableCell component="th" scope="col">
            <Box fontWeight="bold">#</Box>
          </TableCell>
          <TableCell component="th" scope="col">
            <Box fontWeight="bold">Ship Name</Box>
          </TableCell>
          <TableCell component="th" scope="col">
            <Box fontWeight="bold">Ship Address</Box>
          </TableCell>
          <TableCell component="th" scope="col">
            <Box fontWeight="bold">Ship City</Box>
          </TableCell>
          <TableCell component="th" scope="col">
            <Box fontWeight="bold">Employee</Box>
          </TableCell>
          <TableCell component="th" scope="col">
            <Box fontWeight="bold">Customer</Box>
          </TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{DisplayOrders(props.searchText)}</TableBody>
    </Table>
  );
}