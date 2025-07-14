import React from 'react';
import { FileText, User, Calendar, UserCheck, Gauge, Plus } from 'lucide-react';
import { calculateProgress, getResponseClass } from '../../index.js';

export default function AuditList({
  allAudits = [], // Default to empty array
  selectAudit,
  createNewAudit,
  isDevConsult
}) {
  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Mes Audits</h2>
            <p className="text-gray-600">Liste de tous vos audits en cours et terminés</p>
          </div>
          <button
            onClick={createNewAudit}
            disabled={isDevConsult}
            className={`flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 ${isDevConsult ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={isDevConsult ? "Accès réservé aux TL et CDP" : "Créer un nouvel audit"}
          >
            <Plus className="w-5 h-5 mr-2" />
            Nouvel Audit
          </button>
        </div>
        {/* Audit Cards Grid */}
        <div className="grid gap-6">
          {allAudits.map(audit => (
            <div
              key={audit.id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              onClick={() => selectAudit(audit)}
            >
              <div className="p-6">
                {/* Header with title and status */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    {audit.title}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    audit.status === 'Terminé' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {audit.status}
                  </span>
                </div>
                {/* Audit Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-700 mb-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-blue-500" />
                    <span><strong className="text-gray-600">Auditeur:</strong> {audit.auditor}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                    <span><strong className="text-gray-600">Date:</strong> {new Date(audit.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center">
                    <UserCheck className="w-4 h-4 mr-2 text-blue-500" />
                    <span><strong className="text-gray-600">Audité:</strong> {audit.auditee || 'Non défini'}</span>
                  </div>
                  <div className="flex items-center">
                    <Gauge className="w-4 h-4 mr-2 text-blue-500" />
                    <span><strong className="text-gray-600">Conformité:</strong> {calculateProgress(audit.items, audit.technical)}%</span>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progression</span>
                    <span>{calculateProgress(audit.items, audit.technical)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${calculateProgress(audit.items, audit.technical)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
