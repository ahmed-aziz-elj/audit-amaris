// a verifier 

import React from 'react';
import AuditTable from './AuditTable';
import DecisionBar from '../utils/DecisionBar.js';
import { calculateProgress, getResponseClass } from '../../index.js';

export default function AuditEditor({
  currentAudit,
  updateCurrentAudit,
  setSelectedRow,
  selectedRow,
  editingComment,
  setEditingComment,
  updateComment,
  setResponse
}) {
  if (!currentAudit) {
    return (
      <div className="p-5 bg-white text-center">
        <h3 className="text-xl text-gray-600 mb-4">Aucun audit sélectionné</h3>
        <button
          onClick={() => setSelectedRow({ table: 'model', index: 0 })}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors"
        >
          Créer un nouvel audit
        </button>
      </div>
    );
  }
  const { items = [], technical = [] } = currentAudit;
  return (
    <div className="p-5 bg-gray-50 min-h-[75vh] relative">
      {/* Audit Info */}
      <div className="mb-4 p-4 bg-gray-50 rounded">
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Titre de l'audit</label>
            <input
              type="text"
              value={currentAudit.title}
              onChange={e => updateCurrentAudit({ ...currentAudit, title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Audité</label>
            <input
              disabled
              type="text"
              value="Ayoub BEN KHIROUN"
              className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
            />
          </div>
        </div>
      </div>
      <h3 className="text-gray-700 mb-2 text-lg"> Points à auditer </h3>
      <AuditTable
        title="Modélisation"
        items={items}
        tableKey="model"
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        editingComment={editingComment}
        setEditingComment={setEditingComment}
        updateComment={updateComment}
        getResponseClass={getResponseClass}
      />
      <AuditTable
        title="Migration"
        items={technical}
        tableKey="tech"
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        editingComment={editingComment}
        setEditingComment={setEditingComment}
        updateComment={updateComment}
        getResponseClass={getResponseClass}
      />
      <DecisionBar
        selectedRow={selectedRow}
        setResponse={setResponse}
        setEditingComment={setEditingComment}
      />
      <div className="pb-32" />
    </div>
  );
}
