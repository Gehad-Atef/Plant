import { useState } from "react";

const AddComment = ({ postId }) => {
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = document.cookie
            .split("; ")
            .find((row) => row.startsWith("accessToken="))
            ?.split("=")[1];
        try {
            const response = await fetch(
                "https://greenland.runasp.net/api/Comment",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ postId, content }),
                }
            );
            if (!response.ok) throw new Error("Failed to add comment");
            const data = await response.json();
            console.log("Comment added successfully:", data);
            setContent("");
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
                Comment
            </button>
        </form>
    );
};

export default AddComment;
