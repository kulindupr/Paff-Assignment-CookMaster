import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {AuthProvider} from './context/AuthContext'
import {ThemeProvider} from './context/ThemeContext'
import PrivateRoute from './components/common/PrivateRoute'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CoursesPage from './pages/CoursesPage'
import CourseDetailsPage from './pages/CourseDetailsPage'
import CreateCoursePage from './pages/CreateCoursePage'
import ProfilePage from './pages/ProfilePage'
import SkillDashboardPage from './pages/SkillsDashboardPage'
import NewsFeedPage from './pages/NewsFeedPage'
import NotFoundPage from './pages/NotFoundPage'


function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div>
            <Navbar/>
            <main>
              <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/courses/:id" element={<CourseDetailsPage />} />
                <Route path="/profile/:id" element={<ProfilePage />} />
                <Route path="/news-feed" element={<NewsFeedPage />} />
              </Routes>
            </main>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
