'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';

import Bold from "components/icon/bold-attachments.svg";
import Italic from "components/icon/italic-attachments.svg";
import BulletPoint from "components/icon/bulleted-list-attachments.svg";
import NumberList from "components/icon/numbered-list-attachments.svg";
import Images from "components/icon/images-attachments.svg";
import Code from "components/icon/code-attachments.svg";

const TextEditor = ({ label }: { label: string }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFormat = (command: string, value?: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = text.substring(start, end);
    let formattedText = '';

    switch (command) {
      case 'bold':
        formattedText = `<strong>${selectedText}</strong>`;
        break;
      case 'italic':
        formattedText = `<em>${selectedText}</em>`;
        break;
      case 'insertUnorderedList':
        formattedText = `<ul><li>${selectedText}</li></ul>`;
        break;
      case 'insertOrderedList':
        formattedText = `<ol><li>${selectedText}</li></ol>`;
        break;
      case 'formatBlock':
        formattedText = `<pre>${selectedText}</pre>`;
        break;
      default:
        formattedText = selectedText;
    }

    const newText = text.substring(0, start) + formattedText + text.substring(end);
    setText(newText);
  };

  const handleImageUpload = () => {
    // Implement image upload functionality here
    console.log('Image upload clicked');
  };

  return (
    <div className="mb-6">
      <label className="block font-semibold mb-2">{label}</label>
      <div className="border rounded-md">
        <div className="flex items-center border-b p-2 justify-between">
          <div>
            <button className="p-1 mr-1 hover:bg-gray-100 rounded" onClick={() => handleFormat('bold')}>
              <Image src={Bold} alt="Bold" />
            </button>
            <button className="p-1 mr-1 hover:bg-gray-100 rounded" onClick={() => handleFormat('italic')}>
              <Image src={Italic} alt="Italic" />
            </button>
            <button className="p-1 mr-1 hover:bg-gray-100 rounded" onClick={() => handleFormat('insertUnorderedList')}>
              <Image src={BulletPoint} alt="Bullet Point" />
            </button>
            <button className="p-1 mr-1 hover:bg-gray-100 rounded" onClick={() => handleFormat('insertOrderedList')}>
              <Image src={NumberList} alt="Number List" />
            </button>
            <button className="p-1 mr-1 hover:bg-gray-100 rounded" onClick={handleImageUpload}>
              <Image src={Images} alt="Images" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded" onClick={() => handleFormat('formatBlock', '<pre>')}>
              <Image src={Code} alt="Code" />
            </button>
          </div>
          <div className="text-right text-sm text-gray-500 mt-1">{1000 - text.length}</div>
        </div>
        <textarea
          ref={textareaRef}
          className="w-full p-2 h-24 resize-none focus:outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );
};

const CourseMessages = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Course Messages</h2>
      
      <p className="mb-6 text-gray-600">
        Write messages to your students (optional) that will be sent automatically when they join or complete your
        course to encourage students to engage with course content. If you do not wish to send a welcome or
        congratulations message, leave the text box blank.
      </p>

      <TextEditor label="Welcome Message" />
      <TextEditor label="Congratulations Message" />
    </div>
  );
};

export default CourseMessages;