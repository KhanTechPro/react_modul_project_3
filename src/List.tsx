import React, { useState } from 'react';

interface ListProps {
    item: { id: number; title: string };
    onDelete: (id: number) => void;
    onEdit: (id: number, newTitle: string) => void;
}

const List: React.FC<ListProps> = ({ item, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(item.title);

    const handleEdit = () => {
        onEdit(item.id, newTitle);
        setIsEditing(false);
    };

    return (
        <div className="list">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <button onClick={handleEdit}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                <>
                    <h3>{item.title}</h3>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => onDelete(item.id)}>Delete</button>
                </>
            )}
        </div>
    );
};

export default List;