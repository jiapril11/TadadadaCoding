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
    <>
      <Markdown
        className={`px-3`}
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
                className={`px-1 bg-sky-100 before:content-[''] after:content-['']`}
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
              className="max-w-lg max-h-60 object-cover object-center mx-auto"
              src={image.src || ""}
              alt={image.alt || ""}
              width={500}
              height={300}
            />
          ),
        }}
      >
        {content}
      </Markdown>
    </>
  );
}
