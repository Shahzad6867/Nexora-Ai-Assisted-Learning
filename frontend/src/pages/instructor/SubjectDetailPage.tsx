import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import InstructorLayout from "../../components/instructor/InstructorLayout";
import ChapterRow from "../../components/instructor/ChapterRow";
import ChapterFormModal from "../../components/instructor/ChapterFormModal";
import ConfirmDeleteModal from "../../components/instructor/ConfirmDeleteModal";
import EmptyState from "../../components/instructor/EmptyState";
import type { Chapter } from "../../types/types";
import api from "../../api/api";
import { toast } from "sonner";

export default function SubjectDetailPage() {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [chapterModal, setChapterModal] = useState<{
    mode: "create" | "edit";
    chapter?: Chapter;
  } | null>(null);
  async function fetchSubject(subjectId: string) {
    const response = await api.get(`/subjects/${subjectId}`);
    console.log(response);
    setSubject(response.data.data);
    setLoading(false);
  }
  useEffect(() => {
    fetchSubject(subjectId);
  }, [chapterModal,subjectId]);

  const [deletingChapter, setDeletingChapter] = useState<Chapter | null>(null);
  async function deleteChapter(chapter_id: string) {
    toast(`Are you sure you want to delete this chapter?`, {
      duration: Infinity,
      classNames: {
        actionButton:
          "!bg-white !text-[#6650ff] hover:!bg-gray-200 !font-semibold",
        cancelButton:
          "!bg-white !text-[#6650ff] hover:!bg-gray-200 !font-semibold",
      },
      action: {
        label: "Confirm",
        onClick: () => {
          const updatePromise = api.delete(`/chapters/${chapter_id}`);

          toast.promise(updatePromise, {
            loading: `Deleting chapter...`,
            success: (response) => {
              fetchSubject(subjectId);
              return response?.data?.message || `Chapter deleted successfully`;
            },
            error: (error) =>
              error?.response?.data?.error || `Failed to delete this chapter`,
          });
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
      },
    });
  }

  if (!subject) {
    return (
      <InstructorLayout>
        <p className="muted">This subject could not be found.</p>
        <button
          className="btn btn-outline btn-small"
          onClick={() => navigate("/instructor/subjects")}
        >
          ← Back to My Subjects
        </button>
      </InstructorLayout>
    );
  }

  return (
    <InstructorLayout>
      <div className="subject-banner">
        <div className="eyebrow">{subject.subject_name}</div>
        <h1>{subject.name}</h1>
        <div className="banner-meta">
          <span>
            {subject.chapters.length}{" "}
            {subject.chapters.length > 1 ? "Chapters" : "Chapter"}{" "}
          </span>
        </div>
      </div>

      <div className="page-header">
        <div>
          <h1 style={{ fontSize: 23 }}>Chapters</h1>
          <p className="muted">Create, edit and publish learning material.</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setChapterModal({ mode: "create" })}
        >
          + Add Chapter
        </button>
      </div>

      {subject?.chapters.length === 0 ? (
        <EmptyState
          icon="◈"
          title="No chapters yet"
          description="Add your first chapter — you can save it as a draft before it's ready to publish."
          actionLabel="+ Add Chapter"
          onAction={() => setChapterModal({ mode: "create" })}
        />
      ) : (
        <div className="chapter-card">
          {subject.chapters.map((chapter, i) => (
            <ChapterRow
              key={chapter.chapter_id}
              chapter={chapter}
              index={i}
              onView={() =>
                navigate(
                  `/instructor/subjects/${chapter.subject_id}/chapters/${chapter.chapter_id}`
                )
              }
              onEdit={() => setChapterModal({ mode: "edit", chapter })}
              onDelete={() => deleteChapter(chapter.chapter_id)}
            />
          ))}
        </div>
      )}

      <ChapterFormModal
        isOpen={chapterModal !== null}
        mode={chapterModal?.mode ?? "create"}
        initialChapter={chapterModal?.chapter}
        onClose={() => setChapterModal(null)}

      />
    </InstructorLayout>
  );
}
