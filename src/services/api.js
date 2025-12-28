import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "https://careernest-job-portal.onrender.com/api";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Mock helper to simulate network delay
const mockDelay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

// Mock Data
const MOCK_JOBS = [
    { id: 1, title: 'Senior Frontend Engineer', company: 'Google', location: 'Mountain View, CA', type: 'Full-time', salary: '$180k - $250k', isNew: true },
    { id: 2, title: 'Product Designer', company: 'Apple', location: 'Cupertino, CA', type: 'Contract', salary: '$140k - $180k', isNew: true },
    { id: 3, title: 'Backend Developer', company: 'Amazon', location: 'Seattle, WA', type: 'Full-time', salary: '$160k - $200k', isNew: false },
    { id: 4, title: 'Machine Learning Engineer', company: 'Meta', location: 'Menlo Park, CA', type: 'Full-time', salary: '$200k - $300k', isNew: false },
    { id: 5, title: 'DevOps Engineer', company: 'Microsoft', location: 'Redmond, WA', type: 'Full-time', salary: '$150k - $190k', isNew: true },
    { id: 6, title: 'Content Strategist', company: 'Netflix', location: 'Los Gatos, CA', type: 'Part-time', salary: '$90k - $120k', isNew: false },
    { id: 7, title: 'iOS Developer', company: 'Spotify', location: 'New York, NY', type: 'Full-time', salary: '$140k - $175k', isNew: false },
    { id: 8, title: 'Automation Engineer', company: 'Tesla', location: 'Austin, TX', type: 'Full-time', salary: '$130k - $160k', isNew: true },
];

const MOCK_COMPANIES = [
    { id: 1, name: 'Google', industry: 'Search & Technology', openJobs: 45, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png' },
    { id: 2, name: 'Microsoft', industry: 'Software & Cloud', openJobs: 32, logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
    { id: 3, name: 'Meta', industry: 'Social Media', openJobs: 28, logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
    { id: 4, name: 'Netflix', industry: 'Streaming Media', openJobs: 12, logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
    { id: 5, name: 'Amazon', industry: 'E-commerce & Cloud', openJobs: 56, logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { id: 6, name: 'Apple', industry: 'Consumer Electronics', openJobs: 24, logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 7, name: 'Tesla', industry: 'Automotive & Energy', openJobs: 18, logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png' },
    { id: 8, name: 'Spotify', industry: 'Audio Streaming', openJobs: 15, logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg' },
];

export const getJobs = async () => {
    await mockDelay(800); // Simulate API latency
    // In a real app: return api.get('/jobs');
    return { data: MOCK_JOBS };
};

export const getJobById = async (id) => {
    await mockDelay(600);
    // In a real app: return api.get(`/jobs/${id}`);
    const job = MOCK_JOBS.find(j => j.id === parseInt(id));
    if (!job) throw new Error('Job not found');

    // Add details that might come from a detailed endpoint
    return {
        data: {
            ...job,
            posted: '2 days ago',
            description: `We are looking for a ${job.title} to join our team at ${job.company}. You will be responsible for building high-quality solutions.`,
            requirements: [
                '5+ years of experience in relevant field',
                'Strong understanding of core principles',
                'Experience with modern tools and frameworks',
                'Knowledge of best practices',
                'Excellent problem-solving skills'
            ],
            responsibilities: [
                'Develop new features and maintain existing applications',
                'Collaborate with cross-functional teams',
                'Optimize performance and scalability',
                'Mentor junior team members'
            ]
        }
    };
};

export const getCompanies = async () => {
    await mockDelay(800);
    // In a real app: return api.get('/companies');
    return { data: MOCK_COMPANIES };
};

export const getCompanyById = async (id) => {
    await mockDelay(600);
    const company = MOCK_COMPANIES.find(c => c.id === parseInt(id));
    if (!company) throw new Error('Company not found');

    // Add mock details
    return {
        data: {
            ...company,
            description: `${company.name} is a global leader in ${company.industry}. We are dedicated to innovation and making the world a better place through technology.`,
            website: `https://www.${company.name.toLowerCase()}.com`,
            headquarters: `${company.name} HQ`,
            size: '10,000+ employees',
            founded: '1998'
        }
    };
};

export const loginUser = async (credentials) => {
    await mockDelay(1000);
    // In a real app: return api.post('/auth/login', credentials);
    console.log('API Login:', credentials);
    return { data: { token: 'mock-jwt-token', user: { name: 'Test User' } } };
};

export const registerUser = async (userData) => {
    await mockDelay(1000);
    // In a real app: return api.post('/auth/register', userData);
    console.log('API Register:', userData);
    return { data: { message: 'Registration successful' } };
};

export default api;
