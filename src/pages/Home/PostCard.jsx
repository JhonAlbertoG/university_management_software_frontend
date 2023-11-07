import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import './styles/postCard.css'

export default function PostCard(props) {
  const { title } = props;
  return (
    <Card id="postContainer">
      <Card.Img variant="top" src="https://picsum.photos/470/200" fluid />
      <Card.Body>
        <Card.Title className='text-center'><strong>{title}</strong></Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card;&apos;s content.
        </Card.Text>
        <small className="d-block text-muted text-end">Anna Maria Lopez  •  Mar 15, 2022  •  10 min read</small>
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  title: PropTypes.string.isRequired,
};