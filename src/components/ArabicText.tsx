import React from 'react';

interface ArabicTextProps {
  arabic: string;
  transliteration: string;
  translation: string;
}

export function ArabicText({ arabic, transliteration, translation }: ArabicTextProps) {
  return (
    <div className="flex flex-col items-end mb-6 bg-white rounded-lg p-4 shadow-sm">
      <p className="text-2xl font-arabic mb-2" dir="rtl">{arabic}</p>
      <p className="text-pink-600 italic mb-1">{transliteration}</p>
      <p className="text-gray-600">{translation}</p>
    </div>
  );
}