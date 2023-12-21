import { Component } from "react";
import AddComment from "./AddComment";

class CommentArea extends Component {
  state = {
    comments: [],
    hasError: false,
    isLoading: true,
  };

  fetchComments = async () => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${this.props.asin}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZmIwMDBkOGEyMDAwMThhNDhiNDIiLCJpYXQiOjE3MDE5Njg2NDAsImV4cCI6MTcwMzE3ODI0MH0.yu5kMUMcgRf-rSeP0DgEcCf95FNemrHp9G88QNBDCRY",
        },
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

  componentDidMount = () => {
    this.fetchComments();
  };

  render() {
    return (
      <div>
        {this.state.comments.map((comment, index) => (
          <p key={`comment-${index}`}>{comment.comment}</p>
        ))}
        <AddComment asin={this.props.asin} />
      </div>
    );
  }
}
export default CommentArea;
