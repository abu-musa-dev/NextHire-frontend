import React, { useState } from "react";

const AddServices = () => {
  const [id, setId] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (
      !id ||
      !category.trim() ||
      !title.trim() ||
      !userName.trim() ||
      !avatar.trim() ||
      !rating ||
      !reviews ||
      !price ||
      !image.trim()
    ) {
      setMessage({ type: "error", text: "All fields are required!" });
      return;
    }

    // Prepare data object
    const data = {
      id: Number(id),
      category: category.trim(),
      title: title.trim(),
      user: {
        name: userName.trim(),
        avatar: avatar.trim(),
        rating: parseFloat(rating),
        reviews: Number(reviews),
      },
      price: Number(price),
      image: image.trim(),
    };

    try {
      const res = await fetch("http://localhost:5000/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to add service");

      setMessage({ type: "success", text: "Service added successfully!" });
      // Clear form
      setId("");
      setCategory("");
      setTitle("");
      setUserName("");
      setAvatar("");
      setRating("");
      setReviews("");
      setPrice("");
      setImage("");
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Error occurred" });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add New Service</h1>

      {message && (
        <p
          className={`mb-4 p-2 rounded ${
            message.type === "error"
              ? "bg-red-200 text-red-800"
              : "bg-green-200 text-green-800"
          }`}
        >
          {message.text}
        </p>
      )}

      <form onSubmit={handleSubmit}>

        <label className="block font-semibold mb-1" htmlFor="id">
          ID (number)
        </label>
        <input
          type="number"
          id="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded mb-4"
        />

        <label className="block font-semibold mb-1" htmlFor="category">
          Category
        </label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded mb-4"
          placeholder="e.g. Web Developer"
        />

        <label className="block font-semibold mb-1" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded mb-4"
          placeholder="Service title"
        />

        <label className="block font-semibold mb-1" htmlFor="userName">
          User Name
        </label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded mb-4"
          placeholder="e.g. Kristin Spencer"
        />

        <label className="block font-semibold mb-1" htmlFor="avatar">
          Avatar URL
        </label>
        <input
          type="text"
          id="avatar"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded mb-4"
          placeholder="https://i.imgur.com/m70Litj.png"
        />

        <label className="block font-semibold mb-1" htmlFor="rating">
          Rating (number, e.g. 4.8)
        </label>
        <input
          type="number"
          step="0.1"
          min="0"
          max="5"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded mb-4"
          placeholder="4.8"
        />

        <label className="block font-semibold mb-1" htmlFor="reviews">
          Reviews (number)
        </label>
        <input
          type="number"
          id="reviews"
          value={reviews}
          onChange={(e) => setReviews(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded mb-4"
          placeholder="18"
        />

        <label className="block font-semibold mb-1" htmlFor="price">
          Price (number)
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded mb-4"
          placeholder="446"
        />

        <label className="block font-semibold mb-1" htmlFor="image">
          Image URL
        </label>
        <input
          type="text"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded mb-4"
          placeholder="https://i.imgur.com/sI8xxqh.jpeg"
        />

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
        >
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddServices;
