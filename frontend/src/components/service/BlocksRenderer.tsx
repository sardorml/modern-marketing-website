'use client';

import React from 'react';

interface TextChild {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
}

interface LinkChild {
  type: 'link';
  url: string;
  children: InlineNode[];
}

type InlineNode = TextChild | LinkChild;

interface ParagraphBlock {
  type: 'paragraph';
  children: InlineNode[];
}

interface HeadingBlock {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: InlineNode[];
}

interface ListBlock {
  type: 'list';
  format: 'ordered' | 'unordered';
  children: ListItemBlock[];
}

interface ListItemBlock {
  type: 'list-item';
  children: InlineNode[];
}

interface QuoteBlock {
  type: 'quote';
  children: InlineNode[];
}

interface ImageBlock {
  type: 'image';
  image: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
}

type Block = ParagraphBlock | HeadingBlock | ListBlock | QuoteBlock | ImageBlock;

function renderInline(node: InlineNode, index: number): React.ReactNode {
  if (node.type === 'link') {
    return (
      <a key={index} href={node.url} className="text-brand-brown-500 underline hover:text-brand-brown-400">
        {node.children.map((child, i) => renderInline(child, i))}
      </a>
    );
  }

  let content: React.ReactNode = node.text;

  if (node.bold) content = <strong key={`b-${index}`}>{content}</strong>;
  if (node.italic) content = <em key={`i-${index}`}>{content}</em>;
  if (node.underline) content = <u key={`u-${index}`}>{content}</u>;
  if (node.strikethrough) content = <s key={`s-${index}`}>{content}</s>;

  return <React.Fragment key={index}>{content}</React.Fragment>;
}

function renderBlock(block: Block, index: number): React.ReactNode {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={index} className="text-gray-700 text-sm leading-relaxed mb-4">
          {block.children.map((child, i) => renderInline(child, i))}
        </p>
      );

    case 'heading': {
      const Tag = `h${block.level}` as keyof React.JSX.IntrinsicElements;
      const sizeMap: Record<number, string> = {
        1: 'text-3xl',
        2: 'text-2xl',
        3: 'text-xl',
        4: 'text-lg',
        5: 'text-base',
        6: 'text-sm',
      };
      return (
        <Tag key={index} className={`${sizeMap[block.level]} font-bold text-brand-brown-500 mb-3 mt-6`}>
          {block.children.map((child, i) => renderInline(child, i))}
        </Tag>
      );
    }

    case 'list': {
      const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
      const listStyle = block.format === 'ordered' ? 'list-decimal' : 'list-disc';
      return (
        <ListTag key={index} className={`${listStyle} ms-6 mb-4 space-y-1`}>
          {block.children.map((item, i) => (
            <li key={i} className="text-gray-700 text-sm leading-relaxed">
              {item.children.map((child, j) => renderInline(child, j))}
            </li>
          ))}
        </ListTag>
      );
    }

    case 'quote':
      return (
        <blockquote key={index} className="border-s-4 border-brand-brown-300 ps-4 italic text-gray-600 mb-4">
          {block.children.map((child, i) => renderInline(child, i))}
        </blockquote>
      );

    case 'image':
      return (
        <figure key={index} className="mb-4">
          <img
            src={block.image.url}
            alt={block.image.alternativeText || ''}
            className="max-w-full h-auto"
          />
        </figure>
      );

    default:
      return null;
  }
}

interface BlocksRendererProps {
  content: unknown[];
}

export default function BlocksRenderer({ content }: BlocksRendererProps) {
  if (!content || !Array.isArray(content)) return null;

  return (
    <div className="prose-custom">
      {(content as Block[]).map((block, index) => renderBlock(block, index))}
    </div>
  );
}
