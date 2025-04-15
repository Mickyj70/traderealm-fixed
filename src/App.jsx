import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { WalletProvider } from "./contexts/WalletContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/layout/Layout";
import LandingPage from "./pages/LandingPage";
import BaronsCouncil from "./pages/BaronsCouncil";
import GlobalTradeMap from "./pages/GlobalTradeMap";
import MerchantsOffice from "./pages/MerchantOffice";
import ImportLicensingOffice from "./pages/ImportLicensingOffice";
import BaronsLedger from "./pages/BaronsLedger";
import GrandAssembly from "./pages/GrandAssembly";
import NotFound from "./components/NotFound";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/council" element={<BaronsCouncil />} />
        <Route path="/map" element={<GlobalTradeMap />} />
        <Route path="/merchant" element={<MerchantsOffice />} />
        <Route path="/licensing" element={<ImportLicensingOffice />} />
        <Route path="/ledger" element={<BaronsLedger />} />
        <Route path="/assembly" element={<GrandAssembly />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <WalletProvider>
          <NotificationProvider>
            <Layout>
              <AnimatedRoutes />
            </Layout>
          </NotificationProvider>
        </WalletProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
