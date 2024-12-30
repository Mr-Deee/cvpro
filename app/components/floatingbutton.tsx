'use client';

import { useState } from 'react';

export default function FloatingButtonDialog() {
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  return (
    <div>
      {/* Floating Button */}
      <button
        onClick={openDialog}
        className="fixed bottom-4 right-4 bg-blue-500 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-blue-600 transition"
      >
        +
      </button>

      {/* Dialog Box */}
      {showDialog && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeDialog}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-80"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside dialog
          >
            <h2 className="text-lg font-semibold mb-4">Dialog Title</h2>
            <p className="text-gray-700 mb-4">
              This is a dialog box. You can put any content here.
            </p>
            <button
              onClick={closeDialog}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
