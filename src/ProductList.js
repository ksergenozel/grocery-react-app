import React from 'react';
import { Table, Button } from 'reactstrap';

export default function ProductList(props) {
  return (
    <div>
      <h3>{props.title}</h3>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Quantity Per Unit</th>
            <th>Units In Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.products.map((product) => {
            return (
              <tr key={product.id}>
                <th scope='row'>{product.id}</th>
                <td>{product.productName}</td>
                <td>${product.unitPrice}</td>
                <td>{product.quantityPerUnit}</td>
                <td>{product.unitsInStock}</td>
                <td><Button onClick={() => props.addToCart(product)} color='primary'>Add to cart</Button></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
