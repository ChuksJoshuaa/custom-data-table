import { BlogProvider } from "@/context/BlogContext";
import Navbar from "@/components/Navbar";
import TabRoutes from "@/components/TabRoutes";
import Footer from "@/components/Footer";

const App = () => (
  <BlogProvider>
    <div className="min-h-screen bg-gray-100 w-full">
      <Navbar />
      <TabRoutes />
    </div>
    <Footer />
  </BlogProvider>
);

export default App;
