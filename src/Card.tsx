import React, { useState } from "react";

interface CardProps {
  card: { text: string };
  listIndex: number;
  cardIndex: number;
  onEdit: (listIndex: number, cardIndex: number, newText: string) => void;
  onDelete: (listIndex: number, cardIndex: number) => void;
}

const Card: React.FC<CardProps> = ({
  card,
  listIndex,
  cardIndex,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newText, setNewText] = useState<string>(card.text);

  const handleEdit = () => {
    onEdit(listIndex, cardIndex, newText);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-200 p-2 mb-2 rounded">
      {isEditing ? (
        <>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="border p-1 rounded w-full"
          />
          <button onClick={handleEdit} className="text-blue-500 ml-2">
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="text-red-500 ml-2"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          {card.text}
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 ml-2"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(listIndex, cardIndex)}
            className="text-red-500 ml-2"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default Card;
