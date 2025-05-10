import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoSend } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BiSolidLike } from "react-icons/bi";
import Modal from 'react-modal';
import NavBar from '../../Components/NavBar/NavBar';
import { IoIosCreate } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { FiSave } from "react-icons/fi";
import { TbPencilCancel } from "react-icons/tb";
import { FaCommentAlt } from "react-icons/fa";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './AllPost.css';
Modal.setAppElement('#root');

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [postOwners, setPostOwners] = useState({});
  const [showMyPosts, setShowMyPosts] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [newComment, setNewComment] = useState({});
  const [editingComment, setEditingComment] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const loggedInUserID = localStorage.getItem('userID');

  // Refs for each post
  const postRefs = useRef({});

  useEffect(() => {
    // Fetch all posts from the backend
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/posts');
        setPosts(response.data);
        setFilteredPosts(response.data);

        // Fetch post owners' names
        const userIDs = [...new Set(response.data.map((post) => post.userID))];
        const ownerPromises = userIDs.map((userID) =>
          axios.get(`http://localhost:8080/user/${userID}`)
            .then((res) => ({
              userID,
              fullName: res.data.fullname,
            }))
            .catch((error) => {
              if (error.response && error.response.status === 404) {
                setPosts((prevPosts) => prevPosts.filter((post) => post.userID !== userID));
                setFilteredPosts((prevFilteredPosts) => prevFilteredPosts.filter((post) => post.userID !== userID));
              } else {
                console.error(`Error fetching user details for userID ${userID}:`, error);
              }
              return { userID, fullName: 'Anonymous' };
            })
        );
        const owners = await Promise.all(ownerPromises);
        const ownerMap = owners.reduce((acc, owner) => {
          acc[owner.userID] = owner.fullName;
          return acc;
        }, {});
        setPostOwners(ownerMap);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchFollowedUsers = async () => {
      const userID = localStorage.getItem('userID');
      if (userID) {
        try {
          const response = await axios.get(`http://localhost:8080/user/${userID}/followedUsers`);
          setFollowedUsers(response.data);
        } catch (error) {
          console.error('Error fetching followed users:', error);
        }
      }
    };

    fetchFollowedUsers();
  }, []);

  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/posts/${postId}`);
      alert('Post deleted successfully!');
      setPosts(posts.filter((post) => post.id !== postId));
      setFilteredPosts(filteredPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post.');
    }
  };

  const handleUpdate = (postId) => {
    navigate(`/updatePost/${postId}`);
  };

  const handleMyPostsToggle = () => {
    if (showMyPosts) {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((post) => post.userID === loggedInUserID));
    }
    setShowMyPosts(!showMyPosts);
  };

  const handleLike = async (postId) => {
    const userID = localStorage.getItem('userID');
    if (!userID) {
      alert('Please log in to like a post.');
      return;
    }
    try {
      const response = await axios.put(`http://localhost:8080/posts/${postId}/like`, null, {
        params: { userID },
      });

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: response.data.likes } : post
        )
      );

      setFilteredPosts((prevFilteredPosts) =>
        prevFilteredPosts.map((post) =>
          post.id === postId ? { ...post, likes: response.data.likes } : post
        )
      );
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleFollowToggle = async (postOwnerID) => {
    const userID = localStorage.getItem('userID');
    if (!userID) {
      alert('Please log in to follow/unfollow users.');
      return;
    }
    try {
      if (followedUsers.includes(postOwnerID)) {
        await axios.put(`http://localhost:8080/user/${userID}/unfollow`, { unfollowUserID: postOwnerID });
        setFollowedUsers(followedUsers.filter((id) => id !== postOwnerID));
      } else {
        await axios.put(`http://localhost:8080/user/${userID}/follow`, { followUserID: postOwnerID });
        setFollowedUsers([...followedUsers, postOwnerID]);
      }
    } catch (error) {
      console.error('Error toggling follow state:', error);
    }
  };

  const handleAddComment = async (postId) => {
    const userID = localStorage.getItem('userID');
    if (!userID) {
      alert('Please log in to comment.');
      return;
    }
    const content = newComment[postId] || '';
    if (!content.trim()) {
      alert('Comment cannot be empty.');
      return;
    }
    try {
      const response = await axios.post(`http://localhost:8080/posts/${postId}/comment`, {
        userID,
        content,
      });

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, comments: response.data.comments } : post
        )
      );

      setFilteredPosts((prevFilteredPosts) =>
        prevFilteredPosts.map((post) =>
          post.id === postId ? { ...post, comments: response.data.comments } : post
        )
      );

      setNewComment({ ...newComment, [postId]: '' });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    const userID = localStorage.getItem('userID');
    try {
      await axios.delete(`http://localhost:8080/posts/${postId}/comment/${commentId}`, {
        params: { userID },
      });

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, comments: post.comments.filter((comment) => comment.id !== commentId) }
            : post
        )
      );

      setFilteredPosts((prevFilteredPosts) =>
        prevFilteredPosts.map((post) =>
          post.id === postId
            ? { ...post, comments: post.comments.filter((comment) => comment.id !== commentId) }
            : post
        )
      );
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleSaveComment = async (postId, commentId, content) => {
    try {
      const userID = localStorage.getItem('userID');
      await axios.put(`http://localhost:8080/posts/${postId}/comment/${commentId}`, {
        userID,
        content,
      });

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId ? { ...comment, content } : comment
              ),
            }
            : post
        )
      );

      setFilteredPosts((prevFilteredPosts) =>
        prevFilteredPosts.map((post) =>
          post.id === postId
            ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId ? { ...comment, content } : comment
              ),
            }
            : post
        )
      );

      setEditingComment({});
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        (post.category && post.category.toLowerCase().includes(query))
    );
    setFilteredPosts(filtered);
  };

  const openModal = (mediaUrl) => {
    setSelectedMedia(mediaUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMedia(null);
    setIsModalOpen(false);
  };

  // PDF Download Handler
  const handleDownloadPDF = async (postId) => {
    const input = postRefs.current[postId];
    if (!input) return;
    // Hide action buttons before rendering to canvas
    const actionBtns = input.querySelectorAll('.pdf-hide');
    actionBtns.forEach(btn => btn.style.display = 'none');
    await html2canvas(input, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`post-${postId}.pdf`);
    });
    // Restore action buttons
    actionBtns.forEach(btn => btn.style.display = '');
  };

  return (
    <div>
      <div className='continer' style={{ 
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#0a1f44',
        paddingBottom: '50px',
        paddingTop: '20px'
      }}>
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: 'linear-gradient(135deg, rgba(6, 118, 120, 0.7), rgba(8, 8, 77, 0.8))', 
          zIndex: 1 
        }}></div>
        
        <NavBar />
        <div className='continSection' style={{ 
          position: 'relative',
          zIndex: 2,
          maxWidth: '1200px',
          margin: '20px auto',
          padding: '0 15px',
          marginTop: '80px',
        }}>
          <div className='searchinput' style={{ 
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
          }}>
            <input
              type="text"
              className="Auth_input"
              placeholder="Search posts by title, description, or category"
              value={searchQuery}
              onChange={handleSearch}
              style={{ 
                width: '70%', 
                padding: '12px', 
                borderRadius: '30px', 
                border: '1px solid #ccc', 
                fontSize: '16px', 
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
                textAlign: 'center'
              }}
            />
          </div>
          <div className='add_new_btn' 
            onClick={() => (window.location.href = '/addNewPost')}
            style={{
              backgroundColor: '#FF6F61',
              color: '#fff',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 0 20px auto',
              boxShadow: '0 4px 12px rgba(255, 111, 97, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#E64A45';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 14px rgba(255, 111, 97, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#FF6F61';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 111, 97, 0.3)';
            }}
          >
            <IoIosCreate className='add_new_btn_icon' style={{ fontSize: '24px' }}/>
          </div>
          <div className='post_card_continer'>
            {filteredPosts.length === 0 ? (
              <div className='not_found_box' style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '15px',
                padding: '30px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                margin: '40px auto',
                maxWidth: '500px'
              }}>
                <div className='not_found_img'></div>
                <p className='not_found_msg' style={{ color: '#555', fontSize: '18px', margin: '20px 0' }}>No posts found. Please create a new post.</p>
                <button 
                  className='not_found_btn' 
                  onClick={() => (window.location.href = '/addNewPost')}
                  style={{
                    backgroundColor: '#4285F4',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 25px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 8px rgba(66, 133, 244, 0.3)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#3367D6';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 14px rgba(66, 133, 244, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#4285F4';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 8px rgba(66, 133, 244, 0.3)';
                  }}
                >Create New Post</button>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className='post_card'
                  ref={el => postRefs.current[post.id] = el}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '15px',
                    padding: '25px',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                    marginBottom: '30px',
                    transition: 'transform 0.3s, box-shadow 0.3s'
                  }}>
                  <div className='user_details_card' style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '15px',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                    paddingBottom: '10px'
                  }}>
                    <div className='name_section_post'>
                      <p className='name_section_post_owner_name' style={{ 
                        fontWeight: 'bold', 
                        color: '#333',
                        margin: 0
                      }}>{postOwners[post.userID] || 'Anonymous'}</p>
                      {post.userID !== loggedInUserID && (
                        <button
                          className={`pdf-hide ${followedUsers.includes(post.userID) ? 'flow_btn_unfalow' : 'flow_btn'}`}
                          onClick={() => handleFollowToggle(post.userID)}
                          style={{
                            backgroundColor: followedUsers.includes(post.userID) ? '#FF6F61' : '#4285F4',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '20px',
                            padding: '5px 12px',
                            fontSize: '14px',
                            cursor: 'pointer',
                            marginLeft: '10px',
                            transition: 'background-color 0.3s',
                            boxShadow: followedUsers.includes(post.userID) 
                              ? '0 2px 5px rgba(255, 111, 97, 0.3)' 
                              : '0 2px 5px rgba(66, 133, 244, 0.3)'
                          }}
                        >
                          {followedUsers.includes(post.userID) ? 'Unfollow' : 'Follow'}
                        </button>
                      )}
                    </div>
                    {post.userID === loggedInUserID && (
                      <div>
                        <div className='action_btn_icon_post pdf-hide' style={{ display: 'flex', gap: '10px' }}>
                          <FaEdit
                            onClick={() => handleUpdate(post.id)} 
                            className='action_btn_icon'
                            style={{
                              color: '#4285F4',
                              cursor: 'pointer',
                              fontSize: '24px',
                              transition: 'transform 0.2s',
                              padding: '10px',
                              borderRadius: '50%',
                              backgroundColor: 'rgba(66, 133, 244, 0.1)',
                              width: '45px',
                              height: '45px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            onMouseOver={(e) => {
                              e.target.style.transform = 'scale(1.1)';
                              e.target.style.backgroundColor = 'rgba(66, 133, 244, 0.2)';
                            }}
                            onMouseOut={(e) => {
                              e.target.style.transform = 'scale(1)';
                              e.target.style.backgroundColor = 'rgba(66, 133, 244, 0.1)';
                            }}
                          />
                          <RiDeleteBin6Fill
                            onClick={() => handleDelete(post.id)}
                            className='action_btn_icon'
                            style={{
                              color: '#FF6F61',
                              cursor: 'pointer',
                              fontSize: '24px',
                              transition: 'transform 0.2s',
                              padding: '10px',
                              borderRadius: '50%',
                              backgroundColor: 'rgba(255, 111, 97, 0.1)',
                              width: '45px',
                              height: '45px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            onMouseOver={(e) => {
                              e.target.style.transform = 'scale(1.1)';
                              e.target.style.backgroundColor = 'rgba(255, 111, 97, 0.2)';
                            }}
                            onMouseOut={(e) => {
                              e.target.style.transform = 'scale(1)';
                              e.target.style.backgroundColor = 'rgba(255, 111, 97, 0.1)';
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='user_details_card_di' style={{ marginBottom: '15px' }}>
                    <p className='card_post_title' style={{ 
                      color: '#333', 
                      fontSize: '22px', 
                      fontWeight: 'bold',
                      marginBottom: '10px'
                    }}>{post.title}</p>
                    <p className='card_post_description' style={{ 
                      whiteSpace: "pre-line",
                      color: '#555',
                      fontSize: '16px',
                      lineHeight: '1.6',
                      marginBottom: '10px'
                    }}>{post.description}</p>
                    <p className='card_post_category' style={{ 
                      color: '#4285F4',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      backgroundColor: 'rgba(66, 133, 244, 0.1)',
                      padding: '5px 10px',
                      borderRadius: '15px',
                      display: 'inline-block'
                    }}>Category: {post.category || 'Uncategorized'}</p>
                  </div>
                  <div className="media-collage" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '10px',
                    marginBottom: '15px'
                  }}>
                    {post.media.slice(0, 4).map((mediaUrl, index) => (
                      <div
                        key={index}
                        className={`media-item ${post.media.length > 4 && index === 3 ? 'media-overlay' : ''}`}
                        onClick={() => openModal(mediaUrl)}
                        style={{
                          position: 'relative',
                          overflow: 'hidden',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          height: '180px'
                        }}
                      >
                        {mediaUrl.endsWith('.mp4') ? (
                          <video controls style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                            <source src={`http://localhost:8080${mediaUrl}`} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <img 
                            src={`http://localhost:8080${mediaUrl}`} 
                            alt="Post Media" 
                            style={{ 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'cover',
                              transition: 'transform 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                              e.target.style.transform = 'scale(1.05)';
                            }}
                            onMouseOut={(e) => {
                              e.target.style.transform = 'scale(1)';
                            }}
                          />
                        )}
                        {post.media.length > 4 && index === 3 && (
                          <div className="overlay-text" style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            color: '#fff',
                            fontSize: '24px',
                            fontWeight: 'bold'
                          }}>+{post.media.length - 4}</div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className='like_coment_lne' style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px 0',
                    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                    marginBottom: '15px'
                  }}>
                    <div className='like_btn_con' style={{ display: 'flex', alignItems: 'center' }}>
                      <BiSolidLike
                        className={`pdf-hide ${post.likes?.[localStorage.getItem('userID')] ? 'unlikebtn' : 'likebtn'}`}
                        onClick={() => handleLike(post.id)}
                        style={{
                          color: post.likes?.[localStorage.getItem('userID')] ? '#FF6F61' : '#4285F4',
                          fontSize: '22px',
                          cursor: 'pointer',
                          marginRight: '5px',
                          transition: 'transform 0.2s, color 0.2s'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.transform = 'scale(1.2)';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = 'scale(1)';
                        }}
                      >
                        {post.likes?.[localStorage.getItem('userID')] ? 'Unlike' : 'Like'}
                      </BiSolidLike>
                      <p className='like_num' style={{ 
                        color: '#555',
                        marginLeft: '5px',
                        fontWeight: 'bold'
                      }}>
                        {Object.values(post.likes || {}).filter((liked) => liked).length} Likes
                      </p>
                    </div>
                    <div>
                      <div className='like_btn_con' style={{ display: 'flex', alignItems: 'center' }}>
                        <FaCommentAlt
                          className='combtn pdf-hide'
                          style={{
                            color: '#4285F4',
                            fontSize: '20px',
                            marginRight: '5px'
                          }}
                        />
                        <p className='like_num' style={{ 
                          color: '#555',
                          marginLeft: '5px',
                          fontWeight: 'bold'
                        }}>
                          {post.comments?.length || 0} Comments
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='withsett'>
                    <div className='add_comennt_con pdf-hide' style={{
                      display: 'flex',
                      marginBottom: '15px'
                    }}>
                      <input
                        type="text"
                        className='add_coment_input'
                        placeholder="Add a comment"
                        value={newComment[post.id] || ''}
                        onChange={(e) =>
                          setNewComment({ ...newComment, [post.id]: e.target.value })
                        }
                        style={{
                          flex: '1',
                          padding: '10px 15px',
                          borderRadius: '20px',
                          border: '1px solid #ccc',
                          outline: 'none',
                          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <IoSend
                        onClick={() => handleAddComment(post.id)}
                        className='add_coment_btn'
                        style={{
                          backgroundColor: '#4285F4',
                          color: '#fff',
                          padding: '10px',
                          borderRadius: '50%',
                          marginLeft: '10px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 2px 5px rgba(66, 133, 244, 0.3)'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = '#3367D6';
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 4px 8px rgba(66, 133, 244, 0.4)';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = '#4285F4';
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 2px 5px rgba(66, 133, 244, 0.3)';
                        }}
                      />
                    </div>
                    <br/>
                    {post.comments?.map((comment) => (
                      <div key={comment.id} className='coment_full_card' style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        padding: '10px',
                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                        borderRadius: '8px',
                        marginBottom: '10px'
                      }}>
                        <div className='comnt_card' style={{ flex: '1' }}>
                          <p className='comnt_card_username' style={{ 
                            fontWeight: 'bold', 
                            color: '#4285F4',
                            marginBottom: '5px',
                            fontSize: '14px'
                          }}>{comment.userFullName}</p>
                          {editingComment.id === comment.id ? (
                            <input
                              type="text"
                              className='edit_comment_input'
                              value={editingComment.content}
                              onChange={(e) =>
                                setEditingComment({ ...editingComment, content: e.target.value })
                              }
                              autoFocus
                              style={{
                                width: '100%',
                                padding: '8px 12px',
                                borderRadius: '6px',
                                border: '1px solid #4285F4',
                                outline: 'none'
                              }}
                            />
                          ) : (
                            <p className='comnt_card_coment' style={{ 
                              color: '#555',
                              margin: 0,
                              fontSize: '15px'
                            }}>{comment.content}</p>
                          )}
                        </div>

                        <div className='coment_action_btn pdf-hide' style={{ marginLeft: '10px' }}>
                          {comment.userID === loggedInUserID && (
                            <>
                              {editingComment.id === comment.id ? (
                                <>
                                  <FiSave className='coment_btn'
                                    onClick={() =>
                                      handleSaveComment(post.id, comment.id, editingComment.content)
                                    }
                                    style={{
                                      color: '#4285F4',
                                      cursor: 'pointer',
                                      fontSize: '24px',
                                      margin: '0 5px',
                                      padding: '8px',
                                      borderRadius: '50%',
                                      backgroundColor: 'rgba(66, 133, 244, 0.1)',
                                      width: '40px',
                                      height: '40px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      transition: 'all 0.2s ease'
                                    }}
                                    onMouseOver={(e) => {
                                      e.target.style.backgroundColor = 'rgba(66, 133, 244, 0.2)';
                                      e.target.style.transform = 'scale(1.1)';
                                    }}
                                    onMouseOut={(e) => {
                                      e.target.style.backgroundColor = 'rgba(66, 133, 244, 0.1)';
                                      e.target.style.transform = 'scale(1)';
                                    }}
                                  />
                                  <TbPencilCancel className='coment_btn'
                                    onClick={() => setEditingComment({})}
                                    style={{
                                      color: '#FF6F61',
                                      cursor: 'pointer',
                                      fontSize: '24px',
                                      margin: '0 5px',
                                      padding: '8px',
                                      borderRadius: '50%',
                                      backgroundColor: 'rgba(255, 111, 97, 0.1)',
                                      width: '40px',
                                      height: '40px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      transition: 'all 0.2s ease'
                                    }}
                                    onMouseOver={(e) => {
                                      e.target.style.backgroundColor = 'rgba(255, 111, 97, 0.2)';
                                      e.target.style.transform = 'scale(1.1)';
                                    }}
                                    onMouseOut={(e) => {
                                      e.target.style.backgroundColor = 'rgba(255, 111, 97, 0.1)';
                                      e.target.style.transform = 'scale(1)';
                                    }}
                                  />
                                </>
                              ) : (
                                <>
                                  <GrUpdate className='coment_btn' 
                                    onClick={() =>
                                      setEditingComment({ id: comment.id, content: comment.content })
                                    }
                                    style={{
                                      color: '#4285F4',
                                      cursor: 'pointer',
                                      fontSize: '24px',
                                      margin: '0 5px',
                                      padding: '8px',
                                      borderRadius: '50%',
                                      backgroundColor: 'rgba(66, 133, 244, 0.1)',
                                      width: '40px',
                                      height: '40px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      transition: 'all 0.2s ease'
                                    }}
                                    onMouseOver={(e) => {
                                      e.target.style.backgroundColor = 'rgba(66, 133, 244, 0.2)';
                                      e.target.style.transform = 'scale(1.1)';
                                    }}
                                    onMouseOut={(e) => {
                                      e.target.style.backgroundColor = 'rgba(66, 133, 244, 0.1)';
                                      e.target.style.transform = 'scale(1)';
                                    }}
                                  />
                                  <MdDelete className='coment_btn' 
                                    onClick={() => handleDeleteComment(post.id, comment.id)}
                                    style={{
                                      color: '#FF6F61',
                                      cursor: 'pointer',
                                      fontSize: '24px',
                                      margin: '0 5px',
                                      padding: '8px',
                                      borderRadius: '50%',
                                      backgroundColor: 'rgba(255, 111, 97, 0.1)',
                                      width: '40px',
                                      height: '40px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      transition: 'all 0.2s ease'
                                    }}
                                    onMouseOver={(e) => {
                                      e.target.style.backgroundColor = 'rgba(255, 111, 97, 0.2)';
                                      e.target.style.transform = 'scale(1.1)';
                                    }}
                                    onMouseOut={(e) => {
                                      e.target.style.backgroundColor = 'rgba(255, 111, 97, 0.1)';
                                      e.target.style.transform = 'scale(1)';
                                    }}
                                  />
                                </>
                              )}
                            </>
                          )}
                          {post.userID === loggedInUserID && comment.userID !== loggedInUserID && (
                            <MdDelete 
                              className='coment_btn'
                              onClick={() => handleDeleteComment(post.id, comment.id)}
                              style={{
                                color: '#FF6F61',
                                cursor: 'pointer',
                                fontSize: '24px',
                                margin: '0 5px',
                                padding: '8px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(255, 111, 97, 0.1)',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseOver={(e) => {
                                e.target.style.backgroundColor = 'rgba(255, 111, 97, 0.2)';
                                e.target.style.transform = 'scale(1.1)';
                              }}
                              onMouseOut={(e) => {
                                e.target.style.backgroundColor = 'rgba(255, 111, 97, 0.1)';
                                e.target.style.transform = 'scale(1)';
                              }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Download PDF button at the bottom of each post */}
                  <div style={{ textAlign: 'right', marginTop: '15px' }}>
                    <button
                      className="pdf-download-btn"
                      onClick={() => handleDownloadPDF(post.id)}
                      style={{
                        backgroundColor: '#4285F4',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '10px 20px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(66, 133, 244, 0.15)',
                        transition: 'background-color 0.3s'
                      }}
                      onMouseOver={e => e.currentTarget.style.backgroundColor = '#3367D6'}
                      onMouseOut={e => e.currentTarget.style.backgroundColor = '#4285F4'}
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal for displaying full media */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Media Modal"
        className="media-modal"
        overlayClassName="media-modal-overlay"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          },
          content: {
            position: 'relative',
            top: 'auto',
            left: 'auto',
            right: 'auto',
            bottom: 'auto',
            border: 'none',
            background: 'transparent',
            maxWidth: '90%',
            maxHeight: '90%',
            padding: 0
          }
        }}
      >
        <button 
          className="close-modal-btn" 
          onClick={closeModal}
          style={{
            position: 'absolute',
            top: '-40px',
            right: '-40px',
            backgroundColor: '#FF6F61',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#E64A45';
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#FF6F61';
            e.target.style.transform = 'scale(1)';
          }}
        >x</button>
        {selectedMedia && selectedMedia.endsWith('.mp4') ? (
          <video controls className="modal-media" style={{ maxWidth: '100%', maxHeight: '80vh', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)' }}>
            <source src={`http://localhost:8080${selectedMedia}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img 
            src={`http://localhost:8080${selectedMedia}`} 
            alt="Full Media" 
            className="modal-media" 
            style={{ maxWidth: '100%', maxHeight: '80vh', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)' }} 
          />
        )}
      </Modal>
    </div>
  );
}

export default AllPost;
