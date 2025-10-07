import express from 'express';

const app = express();
const port = 3000;

interface Course {
  id: number;
  name: string;
  subject: string;
}

const courses: Course[] = [
  { id: 1, name: 'Corso di Informatica', subject: 'Programmazione' },
  { id: 2, name: 'Corso di Matematica', subject: 'Algebra' },
  { id: 3, name: 'Corso di Fisica', subject: 'Meccanica' },
];

app.get('/api/courses', (req, res) => {
  const courseName = (req.query.courseName as string || '').toLowerCase();
  const subject = (req.query.subject as string || '').toLowerCase();

  const filtered = courses.filter(course => {
    const matchName = course.name.toLowerCase().includes(courseName);
    const matchSubject = course.subject.toLowerCase().includes(subject);
    return matchName && matchSubject;
  });

  res.json(filtered);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
