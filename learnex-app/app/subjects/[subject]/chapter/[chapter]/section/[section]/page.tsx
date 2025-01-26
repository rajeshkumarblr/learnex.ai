import PDFRenderer from "@/components/PDF/PDFRenderer";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
// http://localhost:3000/subjects/physics/chapter/2/section/1.2

interface SectionPageProps {
  params: {
    subject: string;
    chapter: string;
    section: string;
  };
}

const SectionPage = ({
  params: { subject, chapter, section },
}: SectionPageProps) => {
  return (
    <div>
      <div className="flex items-center space-x-1 mb-4">
        <Link
          className="text-gray-400 capitalize"
          href={`/subjects/${subject}`}
        >
          {subject}
        </Link>
        <ChevronRight size={16} />
        <Link
          className="text-gray-400 capitalize"
          href={`/subjects/${subject}/chapter/${chapter}`}
        >
          Chapter {chapter}
        </Link>
        <ChevronRight size={16} />
        <span className="font-bold">Section {section}</span>
      </div>

      <h1 className="text-xl font-bold">Section {section}</h1>
      <PDFRenderer url="https://lipivc.blob.core.windows.net/books/keph101.pdf" />
    </div>
  );
};

export default SectionPage;
