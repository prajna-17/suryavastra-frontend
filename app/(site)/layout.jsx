import "../globals.css";
import Header from "@/components/components-jsx/Header";
import Footer from "@/components/components-jsx/Footer";
import { ToastContainer } from "react-toastify"; // <-- add this
import "react-toastify/dist/ReactToastify.css"; // <-- add this

export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />

      {/* Toast here */}
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        theme="light"
        style={{ zIndex: 999999999999 }}
      />
    </>
  );
}
