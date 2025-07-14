import React from 'react';

const Header = ({
  imageAmaris,
  imageBouyeges,
  activeTab,
  setActiveTab,
  isDevConsult,
  createNewAudit,
  setViewMode,
  setCurrentAudit,
  setCurrentAuditId,
  handleLogout,
  setLoggedIn
}) => (
  <div className="bg-white flex justify-between items-center text-blue-700 sticky top-0 z-30 px-6 shadow-lg rounded-b-2xl h-16">
    {/* Left Logo */}
    <div className="flex items-center">
      <img src={imageAmaris} alt="Amaris Logo" className="h-8 mr-4" />
    </div>
    {/* Navigation Tabs */}
    <div className="flex h-full">
      {['quiter', 'demarrer', 'audits', 'actions', 'planning', 'reporting'].map((tab) => (
        <div
          key={tab}
          className={` 
            px-5 h-full flex items-center cursor-pointer
            transition-all duration-200 hover:bg-blue-100 font-medium
            ${activeTab === tab ? 'bg-blue-200 shadow-inner font-semibold' : ''}
            ${tab === 'demarrer' && isDevConsult ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          onClick={() => {
            if (tab === 'demarrer' && isDevConsult) return;
            setActiveTab(tab);
            if (tab === 'quiter') {
              if (window.confirm('Êtes-vous sûr de vouloir quitter?')) {
                setLoggedIn(false);
                handleLogout();
                setActiveTab('audits');
              }
            } else if (tab === 'demarrer') {
              createNewAudit();
            } else if (tab === 'audits') {
              setViewMode('list');
              setCurrentAudit(null);
              setCurrentAuditId(null);
            }
          }}
          title={tab === 'demarrer' && isDevConsult ? 'Accès réservé aux TL et CDP' : undefined}
        >
          {tab === 'quiter' ? 'Quiter' :
            tab === 'demarrer' ? 'Démarrer AUDIT' :
              tab.toUpperCase()}
        </div>
      ))}
    </div>
    {/* Right Logo */}
    <div className="flex items-center">
      <img src={imageBouyeges} alt="Amaris Logo" className="h-8" />
    </div>
  </div>
);

export default Header;
