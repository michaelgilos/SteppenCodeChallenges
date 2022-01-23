import { useEffect, useState } from "react";
import "bulma/css/bulma.min.css";

const AddText = ({ editValue, onAddText, onEditText }) => {
  const [inputText, setInputText] = useState("");
  const [buttonLabel, setButtonLabel] = useState("Enter");

  const handleOnClick = () => {
    if (buttonLabel === "Enter") {
      onAddText(inputText);
    }

    if (buttonLabel === "Edit") {
      onEditText(inputText, editValue.index);
      setButtonLabel("Enter");
    }

    setInputText("");
  };

  useEffect(() => {
    if (editValue) {
      setInputText(editValue.text);
      setButtonLabel("Edit");
    }
  }, [editValue]);

  return (
    <div className="field is-grouped">
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="Enter text"
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
        />
      </div>
      <div className="control">
        <button className="button is-link" onClick={handleOnClick}>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

const Item = ({ text, onDelete, onEdit, index }) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="block">
      <span
        className="tag is-large"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        {text}
        {isShown && (
          <div className="buttons ml-6">
            <button
              className="button is-danger"
              onClick={() => onDelete(index)}
            >
              Delete
            </button>
            <button className="button is-info" onClick={() => onEdit(index)}>
              Edit
            </button>
          </div>
        )}
      </span>
    </div>
  );
};

export const ItemList = ({ data }) => {
  const [items, setItems] = useState(["a", "b", "c"]);
  const [editValue, setEditValue] = useState(null);

  const handleAddText = (text) => {
    console.log(text);
    setItems([...items, text]);
  };

  const handleDeleteItem = (index) => {
    console.log(index);
    setItems(items.filter((_, idx) => idx !== index));
  };

  const handleEditItem = (index) => {
    const text = items[index];
    setEditValue({ text, index });
    console.log(text);
  };

  const handleEditText = (text, index) => {
    const updateItems = [...items];
    updateItems[index] = text;
    setItems([...updateItems]);
  };

  return (
    <div className="content">
      {items.map((text, index) => (
        <Item
          key={index}
          index={index}
          text={text}
          onDelete={handleDeleteItem}
          onEdit={handleEditItem}
        />
      ))}

      <AddText
        editValue={editValue}
        onAddText={handleAddText}
        onEditText={handleEditText}
      />
    </div>
  );
};
