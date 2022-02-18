import { Link, NavLink } from "react-router-dom";

const Navigation = () => {
  const items = [
    { name: "Home", to: "/" },
    { name: "New Comment", to: "/new-comment" },
  ];

  return (
    <nav>
      <ul>
        {items.map((item) => (
          <li>
            <NavLink
              style={({ isActive }) => (isActive ? { color: "red" } : null)}
              to={item.to}
              state={"Navigated"}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
