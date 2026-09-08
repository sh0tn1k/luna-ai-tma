import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { I18nProvider } from './components/I18nProvider';
import { Layout } from './components/Layout';
import { initTelegram } from './hooks/useTelegram';
import { ChatDialog } from './pages/ChatDialog';
import { Chats } from './pages/Chats';
import { CreateWizard } from './pages/CreateWizard';
import { Discover } from './pages/Discover';
import { Feed } from './pages/Feed';
import { ModelProfile } from './pages/ModelProfile';
import { Partner } from './pages/Partner';
import { Settings } from './pages/Settings';

export default function App() {
  useEffect(() => {
    initTelegram();
  }, []);

  return (
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Discover />} />
            <Route path="create" element={<CreateWizard />} />
            <Route path="model/:id" element={<ModelProfile />} />
            <Route path="chats" element={<Chats />} />
            <Route path="chats/:chatId" element={<ChatDialog />} />
            <Route path="feed" element={<Feed />} />
            <Route path="settings" element={<Settings />} />
            <Route path="partner" element={<Partner />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  );
}
