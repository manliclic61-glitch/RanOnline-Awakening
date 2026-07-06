import NavBar from "./site/NavBar";
import HeroSection from "./site/HeroSection";
import ServerInfoSection from "./site/ServerInfoSection";
import DownloadSection from "./site/DownloadSection";
import CommunitySection from "./site/CommunitySection";
import SiteFooter from "./site/SiteFooter";
import Donation from "./site/Donation";
import "./site/site.css";
import { serverFlag } from "./site/siteData";
export default function RanOnlineServerSite() {
  return (
    <div className="iv-root">
      <NavBar />
      <HeroSection />
      <main>
        <ServerInfoSection />
        <DownloadSection />
       {serverFlag && <Donation />}
      
        <CommunitySection />
      </main>
      <SiteFooter />
    </div>
  );
}
