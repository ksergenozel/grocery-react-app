import React, { Component } from 'react';
import Navbar from './Navbar';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import { Container, Row, Col } from 'reactstrap';
import alertify from 'alertifyjs';
import { Route, Switch } from 'react-router-dom';
import CartSummary from './CartSummary';

export default class App extends Component {
  componentDidMount = () => {
    this.getAllCategories();
    this.getProducts();
  };

  state = {
    categories: [],
    currentCategory: '',
    titleOfProductList: 'All Products',
    products: [],
    cart: [],
    cartItemCounter: 0,
  };

  categoryListInfos = {
    title: 'Categories',
  };

  setCurrentCategory = (category) => {
    this.setState({
      currentCategory: category.categoryName,
      titleOfProductList: category.categoryName,
    });
    this.getProducts(category.id);
  };

  getAllCategories = () => {
    fetch('http://localhost:3000/categories')
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          categories: data,
        })
      );
  };

  getProducts = (categoryId) => {
    let url = 'http://localhost:3000/products';
    if (categoryId) {
      url += `?categoryId=${categoryId}`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          products: data,
        })
      );
  };

  addToCart = (product) => {
    let cart = this.state.cart;
    let addedItem = cart.find((item) => item.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      cart.push({ product: product, quantity: 1 });
    }
    const cartItemCounter = this.state.cartItemCounter + 1;
    this.setState({ cart, cartItemCounter });
    alertify.success(product.productName + ' added to cart.');
  };

  removeFromCart = (data) => {
    const cart = this.state.cart.filter(
      (item) => item.product.id !== data.product.id
    );
    const cartItemCounter = this.state.cartItemCounter - data.quantity;
    this.setState({ cart, cartItemCounter });
    alertify.error(data.product.productName + ' removed to cart.');
  };

  subtractFromCart = (product) => {
    let cart = this.state.cart;
    let item = cart.find((item) => item.product.id === product.id);
    item.quantity -= 1;
    const cartItemCounter = this.state.cartItemCounter - 1;
    this.setState({ cart, cartItemCounter });
    alertify.warning(product.productName + ' subtracted to cart.');
  };

  render() {
    return (
      <Container>
        <Row style={{ marginTop: '14px' }}>
          <Navbar
            cart={this.state.cart}
            removeFromCart={this.removeFromCart}
            subtractFromCart={this.subtractFromCart}
            cartItemCounter={this.state.cartItemCounter}
          />
        </Row>
        <Row>
          <Switch>
            <Route
              exact
              path='/'
              render={(props) => {
                return (
                  <>
                    <Col xs='3'>
                      <CategoryList
                        {...props}
                        infos={this.categoryListInfos}
                        categories={this.state.categories}
                        currentCategory={this.state.currentCategory}
                        setCurrentCategory={this.setCurrentCategory}
                      />
                    </Col>
                    <Col xs='9'>
                      <ProductList
                        {...props}
                        title={this.state.titleOfProductList}
                        products={this.state.products}
                        addToCart={this.addToCart}
                      />
                    </Col>
                  </>
                );
              }}
            />
            <Route
              exact
              path='/cart'
              render={(props) => {
                return (
                  <CartSummary
                    cart={this.state.cart}
                    removeFromCart={this.removeFromCart}
                    subtractFromCart={this.subtractFromCart}
                  />
                );
              }}
            />
          </Switch>
        </Row>
      </Container>
    );
  }
}
