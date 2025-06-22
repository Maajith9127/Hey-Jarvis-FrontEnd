import React from 'react';
import { useSelector } from 'react-redux';

const RepeatModal = ({ isOpen, onClose }) => {
    const calendarEvents = useSelector(state => state.calendar.CalendarEvents);

    const todos = calendarEvents.filter(e => e.Type === "Todo");
    const accountabilities = calendarEvents.filter(e => e.Type === "Accountability");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center" onClick={onClose}>
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">🌀 Repeat Module</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-black text-xl">&times;</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-bold mb-2 text-indigo-600">📌 Todos</h3>
                        <ul className="space-y-2 max-h-64 overflow-y-auto">
                            {todos.map((todo) => (
                                <li key={todo.SpecificEventId} className="p-3 rounded-md bg-indigo-50 border border-indigo-200 shadow-sm">
                                    <div className="font-medium">{todo.title}</div>
                                    <div className="text-sm text-gray-600">{todo.timeSlot}</div>
                                </li>
                            ))}
                            {todos.length === 0 && <p className="text-sm text-gray-500">No Todos found.</p>}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-2 text-red-600">🎯 Accountabilities</h3>
                        <ul className="space-y-2 max-h-64 overflow-y-auto">
                            {accountabilities.map((acc) => (
                                <li key={acc.SpecificEventId} className="p-3 rounded-md bg-red-50 border border-red-200 shadow-sm">
                                    <div className="font-medium">{acc.title}</div>
                                    <div className="text-sm text-gray-600">{acc.timeSlot}</div>
                                </li>
                            ))}
                            {accountabilities.length === 0 && <p className="text-sm text-gray-500">No Accountabilities found.</p>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RepeatModal;
