import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./routes.tsx";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            bodyBg: "#242424",
          },
          Typography: {
            colorText: "white",
            colorTextHeading: "white",
          },
        },
      }}
    >
      <Router />
    </ConfigProvider>
  </StrictMode>
);
