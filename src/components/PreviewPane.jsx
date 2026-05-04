import React, { useRef } from 'react';
import { ZoomIn, ZoomOut, Maximize2, Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';

function PreviewPane({ children, zoom, onZoomChange, onDownload }) {
  const contentRef = useRef(null);

  const handleZoomIn = () => {
    onZoomChange(Math.min(zoom + 10, 150));
  };

  const handleZoomOut = () => {
    onZoomChange(Math.max(zoom - 10, 50));
  };

  const handleFit = () => {
    onZoomChange(100);
  };

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    const element = contentRef.current;
    const opt = {
      margin: 0,
      filename: 'meta-recovery-letter.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    try {
      await html2pdf().set(opt).from(element).save();
      if (onDownload) onDownload();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: '100%',
        backgroundColor: 'var(--bg-canvas)',
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--sp-3)',
          backgroundColor: 'var(--bg-card)',
          borderBottom: '1px solid var(--border)',
          borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
        }}
      >
        <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
          <button
            className="btn btn--ghost btn--icon"
            onClick={handleZoomOut}
            disabled={zoom <= 50}
            title="Zoom out"
            type="button"
          >
            <ZoomOut size={18} />
          </button>

          <button
            className="btn btn--ghost"
            onClick={handleFit}
            title="Fit to page"
            type="button"
            style={{ minWidth: '80px' }}
          >
            <Maximize2 size={16} />
            <span>{zoom}%</span>
          </button>

          <button
            className="btn btn--ghost btn--icon"
            onClick={handleZoomIn}
            disabled={zoom >= 150}
            title="Zoom in"
            type="button"
          >
            <ZoomIn size={18} />
          </button>
        </div>

        <button
          className="btn btn--primary"
          onClick={handleDownloadPDF}
          type="button"
        >
          <Download size={16} />
          Download PDF
        </button>
      </div>

      {/* Preview Area */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: 'var(--sp-6)',
          backgroundColor: 'var(--bg-canvas)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            minHeight: '100%',
          }}
        >
          <div
            ref={contentRef}
            style={{
              width: '8.5in',
              minHeight: '11in',
              backgroundColor: 'white',
              boxShadow: 'var(--shadow-3)',
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center',
              transition: 'transform 0.2s ease',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewPane;
