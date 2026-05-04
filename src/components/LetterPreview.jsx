import React from 'react';

function LetterPreview({ formData, logo, businessDocument, driversLicense }) {
  return (
    <div
      style={{
        padding: '0.75in',
        fontFamily: 'var(--font-sans)',
        fontSize: '12pt',
        lineHeight: 'var(--lh-relaxed)',
        color: '#000',
      }}
    >
      {/* Header with Business Info and Logo */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '48px',
        }}
      >
        <div>
          <div
            style={{
              fontWeight: 700,
              fontSize: '14pt',
              marginBottom: '4px',
            }}
          >
            {formData.businessName || '[Business Name]'}
          </div>
          <div style={{ fontSize: '11pt', lineHeight: 1.4 }}>
            {formData.businessAddress || '[Business Address]'}
          </div>
          <div style={{ fontSize: '11pt' }}>
            Phone: {formData.businessPhone || '[Business Phone Number]'}
          </div>
          <div style={{ fontSize: '11pt' }}>
            Email: {formData.businessEmail || '[Business Email]'}
          </div>
          {formData.businessWebsite && (
            <div style={{ fontSize: '11pt' }}>
              Website: {formData.businessWebsite}
            </div>
          )}
        </div>

        {logo ? (
          <div
            style={{
              width: '120px',
              height: '120px',
              border: '2px solid #D1D5DB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <img
              src={logo}
              alt="Business Logo"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        ) : (
          <div
            style={{
              width: '120px',
              height: '120px',
              border: '2px solid #D1D5DB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#9CA3AF',
              fontSize: '10pt',
              flexShrink: 0,
            }}
          >
            Logo Here
          </div>
        )}
      </div>

      {/* Salutation */}
      <div style={{ marginBottom: '24px' }}>To whom it may concern,</div>

      {/* Body */}
      <div style={{ marginBottom: '32px' }}>
        <p style={{ marginBottom: '16px' }}>
          I am <strong>{formData.fullName || 'Full Name'}</strong>. My Facebook
          profile is{' '}
          <strong>
            {formData.facebookProfileURL || 'Personal Facebook Profile URL'}
          </strong>
          , and the email address associated with my Facebook account is{' '}
          <strong>
            {formData.emailAssociated ||
              'Email Associated with Personal Facebook Profile'}
          </strong>
          .
        </p>

        <p style={{ marginBottom: '16px' }}>
          I am the <strong>{formData.title || 'TITLE'}</strong> of{' '}
          <strong>{formData.company || 'Company'}</strong>, and it is my
          authority to request full control of the Meta Business Portfolio,{' '}
          <strong>
            {formData.portfolioName || 'Name Business portfolio'} (ID:{' '}
            {formData.portfolioID || ''})
          </strong>
          .
        </p>

        <p style={{ marginBottom: '16px' }}>
          Please add my profile as an admin to the Meta Business Portfolio,{' '}
          <strong>
            {formData.portfolioName || 'Name Business Portfolio'} (ID:{' '}
            {formData.portfolioID || ''})
          </strong>
          .
        </p>

        <p style={{ marginBottom: '16px' }}>
          The person who created the Meta Business Portfolio is unknown; no one
          in our organization can access the portfolio.
        </p>

        <p style={{ marginBottom: '16px' }}>
          Given the circumstances, it is imperative to add my Facebook profile,{' '}
          <strong>
            {formData.facebookProfileURL || 'Personal Facebook Profile URL'}
          </strong>
          , as an admin to the Meta Business Portfolio,{' '}
          <strong>
            {formData.portfolioName || 'Name Business portfolio'} (ID:{' '}
            {formData.portfolioID || ''})
          </strong>{' '}
          as soon as possible.
        </p>

        <p style={{ marginBottom: '16px' }}>
          I, <strong>{formData.fullName || 'First & Last Name'}</strong>,
          declare under penalty of perjury that the information that I have
          provided is true and accurate.
        </p>
      </div>

      {/* Signature Section */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ marginBottom: '8px' }}>Signature,</div>
        <div style={{ height: '60px', borderBottom: '1px solid #D1D5DB', marginBottom: '8px', width: '250px' }} />
        <div style={{ fontSize: '9pt', color: '#6B7280', fontStyle: 'italic' }}>
          * Signature must match the signature on the attached driver's license
        </div>
      </div>

      {/* Driver's License Section */}
      <div
        style={{
          borderTop: '2px solid #D1D5DB',
          paddingTop: '24px',
        }}
      >
        <div
          style={{
            fontWeight: 600,
            marginBottom: '16px',
          }}
        >
          Supporting Documentation: Copy of Driver's License
        </div>
        {driversLicense ? (
          <div>
            <img
              src={driversLicense}
              alt="Driver's License"
              style={{
                maxWidth: '100%',
                maxHeight: '400px',
                border: '1px solid #D1D5DB',
                objectFit: 'contain',
              }}
            />
          </div>
        ) : (
          <div style={{ color: '#9CA3AF', fontStyle: 'italic', fontSize: '10pt' }}>
            [Please include copy of Driver's License here]
          </div>
        )}

        <div style={{ marginTop: '24px' }}>
          <div style={{ fontWeight: 600, marginBottom: '16px' }}>
            Supporting Documentation: Business Document
          </div>
          {businessDocument && !businessDocument.startsWith('data:application/pdf') ? (
            <img
              src={businessDocument}
              alt="Business Document"
              style={{
                maxWidth: '100%',
                maxHeight: '400px',
                border: '1px solid #D1D5DB',
                objectFit: 'contain',
              }}
            />
          ) : (
            <div style={{ color: '#9CA3AF', fontStyle: 'italic', fontSize: '10pt' }}>
              {businessDocument
                ? '[Business document attached as PDF]'
                : '[Please include copy of business document here]'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LetterPreview;
