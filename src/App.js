import { useState } from "react";

export default function App() {
  const [newItems, setnewItems] = useState([]);

  function handleNewItems(item) {
    setnewItems((items) => [...items, item]);
  }

  function deleteItem(id) {
    // console.log(newItems.filter((item) => item.id !== id));
    // const newI = { name: "Me" };
    // console.log(setnewItems((item) => [...item, newI]));
    // console.log(setnewItems((newItems) => [...newItems, newI]));
    // console.log(setnewItems((items) => items.filter(items.id !== id)));

    setnewItems((items) => items.filter((item) => item.id !== id));
  }

  function updateElement(id) {
    // const item = newItems.find((item) => item.id === id);
    setnewItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirm = window.confirm(
      "Are you sure you want to delete all items?"
    );
    confirm && setnewItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form addHandleNewItems={handleNewItems} />
      <PackingList
        newItems={newItems}
        setnewItems={setnewItems}
        updateElement={updateElement}
        deleteItem={deleteItem}
        handleClearList={handleClearList}
      />
      <Stats newItems={newItems} />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far away 💼</h1>;
}

function Form({ addHandleNewItems }) {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  function handlerList(e) {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };
    addHandleNewItems(newItem);
    setDescription("");
    setQuantity(1);
    // console.log(newItem);
  }
  return (
    <form className="add-form" onSubmit={handlerList}>
      <h3>What do you need for your trip?🤩</h3>
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

function PackingList({ newItems, updateElement, deleteItem, handleClearList }) {
  // const sortItem = newItems.sort((b, a) => a.description - b);
  // console.log(...sortItem);
  // const [input, setInput] = useState(false);
  // const [description, setDescription] = useState(false);
  // const [packed, setPacked] = useState(false);
  const [sortedBy, setSortedBy] = useState("input");

  function handleChange(e) {
    setSortedBy(e.target.value);
    // if (value === "description") setDescription(!description);
    // if (value === "input") setInput(!input);
    // if (value === "packed") setPacked(!packed);
  }
  let sortedItems;
  if (sortedBy === "input") sortedItems = newItems;
  if (sortedBy === "description")
    sortedItems = newItems
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortedBy === "packed")
    sortedItems = newItems
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      {newItems.length ? (
        <>
          <ul>
            {sortedItems.map((item) => {
              return (
                <ListItem
                  item={item}
                  key={item.id}
                  updateElement={updateElement}
                  deleteItem={deleteItem}
                />
              );
            })}
          </ul>
          <div className="actions">
            <select onChange={handleChange} value={sortedBy}>
              <option value="input">Sort by input order</option>
              <option value="description">Sort by description</option>
              <option value="packed">Sort by packed status</option>
            </select>
            <button onClick={handleClearList}>Clear</button>
          </div>
        </>
      ) : (
        <p>Add items!😀</p>
      )}
    </div>
  );
}
function ListItem({ item, updateElement, deleteItem }) {
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
        <button onClick={() => deleteItem(item.id)}> ❌</button>
      </li>
    </>
  );
}

function Stats({ newItems }) {
  if (!newItems.length)
    return (
      <p className="stats">
        <em>Start adding items to your packing list🚀</em>
      </p>
    );

  const itemPacked = newItems.filter((item) => item.packed === true);
  const percentage = Math.round((itemPacked.length / newItems.length) * 100);

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
