import React, { useEffect, useState } from "react";
import { Row } from "./Row";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Box,
} from "@material-ui/core";
import { useTranslation  } from 'react-i18next';
import { getProducts } from '../../api/ProductsApi';

export function View(props) {
  const [products, setProducts] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    getProducts().then((prod) => {
      setProducts(prod.data);
    });
  }, []);

  function onClick(index) {
    setSelectedRowIndex(index);
  }

  function DisplayProducts(searchText) {
    let productList = products;
    if (searchText) {
      productList = productList.filter(function (product) {
        return (
          product.product_code
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          product.product_name
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          product.standard_cost.toLowerCase().includes(searchText.toLowerCase())
        );
      });
    }
    return productList.map((product) => (
      <Row
        key={product.id}
        product={product}
        selectedRowIndex={selectedRowIndex}
        onClick={() => onClick(product.id)}
      />
    ));
  }

  return (
    <Table aria-label="products">
      <TableHead>
        <TableRow>
          <TableCell component="th" scope="col">
            <Box fontWeight="bold">#</Box>
          </TableCell>
          <TableCell component="th" scope="col">
            <Box fontWeight="bold">{t('productCode')}</Box>
          </TableCell>
          <TableCell component="th" scope="col">
            <Box fontWeight="bold">{t('productName')}</Box>
          </TableCell>
          <TableCell component="th" scope="col">
            <Box fontWeight="bold">{t('standardCost')}</Box>
          </TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{DisplayProducts(props.searchText)}</TableBody>
    </Table>
  );
}
