import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Frontend Developer",
    icon: web,
  },
  {
    title: "Mobile Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Full Stack Developer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Next.js",
    icon: threejs,
  },
  {
    name: "Git",
    icon: git,
  },
  {
    name: "Figma",
    icon: figma,
  },
  {
    name: "PostgreSQL",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Full Stack Developer",
    company_name: "KJ-GROUPS",
    icon: starbucks, // Replace with appropriate icon
    iconBg: "#383E56",
    date: "Dec 2023 - Present",
    points: [
      "Developed a modern portfolio platform showcasing four restaurant brands under KJ-GROUPS.",
      "Built responsive, multi-page React-based websites with Stripe payment integration and reservation systems.",
      "Created a unified admin panel for centralized management of orders and bookings.",
      "Improved restaurant order management efficiency by 40% and reduced booking time by 50%.",
      "Used React, Node.js, TypeScript, Sequelize SQL, Supabase, Tailwind CSS, Framer Motion, and Vercel."
    ],
  },
  {
    title: "Frontend Developer Intern",
    company_name: "DevClubM, Faisalabad",
    icon: tesla, // Replace with appropriate icon
    iconBg: "#E6DEDD",
    date: "2023",
    points: [
      "Built a web portal for a Canada-based home food service to automate ordering processes.",
      "Developed an enterprise-level MERN stack application and improved app performance by 20%.",
      "Used Git for version control and collaborative development.",
      "Implemented responsive design and ensuring cross-browser compatibility.",
    ],
  },
  {
    title: "Bachelor of Science in Software Engineering",
    company_name: "National University of Computer and Emerging Sciences (FAST), Pakistan",
    icon: shopify, // Replace with appropriate icon
    iconBg: "#383E56",
    date: "2019 - 2024",
    points: [
      "Completed coursework in Data Structures, Algorithms, Database Systems, and Web Development.",
      "Developed a UML Class Diagram Compiler as a Final Year Project with 90% syntactic and semantic accuracy.",
      "Conducted air pollution data analysis using Python and machine learning models.",
      "Participated in coding competitions and hackathons."
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Ahmad developed a fantastic website for our restaurant that not only looks great but also significantly improved our order management system.",
    name: "Jung Kim",
    designation: "Owner",
    company: "Korean BBQ Edinburgh",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
  },
  {
    testimonial:
      "The reservation system Ahmad built for us reduced our booking time by 50% and improved customer satisfaction. A true professional who understands both design and functionality.",
    name: "Sarah Chen",
    designation: "Manager",
    company: "Soul Sushi",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    testimonial:
      "Working with Ahmad on our online ordering platform was a pleasure. His attention to detail and technical expertise resulted in a seamless user experience for our customers.",
    name: "David Park",
    designation: "Director",
    company: "KJ-GROUPS",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
];

const projects = [
  {
    name: "KJ-GROUPS Portfolio Site",
    description:
      "Multi-site restaurant platform with payment integration, reservation system, and order management features. Built to showcase four restaurant brands under one umbrella.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "node",
        color: "green-text-gradient",
      },
      {
        name: "stripe",
        color: "pink-text-gradient",
      },
      {
        name: "supabase",
        color: "orange-text-gradient",
      },
    ],
    image: carrent, // Use an appropriate image
    source_code_link: "https://github.com/",
    live_site_link: "https://www.kjgroups.co.uk/",
  },
  {
    name: "Soul Sushi & Korean Munchies",
    description:
      "Online ordering and menu systems for two restaurants with Stripe payment integration. Includes responsive design and interactive menu displays.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "tailwind",
        color: "green-text-gradient",
      },
      {
        name: "stripe",
        color: "pink-text-gradient",
      },
    ],
    image: jobit, // Use an appropriate image
    source_code_link: "https://github.com/",
    live_site_link: "https://www.soulsushi.kjgroups.co.uk/",
  },
  {
    name: "Korean BBQ Edinburgh & Dundee",
    description:
      "Table reservation systems for two restaurant locations with responsive UI and animated elements. Includes booking management and user notifications.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "framer-motion",
        color: "green-text-gradient",
      },
      {
        name: "sequelize",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide, // Use an appropriate image
    source_code_link: "https://github.com/",
    live_site_link: "https://www.koreanbbq.kjgroups.co.uk/",
  },
  {
    name: "UML Class Diagram Compiler",
    description:
      "Final Year Project that converts UML diagrams into skeleton code. Includes XML-to-string parser and code generator. Achieved 90% syntactic and semantic accuracy.",
    tags: [
      {
        name: "javascript",
        color: "blue-text-gradient",
      },
      {
        name: "xml",
        color: "green-text-gradient",
      },
      {
        name: "parsing",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide, // Use an appropriate image
    source_code_link: "https://github.com/",
  },
  {
    name: "Air Pollution Analysis",
    description:
      "Python project analyzing PM 2.5 data (2016–2022) using Pandas, Matplotlib, and machine learning models for predictions. Achieved 85% accuracy with linear and logistic regression.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "pandas",
        color: "green-text-gradient",
      },
      {
        name: "machine-learning",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide, // Use an appropriate image
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
