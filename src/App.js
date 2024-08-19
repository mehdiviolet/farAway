import { type } from "@testing-library/user-event/dist/type";
import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];

export default function App() {
  const [newItems, setnewItems] = useState([]);

  function handleNewItems(item) {
    setnewItems((items) => [...items, item]);
  }

  function updateElement(id) {
    // const item = newItems.find((item) => item.id === id);
    setnewItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form addHandleNewItems={handleNewItems} />
      <PackingList
        newItems={newItems}
        setnewItems={setnewItems}
        updateElement={updateElement}
      />
      <Stats newItems={newItems} />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 💼</h1>;
}

function Form({ addHandleNewItems }) {
  // const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  // const [packed, setPacked] = useState(false);

  function handlerList(e) {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };
    addHandleNewItems(newItem);
    console.log(newItem);
  }
  return (
    <form className="add-form" onSubmit={handlerList}>
      <h3>What do you need for your trip ?🤩</h3>
      <select
        name="quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ newItems, setnewItems, updateElement }) {
  return (
    <div className="list">
      <ul>
        {newItems.map((item) => {
          return (
            <ListItem
              item={item}
              key={item.id}
              newItems={newItems}
              setnewItems={setnewItems}
              updateElement={updateElement}
            />
          );
        })}
      </ul>
    </div>
  );
}
function ListItem({ item, newItems, setnewItems, updateElement }) {
  function deletItem() {
    console.log(newItems);
    setnewItems((items) => items.filter((el) => el.id !== item.id));
  }

  return (
    <>
      <li>
        <input
          type="checkbox"
          onChange={() => updateElement(item.id)}
          value={item.packed}
        />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        <button onClick={deletItem}>❌</button>
      </li>
    </>
  );
}

function Stats({ newItems }) {
  if (!newItems.length)
    return (
      <p className="stats">
        <em>Start adding items to your packing list 🚀</em>
      </p>
    );

  const itemPacked = newItems.filter((item) => item.packed === true);
  const percentage = (itemPacked.length / newItems.length) * 100;

  return (
    <footer className="stats">
      {percentage === 100 && <em>WoW!</em>}
      {percentage !== 100 && (
        <em>
          💼 You have {newItems.length} items on your list, and you already
          packed {itemPacked.length} ({percentage}%)
        </em>
      )}
    </footer>
  );
}
