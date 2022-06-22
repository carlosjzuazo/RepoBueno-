import HookPosts from "../hooks/HookPosts";
import { ErrorMessage } from "./ErrorMessage";
import { PostsList } from "./PostList";

export const UserPosts = ({ id }) => {
  const { posts, loading, error, erasePost } = HookPosts(id);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <ErrorMessage message={error} />;

  return <PostsList posts={posts} erasePost={erasePost} />;
};
