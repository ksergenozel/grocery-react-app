import React from 'react';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Navi extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <Navbar
        style={{ marginBottom: 7.5, justifyContent: 'space-between' }}
        color='light'
        light
        expand='md'
      >
        <NavbarBrand style={{ marginLeft: 5 }}>
          <Link style={{textDecoration: 'none'}} to='/'>Grocery React App</Link>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />

        <Dropdown isOpen={this.state.isOpen} toggle={() => this.toggle()}>
          <DropdownToggle
            disabled={this.props.cart.length > 0 ? false : true}
            color='dark'
            style={{ marginRight: 5 }}
            caret
          >
            Cart [{this.props.cart.length}] [{this.props.cartItemCounter}]
          </DropdownToggle>
          <DropdownMenu style={{ width: 500 }} right>
            {this.props.cart.map((data) => {
              return (
                <DropdownItem
                  style={{ marginBottom: 5 }}
                  text
                  key={data.product.id}
                >
                  {data.product.productName} [{data.quantity}]{' '}
                  <Button
                    style={{ float: 'right' }}
                    size='sm'
                    onClick={() => {
                      this.props.removeFromCart(data);
                      if (this.props.cart.length === 1) {
                        this.toggle();
                      }
                    }}
                    color='danger'
                  >
                    Remove
                  </Button>
                  <Button
                    style={{
                      float: 'right',
                      marginRight: 5,
                      display: data.quantity > 1 ? 'flex' : 'none',
                    }}
                    size='sm'
                    color='secondary'
                    onClick={() => this.props.subtractFromCart(data.product)}
                  >
                    Subtract
                  </Button>
                </DropdownItem>
              );
            })}
            <DropdownItem style={{alignSelf:'center', textAlign:'center'}} text>
              <Link style={{textDecoration: 'none'}} to='cart'>Go to cart summary</Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Navbar>
    );
  }
}
