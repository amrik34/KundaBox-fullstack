import {Toaster} from "react-hot-toast";
import {useUser} from "./useUser";
import {useState} from "react";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline"; // heroicons

// Inside your component:

function User() {
  const {
    users,
    form,
    isEditing,
    showDeleteModal,
    userToDelete,
    handleChange,
    handleSubmit,
    handleEdit,
    handleCancel,
    confirmDelete,
    handleDelete,
    formatDate,
    setShowDeleteModal,
    showPassword,
    setShowPassword,
  } = useUser();

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
      <Toaster position="top-right" />
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4 text-center">User Services</h1>

        {/* Add / Edit User Form */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-6">
          <input
            name="user_name"
            value={form.user_name}
            onChange={handleChange}
            placeholder="User Name"
            className="border rounded-lg p-2"
          />
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="border rounded-lg p-2"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border rounded-lg p-2"
          />
          {/* <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="border rounded-lg p-2"
          /> */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="border rounded-lg p-2 w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[36%] -translate-y-1/2 text-gray-500 hover:text-gray-700">
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
            <p className="text-xs text-grey-600 mt-1">(ex: Test10)</p>
          </div>
        </div>

        <div className="mb-6 flex gap-2">
          <button
            onClick={handleSubmit}
            className={`${
              isEditing
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white px-6 py-2 rounded-lg`}>
            {isEditing ? "Update User" : "Add User"}
          </button>
          {isEditing && (
            <button
              onClick={handleCancel}
              className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500">
              Cancel
            </button>
          )}
        </div>

        {/* User Table */}
        {users.length > 0 ? (
          <table className="w-full border border-gray-300 bg-white rounded-lg shadow text-sm">
            <thead>
              <tr className="bg-gray-100 text-left border-b">
                <th className="p-2">Name</th>
                <th className="p-2">DOB</th>
                <th className="p-2">Email</th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t">
                  <td className="p-2">{u.user_name}</td>
                  <td className="p-2">{u.dob ? formatDate(u.dob) : ""}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(u)}
                      className="text-blue-600 hover:underline">
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(u)}
                      className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No users found</p>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && userToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold text-red-600 mb-4">
              Confirm Delete
            </h2>
            <p className="text-gray-700 mb-2">
              Are you sure you want to delete this user?
            </p>
            <div className="bg-gray-100 rounded p-3 mb-4">
              <p>
                <strong>Name:</strong> {userToDelete.user_name}
              </p>
              <p>
                <strong>Email:</strong> {userToDelete.email}
              </p>
              <p>
                <strong>DOB:</strong> {formatDate(userToDelete.dob)}
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
