import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imageAmaris from './assets/image-amaris.png';
import imageBouyeges from './assets/image-bouygues.png';
import { CheckCircle, User, 
  Calendar, Plus, FileText, ArrowLeft, Printer, Trash2, 
  UserCheck, Gauge, BadgeInfo } from 'lucide-react';
import { keycloak, initKeycloak } from './components/Authentification/keycloakService.js';
import Header from './components/Header';
import TopBar from './components/TopBar';
import AppRouter from './routes';
import SetupAudit from './components/Audit/SetupAudit';
import AuditList from './components/Audit/AuditList';
import AuditEditor from './components/Audit/AuditEditor';

const AuditApp = () => {
  // ----------- AUTH STATE -----------
  const [loggedIn, setLoggedIn] = useState(true);
  const [loginData, setLoginData] = useState({ login: '', password: '' });

  // ----------- MAIN APP STATE -----------
  const [setupMode, setSetupMode] = useState(true);
  const [setupData, setSetupData] = useState({ auditee: '', type: '', department: '' });
  const [activeTab, setActiveTab] = useState('audits');
  const [selectedRow, setSelectedRow] = useState({ table: 'model', index: null });
  const [editingComment, setEditingComment] = useState({ table: null, index: null });
  const [, setCurrentAuditId] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [allAudits, setAllAudits] = useState([
    {
      id: 1,
      title: 'AUDIT XXXXX',
      auditor: 'AHMED AZIZ ELJ',
      auditee: 'R&S PROJET X',
      date: '2025-06-15',
      status: 'En cours',
      items: [
        { no: 1, question: 'Nomenclature normalisée', response: 'OK', commentaire: 'Tous les documents sont à jour' },
        { no: 2, question: 'Utilisation des sous-processus', response: 'NOT OK', commentaire: 'Bien fait' },
        { no: 3, question: 'Utilisation correcte des gateways', response: 'OK', commentaire: '' },
        { no: 4, question: 'Événements de début et fin', response: 'NC', commentaire: 'Manque documentation' },
        { no: 5, question: 'Modèle lisible visuellement', response: '', commentaire: '' },
        { no: 6, question: 'Utilisation correcte des pools et lanes (participants)', response: 'OK', commentaire: '' },
        { no: 7, question: 'Documentation BPMN intégrée', response: 'NC', commentaire: 'A Mettre à jour' },
        { no: 8, question: 'Optimisation de la modélisation', response: 'OK', commentaire: '' }
      ],
      technical:
        [
          { no: 1, question: 'Mapping clair des erreurs attendues dans les connecteurs', response: 'OK', commentaire: 'Tous les documents sont à jour' },
          { no: 2, question: 'Tests de bout en bout', response: 'NOT OK', commentaire: 'Bien fait' },
          { no: 3, question: 'Intégration des formulaires de tâches utilisateur', response: 'OK', commentaire: '' },
          { no: 4, question: 'Mise en place d\'un système de retry dans les workers', response: 'NC', commentaire: 'Manque documentation' },
          { no: 5, question: 'Vérification des timeouts et durées d\'expiration des jobs', response: '', commentaire: '' },
          { no: 6, question: 'Validation avec métier', response: 'OK', commentaire: '' }
        ],
    }
  ]);
  const [currentAudit, setCurrentAudit] = useState(null);
  // ----------- KEYCLOAK AUTH STATE -----------
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  // Stocke les informations de l'utilisateur connecté
  const [userInfo, setUserInfo] = useState(null);
  const departments = [
    "DI FTTA",
    "DI ZTD",
    "DI CSG - TRANS FTTA",
    "DI RAN4",
    "DI FH",
    "DI DEMONTAGE RADIO",
    "DI VERCORS",
    "DI_CROZON",
    "VDR RADIO CZ",
    "AMBI MOBILE CZ",
    "AMBI MOBILE ZTD",
    "VDR FH",
    "RENO CZ",
    "DEMONT ROUT TRAP"
  ];
  const domains = [
    "Fixe",
    "Transport",
    "Mobile-Radio",
    "Mobile-Trans",
    "Transverse"
  ]

 // ----------- KEYCLOAK INITIALIZATION -----------
  // useEffect(() => {
  //   const init = async () => {
  //     try {
  //       const authenticated = await initKeycloak();
  //       setAuthenticated(authenticated);
  //       setKeycloakInitialized(true);
  //       if (authenticated) {
  //         const profile = await keycloak.loadUserProfile();
  //         setUserInfo(profile);
  //       }
  //       console.log('Keycloak initialized, authenticated:', authenticated);
  //     } catch (err) {
  //       console.error('Keycloak initialization failed:', err);
  //     } finally {
  //       setLoading(false);
  //       console.log('Keycloak loading finished');
  //     }
  //   };
  //   init();
  //   const tokenRefreshInterval = setInterval(() => {
  //     if (keycloak.authenticated) {
  //       keycloak.updateToken(30).catch(() => {
  //         console.error('Failed to refresh token');
  //         keycloak.login();
  //       });
  //     }
  //   }, 60000);

  //   return () => clearInterval(tokenRefreshInterval);
  // }, []);

  useEffect(() => {
    // if (true) {
    //   keycloak.login();
    // }
  }, [keycloakInitialized, authenticated, loading]);

    // ----------- AUTH HANDLERS -----------
  const handleLogin = () => {
    keycloak.login();
  };

  const handleLogout = () => {
    keycloak.logout();
  };

  const completeAuditSetup = () => {
    const newId = Math.max(...allAudits.map(a => a.id), 0) + 1;
    const auditorName = userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : 'Utilisateur';
    const newAudit = {
      id: newId,
      title: `AUDIT ${String(newId).padStart(5, '0')}`,
      auditor: auditorName,
      auditee: '',
      date: new Date().toISOString().split('T')[0],
      status: 'En cours',
      items: [
        { no: 1, question: 'Nomenclature normalisée', response: '', commentaire: '' },
        { no: 2, question: 'Utilisation des sous-processus', response: '', commentaire: '' },
        { no: 3, question: 'Utilisation correcte des gateways', response: '', commentaire: '' },
        { no: 4, question: 'Événements de début et fin', response: '', commentaire: '' },
        { no: 5, question: 'Modèle lisible visuellement', response: '', commentaire: '' },
        { no: 6, question: 'Utilisation correcte des pools et lanes (participants)', response: '', commentaire: '' },
        { no: 7, question: 'Documentation BPMN intégrée', response: '', commentaire: '' },
        { no: 8, question: 'Optimisation de la modélisation', response: '', commentaire: '' }
      ],
      technical:
        [
          { no: 1, question: 'Mapping clair des erreurs attendues dans les connecteurs', response: '', commentaire: '' },
          { no: 2, question: 'Tests de bout en bout', response: '', commentaire: '' },
          { no: 3, question: 'Intégration des formulaires de tâches utilisateur', response: '', commentaire: '' },
          { no: 4, question: 'Mise en place d\'un système de retry dans les workers', response: '', commentaire: '' },
          { no: 5, question: 'Vérification des timeouts et durées d\'expiration des jobs', response: '', commentaire: '' },
          { no: 6, question: 'Validation avec métier', response: '', commentaire: '' }
        ],
    };
    setAllAudits([...allAudits, newAudit]);
    setCurrentAudit(newAudit);
    setCurrentAuditId(newId);
    setActiveTab('audits');
    setViewMode('editor');
    setSelectedRow({ table: 'model', index: 0 });
    setSetupMode(false);
    setSetupData({
    auditee: "Ayoub BEN KHIROUN",
    type: "",
    department: ""
    });
  };
  const cancelStartAudit=()=>{
    const newId = Math.max(...allAudits.map(a => a.id), 0) + 1;
    setCurrentAuditId(newId);
    setActiveTab('audits');
    setViewMode('list');
    setSelectedRow({ table: 'model', index: 0 });
    setSetupMode(false);

    };

  // ----------- LOADING SCREEN -----------
  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
  //       <div className="flex flex-col items-center">
  //         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
  //         <div className="text-xl text-blue-700 font-bold">Chargement...</div>
  //       </div>
  //     </div>
  //   );
  // }

  // if (!authenticated) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
  //       <div className="flex flex-col items-center">
  //         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
  //         <div className="text-xl text-blue-700 font-bold">Chargement...</div>
  //       </div>
  //     </div>
  //   );
  // }

  // ----------- SETUP MODE -----------
  if (setupMode) {
    const isFormValid = setupData.type && setupData.department;
    
    return (
      <SetupAudit
        setupData={setupData}
        setSetupData={setSetupData}
        domains={domains}
        departments={departments}
        completeAuditSetup={completeAuditSetup}
        cancelStartAudit={cancelStartAudit}
        userInfo={userInfo}
      />
    );
  }

  // ----------- PROGRESS CALC -----------
  const calculateProgress = (auditItems, auditItems2) => {
    const totalQuestions = auditItems.length + auditItems2.length;
    console.log(totalQuestions, "totalQuest");

    const OK_Response = auditItems.filter(item => item.response && item.response === 'OK').length;
    return totalQuestions > 0 ? Math.round((OK_Response / totalQuestions) * 100) : 0;
  };

  // ----------- GROUP + ROLE CHECK -----------
  const isDevConsult = keycloak.hasRealmRole('audit:consult');

  // ----------- AUDIT CRUD -----------
  const createNewAudit = () => {
    if (isDevConsult) return;
    setSetupMode(true);
  };

  const selectAudit = (audit) => {
    setCurrentAudit(audit);
    setCurrentAuditId(audit.id);
    setViewMode('editor');
    setSelectedRow({ table: 'model', index: 0 });
  };

  const updateCurrentAudit = (updatedAudit) => {
    setCurrentAudit(updatedAudit);
    setAllAudits(allAudits.map(audit => audit.id === updatedAudit.id ? updatedAudit : audit));
  };

  // ----------- DECISION/COMMENT BAR -----------

const setResponse = (response) => {
  if (!currentAudit || selectedRow.index === null) return;

  let updatedAudit = { ...currentAudit };

  if (selectedRow.table === 'model') {
    updatedAudit.items = updatedAudit.items.map((item, i) =>
      i === selectedRow.index ? { ...item, response } : item
    );
  } else {
    updatedAudit.technical = updatedAudit.technical.map((item, i) =>
      i === selectedRow.index ? { ...item, response } : item
    );
  }

  updateCurrentAudit(updatedAudit);

  const { index, table } = selectedRow;
  const rows = table === 'model' ? updatedAudit.items : updatedAudit.technical;
  const nextIndex = index + 1;

  if (nextIndex < rows.length) {
    setSelectedRow({ index: nextIndex, table });
  } else {
    // Only move to the next table if coming from 'model'
    if (table === 'model' && updatedAudit.technical.length > 0) {
      setSelectedRow({ index: 0, table: 'tech' });
    } else {
      setSelectedRow({ index: null, table: null }); // No more rows
    }
  }
};

  const updateComment = (table, index, newComment) => {
    let updatedAudit = { ...currentAudit };
    if (table === 'model') {
      updatedAudit.items = updatedAudit.items.map((item, i) =>
        i === index ? { ...item, commentaire: newComment } : item
      );
    } else {
      updatedAudit.technical = updatedAudit.technical.map((item, i) =>
        i === index ? { ...item, commentaire: newComment } : item
      );
    }
    updateCurrentAudit(updatedAudit);
  };

  // ----------- PRINTING -----------
  const printAudit = () => {
    const audit = currentAudit;

    const printTable = (title, items) => `
    <h3>${title}</h3>
    <table>
      <thead>
        <tr><th>NO</th><th>RÈGLE</th><th>RÉPONSE</th><th>COMMENTAIRE</th></tr>
      </thead>
      <tbody>
        ${items.map(item => `
          <tr>
            <td>${item.no}</td>
            <td>${item.question}</td>
            <td>${item.response || 'Pas de réponse'}</td>
            <td>${item.commentaire || 'Pas de commentaire'}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

    const printContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Audit Report - ${audit.title}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
          line-height: 1.4;
          color: #333;
          font-size: 13px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #333;
          padding-bottom: 8px;
          margin-bottom: 16px;
        }

        .header-logo {
          max-height: 45px;
        }

        .header-title {
          flex-grow: 1;
          text-align: center;
        }

        .header-title h1 {
          margin: 0;
          font-size: 20px;
        }

        .header-title h2 {
          margin: 4px 0 0;
          font-size: 15px;
          color: #444;
        }

        .audit-info {
          background: #f9f9f9;
          padding: 10px 14px;
          margin-bottom: 16px;
          border-radius: 4px;
          border-left: 3px solid #007BFF;
        }

        .table-wrapper {
          display: grid;
          grid-template-columns: 1fr;
        }

        table {
          width: 100%;
          table-layout: fixed;
          border-collapse: collapse;
          margin-bottom: 20px;
          font-size: 12px;
        }

        th, td {
          border: 1px solid #ccc;
          padding: 6px 8px;
          text-align: left;
          vertical-align: top;
          word-wrap: break-word;
        }

        th:nth-child(1), td:nth-child(1) { width: 6%; }   /* NO */
        th:nth-child(2), td:nth-child(2) { width: 34%; }  /* RÈGLE */
        th:nth-child(3), td:nth-child(3) { width: 30%; }  /* RÉPONSE */
        th:nth-child(4), td:nth-child(4) { width: 30%; }  /* COMMENTAIRE */

        th {
          background-color: #f0f4f8;
          font-weight: 600;
          color: #222;
        }

        tbody tr:nth-child(even) {
          background-color: #fdfdfd;
        }

        h3 {
          margin-top: 16px;
          margin-bottom: 6px;
          font-size: 14px;
          color: #007BFF;
        }

        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 11px;
          color: #888;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <img src="${imageAmaris}" alt="Logo Amaris" class="header-logo" />
        <div class="header-title">
          <h1>RAPPORT D'AUDIT</h1>
          <h2>${audit.title}</h2>
        </div>
        <img src="${imageBouyeges}" alt="Logo Bouygues" class="header-logo" />
      </div>

      <div class="audit-info">
        <p><strong>Auditeur:</strong> ${audit.auditor}</p>
        <p><strong>Audité:</strong> ${audit.auditee || 'Ayoub Ben Khiroun'}</p>
        <p><strong>Date:</strong> ${new Date(audit.date).toLocaleDateString('fr-FR')}</p>
        <p><strong>Taux de conformités:</strong> ${calculateProgress(audit.items, audit.technical)}%</p>
      </div>

      <div class="table-wrapper">
        ${printTable('Modélisation', audit.items)}
        ${printTable('Migration', audit.technical)}
      </div>

      <div class="footer">
        Rapport généré le ${new Date().toLocaleString('fr-FR')}
      </div>

      <script>window.onload = function() { window.print(); }</script>
    </body>
    </html>
  `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
  };



  // ----------- ACTIONS -----------
  const terminateAudit = () => {
    if (window.confirm('Êtes-vous sûr de vouloir terminer cet audit?')) {
      const updatedAudit = { ...currentAudit, status: 'Terminé' };
      updateCurrentAudit(updatedAudit);
      setViewMode('list');
      setCurrentAudit(null);
      setCurrentAuditId(null);
      alert('Audit terminé avec succès!');
    }
  };

  const deleteAudit = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet audit?')) {
      setAllAudits(allAudits.filter(audit => audit.id !== currentAudit.id));
      setViewMode('list');
      setCurrentAudit(null);
      setCurrentAuditId(null);
      alert('Audit supprimé');
    }
  };

  const goBackToList = () => {
    setViewMode('list');
    setCurrentAudit(null);
    setCurrentAuditId(null);
  };

  // ----------- RENDER HELPERS -----------
  const getResponseClass = (response) => {
    switch (response) {
      case 'OK': return 'bg-green-100 text-green-800';
      case 'NOT OK': return 'bg-red-100 text-red-800';
      case 'NC': return 'bg-yellow-100 text-yellow-800';
      case 'NA': return 'bg-gray-100 text-gray-800';
      default: return '';
    }
  };

  // ----------- RENDER -----------
  return (
    <AppRouter
      userInfo={userInfo}
      imageAmaris={imageAmaris}
      imageBouyeges={imageBouyeges}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isDevConsult={isDevConsult}
      createNewAudit={createNewAudit}
      setViewMode={setViewMode}
      setCurrentAudit={setCurrentAudit}
      setCurrentAuditId={setCurrentAuditId}
      handleLogout={handleLogout}
      setLoggedIn={setLoggedIn}
      renderAuditEditor={() => (
        <AuditEditor
          currentAudit={currentAudit}
          updateCurrentAudit={updateCurrentAudit}
          setSelectedRow={setSelectedRow}
          selectedRow={selectedRow}
          editingComment={editingComment}
          setEditingComment={setEditingComment}
          updateComment={updateComment}
          setResponse={setResponse}
        />
      )}
      renderAuditsList={() => (
        <AuditList
          allAudits={allAudits}
          selectAudit={selectAudit}
          createNewAudit={createNewAudit}
          isDevConsult={isDevConsult}
        />
      )}
      viewMode={viewMode}
      setupMode={setupMode}
      setupData={setupData}
      setSetupData={setSetupData}
      domains={domains}
      departments={departments}
      completeAuditSetup={completeAuditSetup}
      cancelStartAudit={cancelStartAudit}
    />
  );
};

export default AuditApp;
