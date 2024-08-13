import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../../../UserContext/UserContext';
import './Community.css'; // Import your CSS file

const CommunityForum = () => {
  const { user, isLoggedIn } = useContext(UserContext);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments from the backend
    axios.get('http://localhost:8484/auth/api/comments')
      .then(response => {
        setComments(response.data);
      })
      .catch(error => console.error('Error fetching comments:', error));
  }, []);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const newComment = {
        text: comment,
        username: user?.name || 'Anonymous',
        role: user?.role || 'user',
      };

      axios.post('http://localhost:5454/auth/api/', newComment)
        .then(response => {
          setComments([...comments, response.data]);
          setComment('');
        })
        .catch(error => console.error('Error posting comment:', error));
    }
  };

  return (
    <div className="forum-container">
      <h1>Community Forum</h1>
      <div className="comments-section">
        {comments.map((c, index) => (
          <div key={index} className={`comment ${c.role}`}>
            <p><strong>{c.username} ({c.role})</strong>: {c.text}</p>
          </div>
        ))}
      </div>
      {isLoggedIn && (
        <div className="comment-form">
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Write your comment here..."
          />
          <button onClick={handleCommentSubmit}>Post Comment</button>
        </div>
      )}
    </div>
  );
};

export default CommunityForum;
