import WidthLayout from "@/app/components/WidthLayout";
import Markdown from "react-markdown";

export default function MarkdownViewer({ content }: { content: string }) {
  return (
    <WidthLayout>
      <div className="prose max-w-full pt-10 pb-20">
        <Markdown
          components={{
            code(props) {
              return (
                <code
                  className={`px-1 bg-sky-100 before:content-[''] after:content-['']`}
                >
                  {props.children}
                </code>
              );
            },
            h2(props) {
              return (
                <h2 className="text-lg font-semibold">{props.children}</h2>
              );
            },
            h3(props) {
              return (
                <h3 className="text-base font-semibold">{props.children}</h3>
              );
            },
          }}
        >
          {content}
        </Markdown>
      </div>
    </WidthLayout>
  );
}
