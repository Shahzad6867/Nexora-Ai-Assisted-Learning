import express from "express";
import AuthRouter from "./presentation/routes/auth.route";
import AdminRouter from "./presentation/routes/admin.route";
import InstitutionRouter from "./presentation/routes/institution.route";
import RequestRouter from "./presentation/routes/request.route";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", AuthRouter);
app.use("/api/institution",InstitutionRouter)
app.use("/api/requests",RequestRouter)
app.use("/api/admin", AdminRouter);

export default app;
