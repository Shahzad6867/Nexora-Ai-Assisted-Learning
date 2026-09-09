import express from "express";
import AuthRouter from "./presentation/routes/auth.route";
import AdminRouter from "./presentation/routes/admin.route";
import InstitutionRouter from "./presentation/routes/institution.route";
import RequestRouter from "./presentation/routes/request.route";
import CourseRouter from "./presentation/routes/course.route"
import ModuleRouter from "./presentation/routes/module.route"
import SubjectRouter from "./presentation/routes/subject.route"
import ChapterRouter from "./presentation/routes/chapter.route"
import InstructorRouter from "./presentation/routes/instructor.route"
import cors from "cors";
import { errorMiddleware } from "./presentation/middlewares/error.middleware";
import env from "./config/env.config";
import cookieParser from "cookie-parser"


const app = express();
app.use(cookieParser())
app.use(cors({
    origin : env.FRONTEND_URL,
    credentials : true
}));
app.use(express.json());

app.use("/api", AuthRouter);
app.use("/api/institution",InstitutionRouter)
app.use("/api/requests",RequestRouter)
app.use("/api/admin", AdminRouter);
app.use("/api/courses", CourseRouter);
app.use("/api/modules", ModuleRouter);
app.use("/api/subjects", SubjectRouter);
app.use("/api/chapters", ChapterRouter);
app.use("/api/instructors", InstructorRouter);

app.use(errorMiddleware)

export default app;
