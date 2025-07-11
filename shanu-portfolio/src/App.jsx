import React, { useState, useEffect } from 'react';
import { ChevronDown, Mail, Phone, MapPin, Linkedin, Github, ExternalLink, Calendar, Award, Code, Briefcase, User, Home, FileText, Send, ArrowLeft, Menu, X, Sun, Moon } from 'lucide-react';

const Portfolio = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Safe localStorage access
  const getStorageItem = (key) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn('localStorage not available:', error);
      return null;
    }
  };

  const setStorageItem = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn('localStorage not available:', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = getStorageItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      try {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
      } catch (error) {
        console.warn('matchMedia not available:', error);
      }
    }
  }, []);

  // Apply theme class to document body
  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (error) {
      console.warn('Document manipulation not available:', error);
    }
  }, [isDarkMode]);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    setStorageItem('theme', newTheme ? 'dark' : 'light');
  };

  const scrollToNextSection = () => {
    const aboutSection = document.querySelector('#about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Theme classes
  const themeClasses = {
    primary: isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900',
    secondary: isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900',
    card: isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900',
    nav: isDarkMode ? 'bg-gray-900/90' : 'bg-white/90',
    navTransparent: isDarkMode ? 'bg-transparent' : 'bg-transparent',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-500',
    border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
    hover: isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50',
    gradientHero: isDarkMode 
      ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
      : 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600',
    gradientSection: isDarkMode
      ? 'bg-gradient-to-br from-gray-800 to-gray-900'
      : 'bg-gradient-to-br from-blue-50 to-purple-50'
  };

  const Navigation = () => (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? `${themeClasses.nav} backdrop-blur-md shadow-lg` : themeClasses.navTransparent
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div 
              className="text-2xl font-bold text-black dark:text-white cursor-pointer transition-colors duration-200 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-xl px-2 py-1"
              onClick={() => navigateTo('home')}
            >
              Shanu Jaiswal
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun size={20} className="text-black dark:text-white" /> : <Moon size={20} className="text-black dark:text-white" />}
            </button>
            
            {/* Navigation Links */}
            <div className="flex space-x-4">
              {[
                { id: 'home', label: 'Home', icon: Home },
                { id: 'work', label: 'Work & Projects', icon: Briefcase },
                { id: 'contact', label: 'Contact', icon: Send }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => navigateTo(id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    currentPage === id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon size={18} className="text-black dark:text-white" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun size={20} className="text-black dark:text-white" /> : <Moon size={20} className="text-black dark:text-white" />}
            </button>
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 p-2"
            >
              {isMobileMenuOpen ? <X size={24} className="text-black dark:text-white" /> : <Menu size={24} className="text-black dark:text-white" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden ${themeClasses.nav} backdrop-blur-md ${themeClasses.border} border-t`}>
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col space-y-4">
              {[
                { id: 'home', label: 'Home', icon: Home },
                { id: 'work', label: 'Work & Projects', icon: Briefcase },
                { id: 'contact', label: 'Contact', icon: Send }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => navigateTo(id)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    currentPage === id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon size={20} className="text-black dark:text-white" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );

  const HomePage = () => (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.primary}`}>
      {/* Hero Section */}
      <section className={`min-h-screen flex items-center justify-center ${themeClasses.gradientHero} text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Shanu Jaiswal
            </h1>
            <p className="text-2xl md:text-3xl mb-8 opacity-90 animate-fade-in-delay">
              Software Engineer & Quality Analyst
            </p>
            <p className="text-xl md:text-2xl mb-12 opacity-80 max-w-3xl mx-auto animate-fade-in-delay-2">
              Computer Science Engineer with 1+ years in software development, QA, and front-end development. 
              Expertise in Python, JavaScript, React.js, and data analytics.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-delay-3">
              <button
                onClick={() => navigateTo('work')}
                className="bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-3 rounded-full hover:bg-white/30 transition-all duration-300"
              >
                View My Work
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className="bg-white text-purple-600 px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
        <button 
          onClick={scrollToNextSection}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-transform duration-300"
        >
          <ChevronDown size={32} className="text-white/70 hover:text-white transition-colors duration-300" />
        </button>
      </section>

      {/* About Section */}
      <section id="about-section" className={`py-20 ${themeClasses.secondary} transition-colors duration-300`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-4xl font-bold text-center mb-16 ${themeClasses.text}`}>About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className={`${themeClasses.card} p-8 rounded-2xl shadow-xl transition-colors duration-300`}>
                  <User className="text-blue-600 mb-4" size={48} />
                  <h3 className={`text-2xl font-semibold mb-4 ${themeClasses.text}`}>Professional Journey</h3>
                  <p className={`${themeClasses.textSecondary} leading-relaxed`}>
                    I'm a passionate Software Engineer with a strong foundation in computer science and a keen interest in developing innovative software solutions. My journey in tech has been marked by continuous learning and hands-on experience with cutting-edge technologies.
                  </p>
                </div>
                <div className={`${themeClasses.card} p-8 rounded-2xl shadow-xl transition-colors duration-300`}>
                  <Code className="text-purple-600 mb-4" size={48} />
                  <h3 className={`text-2xl font-semibold mb-4 ${themeClasses.text}`}>Technical Expertise</h3>
                  <p className={`${themeClasses.textSecondary} leading-relaxed`}>
                    I specialize in quality assurance, front-end development, and data analytics. My experience spans healthcare software solutions, AI-driven testing methodologies, and cross-functional team collaboration.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: '1+', label: 'Years Experience', color: 'bg-blue-500' },
                  { number: '95%', label: 'Bug-Free Rate', color: 'bg-green-500' },
                  { number: '30%', label: 'Efficiency Gain', color: 'bg-purple-500' },
                  { number: '10+', label: 'Technologies', color: 'bg-pink-500' }
                ].map((stat, index) => (
                  <div key={index} className={`${themeClasses.card} p-6 rounded-2xl shadow-xl text-center transform hover:scale-105 transition-all duration-300`}>
                    <div className={`${stat.color} text-white text-3xl font-bold py-2 px-4 rounded-lg mb-3`}>
                      {stat.number}
                    </div>
                    <p className={`${themeClasses.textSecondary} font-medium`}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className={`py-20 ${themeClasses.primary} transition-colors duration-300`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-4xl font-bold text-center mb-16 ${themeClasses.text}`}>Technical Skills</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Programming Languages',
                  skills: ['Python', 'JavaScript', 'HTML5', 'CSS3'],
                  color: 'bg-blue-500'
                },
                {
                  title: 'Frameworks & Libraries',
                  skills: ['React.js', 'Node.js'],
                  color: 'bg-green-500'
                },
                {
                  title: 'Database Technologies',
                  skills: ['SQL', 'MySQL'],
                  color: 'bg-purple-500'
                },
                {
                  title: 'Data Analytics',
                  skills: ['Power BI', 'Tableau', 'Advanced Excel'],
                  color: 'bg-pink-500'
                },
                {
                  title: 'Development Tools',
                  skills: ['Git', 'GitHub', 'VS Code', 'Figma'],
                  color: 'bg-indigo-500'
                },
                {
                  title: 'Testing & QA',
                  skills: ['Manual Testing', 'Software Quality Assurance', 'Test Case Design'],
                  color: 'bg-orange-500'
                }
              ].map((category, index) => (
                <div key={index} className={`${themeClasses.secondary} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <div className={`${category.color} text-white p-3 rounded-lg inline-block mb-4`}>
                    <Code size={24} />
                  </div>
                  <h3 className={`text-xl font-semibold mb-4 ${themeClasses.text}`}>{category.title}</h3>
                  <div className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className={`inline-block ${themeClasses.card} px-3 py-1 rounded-full text-sm ${themeClasses.textSecondary} mr-2 mb-2 shadow-sm transition-all duration-150 cursor-pointer border border-gray-300 dark:border-gray-500 hover:bg-blue-100 dark:hover:bg-blue-900 active:scale-95 active:ring-2 active:ring-blue-400`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const WorkPage = () => (
    <div className={`min-h-screen pt-20 transition-colors duration-300 ${themeClasses.primary}`}>
      {/* Breadcrumb Navigation */}
      <div className={`${themeClasses.secondary} py-4 transition-colors duration-300`}>
        <div className="container mx-auto px-6">
          <div className={`flex items-center space-x-2 text-sm ${themeClasses.textSecondary}`}>
            <button onClick={() => navigateTo('home')} className="hover:text-blue-600">
              Home
            </button>
            <span>/</span>
            <span className="text-blue-600 font-medium">Work & Projects</span>
          </div>
        </div>
      </div>
      
      {/* Work Experience Section */}
      <section className={`py-20 ${themeClasses.gradientSection} transition-colors duration-300`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-bold text-center mb-16 ${themeClasses.text}`}>Work Experience</h2>
            <div className="space-y-12">
              {[
                {
                  title: 'Quality Analyst',
                  company: 'EV Software Solution Pvt Ltd',
                  location: 'Noida, UP, India',
                  period: 'June 2024 - Present',
                  achievements: [
                    'Conduct QA testing for healthcare software applications ensuring regulatory compliance',
                    'Implement AI-driven testing methodologies reducing manual testing time by 30%',
                    'Collaborate with development teams maintaining 95% bug-free release rate',
                    'Develop test cases for web applications, mobile applications, and API testing'
                  ],
                  current: true
                },
                {
                  title: 'Software Engineer Intern',
                  company: 'AIOEAM CORPGLOBAL',
                  location: 'Kochi, Kerala, India',
                  period: 'January 2023 - July 2023',
                  achievements: [
                    'Developed responsive front-end applications using HTML5, CSS3, and JavaScript',
                    'Created Amazon homepage clone with modern web development best practices',
                    'Built interactive login web pages with form validation and user authentication',
                    'Participated in code reviews and agile development methodologies'
                  ],
                  current: false
                }
              ].map((job, index) => (
                <div key={index} className={`${themeClasses.card} rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h3 className={`text-2xl font-bold ${themeClasses.text} mb-2`}>{job.title}</h3>
                      <p className="text-xl text-blue-600 font-semibold mb-1">{job.company}</p>
                      <p className={`${themeClasses.textSecondary} flex items-center`}>
                        <MapPin size={16} className="mr-1" />
                        {job.location}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                        job.current ? 'bg-green-100 text-green-800' : `${themeClasses.secondary} ${themeClasses.textSecondary}`
                      }`}>
                        <Calendar size={16} className="mr-2" />
                        {job.period}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {job.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className={`${themeClasses.textSecondary} leading-relaxed`}>{achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className={`py-20 ${themeClasses.primary} transition-colors duration-300`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-4xl font-bold text-center mb-16 ${themeClasses.text}`}>Personal Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Canteen Automation System',
                  description: 'Developed a comprehensive canteen management system combining Android mobile app and web interface. The system includes student record management with database integration, significantly improving efficiency.',
                  technologies: ['Android', 'Java', 'HTML', 'CSS', 'MySQL'],
                  achievement: 'Reduced manual order processing time by 40% through automation',
                  color: 'from-blue-500 to-purple-600'
                },
                {
                  title: 'AWS Cloud Foundation Project',
                  description: 'Designed and deployed scalable cloud infrastructure using various AWS services. Implemented cloud computing concepts including load balancing and auto-scaling.',
                  technologies: ['AWS (EC2, S3, Lambda)', 'Python', 'Cloud Computing'],
                  achievement: 'Successfully deployed serverless applications with AWS Lambda',
                  color: 'from-green-500 to-blue-600'
                }
              ].map((project, index) => (
                <div key={index} className={`${themeClasses.card} rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300`}>
                  <div className={`h-32 bg-gradient-to-r ${project.color} flex items-center justify-center`}>
                    <Code size={48} className="text-white" />
                  </div>
                  <div className="p-8">
                    <h3 className={`text-2xl font-bold mb-4 ${themeClasses.text}`}>{project.title}</h3>
                    <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>{project.description}</p>
                    <div className="mb-4">
                      <h4 className={`font-semibold ${themeClasses.text} mb-2`}>Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className={`${themeClasses.secondary} px-3 py-1 rounded-full text-sm ${themeClasses.textSecondary}`}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                      <p className="text-green-800 dark:text-green-300 font-medium">
                        <Award size={16} className="inline mr-2" />
                        {project.achievement}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Experience */}
      <section className={`py-20 ${themeClasses.secondary} transition-colors duration-300`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-bold text-center mb-16 ${themeClasses.text}`}>Volunteer Experience</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'IEEE Student Chapter Coordinator',
                  organization: 'IEEE Mandya',
                  period: '2021 - 2023',
                  achievements: [
                    'Coordinated technical events for 100+ engineering students',
                    'Organized workshops and seminars on emerging technologies'
                  ]
                },
                {
                  title: 'Health Card Volunteer',
                  organization: 'Abha Card Initiative, Mandya',
                  period: '2022',
                  achievements: [
                    'Led volunteer team for health card registration drive',
                    'Achieved 200+ successful registrations through community outreach'
                  ]
                }
              ].map((volunteer, index) => (
                <div key={index} className={`${themeClasses.card} rounded-2xl shadow-lg p-8 transition-colors duration-300`}>
                  <h3 className={`text-xl font-bold ${themeClasses.text} mb-2`}>{volunteer.title}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{volunteer.organization}</p>
                  <p className={`${themeClasses.textSecondary} mb-4`}>{volunteer.period}</p>
                  <div className="space-y-2">
                    {volunteer.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className={themeClasses.textSecondary}>{achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const ContactPage = () => (
    <div className={`min-h-screen pt-20 transition-colors duration-300 ${themeClasses.primary}`}>
      {/* Breadcrumb Navigation */}
      <div className={`${themeClasses.secondary} py-4 transition-colors duration-300`}>
        <div className="container mx-auto px-6">
          <div className={`flex items-center space-x-2 text-sm ${themeClasses.textSecondary}`}>
            <button onClick={() => navigateTo('home')} className="hover:text-blue-600">
              Home
            </button>
            <span>/</span>
            <span className="text-blue-600 font-medium">Contact</span>
          </div>
        </div>
      </div>
      
      {/* Contact Section */}
      <section className={`py-20 ${themeClasses.gradientHero} text-white`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
            <p className="text-xl mb-12 opacity-90">
              I'm always open to discussing new opportunities, innovative projects, or just having a conversation about technology. Feel free to reach out!
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Mail,
                  title: 'Email',
                  info: 'Shanuj4all@gmail.com',
                  href: 'mailto:Shanuj4all@gmail.com'
                },
                {
                  icon: Phone,
                  title: 'Phone',
                  info: '+91-9470255075',
                  href: 'tel:+919470255075'
                },
                {
                  icon: MapPin,
                  title: 'Location',
                  info: 'Noida, India',
                  href: '#'
                },
                {
                  icon: Linkedin,
                  title: 'LinkedIn',
                  info: 'linkedin.com/in/Shanu9470',
                  href: 'https://linkedin.com/in/Shanu9470'
                },
                {
                  icon: Github,
                  title: 'GitHub',
                  info: 'github.com/shanujaiswal',
                  href: 'https://github.com/shanujaiswal'
                }
              ].map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  <contact.icon size={32} className="mx-auto mb-4 text-white" />
                  <h3 className="font-semibold mb-2 text-white">{contact.title}</h3>
                  <p className="text-white/80 text-sm">{contact.info}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className={`py-20 ${themeClasses.primary} transition-colors duration-300`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-4xl font-bold text-center mb-16 ${themeClasses.text}`}>Education & Certifications</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {/* Education */}
              <div>
                <h3 className={`text-2xl font-bold mb-8 ${themeClasses.text} text-center`}>Education</h3>
                <div className="space-y-6">
                  {[
                    {
                      degree: 'B.E. Computer Science and Engineering',
                      school: 'P.E.S College Of Engineering, Mandya',
                      university: 'VTU, Karnataka',
                      period: '2019 - 2023',
                      type: 'degree'
                    },
                    {
                      degree: 'Senior Secondary (CBSE)',
                      school: 'Sri Chaitanya Vishakapatnam',
                      subjects: 'Physics, Chemistry, Mathematics',
                      period: '2017 - 2019',
                      type: 'secondary'
                    }
                  ].map((edu, index) => (
                    <div key={index} className={`${themeClasses.secondary} rounded-2xl p-6 shadow-lg transition-colors duration-300`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>{edu.degree}</h4>
                          <p className="text-blue-600 font-medium mb-1">{edu.school}</p>
                          {edu.university && <p className={`${themeClasses.textSecondary} text-sm mb-1`}>{edu.university}</p>}
                          {edu.subjects && <p className={`${themeClasses.textSecondary} text-sm mb-1`}>{edu.subjects}</p>}
                        </div>
                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {edu.period}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className={`text-2xl font-bold mb-8 ${themeClasses.text} text-center`}>Certifications</h3>
                <div className="space-y-6">
                  {[
                    {
                      title: 'Microsoft AEP Internship Certificate',
                      description: 'Machine Learning',
                      year: '2020',
                      color: 'bg-blue-500'
                    },
                    {
                      title: 'AWS Academy Graduate',
                      description: 'AWS Cloud Foundations',
                      year: '2022',
                      color: 'bg-orange-500'
                    }
                  ].map((cert, index) => (
                    <div key={index} className={`${themeClasses.secondary} rounded-2xl p-6 shadow-lg transition-colors duration-300`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <div className={`w-3 h-3 rounded-full ${cert.color} mr-3`}></div>
                            <h4 className={`text-lg font-semibold ${themeClasses.text}`}>{cert.title}</h4>
                          </div>
                          <p className={`${themeClasses.textSecondary} mb-1`}>{cert.description}</p>
                        </div>
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {cert.year}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className={`py-20 ${themeClasses.secondary} transition-colors duration-300`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-bold text-center mb-16 ${themeClasses.text}`}>Additional Information</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Languages',
                  items: ['Hindi (Native)', 'English (Professional)'],
                  color: 'bg-blue-500'
                },
                {
                  title: 'Core Competencies',
                  items: ['Problem-solving', 'Team Collaboration', 'Agile Development', 'Leadership'],
                  color: 'bg-green-500'
                },
                {
                  title: 'Interests',
                  items: ['Coding Challenges', 'Open Source Contribution', 'UI/UX Design', 'Cloud Computing', 'DevOps', 'Tech Meetups', 'Automation'],
                  color: 'bg-purple-500'
                }
              ].map((section, index) => (
                <div key={index} className={`${themeClasses.card} rounded-2xl p-6 shadow-lg transition-colors duration-300`}>
                  <div className={`${section.color} text-white p-3 rounded-lg inline-block mb-4`}>
                    <FileText size={24} />
                  </div>
                  <h3 className={`text-xl font-semibold mb-4 ${themeClasses.text}`}>{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className={`${themeClasses.textSecondary} flex items-center`}>
                        <div className={`w-2 h-2 ${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'} rounded-full mr-3`}></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'work':
        return <WorkPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.primary}`}>
      <Navigation />
      {renderPage()}
      
      {/* Footer Navigation */}
      <footer className={`relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900' : 'bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200'} text-black dark:text-white py-10 transition-colors duration-300 shadow-2xl rounded-t-3xl mt-16`}> 
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-2xl font-extrabold mb-2 tracking-tight flex items-center justify-center md:justify-start gap-2">
                <span>Shanu Jaiswal</span>
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              </h3>
              <p className="text-base font-medium text-blue-700 dark:text-blue-300 mb-1">Software Engineer</p>
              <p className="text-gray-600 dark:text-gray-300 italic text-sm">Building quality, one pixel at a time.</p>
              <div className="flex gap-4 justify-center md:justify-start mt-3">
                <a href="mailto:Shanuj4all@gmail.com" className="hover:text-blue-600 hover:shadow-lg transition-colors" title="Email"><Mail size={22} /></a>
                <a href="tel:+919470255075" className="hover:text-green-600 hover:shadow-lg transition-colors" title="Call"><Phone size={22} /></a>
                <a href="https://linkedin.com/in/Shanu9470" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:shadow-lg transition-colors" title="LinkedIn"><Linkedin size={22} /></a>
                <a href="https://github.com/shanujaiswal" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:shadow-lg transition-colors" title="GitHub"><Github size={22} /></a>
              </div>
            </div>
            <div className="flex space-x-6">
              <button
                onClick={() => navigateTo('home')}
                className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 shadow-md hover:scale-105 hover:bg-blue-600 hover:text-white ${
                  currentPage === 'home' ? 'bg-blue-600 text-white' : 'bg-white/70 dark:bg-gray-800/70 text-black dark:text-white'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => navigateTo('work')}
                className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 shadow-md hover:scale-105 hover:bg-blue-600 hover:text-white ${
                  currentPage === 'work' ? 'bg-blue-600 text-white' : 'bg-white/70 dark:bg-gray-800/70 text-black dark:text-white'
                }`}
              >
                Work & Projects
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 shadow-md hover:scale-105 hover:bg-blue-600 hover:text-white ${
                  currentPage === 'contact' ? 'bg-blue-600 text-white' : 'bg-white/70 dark:bg-gray-800/70 text-black dark:text-white'
                }`}
              >
                Contact
              </button>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-300 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400 text-sm">
            <p>&copy; 2024 Shanu Jaiswal. All rights reserved. | Designed with <span className="text-pink-500">&#10084;</span></p>
          </div>
        </div>
      </footer>
      

    </div>
  );
};

export default Portfolio;