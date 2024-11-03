"use client";
import { useState, useEffect } from "react";
import { usernames } from "@/data/usernames";
export const runtime = "edge";
export default function AdminPanel() {
  const [username, setUsername] = useState("");
  const [price, setPrice] = useState("");
  const [feature, setFeature] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [usernameStatus, setUsernameStatus] = useState<
    "available" | "taken" | null
  >(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [usernameList, setUsernameList] = useState([...usernames]);

  useEffect(() => {
    if (username) {
      const exists = usernameList.some(
        (u) => u.username.toLowerCase() === username.toLowerCase(),
      );
      setUsernameStatus(exists ? "taken" : "available");
    } else {
      setUsernameStatus(null);
    }
  }, [username, usernameList]);

  const addFeature = () => {
    if (feature.trim() && features.length < 3) {
      setFeatures([...features, feature.trim()]);
      setFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleDelete = (index: number) => {
    const updatedUsernames = usernameList.filter((_, i) => i !== index);
    setUsernameList(updatedUsernames);
    usernames.splice(0, usernames.length, ...updatedUsernames);
    setStatus("success");
    setTimeout(() => setStatus("idle"), 3000);
  };

  const handleEdit = (index: number) => {
    const usernameToEdit = usernameList[index];
    setUsername(usernameToEdit.username);
    setPrice(usernameToEdit.price.toString());
    setFeatures(usernameToEdit.features);
    setEditIndex(index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (features.length !== 3 || !username || !price) {
      setStatus("error");
      return;
    }

    const newUsername = {
      username,
      price: Number(price),
      features,
    };

    let updatedUsernames;
    if (editIndex !== null) {
      updatedUsernames = [...usernameList];
      updatedUsernames[editIndex] = newUsername;
      setEditIndex(null);
    } else {
      if (usernameStatus === "taken") {
        setStatus("error");
        return;
      }
      updatedUsernames = [...usernameList, newUsername];
    }

    setUsernameList(updatedUsernames);
    usernames.splice(0, usernames.length, ...updatedUsernames);

    setStatus("success");
    setUsername("");
    setPrice("");
    setFeatures([]);

    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <div className="space-y-8">
      <div className="w-80 mx-auto bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6 text-center">
          {editIndex !== null ? "Edit Username" : "Add Username"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Username</label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500"
                placeholder="Enter username"
              />
              {usernameStatus && (
                <span
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs ${
                    usernameStatus === "available"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {usernameStatus === "available"
                    ? "Can add"
                    : "Already listed"}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Price ($)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500"
              placeholder="Enter price"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              Features (3 required)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => setFeature(e.target.value)}
                disabled={features.length >= 3}
                className="flex-1 px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500 disabled:opacity-50"
                placeholder="Add feature"
              />
              <button
                type="button"
                onClick={addFeature}
                disabled={features.length >= 3}
                className="px-3 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50"
              >
                Add
              </button>
            </div>

            <ul className="mt-4 space-y-2">
              {features.map((feat, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-700 px-3 py-2 rounded-lg"
                >
                  <span className="text-white text-sm">{feat}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <span className="material-symbols-outlined text-sm">
                      delete
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors"
          >
            {editIndex !== null ? "Update Username" : "Add Username"}
          </button>

          {status === "success" && (
            <div className="mt-4 p-2 bg-green-500 text-white rounded-lg text-center">
              Username added successfully
            </div>
          )}

          {status === "error" && (
            <div className="mt-4 p-2 bg-red-500 text-white rounded-lg text-center">
              Please check username availability and ensure exactly 3 features
            </div>
          )}
        </form>
      </div>

      <div className="w-80 mx-auto bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6 text-center">
          Current Usernames
        </h2>
        <div className="space-y-3">
          {usernameList.map((item, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium">{item.username}</span>
                <span className="text-yellow-500 font-bold">${item.price}</span>
              </div>
              <div className="text-gray-300 text-sm mb-3">
                {item.features.map((feature, i) => (
                  <div key={i}>• {feature}</div>
                ))}
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
                  onClick={() => handleEdit(index)}
                >
                  <span className="material-symbols-outlined text-sm">
                    edit
                  </span>
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-400 transition-colors"
                  onClick={() => handleDelete(index)}
                >
                  <span className="material-symbols-outlined text-sm">
                    delete
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
