export const mockData = {
  nodes: [
    { id: "1", name: "Dr. Emily Carter", specialty: "Oncology" },
    { id: "2", name: "Dr. John Smith", specialty: "Cardiology" },
    { id: "3", name: "Dr. Sara Lee", specialty: "Neurology" },
    { id: "4", name: "Dr. Ahmed Zaki", specialty: "Radiology" },
    { id: "5", name: "Dr. Mona Said", specialty: "Endocrinology" },
    { id: "6", name: "Dr. Michael Kim", specialty: "Oncology" }
  ],
  links: [
    { source: "1", target: "2", relation: "Co-authored paper" },
    { source: "2", target: "3", relation: "Worked together" },
    { source: "1", target: "3", relation: "Same hospital" },
    { source: "1", target: "4", relation: "Mentor" },
    { source: "4", target: "5", relation: "Co-authored paper" },
    { source: "1", target: "6", relation: "Co-authored paper" },
  ]
}
