import {useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Types
export interface UserItem {
  _id: string;
  user_name: string;
  dob: string;
  email: string;
}

interface UserResponse {
  result: boolean;
  code?: string;
  user?: UserItem;
  users?: UserItem[];
}

// ✅ Validation helpers
function getAge(dob: string) {
  const today = new Date();
  const birth = new Date(dob);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function isValidName(name: string) {
  const trimmed = name.trim();
  return /^[A-Za-z ]{5,16}$/.test(trimmed); // only letters, 5–16
}
// function isValidName(name: string) {
//   const trimmed = name.trim();
//   return /^[A-Za-z ]{5,16}$/.test(trimmed); // letters + spaces, 5–16 chars
// }
function isValidDOB(dob: string) {
  if (!dob) return false;
  const d = new Date(dob);
  if (isNaN(d.getTime()) || d > new Date()) return false;
  return getAge(dob) >= 18;
}

function isValidEmail(email: string) {
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.com$/.test(email.trim());
}

function isValidPassword(password: string) {
  if (!password) return false;
  if (password.length < 5 || password.length > 16) return false;
  if (!/[A-Z]/.test(password)) return false;
  const digits = (password.match(/\d/g) || []).length;
  return digits >= 2;
}

// Map backend codes to user-friendly messages
function getErrorMessage(code: string) {
  switch (code) {
    case "INVALID_NAME":
      return "Name must be 5–16 letters only (A–Z)";
    case "INVALID_DOB":
      return "DOB invalid or user must be at least 18 years old";
    case "INVALID_EMAIL":
      return "Email invalid or already exists";
    case "INVALID_PASSWORD":
      return "Password must be 5–16 chars, 1 uppercase, 2 digits (ex: Test10)";
    case "EMAIL_EXISTS":
      return "Email already exists";
    default:
      return "Something went wrong";
  }
}

export function useUser() {
  const API_URL = "http://localhost:5001/api/users";

  const [users, setUsers] = useState<UserItem[]>([]);
  const [form, setForm] = useState({
    _id: "",
    user_name: "",
    dob: "",
    email: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserItem | null>(null);

  // Password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get<UserResponse>(API_URL);
      setUsers(res.data.users || []);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error fetching users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  // ✅ Submit (Add / Update)
  const handleSubmit = async () => {
    // Frontend validation
    if (!isValidName(form.user_name))
      return toast.error(
        "Name must be 5-16 letters (A-Z) and can include spaces"
      );
    if (!isValidDOB(form.dob))
      return toast.error("User must be at least 18 years old");
    if (!isValidEmail(form.email))
      return toast.error("Email must end with .com");

    // Password validation
    if (!isEditing && !isValidPassword(form.password))
      return toast.error(
        "Password must be 5–16 chars, 1 uppercase, 2 digits (ex: Test10)"
      );
    if (isEditing && form.password && !isValidPassword(form.password))
      return toast.error(
        "Password must be 5–16 chars, 1 uppercase, 2 digits (ex: Test10)"
      );

    try {
      // Prepare payload
      const payload: any = {
        user_name: form.user_name,
        dob: form.dob,
        email: form.email,
      };

      // Only send password if adding or updating with a new password
      if (!isEditing || (isEditing && form.password)) {
        payload.password = form.password;
      }

      let res: any;
      if (isEditing && form._id) {
        // Update user
        res = await axios.put(`${API_URL}/${form._id}`, payload);
      } else {
        // Add new user
        res = await axios.post(`${API_URL}`, payload);
      }

      // Check backend response
      if (res.data.result === false) {
        toast.error(getErrorMessage(res.data.code || ""));
        return;
      }

      const updatedUser = res.data.user;
      if (isEditing) {
        setUsers(
          users.map((u) => (u._id === updatedUser!._id ? updatedUser! : u))
        );
        toast.success("User updated successfully!");
      } else {
        setUsers([...users, updatedUser!]);
        toast.success("User added successfully!");
      }

      // Reset form
      setForm({_id: "", user_name: "", dob: "", email: "", password: ""});
      setIsEditing(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error saving user");
    }
  };

  // ✅ Edit user → prefill form
  const handleEdit = (user: UserItem) => {
    setForm({
      _id: user._id,
      user_name: user.user_name,
      dob: user.dob ? user.dob.slice(0, 10) : "",
      email: user.email,
      password: "",
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setForm({_id: "", user_name: "", dob: "", email: "", password: ""});
    setIsEditing(false);
  };

  // ✅ Delete
  const confirmDelete = (user: UserItem) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    try {
      await axios.delete(`${API_URL}/${userToDelete._id}`);
      setUsers(users.filter((u) => u._id !== userToDelete._id));
      toast.success("User deleted successfully!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error deleting user");
    } finally {
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  //   const formatDate = (isoDate: string) => (isoDate ? isoDate.slice(0, 10) : "");
  const formatDate = (isoDate: string) => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.slice(0, 10).split("-");
    return `${day}-${month}-${year}`; // dd-mm-yyyy
  };
  return {
    users,
    form,
    isEditing,
    showDeleteModal,
    userToDelete,
    showPassword,
    setShowPassword,
    handleChange,
    handleSubmit,
    handleEdit,
    handleCancel,
    confirmDelete,
    handleDelete,
    formatDate,
    setShowDeleteModal,
  };
}
