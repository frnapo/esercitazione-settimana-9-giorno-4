import { Component } from "react";
import { Card } from "react-bootstrap";

class SingleBook extends Component {
  state = {
    selected: false
  };

  render() {
    const { book } = this.props;
    return (
      <Card
        className="book-cover d-flex flex-column"
        style={{ borderWidth: "2px", borderColor: this.state.selected ? "red" : "rgba(0, 0, 0, 0.175)" }}
      >
        <Card.Img variant="top" src={book.img} onClick={() => this.setState({ selected: !this.state.selected })} />
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
        </Card.Body>
      </Card>
    );
  }
}

export default SingleBook;
