import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default function CategoryList(props) {
  return (
    <div>
      <h3>{props.infos.title}</h3>
      <ListGroup>
        {props.categories.map((category) => {
          return (
            <ListGroupItem
              active={
                category.categoryName === props.currentCategory
                  ? true
                  : false
              }
              key={category.id}
              onClick={() => props.setCurrentCategory(category)}
            >
              {category.categoryName}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
}
