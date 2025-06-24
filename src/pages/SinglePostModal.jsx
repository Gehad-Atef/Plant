import ModalWrapper from "../components/ModalWrapper";
import PostCardCore from "../components/PostCardCore";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

export default function SinglePostModal() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`/api/Posts/${postId}`).then((res) => {
      if (res.data?.isSuccess) setPost(res.data.value);
    });
  }, [postId]);

  if (!post) {
    return (
      <ModalWrapper onClose={() => navigate(-1)}>
        <p className="p-6 text-center text-gray-500">Loading post...</p>
      </ModalWrapper>
    );
  }

  return (
    <ModalWrapper onClose={() => navigate(-1)}>
      <PostCardCore post={post} isModal />
    </ModalWrapper>
  );
}
