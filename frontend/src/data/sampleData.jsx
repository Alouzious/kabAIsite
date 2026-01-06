
// Sample data for testing without Django backend
export const sampleSiteSettings = {
  site_name: 'KUAI Club',
  contact_email: 'info@kuai-club.org',
  contact_phone: '+256 700 123456',
  facebook_url: 'https://facebook.com',
  twitter_url: 'https://twitter.com',
  instagram_url: 'https://instagram.com',
  linkedin_url: 'https://linkedin.com',
  youtube_url: 'https://youtube.com',
  whatsapp_url: 'https://wa.me/256700123456',
  quick_links: [
    { name: 'Student Portal', url: '#' },
    { name: 'Library', url: '#' },
    { name: 'Admissions', url: '#' }
  ]
};

export const sampleHeroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200',
    title: 'Explore Artificial Intelligence Through Real Projects',
    subtitle: 'Get hands-on experience with machine learning, robotics, and data science.',
    button1_text: 'Join Now',
    button1_url: '#contact-section',
    button1_style: 'primary',
    button2_text: 'Learn More',
    button2_url: '#about',
    button2_style: 'outline-light'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200',
    title: 'Build the Future with AI',
    subtitle: 'Join Kabale University\'s premier AI innovation hub.',
    button1_text: 'Get Started',
    button1_url: '#projects-section',
    button1_style: 'primary',
    button2_text: 'View Projects',
    button2_url: '#projects-section',
    button2_style: 'outline-light'
  }
];

export const sampleProjects = [
  {
    id: 1,
    title: 'AI Climate Data Dashboard',
    summary: 'A web-based dashboard for visualizing local climate and weather data.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
    publish_date: '2025-07-11',
    url: '#'
  },
  {
    id: 2,
    title: 'AI Crop Doctor',
    summary: 'Mobile-friendly AI app to help farmers detect crop diseases early.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400',
    publish_date: '2025-07-11',
    url: '#'
  },
  {
    id: 3,
    title: 'Runyankole Chatbot',
    summary: 'Conversational AI chatbot for local language translation and community support.',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400',
    publish_date: '2025-07-11',
    url: '#'
  },
  {
    id: 4,
    title: 'Smart Waste Management System',
    summary: 'IoT and AI solution for better waste sorting and recycling in campus and local communities.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400',
    publish_date: '2025-07-12',
    url: '#'
  },
  {
    id: 5,
    title: 'Student Performance Predictor',
    summary: 'Machine learning tool to help predict and improve students\' academic outcomes.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400',
    publish_date: '2025-07-12',
    url: '#'
  }
];

export const sampleContactInfo = {
  address: 'Kabale University, Kikungiri Hill, Kabale, Uganda',
  email: 'info@kuai-club.org',
  phone: '0700123456'
};



export const sampleEvents = [
  {
    id: 1,
    title: 'Women in AI Hackathon 2025',
    summary: 'A weekend hackathon empowering female students to build AI solutions for local challenges.',
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400',
    organizer: 'KUAI Club & Tech Women Uganda',
    event_start: '2025-03-15T09:00:00',
    event_url: '#',
    type: 'upcoming'
  },
  {
    id: 2,
    title: 'AI in Healthcare Workshop',
    summary: 'Learn how AI is transforming healthcare in Uganda. Guest speakers from leading hospitals.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400',
    organizer: 'KUAI Club',
    event_start: '2025-02-20T14:00:00',
    event_url: '#',
    type: 'upcoming'
  },
  {
    id: 3,
    title: 'Deep Learning Bootcamp',
    summary: 'Intensive 3-day bootcamp on neural networks and deep learning fundamentals.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400',
    organizer: 'KUAI Club',
    event_start: '2024-12-10T08:00:00',
    event_url: '#',
    type: 'past'
  },
  {
    id: 4,
    title: 'AI Ethics Seminar',
    summary: 'Discussion on the ethical implications of AI in African contexts.',
    image: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=400',
    organizer: 'KUAI Club & Philosophy Department',
    event_start: '2024-11-25T10:00:00',
    event_url: '#',
    type: 'past'
  }
];


export const sampleLeaders = [
  {
    id: 1,
    full_name: 'Dr. Jane Smith',
    position: 'Faculty Advisor',
    category: 'advisors',
    bio: 'PhD in Machine Learning with 15 years of experience in AI research and development.',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    email: 'jane.smith@kuai.ac. ug',
    linkedin_url:  'https://linkedin.com',
    github_url: 'https://github.com',
    personal_website: 'https://example.com',
    phone: '+256700123456'
  },
  {
    id: 2,
    full_name: 'John Doe',
    position: 'Club President',
    category: 'executives',
    bio: 'Computer Science major passionate about deep learning and neural networks.',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    email: 'john.doe@kuai. ac.ug',
    linkedin_url: 'https://linkedin.com',
    github_url: 'https://github.com'
  },
  {
    id: 3,
    full_name: 'Mary Johnson',
    position: 'Vice President',
    category: 'executives',
    bio: 'AI enthusiast with focus on natural language processing and computer vision.',
    photo: 'https://randomuser.me/api/portraits/women/65.jpg',
    email: 'mary.johnson@kuai. ac.ug',
    linkedin_url: 'https://linkedin.com'
  },
  {
    id: 4,
    full_name: 'David Wilson',
    position: 'Technical Lead',
    category: 'technical',
    bio: 'Full-stack developer specializing in AI integration and model deployment.',
    photo: null, // Will show placeholder
    email: 'david.wilson@kuai.ac. ug',
    github_url: 'https://github.com'
  }
];

export const sampleLeaderCategories = [
  { key:  'advisors', label: 'Faculty Advisors' },
  { key: 'executives', label:  'Executive Team' },
  { key:  'technical', label: 'Technical Team' }
];

export const sampleNews = [
  {
    id: 1,
    slug: 'ai-bootcamp-announcement',
    title:  'AI Bootcamp Announcement',
    summary: 'Register now for our upcoming AI Bootcamp — limited slots!  This intensive program covers machine learning fundamentals, deep learning, and practical AI applications.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600',
    publish_date: '2025-01-11'
  },
  {
    id: 2,
    slug: 'hackathon-victory',
    title: 'Hackathon Victory',
    summary: 'KUAI Club students win 1st place at the National AI Hackathon 2025.  Our team developed an innovative solution for agricultural disease detection using computer vision.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600',
    publish_date: '2025-01-11'
  },
  {
    id: 3,
    slug: 'research-partnership',
    title: 'New Research Partnership',
    summary: 'Kabale University AI Club signs MOU with AI Research Lab Africa. This partnership will provide access to cutting-edge research facilities and mentorship opportunities.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600',
    publish_date: '2025-01-11'
  },
  {
    id: 4,
    slug: 'ai-for-healthcare',
    title:  'AI for Healthcare Initiative',
    summary: 'Launching our new AI for Healthcare initiative in partnership with local hospitals. Students will work on real-world medical AI applications.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600',
    publish_date: '2025-01-10'
  }
];


export const sampleGallery = [
  {
    id: 1,
    title: 'AI Workshop 2024',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600',
  },
  {
    id:  2,
    title: 'Hackathon Event',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600',
  },
  {
    id: 3,
    title: 'Team Building',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600',
  },
  {
    id: 4,
    title: 'Conference 2024',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600',
  },
  {
    id: 5,
    title: 'Lab Session',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600',
  },
  {
    id: 6,
    title: 'Guest Lecture',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600',
  },
  {
    id: 7,
    title: 'Project Demo Day',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600',
  },
  {
    id: 8,
    title: 'Awards Ceremony',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600',
  }
];


export const samplePartners = [
  {
    id:  1,
    name: 'Deep Learning Indaba',
    partner_type: 'collaborator',
    description: 'An African grassroots movement that supports the development of machine learning and AI across the continent.',
    image: 'https://via.placeholder.com/200x100/007bff/ffffff?text=Deep+Learning+Indaba',
    website_link: 'https://deeplearningindaba.com'
  },
  {
    id: 2,
    name: 'Google Developers Student Clubs',
    partner_type:  'sponsor',
    description: 'Supporting our student developers through resources, mentorship, and event collaboration in AI and tech.',
    image: 'https://via.placeholder.com/200x100/4285F4/ffffff?text=Google+DSC',
    website_link:  'https://developers.google.com/community/gdsc'
  },
  {
    id: 3,
    name: 'Zindi Africa',
    partner_type: 'collaborator',
    description:  'Zindi is a data science competition platform that connects African talent with real-world AI challenges.  Indabax Kabale collaborates with Zindi to provide students with hands-on experience.',
    image: 'https://via.placeholder.com/200x100/FF6B6B/ffffff?text=Zindi+Africa',
    website_link: 'https://zindi.africa'
  },
  {
    id:  4,
    name: 'AI for Good',
    partner_type: 'partner',
    description: 'Working together to leverage AI for social impact and sustainable development in Uganda.',
    image: 'https://via.placeholder.com/200x100/6f42c1/ffffff?text=AI+for+Good',
    website_link: 'https://aiforgood. itu.int'
  }
];