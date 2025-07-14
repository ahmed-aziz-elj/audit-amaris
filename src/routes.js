import { Routes, Route, useNavigate } from 'react-router-dom';
import TopBar from './components/TopBar';
import Header from './components/Header';
import AuditList from './components/Audit/AuditList';
import AuditEditor from './components/Audit/AuditEditor';
import Actions from './components/Actions';
import Planning from './components/Planning';
import Reporting from './components/Reporting';
import Quit from './components/Authentification/Quit';
import SetupAudit from './components/Audit/SetupAudit';

const AppRouter = (props) => {
  const navigate = useNavigate();
  const {
    userInfo, imageAmaris, imageBouyeges, activeTab, setActiveTab, isDevConsult, createNewAudit, setViewMode, setCurrentAudit, setCurrentAuditId, handleLogout, setLoggedIn, renderAuditEditor, renderAuditsList, viewMode, setupMode, setupData, setSetupData, domains, departments, completeAuditSetup, cancelStartAudit
  } = props;
  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <TopBar userInfo={userInfo} />
      <Header
        imageAmaris={imageAmaris}
        imageBouyeges={imageBouyeges}
        activeTab={activeTab}
        setActiveTab={tab => {
          setActiveTab(tab);
          if (tab === 'quiter') navigate('/quit');
          else if (tab === 'demarrer') navigate('/setup');
          else if (tab === 'audits') navigate('/audits');
          else if (tab === 'actions') navigate('/actions');
          else if (tab === 'planning') navigate('/planning');
          else if (tab === 'reporting') navigate('/reporting');
        }}
        isDevConsult={isDevConsult}
        createNewAudit={createNewAudit}
        setViewMode={setViewMode}
        setCurrentAudit={setCurrentAudit}
        setCurrentAuditId={setCurrentAuditId}
        handleLogout={handleLogout}
        setLoggedIn={setLoggedIn}
      />
      <div className="max-w-4xl mx-auto">
        <Routes>
          <Route path="/home" element={viewMode === 'editor' ? renderAuditEditor() : renderAuditsList()} />
          <Route path="/actions" element={<Actions />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/reporting" element={<Reporting />} />
          <Route path="/quit" element={<Quit />} />
          <Route path="/audit" element={<SetupAudit setupData={setupData} setSetupData={setSetupData} userInfo={userInfo} domains={domains} departments={departments} completeAuditSetup={completeAuditSetup} cancelStartAudit={cancelStartAudit} />} />
          <Route path="*" element={viewMode === 'editor' ? renderAuditEditor() : renderAuditsList()} />
        </Routes>
      </div>
    </div>
  );
};

export default AppRouter;
