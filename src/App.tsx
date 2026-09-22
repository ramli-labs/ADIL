import { Route, Routes } from "react-router-dom";
import FeedbackToast from "./components/ui/FeedbackToast";
import Hud from "./components/ui/Hud";
import InstitutionalHeader from "./components/ui/InstitutionalHeader";
import Academy from "./pages/Academy";
import Archive from "./pages/Archive";
import CaseSelection from "./pages/CaseSelection";
import Home from "./pages/Home";
import Investigation from "./pages/Investigation";
import Profile from "./pages/Profile";
import Result from "./pages/Result";
import TeacherGuide from "./pages/TeacherGuide";
import Verdict from "./pages/Verdict";

export default function App() {
  return (
    <div className="adil-bg relative flex min-h-screen flex-col font-body text-white">
      <div className="adil-grid pointer-events-none fixed inset-0 z-0 opacity-35" />
      <InstitutionalHeader />
      <Hud />
      <main className="relative z-10 flex flex-1 flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/cases" element={<CaseSelection />} />
          <Route path="/case/:id" element={<Investigation />} />
          <Route path="/case/:id/verdict" element={<Verdict />} />
          <Route path="/case/:id/result" element={<Result />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/teacher" element={<TeacherGuide />} />
        </Routes>
      </main>
      <FeedbackToast />
      <footer className="relative z-10 flex flex-wrap justify-between gap-4 border-t border-cyan/10 px-6 py-4 font-mono text-[9.5px] tracking-[.14em] text-haze/60">
        <span>ADIL ACADEMY · AI DECISION INTELLIGENCE &amp; LOGIC · SIMULASI EDUKASI SMP</span>
        <span>"AI dapat membuat keputusan dengan cepat, tetapi manusia harus memastikan keputusan itu tetap adil."</span>
      </footer>
    </div>
  );
}
