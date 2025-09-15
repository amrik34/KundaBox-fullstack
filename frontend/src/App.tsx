import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import NameList from "./pages/NameList";
import UserServices from "./pages/users/Users";
import {NavLink} from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-md border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            {/* Logo / Title */}
            <h1 className="text-xl font-bold text-blue-600">Kunda Box</h1>

            {/* Navigation Links */}
            <nav className="flex gap-6">
              <NavLink
                to="/"
                className={({isActive}) =>
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-blue-600 transition-colors"
                }>
                Name List
              </NavLink>

              <NavLink
                to="/users"
                className={({isActive}) =>
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-blue-600 transition-colors"
                }>
                Users
              </NavLink>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/names" element={<NameList />} />
          <Route path="/users" element={<UserServices />} />
          <Route path="*" element={<NameList />} /> {/* default route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
