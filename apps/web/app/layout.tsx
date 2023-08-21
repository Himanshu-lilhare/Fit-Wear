
import "./globals.css"
import GlobalProvider from "./GlobalProvider";
import { Navbar } from "ui";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>
        <Navbar/>
      
      {children}

        </GlobalProvider>
      </body>
    </html>
  );
}
