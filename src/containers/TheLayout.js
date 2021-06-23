import React, { useState } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";

const LockAccount = React.lazy(() => import("../views/overlay/LockAccount"));

const TheLayout = ({ history }) => {
  const [isAccountLocked, setIsAccountLocked] = useState(false);

  return (
    <>
      {!isAccountLocked ? (
        <div className="c-app c-default-layout">
          <TheSidebar />
          <div className="c-wrapper">
            <TheHeader
              history={history}
              setIsAccountLocked={setIsAccountLocked}
            />
            <div className="c-body">
              <TheContent />
            </div>
            <TheFooter />
          </div>
        </div>
      ) : (
        <LockAccount setIsAccountLocked={setIsAccountLocked} />
      )}
    </>
  );
};

export default TheLayout;
