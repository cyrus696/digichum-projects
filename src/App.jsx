import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Buy from './pages/Buy';
import Rent from './pages/Rent';
import Sell from './pages/Sell';
import Plots from './pages/Plots';
import NewsArticles from './pages/NewsArticles';
import Login from './pages/Login';
import Signup from './pages/Signup';

import PropertyDetails from './pages/PropertyDetails';
import Dashboard from './pages/Dashboard';
import PropertyListing from './pages/PropertyListing';
import SellPropertyForm from './pages/SellPropertyForm';

// Tools
import EMICalculator from './pages/tools/EMICalculator';
import AffordabilityCalculator from './pages/tools/AffordabilityCalculator';
import EligibilityCalculator from './pages/tools/EligibilityCalculator';
import HomeLoans from './pages/tools/HomeLoans';
import BudgetEstimator from './pages/tools/BudgetEstimator';
import RatesTrends from './pages/tools/RatesTrends';
import BuyingGuide from './pages/tools/BuyingGuide';

import ProjectDetailsPage from './pages/ProjectDetailsPage';
import DeveloperDetailsPage from './pages/DeveloperDetailsPage';
import About from './pages/About';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/plots" element={<Plots />} />
            <Route path="/news" element={<NewsArticles />} />
            <Route path="/sell/post-property" element={<SellPropertyForm />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/properties/:category" element={<PropertyListing />} />
            <Route path="/rentals/:category" element={<PropertyListing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Project Details Route */}
            <Route path="/project/:projectId" element={<ProjectDetailsPage />} />

            {/* Tools Routes */}
            <Route path="/tools/emi-calculator" element={<EMICalculator />} />
            <Route path="/tools/affordability-calculator" element={<AffordabilityCalculator />} />
            <Route path="/tools/eligibility-calculator" element={<EligibilityCalculator />} />
            <Route path="/tools/home-loans" element={<HomeLoans />} />
            <Route path="/tools/budget-estimator" element={<BudgetEstimator />} />
            <Route path="/tools/rates-trends" element={<RatesTrends />} />
            <Route path="/tools/buying-guide" element={<BuyingGuide />} />

            {/* Developer Details Route */}
            <Route path="/developer/:developerId" element={<DeveloperDetailsPage />} />

            {/* Search Results Route */}
            <Route path="/search" element={<SearchResults />} />

            {/* About Route */}
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
      </WishlistProvider>
    </AuthProvider>
  )
}

export default App
