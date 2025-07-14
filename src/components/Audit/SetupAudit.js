import React from 'react';

export default function SetupAudit({
  setupData,
  setSetupData,
  domains,
  departments,
  completeAuditSetup,
  cancelStartAudit,
  userInfo
}) {
  const isFormValid = setupData.type && setupData.department;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
            <span className="text-white text-2xl font-bold">✓</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Initialiser un Nouvel Audit
          </h1>
          <p className="text-gray-600 text-lg">
            Configurez les paramètres de votre audit en quelques étapes simples
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-1">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${(Object.values(setupData).filter(v => v).length / 3) * 100}%` }}
            />
          </div>

          <div className="p-8">
            <div className="space-y-8">
              {/* Auditee Section */}
              <div className="relative">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <span className="w-4 h-4 mr-2 text-blue-600 font-bold">👤</span>
                  Audité
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : 'Utilisateur connecté'}
                    className="w-full p-4 pl-12 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 font-medium cursor-not-allowed"
                    disabled
                  />
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">👤</span>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <span className="text-green-500 text-lg">✓</span>
                  </div>
                </div>
              </div>

              {/* Domain Section */}
              <div className="relative">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <span className="w-4 h-4 mr-2 text-blue-600 font-bold">🏢</span>
                  Domaine
                </label>
                <div className="relative">
                  <select
                    value={setupData.type}
                    onChange={e => setSetupData({ ...setupData, type: e.target.value })}
                    className="w-full p-4 pl-12 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 font-medium hover:border-blue-300"
                  >
                    <option value="">Sélectionnez le domaine</option>
                    {domains.map(dom => (
                      <option key={dom} value={dom}>{dom}</option>
                    ))}
                  </select>
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🏢</span>
                  {setupData.type && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <span className="text-green-500 text-lg">✓</span>
                    </div>
                  )}
                </div>
                {setupData.type && (
                  <p className="text-xs text-green-600 mt-2 pl-12 font-medium">
                    ✓ Domaine sélectionné: {setupData.type}
                  </p>
                )}
              </div>

              {/* Department Section */}
              <div className="relative">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <span className="w-4 h-4 mr-2 text-blue-600 font-bold">⚙️</span>
                  Processus
                </label>
                <div className="relative">
                  <select
                    value={setupData.department}
                    onChange={e => setSetupData({ ...setupData, department: e.target.value })}
                    className="w-full p-4 pl-12 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 font-medium hover:border-blue-300"
                  >
                    <option value="">Sélectionnez le processus</option>
                    {departments.map(dep => (
                      <option key={dep} value={dep}>{dep}</option>
                    ))}
                  </select>
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">⚙️</span>
                  {setupData.department && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <span className="text-green-500 text-lg">✓</span>
                    </div>
                  )}
                </div>
                {setupData.department && (
                  <p className="text-xs text-green-600 mt-2 pl-12 font-medium">
                    ✓ Processus sélectionné: {setupData.department}
                  </p>
                )}
              </div>
            </div>

            {/* Action Section */}
            <div className="mt-10 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {isFormValid ? (
                    <span className="flex items-center text-green-600 font-medium">
                      <span className="mr-1">✓</span>
                      Prêt à continuer
                    </span>
                  ) : (
                    <span>Veuillez remplir tous les champs requis</span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={cancelStartAudit}
                    className="flex items-center px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 shadow-md hover:shadow-lg border border-gray-300"
                  >
                    <span className="mr-2">✕</span>
                    Annuler
                  </button>

                  <button
                    disabled={!isFormValid}
                    onClick={completeAuditSetup}
                    className={`
                      flex items-center px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform
                      ${isFormValid
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:scale-105 shadow-lg hover:shadow-xl'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }
                    `}
                  >
                    Continuer
                    <span className="ml-2">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        {isFormValid && (
          <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <h3 className="font-semibold text-gray-900 mb-3">Résumé de l'audit</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Audité:</span>
                <p className="font-medium text-gray-900">
                  {userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : 'Utilisateur connecté'}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Domaine:</span>
                <p className="font-medium text-gray-900">{setupData.type}</p>
              </div>
              <div>
                <span className="text-gray-600">Processus:</span>
                <p className="font-medium text-gray-900">{setupData.department}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
