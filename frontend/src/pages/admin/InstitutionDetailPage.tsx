import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import type { InstitutionRecord, InstitutionRequest, RequestStatusKey } from "../../types/types";
import AdminLayout from "../../components/admin/AdminLayout";
import RequestStatusBadge from "../../components/admin/RequestStatusBadge";
import DetailGrid from "../../components/admin/DetailGrid";
import StatusChanger from "../../components/admin/StatusChanger";
import api from "../../api/auth";
import LoadingPage from "../Loader/Loading.page";

export default function InstitutionDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [institution, setInstitution] = useState<InstitutionRecord | null>(null);
  const [request, setRequest] = useState<InstitutionRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInstitution() {
      try {
        setLoading(true);
        const response = await api.get(`/admin/institutions/${params.id}`);
        setInstitution(response.data.institution);
        setRequest(response.data.request);
      } catch (error) {
        console.error("Failed to fetch institution detail:", error);
      } finally {
        setLoading(false);
      }
    }
    if (params.id) {
      fetchInstitution();
    }
  }, [params.id]);

  // Compute status directly from timeline array safely
  const timeline = request?.status_timeline || [];
  const currentStatus: RequestStatusKey =
    timeline.length > 0 ? timeline[timeline.length - 1].status : "Submitted";


  if (loading) {
    return <LoadingPage />;
  }

  if (!institution) {
    return (
      <AdminLayout title="Institution Not Found">
        <button className="back-link" onClick={() => navigate("/admin/institutions")}>
          ← Back to Institutions
        </button>
        <p style={{ marginTop: 20 }}>Institution record could not be loaded.</p>
      </AdminLayout>
    );
  }

  async function handleStatusChange(next: RequestStatusKey, note: string) {
    if (!request) return;

    const isoTimestamp = new Date().toISOString();
    const newEntry = { status: next, timestamp: isoTimestamp, note: note || undefined };

    // Optimistically update local request state safely using functional updater
    setRequest((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        is_approved: next === "Approved",
        status_timeline: [...(prev.status_timeline || []), newEntry],
      };
    });

    try {
      await api.put(`/admin/requests/${request.request_id}`, {
        status_type: next,
        status_note: note,
      });
    } catch (error) {
      console.error("Failed to update status on server:", error);
    }
  }

  const initials = (institution.institution_name || "")
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 3)
    .join("")
    .toUpperCase();

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? dateStr : parsed.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (dateStr?: string) => {
    if (!dateStr) return "";
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? "" : parsed.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <AdminLayout title={institution.institution_name}>
      <button className="back-link" onClick={() => navigate("/admin/institutions")}>
        ← Back to Institutions
      </button>

      {/* ---- hero ---- */}
      <div className="detail-hero">
        <div className="detail-hero-left">
          <div className="institution-logo large">{initials}</div>
          <div>
            <div className="detail-hero-name">{institution.institution_name}</div>
            <div className="detail-hero-meta">
              {institution.institution_email}
              {institution.official_website && (
                <>
                  {" "}
                  ·{" "}
                  <a href={institution.official_website} target="_blank" rel="noreferrer">
                    {institution.official_website.replace(/^https?:\/\//, "")}
                  </a>
                </>
              )}
            </div>
            <div className="detail-hero-badges">
              <span className={`status ${institution.isVerified ? "status-active" : "status-pending"}`}>
                <span className="status-dot" />
                {institution.isVerified ? "Verified" : "Not Verified"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ---- general information ---- */}
      <div className="panel">
        <h2 className="panel-title">General Information</h2>
        <p className="panel-subtitle">Core institution details submitted during onboarding.</p>
        <DetailGrid
          items={[
            { label: "Institution Name", value: institution.institution_name },
            { label: "Institution Email", value: institution.institution_email },
            {
              label: "Year Established",
              value: institution.year_established
                ? new Date(institution.year_established).getFullYear().toString()
                : "",
            },
            { label: "Official Website", value: institution.official_website },
            { label: "Institution Logo", value: institution.institution_logo || "Not uploaded" },
          ]}
        />
        {institution.description && (
          <div style={{ marginTop: 15 }} className="detail-item">
            <span>Description</span>
            <strong style={{ fontWeight: 400, lineHeight: 1.6 }}>{institution.description}</strong>
          </div>
        )}
      </div>

      {/* ---- primary contact ---- */}
      {institution.primary_contact && (
        <div className="panel">
          <h2 className="panel-title">Primary Contact</h2>
          <p className="panel-subtitle">The official person responsible for this institution on Nexora.</p>
          <DetailGrid
            items={[
              { label: "Person Name", value: institution.primary_contact.person_name },
              { label: "Designation", value: institution.primary_contact.designation },
              { label: "Official Email", value: institution.primary_contact.official_mail },
              { label: "Phone Number", value: institution.primary_contact.phone_number },
              { label: "Alternate Phone", value: institution.primary_contact.alternate_phone_number },
            ]}
          />
        </div>
      )}

      {/* ---- address ---- */}
      {institution.address && (
        <div className="panel">
          <h2 className="panel-title">Address</h2>
          <p className="panel-subtitle">Registered physical address of the institution.</p>
          <DetailGrid
            items={[
              { label: "Country", value: institution.address.country },
              { label: "State / Province", value: institution.address.state },
              { label: "City", value: institution.address.city },
              { label: "Postal Code", value: institution.address.postal_code },
              { label: "Full Address", value: institution.address.full_address },
            ]}
          />
        </div>
      )}

      {/* ---- legal information ---- */}
      {institution.legal_information && (
        <div className="panel">
          <h2 className="panel-title">Legal & Accreditation</h2>
          <p className="panel-subtitle">Registration and accreditation details.</p>
          <DetailGrid
            items={[
              { label: "Legal Organization Name", value: institution.legal_information.legal_organization_name },
              { label: "Registration Number", value: institution.legal_information.registration_number },
              { label: "Registration Authority", value: institution.legal_information.registration_authority },
              { label: "Tax Identification Number", value: institution.legal_information.tax_identification_number },
              { label: "Accreditation Body", value: institution.legal_information.accreditation_body },
              { label: "Legal Document", value: institution.legal_information.legal_document || "Not uploaded" },
            ]}
          />
        </div>
      )}

      {/* ---- bank information ---- */}
      {institution.bank_information && (
        <div className="panel">
          <h2 className="panel-title">Bank Information</h2>
          <p className="panel-subtitle">Payout account details for this institution.</p>
          <DetailGrid
            items={[
              { label: "Legal Organization Name", value: institution.bank_information.legal_organization_name },
              { label: "Bank Name", value: institution.bank_information.bank_name },
              { label: "Account Number", value: institution.bank_information.account_number },
              { label: "SWIFT Code", value: institution.bank_information.swift_code },
              { label: "IBAN Number", value: institution.bank_information.iban_number },
            ]}
          />
        </div>
      )}

      {/* ---- compliance ---- */}
      <div className="panel">
        <h2 className="panel-title">Compliance</h2>
        <p className="panel-subtitle">Consents accepted by the institution during onboarding.</p>
        <div className="compliance-row">
          <span className={`compliance-chip ${institution.terms_acceptance ? "yes" : "no"}`}>
            {institution.terms_acceptance ? "✓" : "✕"} Terms Accepted
          </span>
          <span className={`compliance-chip ${institution.policy_acceptance ? "yes" : "no"}`}>
            {institution.policy_acceptance ? "✓" : "✕"} Policy Accepted
          </span>
          <span className={`compliance-chip ${institution.educational_consent ? "yes" : "no"}`}>
            {institution.educational_consent ? "✓" : "✕"} Educational Consent
          </span>
        </div>
      </div>

      {/* ---- onboarding request ---- */}
      {request && (
        <div className="panel">
          <h2 className="panel-title">{request.request_type || "Onboarding Request"}</h2>
          <p className="panel-subtitle">
            {request.request_id} · Submitted by {institution.institution_name} on {formatDate(request.submitted_on)}
          </p>

          <div style={{ marginBottom: 20 }}>
            <StatusChanger currentStatus={currentStatus} onChangeStatus={handleStatusChange} />
          </div>

          {timeline.length > 0 && (
            <div className="nx-log">
              <h3>Application Timeline</h3>
              {timeline.map((entry, i) => (
                <div className="nx-log-item" key={i}>
                  <div className="nx-log-dot" />
                  <div className="nx-log-body">
                    <strong>{entry.status}</strong>
                    <span>
                      {formatDate(entry.timestamp)}{" "}
                      {formatTime(entry.timestamp) ? `· ${formatTime(entry.timestamp)}` : ""}
                    </span>
                    {entry.note && <p>{entry.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}