import React, { useState, useEffect, useRef } from 'react';
import { Copy, Trash2, FolderOpen, ChevronDown } from 'lucide-react';

function Header({ onReset, onSaveDraft, drafts, onLoadDraft, onDuplicateDraft, onDeleteDraft }) {
  const [showDrafts, setShowDrafts] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!showDrafts) return;
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setShowDrafts(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDrafts]);

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'var(--bg-canvas)',
        borderBottom: '1px solid var(--border)',
        padding: 'var(--sp-4) var(--sp-6)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1600px',
          margin: '0 auto',
        }}
      >
        <h1 className="page-title">Meta Business Portfolio Recovery</h1>

        <div style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'center' }}>
          <button className="btn btn--ghost" onClick={onReset} type="button">
            Reset
          </button>

          <button className="btn btn--ghost" onClick={onSaveDraft} type="button">
            Save Draft
          </button>

          {/* Drafts dropdown */}
          <div ref={panelRef} style={{ position: 'relative' }}>
            <button
              className="btn btn--primary"
              onClick={() => setShowDrafts((v) => !v)}
              type="button"
              style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}
            >
              Drafts{drafts.length > 0 && ` (${drafts.length})`}
              <ChevronDown
                size={14}
                style={{
                  transform: showDrafts ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.15s ease',
                }}
              />
            </button>

            {showDrafts && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 'calc(100% + var(--sp-2))',
                  width: '340px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-3)',
                  zIndex: 100,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    padding: 'var(--sp-3) var(--sp-4)',
                    borderBottom: '1px solid var(--border)',
                    fontWeight: 600,
                    fontSize: 'var(--fs-sm)',
                  }}
                >
                  Saved Drafts
                </div>

                {drafts.length === 0 ? (
                  <div
                    style={{
                      padding: 'var(--sp-6)',
                      textAlign: 'center',
                      color: 'var(--muted)',
                      fontSize: 'var(--fs-sm)',
                    }}
                  >
                    No saved drafts yet
                  </div>
                ) : (
                  <ul
                    style={{
                      listStyle: 'none',
                      margin: 0,
                      padding: 0,
                      maxHeight: '320px',
                      overflowY: 'auto',
                    }}
                  >
                    {drafts.map((draft) => (
                      <li
                        key={draft.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: 'var(--sp-3) var(--sp-4)',
                          borderBottom: '1px solid var(--border)',
                          gap: 'var(--sp-3)',
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontWeight: 600,
                              fontSize: 'var(--fs-sm)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {draft.name}
                          </div>
                          <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>
                            {formatDate(draft.savedAt)}
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: 'var(--sp-1)', flexShrink: 0 }}>
                          <button
                            className="btn btn--ghost"
                            type="button"
                            style={{ fontSize: 'var(--fs-xs)', padding: '4px 8px' }}
                            onClick={() => {
                              onLoadDraft(draft);
                              setShowDrafts(false);
                            }}
                            title="Load draft"
                          >
                            <FolderOpen size={13} />
                            Load
                          </button>
                          <button
                            className="btn btn--ghost btn--icon"
                            type="button"
                            onClick={() => onDuplicateDraft(draft)}
                            title="Duplicate draft"
                          >
                            <Copy size={13} />
                          </button>
                          <button
                            className="btn btn--ghost btn--icon"
                            type="button"
                            onClick={() => onDeleteDraft(draft.id)}
                            title="Delete draft"
                            style={{ color: '#EF4444' }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
