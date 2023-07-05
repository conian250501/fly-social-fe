"use client";
import { Montserrat } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import "../styles/global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "react-phone-input-2/lib/style.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
    >
      <Provider store={store}>
        <html lang="en">
          <body
            className={montserrat.className}
            suppressHydrationWarning={true}
          >
            {children}
          </body>
        </html>
      </Provider>
    </GoogleOAuthProvider>
  );
}
