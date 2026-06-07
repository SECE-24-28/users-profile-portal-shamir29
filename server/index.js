const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");

const adapter = new PrismaBetterSqlite3({ url: "file:./prisma/dev.db" });
const prisma = new PrismaClient({ adapter });

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/students", async (req, res) => {
  const students = await prisma.student.findMany();
  res.json(students);
});

app.get("/api/students/:id", async (req, res) => {
  const student = await prisma.student.findUnique({ where: { id: Number(req.params.id) } });
  if (!student) return res.status(404).json({ error: "Not found" });
  res.json(student);
});

app.post("/api/students", async (req, res) => {
  try {
    const student = await prisma.student.create({ data: req.body });
    res.status(201).json(student);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put("/api/students/:id", async (req, res) => {
  try {
    const student = await prisma.student.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.json(student);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete("/api/students/:id", async (req, res) => {
  await prisma.student.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
