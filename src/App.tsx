import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import NewArrivals from './pages/NewArrivals';
import StyleGuide from './pages/StyleGuide';
import BlogPost from './pages/BlogPost';
import About from './pages/About';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/style-guide" element={<StyleGuide />} />
            <Route path="/style-guide/:id" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}