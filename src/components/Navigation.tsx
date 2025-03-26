import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Menu, X } from 'lucide-react';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <Scale className="text-blue-400 h-6 w-6 md:h-8 md:w-8" />
            <span className="ml-2 text-lg md:text-xl font-bold text-white">EquestrianLegal</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <NavLink to="/expertise">Legal Expertise</NavLink>
            <NavLink to="/pricing">Pricing</NavLink>
            <NavLink to="/story">Our Story</NavLink>
            <Link 
              to="/" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm lg:text-base"
            >
              Get Legal Help
            </Link>
          </div>

          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-b border-gray-700 absolute w-full left-0">
          <div className="flex flex-col space-y-3 p-4">
            <NavLink to="/expertise" onClick={closeMenu}>Legal Expertise</NavLink>
            <NavLink to="/pricing" onClick={closeMenu}>Pricing</NavLink>
            <NavLink to="/story" onClick={closeMenu}>Our Story</NavLink>
            <Link 
              to="/"
              onClick={closeMenu}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors w-full text-center"
            >
              Get Legal Help
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ to, children, onClick }) {
  return (
    <Link 
      to={to} 
      className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base block md:inline-block text-center"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export default Navigation;