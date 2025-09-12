import express, { Request, Response } from "express";

const app = express();
const PORT = 4001;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
