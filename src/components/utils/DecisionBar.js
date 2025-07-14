import React from 'react';

const DecisionBar = ({ selectedRow, setResponse, setEditingComment }) => (
  <div className="fixed left-0 right-0 bottom-0 z-40 bg-white border-t border-gray-200 shadow flex flex-col items-center py-3" style={{ transition: 'box-shadow 0.2s' }}>
    <div className="mb-1 text-sm text-gray-600 text-center">
      {selectedRow.index !== null ? (
        <span>
          {selectedRow.table === 'model' ? 'Modélisation' : 'Migration'} — Ligne {selectedRow.index + 1} :
          Cliquez sur un bouton ci-dessous pour définir la réponse
        </span>
      ) : (
        <span>Sélectionnez une ligne pour définir sa réponse</span>
      )}
    </div>
    <div className="flex justify-center gap-4 items-center flex-wrap">
      <button
        className={`flex flex-col items-center gap-1 p-3 border border-green-500 bg-white cursor-pointer rounded text-green-600 transition-all hover:-translate-y-1 hover:shadow-lg ${selectedRow.index === null ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => setResponse('OK')}
        disabled={selectedRow.index === null}
        title="Conforme"
      >
        <span className="text-xl">👍</span>
        <span className="text-sm">OK</span>
      </button>
      <button
        className={`flex flex-col items-center gap-1 p-3 border border-yellow-500 bg-white cursor-pointer rounded text-yellow-600 transition-all hover:-translate-y-1 hover:shadow-lg ${selectedRow.index === null ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => setResponse('NOT OK')}
        disabled={selectedRow.index === null}
        title="Non conforme"
      >
        <span className="text-xl">👎</span>
        <span className="text-sm">NOT OK</span>
      </button>
      <button
        className={`flex flex-col items-center gap-1 p-3 border border-gray-500 bg-white cursor-pointer rounded text-gray-600 transition-all hover:-translate-y-1 hover:shadow-lg ${selectedRow.index === null ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => setResponse('NA')}
        disabled={selectedRow.index === null}
        title="Non applicable"
      >
        <span className="text-xl">🚫</span>
        <span className="text-sm">NA</span>
      </button>
      <button
        className={`flex flex-col items-center gap-1 p-3 border border-blue-500 bg-white cursor-pointer rounded text-blue-600 transition-all hover:-translate-y-1 hover:shadow-lg ${selectedRow.index === null ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => setEditingComment(selectedRow)}
        disabled={selectedRow.index === null}
        title="Ajouter un commentaire"
      >
        <span className="text-xl">💬</span>
        <span className="text-sm">Commentaire</span>
      </button>
    </div>
  </div>
);

export default DecisionBar;
