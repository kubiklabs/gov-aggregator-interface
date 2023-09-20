import { RecoilRoot, useRecoilValue } from "recoil";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Modal from "react-modal";
import Stake from "./pages/stake/index";
import Split from "./pages/split/index";
// import RewardsPage from "./pages/rewards/index";
// import WithdrawPage from "./pages/withdraw";
// import PoolsPage from "./pages/pools/index";
// import  from "./pages/";
// import Rewards from "./pages/rewards/index";
// import Stats from "./pages/stats/index";
import "react-toastify/dist/ReactToastify.css";
import NavigationSidebar from "./components/common/layout/NavigationSidebar";
// import Poolinfo from "./components/pools/Poolinfo";
// import PoolsInfo from "./pages/poolsinfo";
import { ToastContainer } from "react-toastify";
import RightPane from "./components/common/layout/rightPane/RightPane";
import { responsiveState } from "./context/responsiveState";
import WalletSection from "./components/common/layout/WalletSection";

import "./App.css";

Modal.setAppElement("#root");

function App() {
  // let balanceView = false;
  // const balanceToggle = (e: boolean) => {
  //   balanceView = e;
  // };
  // const { first } = useRecoilValue(responsiveState);
  return (
    <RecoilRoot>
      <Router>
        <div className="App">
          <NavigationSidebar />
          <WalletSection />
          <div className="component-container">
            <Routes>
              <Route path="/" element={<Stake />} />
              <Route path="/split" element={<Split />} />
              {/* <Route path="/pools/:id" element={<PoolsInfo />} /> */}
              {/* <Route path="/rewards" element={<RewardsPage />} /> */}
              {/* <Route path="/withdraw" element={<WithdrawPage />} /> */}
              {/* <Route path="/rewards" element={<Rewards />} /> */}
              {/* <Route path="/stats" element={<Stats />} /> */}
            </Routes>
          </div>
          {/* <RightPane /> */}
        </div>
        <ToastContainer style={{ textAlign: "left" }} />
      </Router>
    </RecoilRoot>
  );
}

export default App;
