import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CollapsibleSection from './components/CollapsibleSection';
import FormField from './components/FormField';
import FileUpload from './components/FileUpload';
import PreviewPane from './components/PreviewPane';
import LetterPreview from './components/LetterPreview';

export default function MetaRecoveryForm() {
  const [formData, setFormData] = useState({
    businessName: '',
    businessAddress: '',
    businessPhone: '',
    businessEmail: '',
    businessWebsite: '',
    fullName: '',
    facebookProfileURL: '',
    emailAssociated: '',
    title: '',
    company: '',
    portfolioName: '',
    portfolioID: '',
  });

  const [logo, setLogo] = useState(null);
  const [businessDocument, setBusinessDocument] = useState(null);
  const [driversLicense, setDriversLicense] = useState(null);
  const [zoom, setZoom] = useState(95);
  const [showDownloadBanner, setShowDownloadBanner] = useState(false);

  const [drafts, setDrafts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('metaRecoveryDrafts') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('metaRecoveryDrafts', JSON.stringify(drafts));
  }, [drafts]);

  // Collapsible section states (all open by default)
  const [sections, setSections] = useState({
    business: true,
    personal: true,
    portfolio: true,
    documents: true,
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (name, value) => {
    if (name === 'logo') setLogo(value);
    if (name === 'businessDocument') setBusinessDocument(value);
    if (name === 'driversLicense') setDriversLicense(value);
  };

  const toggleSection = (section) => {
    setSections({
      ...sections,
      [section]: !sections[section],
    });
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset the form? All data will be lost.')) {
      setFormData({
        businessName: '',
        businessAddress: '',
        businessPhone: '',
        businessEmail: '',
        businessWebsite: '',
        fullName: '',
        facebookProfileURL: '',
        emailAssociated: '',
        title: '',
        company: '',
        portfolioName: '',
        portfolioID: '',
      });
      setLogo(null);
      setBusinessDocument(null);
      setDriversLicense(null);
      setShowDownloadBanner(false);
    }
  };

  const handleSaveDraft = () => {
    const name = formData.businessName.trim() || 'Untitled Draft';
    const draft = {
      id: Date.now().toString(),
      name,
      savedAt: new Date().toISOString(),
      formData,
      logo,
      businessDocument,
      driversLicense,
    };
    setDrafts((prev) => [draft, ...prev]);
  };

  const handleLoadDraft = (draft) => {
    setFormData(draft.formData);
    setLogo(draft.logo);
    setBusinessDocument(draft.businessDocument);
    setDriversLicense(draft.driversLicense);
  };

  const handleDuplicateDraft = (draft) => {
    const copy = {
      ...draft,
      id: Date.now().toString(),
      name: `${draft.name} (copy)`,
      savedAt: new Date().toISOString(),
    };
    setDrafts((prev) => [copy, ...prev]);
  };

  const handleDeleteDraft = (draftId) => {
    setDrafts((prev) => prev.filter((d) => d.id !== draftId));
  };

  return (
    <>
      <Header
        onReset={handleReset}
        onSaveDraft={handleSaveDraft}
        drafts={drafts}
        onLoadDraft={handleLoadDraft}
        onDuplicateDraft={handleDuplicateDraft}
        onDeleteDraft={handleDeleteDraft}
      />

      {showDownloadBanner && (
        <div
          className="print:hidden"
          style={{
            backgroundColor: '#EFF6FF',
            borderBottom: '1px solid #BFDBFE',
            padding: 'var(--sp-3) var(--sp-6)',
          }}
        >
          <div style={{ maxWidth: '1600px', margin: '0 auto', fontSize: 'var(--fs-sm)' }}>
            <strong>Next step:</strong> Have the client print and sign the letter in the space below where it says &ldquo;Signature.&rdquo;{' '}
            <em>The signature must match the one on the driver&rsquo;s license.</em>
          </div>
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '40fr 60fr',
          gap: 'var(--sp-6)',
          maxWidth: '1600px',
          margin: '0 auto',
          padding: 'var(--sp-6)',
          minHeight: 'calc(100vh - 80px)',
        }}
        className="print:hidden desktop-layout"
      >
        {/* Left Column - Form */}
        <div
          className="form-column"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--sp-4)',
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 120px)',
          }}
        >
          {/* Business Information Section */}
          <CollapsibleSection
            title="Business Information"
            isOpen={sections.business}
            onToggle={() => toggleSection('business')}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-4)' }}>
              <FormField
                label="Business Name"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                placeholder="Enter business name"
                required
              />
              <FormField
                label="Business Phone"
                name="businessPhone"
                type="tel"
                value={formData.businessPhone}
                onChange={handleInputChange}
                placeholder="(555) 123-4567"
                required
              />
            </div>
            <FormField
              label="Business Address"
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleInputChange}
              placeholder="123 Main Street, City, State 12345"
              required
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-4)' }}>
              <FormField
                label="Business Email"
                name="businessEmail"
                type="email"
                value={formData.businessEmail}
                onChange={handleInputChange}
                placeholder="contact@business.com"
                required
              />
              <FormField
                label="Business Website"
                name="businessWebsite"
                type="url"
                value={formData.businessWebsite}
                onChange={handleInputChange}
                placeholder="www.business.com"
              />
            </div>
            <FileUpload
              label="Business Logo"
              name="logo"
              value={logo}
              onChange={handleFileChange}
              helperText="Upload your business logo for the letterhead"
            />
          </CollapsibleSection>

          {/* Personal Information Section */}
          <CollapsibleSection
            title="Personal Information"
            isOpen={sections.personal}
            onToggle={() => toggleSection('personal')}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-4)' }}>
              <FormField
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="John Smith"
                required
              />
              <FormField
                label="Your Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="CEO, Owner, Manager, etc."
                required
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-4)' }}>
              <FormField
                label="Company Name"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Your Company LLC"
                required
              />
              <FormField
                label="Personal Facebook Profile URL"
                name="facebookProfileURL"
                type="url"
                value={formData.facebookProfileURL}
                onChange={handleInputChange}
                placeholder="https://facebook.com/yourprofile"
                required
              />
            </div>
            <FormField
              label="Email Associated with Facebook Profile"
              name="emailAssociated"
              type="email"
              value={formData.emailAssociated}
              onChange={handleInputChange}
              placeholder="personal@email.com"
              required
            />
          </CollapsibleSection>

          {/* Meta Business Portfolio Details Section */}
          <CollapsibleSection
            title="Meta Business Portfolio Details"
            isOpen={sections.portfolio}
            onToggle={() => toggleSection('portfolio')}
          >
            <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--muted)', margin: 0 }}>
              Not sure how to find your Portfolio ID?{' '}
              <a
                href="https://docs.google.com/document/d/1lMcBXv_7tUx-OA2blh0H4XVadxFBu69emJVk5Ftv2ro/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--brand-accent)' }}
              >
                View step-by-step instructions
              </a>
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-4)' }}>
              <FormField
                label="Portfolio Name"
                name="portfolioName"
                value={formData.portfolioName}
                onChange={handleInputChange}
                placeholder="Business Portfolio Name"
                required
              />
              <FormField
                label="Portfolio ID"
                name="portfolioID"
                value={formData.portfolioID}
                onChange={handleInputChange}
                placeholder="1234567890"
                required
              />
            </div>
          </CollapsibleSection>

          {/* Supporting Documents Section */}
          <CollapsibleSection
            title="Supporting Documents"
            isOpen={sections.documents}
            onToggle={() => toggleSection('documents')}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-4)' }}>
              <FileUpload
                label="Business Document of Choice (utility bill, business license, or similar official business document)"
                name="businessDocument"
                value={businessDocument}
                onChange={handleFileChange}
                accept="image/*,.pdf"
                required
                helperText="Upload a scan or photo of your supporting business document"
              />
              <FileUpload
                label="Driver's License"
                name="driversLicense"
                value={driversLicense}
                onChange={handleFileChange}
                required
                helperText="Upload a copy of your driver's license"
              />
            </div>
          </CollapsibleSection>
        </div>

        {/* Right Column - Preview Pane */}
        <div className="card" style={{ height: 'calc(100vh - 120px)', position: 'sticky', top: 'var(--sp-6)', padding: 0, overflow: 'hidden' }}>
          <PreviewPane zoom={zoom} onZoomChange={setZoom} onDownload={() => setShowDownloadBanner(true)}>
            <LetterPreview
              formData={formData}
              logo={logo}
              businessDocument={businessDocument}
              driversLicense={driversLicense}
            />
          </PreviewPane>
        </div>
      </div>

      {/* Mobile/Tablet Layout - Below 1024px */}
      <style>{`
        /* Hide scrollbar on form column */
        .form-column {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }

        .form-column::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }

        /* Ensure preview pane doesn't affect body scroll */
        body {
          overflow: hidden;
        }

        @media (max-width: 1024px) {
          .desktop-layout {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto;
          }
          .desktop-layout > div:last-child {
            order: -1; /* Preview first on mobile */
            position: relative !important;
            top: 0 !important;
          }

          body {
            overflow: auto; /* Re-enable on mobile */
          }
        }

        @media print {
          @page {
            margin: 0;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>

      {/* Print-only Section */}
      <div className="hidden print:block">
        <LetterPreview
          formData={formData}
          logo={logo}
          businessDocument={businessDocument}
          driversLicense={driversLicense}
        />
      </div>
    </>
  );
}