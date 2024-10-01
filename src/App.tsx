import React, { useState } from "react";

interface Card {
  text: string;
}

interface List {
  title: string;
  cards: Card[];
}

const App: React.FC = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [newListTitle, setNewListTitle] = useState<string>("");
  const [newCardText, setNewCardText] = useState<string>("");
  const [editingListIndex, setEditingListIndex] = useState<number | null>(null);
  const [editingCard, setEditingCard] = useState<{
    listIndex: number;
    cardIndex: number;
  } | null>(null);

  // Add a new list
  const addList = () => {
    if (newListTitle.trim()) {
      setLists([...lists, { title: newListTitle, cards: [] }]);
      setNewListTitle("");
    }
  };

  // Add a new card to the selected list
  const addCard = (listIndex: number) => {
    if (newCardText.trim()) {
      const updatedLists = [...lists];
      updatedLists[listIndex].cards.push({ text: newCardText });
      setLists(updatedLists);
      setNewCardText("");
    }
  };

  // Delete a list
  const deleteList = (listIndex: number) => {
    const updatedLists = lists.filter((_, index) => index !== listIndex);
    setLists(updatedLists);
  };

  // Edit the list title
  const editListTitle = (listIndex: number) => {
    setEditingListIndex(listIndex);
    setEditingList(true);
  };

  // Save the edited list title
  const saveListTitle = (listIndex: number, newTitle: string) => {
    const updatedLists = [...lists];
    updatedLists[listIndex].title = newTitle;
    setLists(updatedLists);
    setEditingListIndex(null);
    setEditingList(false);
  };

  // Edit card text
  const editCard = (listIndex: number, cardIndex: number) => {
    setEditingCard({ listIndex, cardIndex });
    setEditingCard(true);
  };

  // Save card text
  const saveCardText = (
    listIndex: number,
    cardIndex: number,
    newText: string
  ) => {
    const updatedLists = [...lists];
    updatedLists[listIndex].cards[cardIndex].text = newText;
    setLists(updatedLists);
    setEditingCard(null);
    setEditingCard(false);
  };

  // Delete card
  const deleteCard = (listIndex: number, cardIndex: number) => {
    const updatedLists = [...lists];
    updatedLists[listIndex].cards = updatedLists[listIndex].cards.filter(
      (_, idx) => idx !== cardIndex
    );
    setLists(updatedLists);
  };

  // Handle list title input change
  const handleListTitleChange = (
    listIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedLists = [...lists];
    updatedLists[listIndex].title = event.target.value;
    setLists(updatedLists);
  };

  // Handle card text input change
  const handleCardTextChange = (
    listIndex: number,
    cardIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedLists = [...lists];
    updatedLists[listIndex].cards[cardIndex].text = event.target.value;
    setLists(updatedLists);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6 text-3xl font-bold text-center text-white bg-green-600">
        React Trello Clone
      </div>
      <div className="p-4 flex gap-4">
        {lists.map((list, listIndex) => (
          <div
            key={listIndex}
            className="bg-white p-4 rounded-lg shadow-lg w-64"
          >
            {editingListIndex === listIndex ? (
              <div>
                <input
                  className="border p-2 rounded w-full mb-2"
                  type="text"
                  value={list.title}
                  onChange={(e) => handleListTitleChange(listIndex, e)}
                />
                <div className="flex justify-between">
                  <button
                    className="text-green-500"
                    onClick={() => saveListTitle(listIndex, list.title)}
                  >
                    Save
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => deleteList(listIndex)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <h2 className="text-lg font-bold mb-4 flex justify-between items-center">
                {list.title}
                <button
                  onClick={() => editListTitle(listIndex)}
                  className="text-blue-500"
                >
                  {/* Pen Icon for Editing List */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M17.414 2.586a2 2 0 010 2.828l-10 10A2 2 0 016 16H3a1 1 0 01-1-1v-3a2 2 0 01.586-1.414l10-10a2 2 0 012.828 0zM5 13v2h2l7.586-7.586-2-2L5 13z" />
                  </svg>
                </button>
              </h2>
            )}

            {list.cards.map((card, cardIndex) => (
              <div key={cardIndex} className="bg-gray-200 p-2 mb-2 rounded">
                {editingCard &&
                editingCard.listIndex === listIndex &&
                editingCard.cardIndex === cardIndex ? (
                  <div>
                    <input
                      className="border p-2 rounded w-full"
                      type="text"
                      value={card.text}
                      onChange={(e) =>
                        handleCardTextChange(listIndex, cardIndex, e)
                      }
                    />
                    <div className="flex justify-between">
                      <button
                        className="text-green-500"
                        onClick={() =>
                          saveCardText(listIndex, cardIndex, card.text)
                        }
                      >
                        Save
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => deleteCard(listIndex, cardIndex)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span>{card.text}</span>
                    <button
                      onClick={() => editCard(listIndex, cardIndex)}
                      className="text-blue-500"
                    >
                      {/* Pen Icon for Editing Card */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M17.414 2.586a2 2 0 010 2.828l-10 10A2 2 0 016 16H3a1 1 0 01-1-1v-3a2 2 0 01.586-1.414l10-10a2 2 0 012.828 0zM5 13v2h2l7.586-7.586-2-2L5 13z" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ))}

            <input
              className="border p-2 rounded w-full mb-2"
              type="text"
              value={newCardText}
              onChange={(e) => setNewCardText(e.target.value)}
              placeholder="Enter card text"
            />
            <button
              className="text-green-500 mt-2"
              onClick={() => addCard(listIndex)}
            >
              + Add a card
            </button>
          </div>
        ))}

        <div className="flex flex-col items-center">
          <input
            className="border p-2 rounded mb-2"
            type="text"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            placeholder="Enter list title"
          />
          <button
            className="bg-green-500 text-white p-4 rounded-lg shadow-lg hover:bg-green-600"
            onClick={addList}
          >
            + Add a list
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
