import { useNavigate, useParams } from "react-router";
import InstructorLayout from "../../components/instructor/InstructorLayout"; 
import { useEffect, useState } from "react";
import api from "../../api/api";

export default function ChapterDetailPage() {
  const { subjectId , chapterId  } = useParams();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(true)
  const [chapter,setChapter] = useState(null)

  async function fetchChapter(chapterId: string) {
    const response = await api.get(`/chapters/${chapterId}`);
    console.log(response)
    setChapter(response.data.data);
    setLoading(false);
  }
  useEffect(() => {
    fetchChapter(chapterId);
  }, [chapterId]);

  if (!chapter) {
    return (
      <InstructorLayout >
        <p className="muted">This chapter could not be found.</p>
        <button className="btn btn-outline btn-small" onClick={() => navigate(`/instructor/subjects/${subjectId}`)}>
          ← Back to Subject
        </button>
      </InstructorLayout>
    );
  }

  return (
    <InstructorLayout>
      <div className="page-header">
        <div>
          <h1>{chapter.chapter_name}</h1>
          <p className="muted">Manage the tutorial and study resources for this chapter.</p>
        </div>
        <button className="btn btn-secondary" onClick={() => navigate(`/instructor/subjects/${subjectId}`)}>
          ← Back to Subject
        </button>
      </div>

      <div className="chapter-layout">
        {/* ---- video ---- */}
        <div className="video-card">
          <div className="video">
            {chapter.chapter_tutorial ? (
              <>
                <div className="play">▶</div>
                <div className="video-controls">00:00 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ </div>
              </>
            ) : (
              <div className="video-empty">No tutorial video uploaded yet. Edit this chapter to add one.</div>
            )}
          </div>
          <div className="video-content">
            <div className="eyebrow">Tutorial Class</div>
            <h2>{chapter.chapter_name}</h2>
            <p>
              Tutorial by {chapter.instructor.first_name} {chapter.instructor.last_name}
              {/* {chapter.duration && ` · 00:)`} */}
              {chapter.chapter_tutorial ? " · HD" : " · Not uploaded"}
            </p>
          </div>
        </div>

        {/* ---- pdf ---- */}
        <div>
          <div className="pdf-card">
            <div className="pdf-head">
              <div>
                <h2>Study Material</h2>
                <small className="muted">PDF Preview</small>
              </div>
              <button className="btn btn-primary btn-small" disabled={!chapter.chapter_pdf}>
                ↓ Download
              </button>
            </div>

            {chapter.chapter_pdf ? (
              <div className="pdf-viewer">
                <div className="pdf-page">
                  <h3>{chapter.chapter_name}</h3>
                  <div className="pdf-line" style={{ width: "70%" }} />
                  <div className="pdf-line" />
                  <div className="pdf-line" />
                  <div className="pdf-line" style={{ width: "80%" }} />
                  <br />
                  <h3>Learning Objectives</h3>
                  <div className="pdf-line" />
                  <div className="pdf-line" style={{ width: "75%" }} />
                </div>
              </div>
            ) : (
              <div className="pdf-viewer empty">No study material uploaded yet. Edit this chapter to add a PDF.</div>
            )}

            {chapter.chapter_pdf && (
              <div className="pdf-footer">
                <span>{chapter.chapter_pdf}</span>
                <span>− &nbsp; 100% &nbsp; +</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </InstructorLayout>
  );
}
