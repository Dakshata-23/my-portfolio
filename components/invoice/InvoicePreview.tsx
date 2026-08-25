import React, { useEffect, useRef, useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { InvoiceData } from '../../types';

interface InvoicePreviewProps {
  document: React.ReactElement;
  data: InvoiceData;
  template: string;
}

// react-pdf's own <PDFViewer> only sets `#toolbar=`, leaving zoom up to the browser's
// native PDF plugin — which doesn't reliably fit the page to a narrow embedded iframe and
// ends up rendering zoomed in with most of the invoice cut off. Generating the blob
// ourselves lets us pass an explicit `view=FitH` (a standard PDF open parameter) so the
// page is always scaled to the container's width.
const InvoicePreview: React.FC<InvoicePreviewProps> = ({ document, data, template }) => {
  const [url, setUrl] = useState<string | null>(null);
  const urlRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    pdf(document)
      .toBlob()
      .then((blob) => {
        if (cancelled) return;
        const nextUrl = URL.createObjectURL(blob);
        if (urlRef.current) URL.revokeObjectURL(urlRef.current);
        urlRef.current = nextUrl;
        setUrl(nextUrl);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data), template]);

  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  if (!url) {
    return <div className="w-full h-full flex items-center justify-center text-sm text-textSecondary">Preparing preview…</div>;
  }

  return (
    <iframe
      key={url}
      src={`${url}#toolbar=1&view=FitH`}
      title="Invoice preview"
      className="w-full h-full border-0"
    />
  );
};

export default InvoicePreview;
