import React from 'react';
import { Table, Button } from 'reactstrap';

export default function CartSummary(props) {
  return (
    <div>
      <h3>Cart Summary</h3>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Quantity Per Unit</th>

            <th>Quantity</th>
            <th>Total Price</th>
            <th>Subtract</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {props.cart.map((cartItem) => {
            return (
              <tr key={cartItem.product.id}>
                <th scope='row'>{cartItem.product.id}</th>
                <td>{cartItem.product.productName}</td>
                <td>${cartItem.product.unitPrice}</td>
                <td>{cartItem.product.quantityPerUnit}</td>
                <td>{cartItem.quantity}</td>
                <td>${cartItem.quantity * cartItem.product.unitPrice}</td>
                <td>
                  <Button
                    style={{ display: cartItem.quantity > 1 ? 'flex' : 'none' }}
                    onClick={() => props.subtractFromCart(cartItem.product)}
                    color='secondary'
                  >
                    Subtract
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => props.removeFromCart(cartItem)}
                    color='danger'
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button style={{float:'right'}} color='primary'>
        Proceed to purchase
      </Button>
    </div>
  );
}
