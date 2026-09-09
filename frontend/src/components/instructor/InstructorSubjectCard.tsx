

export default function InstructorSubjectCard({
  subject,
  coverIndex,
  onManage,
}) {

  return (
    <div
      onClick={onManage}
      style={{
        width: "100%",
        maxWidth: "390px",
        background: "#ffffff",
        border: "1px solid #e8eaf1",
        borderRadius: "22px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.25s ease",
        boxShadow: "0 8px 30px rgba(17, 20, 38, 0.06)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow =
          "0 18px 45px rgba(17, 20, 38, 0.12)";
        e.currentTarget.style.borderColor = "#dcd9ff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 8px 30px rgba(17, 20, 38, 0.06)";
        e.currentTarget.style.borderColor = "#e8eaf1";
      }}
    >
      {/* COVER */}
      <div
        style={{
          height: "70px",
          position: "relative",
          overflow: "hidden",
          background: "#7659d4",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.07)",
            right: "-55px",
            top: "-70px",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "110px",
            height: "110px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            left: "-35px",
            bottom: "-45px",
          }}
        />

        {/* Module label */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "inline-flex",
            alignItems: "center",
            width: "fit-content",
            padding: "7px 11px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
            color: "#ffffff",
            fontSize: "11px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {subject.course.course_name}
        </div>

      
      </div>

      {/* BODY */}
      <div style={{ padding: "22px" }}>
        {/* Subject title */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <h3
              style={{
                margin: 0,
                color: "#111426",
                fontSize: "18px",
                lineHeight: 1.25,
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              {subject.subject_name}
            </h3>

          </div>

          
        </div>


        

        {/* ACTION */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onManage();
          }}
          style={{
            width: "100%",
            marginTop: "18px",
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
          className="manage-course"
        >
          View Subject
        </button>
      </div>
    </div>
  );
}