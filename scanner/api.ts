import express from 'express'
import scannerRouter from "./routes/scanner.routes";

const app = express ();

app.use(express.json({ limit: '50mb' }));

const PORT = process.env.PORT || 8080; //setting port to listen on

app.use("/api/v1/scanner", scannerRouter);

app.listen(PORT, () => { //setting up to listen for requests on that port
    console.log(`[INFO]: Server is running at http://localhost:${PORT}/`);
});
