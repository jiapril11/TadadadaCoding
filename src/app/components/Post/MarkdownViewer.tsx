"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";

type Props = {
  content: string;
};

export default function MarkdownViewer({ content }: Props) {
  return (
    <div className="prose max-w-full">
      <Markdown
        className={`md:px-3 xl:px-0 box-border`}
        skipHtml={false}
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const { ref, children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                language={match[1]}
                style={a11yDark}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code
                {...rest}
                className={`px-1 box-border bg-sky-100 before:content-[''] after:content-['']`}
              >
                {children}
              </code>
            );
          },
          pre({ node, children, style, ...props }) {
            return (
              <pre {...props} style={{ ...style, backgroundColor: "#2f2f2f" }}>
                {children}
              </pre>
            );
          },
          img: (image) => (
            <Image
              className="w-full md:w-9/12 lg:-7/12 h-auto mx-auto"
              src={image.src || ""}
              alt={image.alt || ""}
              width={`880`}
              height={`700`}
            />
          ),
          blockquote: ({ children }) => (
            <blockquote className="not-prose px-7 py-5 border-l-4 italic bg-gray-50">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
