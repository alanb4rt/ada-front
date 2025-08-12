import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./routes.tsx";
import { ConfigProvider, theme } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        components: {
          Card: {
            colorBgContainer: "#1D1D1D",
            colorBorderSecondary: "none",
            bodyPadding: 8,
          },
          Input: {
            activeBorderColor: "#b74040",
          },
          Layout: {
            bodyBg: "#242424",
          },
        },
      }}
    >
      <Router />
    </ConfigProvider>
  </StrictMode>
);
