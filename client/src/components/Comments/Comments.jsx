// import React, { useEffect, useState } from 'react';
// import './Comments.css';
// import Profile from '../../img/profileImg.jpg';
// import SendIcon from '@mui/icons-material/Send';
// import { getComments, addComment } from '../../api/PostRequest'; // Import the API functions for getting and adding comments

// const Comments = ({ data }) => {
//   const [commentText, setCommentText] = useState('');
//   const [comments, setComments] = useState([]);
//   const {user} = useSelector((state)=>state.authReducer.authData)

//   useEffect(() => {
//     // Function to fetch comments when the component mounts
//     const fetchComments = async () => {
//       try {
//         const response = await getComments(postId);
//         setComments(response.data);
//       } catch (error) {
//         console.error('Error fetching comments:', error);
//       }
//     };

//     fetchComments();
//   }, [postId]);

//   const handleAddComment = async () => {
//     try {
//       await addComment(postId, { userId: user._id, text: commentText });
//       // After adding a comment, fetch the updated comments
//       const response = await getComments(postId);
//       setComments(response.data);
//       setCommentText(''); // Clear the comment input
//     } catch (error) {
//       console.error('Error adding comment:', error);
//     }
//   };

//   return (
//     <div className="Comments">
//       <div className="write">
//         <img src={Profile} alt="" />
//         <input
//           type="text"
//           placeholder="Write a comment here"
//           value={commentText}
//           onChange={(e) => setCommentText(e.target.value)}
//         />
//         <button onClick={handleAddComment}>
//           <SendIcon />
//         </button>
//       </div>
//       {comments.map((comment) => (
//         <div className="comment" key={comment._id}>
//           <div className="info">
//             <img src={comment.profilePicture} alt="" />
//             <span>{comment.name}</span>
//             <p>{comment.text}</p>
//           </div>
//           <span className="date">1 hour ago</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Comments;
