import logo from "./internlogo.png";
import searchIcon from "./search-icon-svg-14.jpg";
import locationIcon from "./locatio-icon.png";
import logo2 from "./logo2.webp";
import microsoft from "./microsoft logo.webp";
import samsung from "./samsung.webp";
import science from "./science.jpg";
import shega from "./shega.webp";
import amazon from "./amazon.webp";
import addis from "./addis.jpeg";
import adobe from "./adobe.webp";
import crossIcon from "./cross icon.png";
import itsc from "./itsc-logo.png";
// import leftArrow from "./left-arrow-icon.webp";
import rightArrow from "./right-arrow-icon.webp";
import leftArrow from "./arrow-left-icon2.jpg";
import playStore from "./googlePlay.webp";
import appStore from "./appstore.png";
import facebookIcon from "./facebook-icon.webp";
import twitterIcon from "./twitter-logo.webp";
import instagramIcon from "./instagram-icon.png";
import suitcaseIcon from "./suitcase.webp";
import personIcon from "./person-icon.jpg";
import moneyIcon from "./moneyIcon.jpeg";
import fileUploadicon from "./fileUpload.webp";
import emailIcon from "./emailIcon.webp";
import lockicon from "./lockIcon.jpeg";
import profileicon from "./profileicon.jpg";
import addIcon from "./addicon.webp";
import homeIcon from "./homeicon.webp";
import personTick from "./person-tick-icon.webp";
import downloadIcon from "./downloadIcon.webp";
import logo3 from "./logo3.avif";
import logo4 from "./logo4.jpg";
import logo5 from "./logo5.jpg"

// Assets export
export const assets = {
  logo,
  searchIcon,
  locationIcon,
  logo2,
  microsoft,
  samsung,
  science,
  shega,
  amazon,
  addis,
  adobe,
  crossIcon,
  itsc,
  leftArrow,
  rightArrow,
  playStore,
  appStore,
  facebookIcon,
  twitterIcon,
  instagramIcon,
  suitcaseIcon,
  personIcon,
  moneyIcon,
  fileUploadicon,
  emailIcon,
  lockicon,
  profileicon,
  addIcon,
  homeIcon,
  personTick,
  downloadIcon,
  logo3,
  logo4,
  logo5

};

// Job categories
export const jobCategories = [
  "Programming",
  "Data science",
  "Designing",
  "Networking",
  "Management",
  "Marketing",
  "CyberSecurity"
];

// Job locations
export const jobLocations = [
  "Megenagna",
  "Mexico",
  "Bole",
  "Gerji",
  "Piasa",
  "CMC",
];

// Jobs data
export const jobsData = [
  {
    _id: '1',
    title: "Full Stack Developer",
    location: "Megenagna",
    level: "Senior Level",
    companyId: {
      _id: "670e4d25ca9fda8f1bf359b9",
      name: "Slack",
      email: "slack@demo.com",
      image: microsoft,
    },
    description: `
  <p>We are seeking a highly skilled Full Stack Developer to join our team.</p>
  <h2><strong>Key Responsibilities</strong></h2>
  <ol>
    <li>Build, test, and deploy highly responsive web applications</li>
    <li>Design user-friendly interfaces using HTML, CSS, and JavaScript</li>
    <li>Develop and maintain APIs and databases to support applications</li>
    <li>Collaborate with cross-functional teams to define, design, and ship features</li>
    <li>Identify and resolve bottlenecks and bugs to optimize performance</li>
  </ol>
  <h2><strong>Skills Required</strong></h2>
  <ol>
    <li>Proficiency in HTML, CSS, and JavaScript frameworks (e.g., React)</li>
    <li>Experience with server-side languages (e.g., Node.js, Python)</li>
    <li>Familiarity with relational and non-relational databases (e.g., MongoDB, PostgreSQL)</li>
    <li>Strong understanding of web security and performance optimization</li>
  </ol> 
  `,
    salary: 82000,
    date:"2025-07-07",
    category: "Programming",
  },
  {
  _id: '2',
  title: "Marketing Manager",
  location: "Bole",
  level: "Mid Level",
  companyId: {
    _id: "670e4d25ca9fda8f1bf36002",
    name: "Amazon",
    email: "hr@amazon.com",
    image: amazon,
  },
  description: `
  <p>We are looking for a creative and data-driven Marketing Manager to join our team.</p>
  <h2><strong>Key Responsibilities</strong></h2>
  <ol>
    <li>Develop and implement marketing strategies and campaigns</li>
    <li>Manage social media, email marketing, and content initiatives</li>
    <li>Analyze campaign performance using marketing analytics tools</li>
    <li>Coordinate with design and content teams to align messaging</li>
    <li>Identify market trends and customer needs to refine strategies</li>
  </ol>
  <h2><strong>Skills Required</strong></h2>
  <ol>
    <li>Experience with digital marketing tools (e.g., Google Ads, SEO)</li>
    <li>Strong communication and organizational skills</li>
    <li>Knowledge of branding, market research, and analytics</li>
    <li>Ability to manage multiple campaigns and meet deadlines</li>
  </ol> 
  `,
  salary: 60000,
   date:"2025-07-07",
  category: "Marketing",
},
{
  _id: '3',
  title: "Junior Data Analyst",
  location: "Mexico",
  level: "Entry Level",
  companyId: {
    _id: "670e4d25ca9fda8f1bf36003",
    name: "Shega Analytics",
    email: "careers@shega.com",
    image: shega,
  },
  description: `
  <p>We are seeking an analytical and detail-oriented Junior Data Analyst to join our growing team.</p>
  <h2><strong>Key Responsibilities</strong></h2>
  <ol>
    <li>Collect, clean, and analyze large datasets</li>
    <li>Create dashboards and visualizations</li>
    <li>Collaborate with teams to deliver actionable insights</li>
    <li>Generate regular reports to track KPIs</li>
  </ol>
  <h2><strong>Skills Required</strong></h2>
  <ol>
    <li>Proficiency in Excel, SQL, and basic Python</li>
    <li>Understanding of data visualization tools like Power BI or Tableau</li>
    <li>Strong attention to detail</li>
  </ol> 
  `,
  salary: 45000,
  date: 172961667116,
  category: "Data science"
},
{
  _id: '4',
  title: "UI/UX Designer",
  location: "Abado",
  level: "Mid Level",
  companyId: {
    _id: "670e4d25ca9fda8f1bf36004",
    name: "Adobe",
    email: "ux@adobe.com",
    image: adobe,
  },
  description: `
  <p>Join our design team to create seamless and user-friendly digital experiences.</p>
  <h2><strong>Key Responsibilities</strong></h2>
  <ol>
    <li>Design UI mockups and prototypes</li>
    <li>Conduct user research and usability testing</li>
    <li>Collaborate with developers and stakeholders</li>
  </ol>
  <h2><strong>Skills Required</strong></h2>
  <ol>
    <li>Expertise in Figma, Adobe XD, or Sketch</li>
    <li>Strong portfolio of design projects</li>
    <li>Basic knowledge of HTML/CSS is a plus</li>
  </ol> 
  `,
  salary: 52000,
   date:"2025-07-07",
  category: "Designing"
},
{
  _id: '5',
  title: "Network Administrator",
  location: "Kaliti",
  level: "Senior Level",
  companyId: {
    _id: "670e4d25ca9fda8f1bf36005",
    name: "Samsung",
    email: "netadmin@samsung.com",
    image: samsung,
  },
  description: `
  <p>We are hiring an experienced Network Administrator to manage our IT infrastructure.</p>
  <h2><strong>Key Responsibilities</strong></h2>
  <ol>
    <li>Install, configure, and monitor network equipment</li>
    <li>Ensure security and reliability of the network</li>
    <li>Troubleshoot connectivity issues</li>
  </ol>
  <h2><strong>Skills Required</strong></h2>
  <ol>
    <li>CCNA or similar certification</li>
    <li>Experience with routers, firewalls, and VPNs</li>
    <li>Strong diagnostic and problem-solving skills</li>
  </ol> 
  `,
  salary: 70000,
  date:"2025-07-07",
  category: "Networking"
},
{
  _id: '6',
  title: "Project Manager",
  location: "Diredawa",
  level: "Mid Level",
  companyId: {
    _id: "670e4d25ca9fda8f1bf359b9",
    name: "Microsoft",
    email: "pm@microsoft.com",
    image: microsoft,
  },
  description: `
  <p>We’re seeking a Project Manager to oversee key product launches and ensure on-time delivery.</p>
  <h2><strong>Key Responsibilities</strong></h2>
  <ol>
    <li>Plan, execute, and close projects according to deadlines</li>
    <li>Manage resources and coordinate teams</li>
    <li>Maintain project documentation and reporting</li>
  </ol>
  <h2><strong>Skills Required</strong></h2>
  <ol>
    <li>Excellent communication and leadership skills</li>
    <li>Familiarity with project management tools (e.g., Jira, Trello)</li>
    <li>PMP certification is a plus</li>
  </ol> 
  `,
  salary: 75000,
   date:"2025-07-07",
  category: "Management"
},
{
  _id: '7',
  title: "Cybersecurity Specialist",
  location: "Megenagna",
  level: "Senior Level",
  companyId: {
    _id: "670e4d25ca9fda8f1bf36007",
    name: "ScienceSoft",
    email: "security@sciencesoft.com",
    image: science,
  },
  description: `
  <p>We are looking for a cybersecurity expert to protect our systems from cyber threats.</p>
  <h2><strong>Key Responsibilities</strong></h2>
  <ol>
    <li>Monitor systems for security breaches</li>
    <li>Implement firewalls and encryption solutions</li>
    <li>Conduct vulnerability assessments and penetration testing</li>
  </ol>
  <h2><strong>Skills Required</strong></h2>
  <ol>
    <li>Knowledge of cybersecurity frameworks (e.g., NIST)</li>
    <li>Experience with SIEM tools</li>
    <li>Ethical hacking certifications (CEH, OSCP) preferred</li>
  </ol> 
  `,
  salary: 82000,
   date:"2025-07-07",
  category: "CyberSecurity"
},
{
  _id: '8',
  title: "Digital Content Creator",
  location: "Bole",
  level: "Entry Level",
  companyId: {
    _id: "670e4d25ca9fda8f1bf36008",
    name: "Addis Media",
    email: "hr@addismedia.com",
    image: addis,
  },
  description: `
  <p>Seeking a creative individual to produce engaging video and blog content.</p>
  <h2><strong>Key Responsibilities</strong></h2>
  <ol>
    <li>Create content for YouTube, blogs, and social media</li>
    <li>Edit videos using industry tools</li>
    <li>Work with marketing to align messaging</li>
  </ol>
  <h2><strong>Skills Required</strong></h2>
  <ol>
    <li>Experience with Adobe Premiere or Final Cut</li>
    <li>Strong writing and storytelling skills</li>
    <li>Social media understanding</li>
  </ol> 
  `,
  salary: 40000,
  date:"2025-07-07",
  category: "Marketing"
},
{
  _id: '9',
  title: "Frontend Developer Intern",
  location: "Kaliti",
  level: "Internship",
  companyId: {
    _id: "670e4d25ca9fda8f1bf36003",
    name: "Shega Tech",
    email: "interns@shegatech.com",
    image: shega,
  },
  description: `
  <p>Join our frontend team as an intern and gain real-world coding experience.</p>
  <h2><strong>Key Responsibilities</strong></h2>
  <ol>
    <li>Assist in building user interfaces using React</li>
    <li>Write clean and maintainable code</li>
    <li>Fix bugs and support frontend improvements</li>
  </ol>
  <h2><strong>Skills Required</strong></h2>
  <ol>
    <li>Basic HTML, CSS, JavaScript knowledge</li>
    <li>Understanding of responsive design</li>
    <li>Good attitude and willingness to learn</li>
  </ol> 
  `,
  salary: 10000,
   date:"2025-07-07",
  category: "Programming"
},
{
  _id: '10',
  title: "IT Support Technician",
  location: "Mexico",
  level: "Entry Level",
  companyId: {
    _id: "670e4d25ca9fda8f1bf36005",
    name: "Tech Support PLC",
    email: "support@techplc.com",
    image: samsung,
  },
  description: `
  <p>We’re looking for an IT technician to assist employees with hardware and software issues.</p>
  <h2><strong>Key Responsibilities</strong></h2>
  <ol>
    <li>Diagnose and resolve technical problems</li>
    <li>Install and configure software</li>
    <li>Respond to tickets and track issues</li>
  </ol>
  <h2><strong>Skills Required</strong></h2>
  <ol>
    <li>Good knowledge of Windows and basic networking</li>
    <li>Excellent problem-solving skills</li>
    <li>Strong communication and patience</li>
  </ol> 
  `,
  salary: 35000,
   date:"2025-07-07",
  category: "Networking"
}

];
//sample data for profile page
export const jobsApplied=[
  {
    company:'Samsung',
    title: "IT Support Technician",
    location: "Mexico", 
    date:"22 Aug,2024",
    status:'Pending',
    logo:samsung,

  },
  {
    company:'science',
    title: "Project Manager",
  location: "Diredawa",
  data:'2 september,2025',
  status:'Rejected',
  logo:science,
  }
];

export const viewApplicationsPageData=[
  {_id:1, name:"Richard Saford", jobTitle:"Full Stack Developer", location:"Megenagna",imgsrc:samsung},
  {_id:2, name:"Richard Saford", jobTitle:"Full Stack Developer", location:"Megenagna",imgsrc:samsung},
  {_id:3, name:"Richard Saford", jobTitle:"Full Stack Developer", location:"Megenagna",imgsrc:samsung},
  {_id:4, name:"Richard Saford", jobTitle:"Full Stack Developer", location:"Megenagna",imgsrc:samsung},
];
//for manage jobs page
 export const manageJobsData=[
  {_id:1,title:"full stack developer", data:82981820981,location:"megengna",applicants:10},
   {_id:2,title:"full stack developer", data:82981820981,location:"megengna", applicants:20},
    {_id:3,title:"full stack developer", data:82981820981,location:"megengna",applicants:20},
     {_id:4,title:"full stack developer", data:82981820981,location:"megengna",applicants:20},
 ];