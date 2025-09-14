import {useState} from "react";

interface NameItem {
  id: number;
  value: string;
  isEditing: boolean;
}

function App() {
  const [input, setInput] = useState("");
  const [names, setNames] = useState<NameItem[]>([]);

  const handleSubmit = () => {
    if (!input.trim()) return;
    const newNames = input
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    const nameItems = newNames.map((name, index) => ({
      id: Date.now() + index,
      value: name,
      isEditing: false,
    }));

    setNames([...names, ...nameItems]);
    setInput("");
  };

  const handleDelete = (id: number) => {
    setNames(names.filter((n) => n.id !== id));
  };

  const handleEdit = (id: number) => {
    setNames(
      names.map((n) => (n.id === id ? {...n, isEditing: !n.isEditing} : n))
    );
  };

  const handleChange = (id: number, value: string) => {
    setNames(names.map((n) => (n.id === id ? {...n, value} : n)));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Name List Manager
        </h1>
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter names separated by commas"
            className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700">
            Submit
          </button>
        </div>

        {names.length > 0 && (
          <table className="w-full border border-gray-300 bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {names.map((n) => (
                <tr key={n.id} className="border-t">
                  <td className="p-2">
                    {n.isEditing ? (
                      <input
                        value={n.value}
                        onChange={(e) => handleChange(n.id, e.target.value)}
                        className="border rounded p-1 w-full"
                      />
                    ) : (
                      <span>{n.value}</span>
                    )}
                  </td>
                  <td className="p-2 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(n.id)}
                      className="text-blue-600 hover:underline">
                      {n.isEditing ? "Save" : "Edit"}
                    </button>
                    <button
                      onClick={() => handleDelete(n.id)}
                      className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
