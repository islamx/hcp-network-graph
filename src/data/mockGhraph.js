// data/mockGraph.js

export const mockData = {
  nodes: [
    // HCPs / Doctors
    { id: "1", type: "doctor", name: "Dr. Emily Carter", specialty: "Oncology", education: ["MD, Harvard", "PhD, UCL"], experience: ["Harvard Hospital (2015-2022)"], work: "Harvard Hospital" },
    { id: "2", type: "doctor", name: "Dr. John Smith", specialty: "Cardiology", education: ["MD, Johns Hopkins"], experience: ["Cleveland Clinic (2016-2023)"], work: "Cleveland Clinic" },
    { id: "3", type: "doctor", name: "Dr. Sara Lee", specialty: "Neurology", education: ["PhD, Stanford"], experience: ["Stanford Health (2012-2021)"], work: "Stanford Health" },
    { id: "4", type: "doctor", name: "Dr. Ahmed Zaki", specialty: "Radiology", education: ["MD, Cairo University"], experience: ["Kasr El Aini (2014-2024)"], work: "Kasr El Aini" },
    { id: "5", type: "doctor", name: "Dr. Mona Said", specialty: "Endocrinology", education: ["MD, Ain Shams"], experience: ["Ain Shams University (2010-2020)"], work: "Ain Shams University" },
    { id: "6", type: "doctor", name: "Dr. Michael Kim", specialty: "Oncology", education: ["MD, Seoul National University"], experience: ["SNUBH (2011-2021)"], work: "SNUBH" },

    // Publications
    { id: "pub1", type: "publication", title: "Deep Learning for Tumor Detection", year: 2021, journal: "Journal of Oncology", authors: ["1", "2", "6"] },
    { id: "pub2", type: "publication", title: "Advanced Cardiac Imaging", year: 2022, journal: "Cardio Today", authors: ["2", "4"] },
    { id: "pub3", type: "publication", title: "Neuroplasticity in Practice", year: 2020, journal: "Brain Science", authors: ["3"] },
    { id: "pub4", type: "publication", title: "Radiology in the Digital Age", year: 2023, journal: "Radiology Times", authors: ["4", "5"] },
    { id: "pub5", type: "publication", title: "Endocrine System Advances", year: 2019, journal: "Hormone Journal", authors: ["5"] },

    // Publishers / Journals
    { id: "j1", type: "publisher", name: "Journal of Oncology", country: "USA" },
    { id: "j2", type: "publisher", name: "Cardio Today", country: "UK" },
    { id: "j3", type: "publisher", name: "Brain Science", country: "USA" },
    { id: "j4", type: "publisher", name: "Radiology Times", country: "Egypt" },
    { id: "j5", type: "publisher", name: "Hormone Journal", country: "France" }
  ],
  links: [
    // Doctor <-> Doctor (relations)
    { source: "1", target: "2", relation: "Co-authored paper" },
    { source: "1", target: "6", relation: "Co-authored paper" },
    { source: "2", target: "3", relation: "Worked together" },
    { source: "1", target: "3", relation: "Same hospital" },
    { source: "1", target: "4", relation: "Mentor" },
    { source: "4", target: "5", relation: "Co-authored paper" },

    // Doctor <-> Publication
    { source: "1", target: "pub1", relation: "Author" },
    { source: "2", target: "pub1", relation: "Author" },
    { source: "6", target: "pub1", relation: "Author" },
    { source: "2", target: "pub2", relation: "Author" },
    { source: "4", target: "pub2", relation: "Author" },
    { source: "3", target: "pub3", relation: "Author" },
    { source: "4", target: "pub4", relation: "Author" },
    { source: "5", target: "pub4", relation: "Author" },
    { source: "5", target: "pub5", relation: "Author" },

    // Publication <-> Publisher
    { source: "pub1", target: "j1", relation: "Published in" },
    { source: "pub2", target: "j2", relation: "Published in" },
    { source: "pub3", target: "j3", relation: "Published in" },
    { source: "pub4", target: "j4", relation: "Published in" },
    { source: "pub5", target: "j5", relation: "Published in" },
  ]
}
