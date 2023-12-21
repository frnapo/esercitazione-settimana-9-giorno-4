import { Component } from "react";
import { Button, Form } from "react-bootstrap";

class AddComment extends Component {
  state = {
    comments: {
      author: "",
      comment: "",
      rate: 1,
      elementId: `${this.props.asin}`,
    },
    hasError: false,
    isLoading: true,
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${this.props.asin}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZmIwMDBkOGEyMDAwMThhNDhiNDIiLCJpYXQiOjE3MDE5Njg2NDAsImV4cCI6MTcwMzE3ODI0MH0.yu5kMUMcgRf-rSeP0DgEcCf95FNemrHp9G88QNBDCRY",
        },
        body: JSON.stringify(this.state.comments),
      });
      if (response.ok) {
        let comments = await response.json();
        console.log(comments);
        this.setState({ comments });
      } else {
        this.setState({ hasError: true });
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleChange = (propertyName, propertyValue) => {
    this.setState({ comments: { ...this.state.comments, [propertyName]: propertyValue } });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Lascia una recensione!</Form.Label>
          <Form.Control
            type="text"
            placeholder="La tua recensione qui..."
            value={this.state.comments.comment}
            onChange={(event) => this.handleChange("comment", event.target.value)}
          />
          <Form.Control
            type="text"
            placeholder="La tua email"
            value={this.state.comments.author}
            onChange={(event) => this.handleChange("author", event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Lascia un voto da 1 a 5!</Form.Label>
          <Form.Select
            value={this.state.comments.rate}
            onChange={(event) => this.handleChange("rate", event.target.value)}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Invia
        </Button>
      </Form>
    );
  }
}

export default AddComment;
