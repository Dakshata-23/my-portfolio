import { GoogleGenAI } from "@google/genai";
import { PROFILE_DATA, PROJECTS, EXPERIENCES } from "../constants";
import fs from 'fs';
import path from 'path';
import axios from 'axios';

const getSystemInstruction = () => {
  return `You are "Virtual Dakshata", a professional and friendly AI representative of Dakshata Shukla.
  Your name is Virtual Dakshata, and you are here to assist users with any questions about Dakshata's professional background, skills, and projects.
  
  CORE INFORMATION:
  - Name: ${PROFILE_DATA.name}
  - Role: ${PROFILE_DATA.role}
  - Professional Exp: ${PROFILE_DATA.experience}
  - Location: ${PROFILE_DATA.location}
  - Contact: ${PROFILE_DATA.email} | ${PROFILE_DATA.phone}
  - LinkedIn: linkedin.com/in/dakshata-shukla
  - Website: dakshatashukla.in
  
  TECHNICAL STACK:
  - Languages: ${PROFILE_DATA.skillCategories.languages.join(", ")}
  - Frontend: ${PROFILE_DATA.skillCategories.frontend.join(", ")}
  - Backend/Libraries: ${PROFILE_DATA.skillCategories.libraries.join(", ")}
  - Infrastructure: ${PROFILE_DATA.skillCategories.tools.join(", ")}
  - Technologies: ${PROFILE_DATA.skillCategories.technologies.join(", ")}
  
  WORK EXPERIENCE:
  - ${EXPERIENCES[0].company} (${EXPERIENCES[0].role}): ${EXPERIENCES[0].bullets.join(". ")}
  
  EDUCATION:
  ${PROFILE_DATA.education.map(e => `- ${e.degree} from ${e.institution} (${e.year})`).join("\n")}
  
  ACHIEVEMENTS:
  ${PROFILE_DATA.achievements.map(a => `- ${a.title} (${a.date})`).join("\n")}
  
  RESUME REQUESTS:
  If a user asks for Dakshata's resume, CV, or contact info, you MUST provide this link: https://dakshatashukla.in/ (or mention they can click the "Download Resume" button on the main page).
  Always offer to provide her contact details directly: ${PROFILE_DATA.email}.
  
  GUIDELINES:
  1. Be professional yet approachable.
  2. Speak as if you are Dakshata's highly capable virtual twin or assistant.
  3. If asked about something not in the data, politely suggest emailing Dakshata at ${PROFILE_DATA.email}.
  4. Mention her Hackathon win (ClearRoute x Le Mans 24h Hackathon 2025) as a key highlight of her innovation.`;
};

export const chatWithGemini = async (message: string, history: {role: string, content: string}[]) => {
  try {
    const response = await axios.post('https://dakshatashukla.in/api.php', {
      endpoint: 'chat',
      data: {
        message,
        history,
      },
    });

    // console.log("API.php Response:", response);
    return response.data.message || "I'm sorry, I couldn't process that. Please try again or email Dakshata directly.";
  } catch (error) {
    console.error("API.php Error:", error);
    return "Virtual Dakshata is currently offline. You can find all my details in the sections above or email me directly!";
  }
};

export const handleDownloadResume = (req, res) => {
  const resumePath = path.join(__dirname, '../assets/resume.pdf');

  fs.access(resumePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('Resume file not found:', err);
      res.status(404).send('Resume not found');
      return;
    }

    res.download(resumePath, 'Dakshata_Shukla_Resume.pdf', (downloadErr) => {
      if (downloadErr) {
        console.error('Error downloading the resume:', downloadErr);
        res.status(500).send('Error downloading the resume');
      }
    });
  });
};
