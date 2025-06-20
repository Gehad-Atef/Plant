import PostList from "../components/PostList";
import CreatePost from "../components/CreatePost";
import Sidebar from "../components/Sidebar";

export default function Community() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full p-4 bg-green-50 dark:bg-gray-800 min-h-screen space-y-6">
        <CreatePost />
        <PostList />
      </div>
    </div>
  );
}
