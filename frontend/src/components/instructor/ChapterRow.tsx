import type { Chapter } from "../../types/types";

interface ChapterRowProps {
  chapter: Chapter;
  index: number;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function metaText(chapter: Chapter): string {
  const parts: string[] = [];
  parts.push(chapter.chapter_pdf ? "PDF" : "PDF not uploaded");
  parts.push(chapter.chapter_tutorial ? `Tutorial · duration not set` : "Tutorial not uploaded");
  return parts.join(" · ");
}

export default function ChapterRow({ chapter, index, onView, onEdit, onDelete }: ChapterRowProps) {
  const isPublished = chapter.is_published 

  return (
    <div className="chapter-row">
      <div className="chapter-left">
        <div className="chapter-number">{String(index + 1).padStart(2, "0")}</div>
        <div>
          <div className="chapter-name">{chapter.chapter_name}</div>
          <div className="chapter-meta">{metaText(chapter)}</div>
        </div>
      </div>

      <div className="chapter-actions">
        <span className={`status ${isPublished ? "status-active" : "status-pending"}`}>
          <span className="status-dot" />
          {isPublished ? "PUBLISHED" : "DRAFT"}
        </span>
        <button className="btn btn-outline btn-small" onClick={onView}>
          View
        </button>
        <button className="btn btn-secondary btn-small" onClick={onEdit}>
          Edit
        </button>
        <button className="btn btn-danger btn-small" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
